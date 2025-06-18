'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  pelangganId: z.string(),
  productId: z.string(),
  total_harga: z.coerce.number(),
  status_pesanan: z.enum(['pending', 'completed']),
  tanggal_pesanan: z.string(),
});

const FormSchemaMember = z.object({
  id: z.string(),
  pelangganId: z.string(),
  jenis_member: z.enum(['Silver', 'Gold', 'Platinum']),
  tanggal_bergabung: z.string(),
  status_keanggotaan: z.enum(['Aktif', 'Tidak Aktif']),

});

const FormSchemaPelanggan = z.object({
  id: z.string(),
  nama: z.string(),
  email: z.string(),
  alamat: z.string(),
  nomor_telepon: z.string(),
  image_url: z.string(),
  date: z.string(),
})

const FormSchemaProduk = z.object({
  id: z.string(),
  nama_produk: z.string(),
  harga: z.coerce.number(),
  stok: z.coerce.number(),
  kategori: z.string(),
  image_url: z.string(),
  date: z.string(),
})



const CreatePelanggan = FormSchemaPelanggan.omit({ id: true, date: true });
const UpdatePelanggan = FormSchemaPelanggan.omit({ id: true, date: true });
const CreateProduk = FormSchemaProduk.omit({ id: true, date: true });
const UpdateProduk = FormSchemaProduk.omit({ id: true, date: true });
const CreateMember = FormSchemaMember.omit({ id: true, tanggal_bergabung: true });
const UpdateMember = FormSchemaMember.omit({ id: true, tanggal_bergabung: true });
const CreatePesanan = FormSchema.omit({ id: true, tanggal_pesanan: true });
const UpdatePesanan = FormSchema.omit({ id: true, tanggal_pesanan: true });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createPelanggan(formData: FormData) {
  const img = formData.get('image_url');
  console.log(img);

  let fileName = '';
  if (img instanceof File) {
    fileName = '/pelanggan/' + img.name;
    console.log(fileName);
  };

  const { nama, email, alamat, nomor_telepon, image_url } = CreatePelanggan.parse({
    nama: formData.get('nama'),
    email: formData.get('email'),
    alamat: formData.get('alamat'),
    nomor_telepon: formData.get('nomor_telepon'),
    image_url: fileName,
  });


  try {
    await sql`
        INSERT INTO pelanggan (nama, email, alamat, nomor_telepon, image_url)
        VALUES (${nama}, ${email}, ${alamat}, ${nomor_telepon} ,${image_url})
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Customers.',
    };
  }

  revalidatePath('/dashboard/pelanggan');
  redirect('/dashboard/pelanggan');
}

export async function updatePelanggan(id: string, formData: FormData) {
  const img = formData.get('image_url');
  console.log(img);

  let fileName = '';
  if (img instanceof File) {
    fileName = '/pelanggan/' + img.name;
    console.log(fileName);
  };

  const { nama, email, alamat, nomor_telepon, image_url } = UpdatePelanggan.parse({
    nama: formData.get('nama'),
    email: formData.get('email'),
    alamat: formData.get('alamat'),
    nomor_telepon: formData.get('nomor_telepon'),
    image_url: fileName,
  });

  try {

    await sql`
          UPDATE pelanggan
          SET nama = ${nama}, email = ${email}, alamat = ${alamat}, nomor_telepon = ${nomor_telepon},  image_url = ${image_url}
          WHERE id = ${id}
        `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Pelanggan.' };
  }

  revalidatePath('/dashboard/pelanggan');
  redirect('/dashboard/pelanggan');
}


export async function createProduk(formData: FormData) {
  const img = formData.get('image_url');
  console.log(img);

  let fileName = '';
  if (img instanceof File) {
    fileName = '/produk/' + img.name;
    console.log(fileName);
  };

  const { nama_produk, harga, stok, kategori, image_url } = CreateProduk.parse({
    nama_produk: formData.get('nama_produk'),
    harga: formData.get('harga'),
    stok: formData.get('stok'),
    kategori: formData.get('kategori'),
    image_url: fileName,
  });

  const hargaInCents = harga * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
          INSERT INTO products (nama_produk, harga, stok, kategori, image_url)
          VALUES (${nama_produk}, ${hargaInCents}, ${stok}, ${kategori} ,${image_url})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function updateProduk(id: string, formData: FormData) {
  const img = formData.get('image_url');
  console.log(img);

  let fileName = '';
  if (img instanceof File) {
    fileName = '/produk/' + img.name;
    console.log(fileName);
  }

  const { nama_produk, harga, stok, kategori, image_url } = UpdateProduk.parse({
    nama_produk: formData.get('nama_produk'),
    harga: formData.get('harga'),
    stok: formData.get('stok'),
    kategori: formData.get('kategori'),
    image_url: fileName,
  });

  const hargaInCents = harga * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
          UPDATE products
          SET nama_produk = ${nama_produk}, harga = ${hargaInCents}, stok = ${stok}, kategori = ${kategori},  image_url = ${image_url}
          WHERE id = ${id}
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Product.',
    };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}




export async function createPesanan(formData: FormData) {
  const { pelangganId, productId, total_harga, status_pesanan } = CreatePesanan.parse({
    pelangganId: formData.get('pelangganId'),
    productId: formData.get('productId'),
    total_harga: formData.get('total_harga'),
    status_pesanan: formData.get('status_pesanan'),
  });
  const total_hargaInCents = total_harga * 100;
  const tanggal_pesanan = new Date().toISOString().split('T')[0];

  try {
    await sql`
          INSERT INTO pesanan (pelanggan_id, product_id, tanggal_pesanan, total_harga, status_pesanan)
          VALUES (${pelangganId}, ${productId}, ${tanggal_pesanan}, ${total_hargaInCents}, ${status_pesanan})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Pesanan.',
    };
  }

  revalidatePath('/dashboard/pesanan');
  redirect('/dashboard/pesanan');
}

