
"use client";

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { unstable_noStore as noStore } from 'next/cache';

const FormSchema = z.object({
  id: z.string(),
  pelangganId: z.string(),
  productId: z.string(),
  total_harga: z.coerce.number(),
  status_pesanan: z.enum(['pending', 'completed']),
  tanggal_pesanan: z.string(),
});

export type State = {
  errors?: {
    pelangganId?: string[];
    jenis_member?: string[];
    status_keanggotaan?: string[];
  };
  message?: string | null;
};

const FormSchemaMember = z.object({
  id: z.string(),
  pelangganId: z.string({
    required_error: "Please select a customer",
  }),
  jenis_member: z.enum(['Silver', 'Gold', 'Platinum'], {
    required_error: "Please select a membership type",
  }),
  tanggal_bergabung: z.string(),
  status_keanggotaan: z.enum(['Aktif', 'Tidak Aktif'], {
    required_error: "Please select a membership status",
  }),
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



// Type definitions for form states

const CreatePelangganSchema = z.object({
  nama: z.string({
    required_error: "Name is required",
  }).min(1, "Name is required"),
  email: z.string({
    required_error: "Email is required",
  }).email("Invalid email format"),
  alamat: z.string({
    required_error: "Address is required",
  }).min(1, "Address is required"),
  nomor_telepon: z.string({
    required_error: "Phone number is required",
  }).min(1, "Phone number is required"),
  image_url: z.string().optional(),
});
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
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
    redirect('/dashboard');
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
  noStore();
  const img = formData.get('image_url');
  
  // Default image if none provided
  let fileName = '/pelanggan/default-avatar.png';
  if (img instanceof File && img.size > 0) {
    fileName = '/pelanggan/' + img.name;
  }

  try {
    const { nama, email, alamat, nomor_telepon } = CreatePelangganSchema.parse({
      nama: formData.get('nama'),
      email: formData.get('email'),
      alamat: formData.get('alamat'),
      nomor_telepon: formData.get('nomor_telepon'),
      image_url: fileName,
    });

    // Check if email already exists
    const existingPelanggan = await sql`
      SELECT id FROM pelanggan WHERE email = ${email}
    `;

    if (existingPelanggan.rows.length > 0) {
      return {
        message: 'Email already exists.',
      };
    }

    await sql`
      INSERT INTO pelanggan (nama, email, alamat, nomor_telepon, image_url)
      VALUES (${nama}, ${email}, ${alamat}, ${nomor_telepon}, ${fileName})
    `;

    revalidatePath('/dashboard/pelanggan');
    redirect('/dashboard/pelanggan');
  } catch (error) {
    console.error('Failed to create pelanggan:', error);
    return {
      message: 'Database Error: Failed to Create Pelanggan.',
    };
  }
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


export type MemberFormState = {
  errors?: {
    pelangganId?: string[];
    jenis_member?: string[];
    status_keanggotaan?: string[];
  };
  message?: string | null;
};

const CreateMemberSchema = z.object({
  pelangganId: z.string({
    required_error: "Please select a customer",
  }),
  jenis_member: z.enum(['Silver', 'Gold', 'Platinum'], {
    required_error: "Please select a membership type",
  }),
  status_keanggotaan: z.enum(['Aktif', 'Tidak Aktif'], {
    required_error: "Please select a membership status",
  })
});

const UpdateMemberSchema = CreateMemberSchema;

export async function createMember(prevState: MemberFormState, formData: FormData) {
  noStore();

  const validationResult = CreateMemberSchema.safeParse({
    pelangganId: formData.get('pelangganId'),
    jenis_member: formData.get('jenis_member'),
    status_keanggotaan: formData.get('status_keanggotaan'),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: 'Please fill in all required fields.'
    };
  }

  const { pelangganId, jenis_member, status_keanggotaan } = validationResult.data;
  const tanggal_bergabung = new Date().toISOString().split('T')[0];

  try {
    // Check if pelanggan exists
    const pelangganResult = await sql`
      SELECT id FROM pelanggan WHERE id = ${pelangganId}
    `;

    if (pelangganResult.rows.length === 0) {
      return {
        errors: {
          pelangganId: ['Selected customer does not exist.']
        },
        message: 'Failed to create member: Customer not found.'
      };
    }

    // Check if member already exists for this pelanggan
    const existingMember = await sql`
      SELECT id FROM member WHERE pelanggan_id = ${pelangganId}
    `;

    if (existingMember.rows.length > 0) {
      return {
        errors: {
          pelangganId: ['This customer is already a member.']
        },
        message: 'Failed to create member: Customer is already a member.'
      };
    }

    // Create the member
    await sql`
      INSERT INTO member (pelanggan_id, jenis_member, tanggal_bergabung, status_keanggotaan)
      VALUES (${pelangganId}, ${jenis_member}, ${tanggal_bergabung}, ${status_keanggotaan})
    `;

    revalidatePath('/dashboard/member');
    redirect('/dashboard/member');
  } catch (error) {
    console.error('Failed to create member:', error);
    return {
      message: 'Database Error: Failed to Create Member.'
    };
  }
}

export async function updateMember(id: string, formData: FormData) {
  noStore();
  
  const validationResult = UpdateMemberSchema.safeParse({
    pelangganId: formData.get('pelangganId'),
    jenis_member: formData.get('jenis_member'),
    status_keanggotaan: formData.get('status_keanggotaan'),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Member.',
    };
  }

  const { pelangganId, jenis_member, status_keanggotaan } = validationResult.data;

  try {
    // Check if pelanggan exists
    const pelangganResult = await sql`
      SELECT id FROM pelanggan WHERE id = ${pelangganId}
    `;

    if (pelangganResult.rows.length === 0) {
      return {
        errors: {
          pelangganId: ['Selected customer does not exist.']
        },
        message: 'Failed to update member: Customer not found.'
      };
    }

    await sql`
      UPDATE member
      SET pelanggan_id = ${pelangganId}, 
          jenis_member = ${jenis_member}, 
          status_keanggotaan = ${status_keanggotaan}
      WHERE id = ${id}
    `;

    revalidatePath('/dashboard/member');
    redirect('/dashboard/member');
  } catch (error) {
    console.error('Failed to update member:', error);
    return { message: 'Database Error: Failed to Update Member.' };
  }
}

export async function deletePelanggan(id: string) {
  noStore();
  
  try {
    // First delete any associated member records
    await sql`DELETE FROM member WHERE pelanggan_id = ${id}`;
    
    // Then delete any associated orders
    await sql`DELETE FROM pesanan WHERE pelanggan_id = ${id}`;
    
    // Finally delete the pelanggan
    await sql`DELETE FROM pelanggan WHERE id = ${id}`;
    
    revalidatePath('/dashboard/pelanggan');
    return { message: 'Deleted pelanggan and associated records.' };
  } catch (error) {
    console.error('Failed to delete pelanggan:', error);
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
  noStore();
  
  try {
    // Check if member exists
    const memberResult = await sql`
      SELECT id FROM member WHERE id = ${id}
    `;

    if (memberResult.rows.length === 0) {
      return { message: 'Member not found.' };
    }

    await sql`DELETE FROM member WHERE id = ${id}`;
    revalidatePath('/dashboard/member');
    return { message: 'Member deleted successfully.' };
  } catch (error) {
    console.error('Failed to delete member:', error);
    return { message: 'Database Error: Failed to Delete Member.' };
  }
}

export type PelangganFormState = {
  errors?: {
    nama?: string[];
    email?: string[];
    alamat?: string[];
    nomor_telepon?: string[];
    image_url?: string[];
  };
  message?: string | null;
};