export async function updatePesanan(id: string, formData: FormData) {
  const { pelangganId, productId, total_harga, status_pesanan } = UpdatePesanan.parse({
    pelangganId: formData.get('pelangganId'),
    productId: formData.get('productId'),
    total_harga: formData.get('total_harga'),
    status_pesanan: formData.get('status_pesanan'),
  });

  const total_hargaInCents = total_harga * 100;

  try {
    await sql`
          UPDATE pesanan
          SET pelanggan_id = ${pelangganId}, product_id = ${productId}, total_harga = ${total_hargaInCents}, status_pesanan = ${status_pesanan}
          WHERE id = ${id}
        `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Pesanan.' };
  }

  revalidatePath('/dashboard/pesanan');
  redirect('/dashboard/pesanan');
}


export async function createMember(formData: FormData) {
  const { pelangganId, jenis_member, status_keanggotaan } = CreateMember.parse({
    pelangganId: formData.get('pelangganId'),
    jenis_member: formData.get('jenis_member'),
    status_keanggotaan: formData.get('status_keanggotaan'),
  });

  const tanggal_bergabung = new Date().toISOString().split('T')[0];

  try {
    await sql`
          INSERT INTO member (pelanggan_id, jenis_member, tanggal_bergabung, status_keanggotaan)
          VALUES (${pelangganId}, ${jenis_member}, ${tanggal_bergabung}, ${status_keanggotaan})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Member.',
    };
  }

  revalidatePath('/dashboard/member');
  redirect('/dashboard/member');
}

export async function updateMember(id: string, formData: FormData) {
  const { pelangganId, jenis_member, status_keanggotaan } = UpdateMember.parse({
    pelangganId: formData.get('pelangganId'),
    jenis_member: formData.get('jenis_member'),
    status_keanggotaan: formData.get('status_keanggotaan'),
  });


  try {
    await sql`
          UPDATE member
          SET pelanggan_id = ${pelangganId}, jenis_member = ${jenis_member}, status_keanggotaan = ${status_keanggotaan}
          WHERE id = ${id}
        `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Member.' };
  }

  revalidatePath('/dashboard/member');
  redirect('/dashboard/member');
}


export async function deletePelanggan(id: string) {
  // throw new Error('Failed to Delete Pelanggan');

  // Unreachable code block
  try {
    await sql`DELETE FROM pelanggan WHERE id = ${id}`;
    revalidatePath('/dashboard/pelanggan');
    return { message: 'Deleted pelanggan.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Pelanggan.' };
  }
}

export async function deleteProduk(id: string) {
  // throw new Error('Failed to Delete Produk');

  // Unreachable code block
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    revalidatePath('/dashboard/products');
    return { message: 'Deleted produk.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Produk.' };
  }
}

export async function deletePesanan(id: string) {
  // throw new Error('Failed to Delete Pesanan');

  // Unreachable code block
  try {
    await sql`DELETE FROM pesanan WHERE id = ${id}`;
    revalidatePath('/dashboard/pesanan');
    return { message: 'Deleted pesanan.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Pesanan.' };
  }
}

export async function deleteMember(id: string) {
  // throw new Error('Failed to Delete Member');

  // Unreachable code block
  try {
    await sql`DELETE FROM member WHERE id = ${id}`;
    revalidatePath('/dashboard/member');
    return { message: 'Deleted member.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Member.' };
  }
}