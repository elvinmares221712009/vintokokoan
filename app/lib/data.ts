import { sql } from '@vercel/postgres';
import {
  Pelanggan,
  PelangganField,
  PesananForm,
  PesananTable,
  LatestPesananRaw,
  User,
  Revenue,
  PelangganForm,
  Produk,
  ProdukForm,
  MemberTable,
  ProdukField,
  MemberForm,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  noStore();

  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestPesanan() {
  noStore();
  try {
    const data = await sql<LatestPesananRaw>`
      SELECT pesanan.total_harga, pelanggan.nama, pelanggan.image_url, pelanggan.email, pesanan.id
      FROM pesanan
      JOIN pelanggan ON pesanan.pelanggan_id = pelanggan.id
      ORDER BY pesanan.tanggal_pesanan DESC
      LIMIT 5`;

    const latestPesanan = data.rows.map((pesanan) => ({
      ...pesanan,
      total_harga: formatCurrency(pesanan.total_harga),
    }));
    return latestPesanan;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest pesanan.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    const pesananCountPromise = sql`SELECT COUNT(*) FROM pesanan`;
    const pelangganCountPromise = sql`SELECT COUNT(*) FROM pelanggan`;
    const memberCountPromise = sql`SELECT COUNT(*) FROM member`;
    const pesananStatusPromise = sql`SELECT
         SUM(CASE WHEN status_pesanan = 'completed' THEN total_harga ELSE 0 END) AS "completed",
         SUM(CASE WHEN status_pesanan = 'pending' THEN total_harga ELSE 0 END) AS "pending"
         FROM pesanan`;

    const data = await Promise.all([
      pesananCountPromise,
      pelangganCountPromise,
      memberCountPromise,
      pesananStatusPromise,
    ]);

    const numberOfPesanan = Number(data[0].rows[0].count ?? '0');
    const numberOfPelanggan = Number(data[1].rows[0].count ?? '0');
    const numberOfMember = Number(data[2].rows[0].count ?? '0');
    const totalPaidPesanan = formatCurrency(data[3].rows[0].completed ?? '0');
    const totalPendingPesanan = formatCurrency(data[3].rows[0].pending ?? '0');

    return {
      numberOfPelanggan,
      numberOfPesanan,
      numberOfMember,
      totalPaidPesanan,
      totalPendingPesanan,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}


const ITEMS_PER_PAGE = 6;

export async function fetchFilteredPesanan(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<PesananTable>`
      SELECT
        pesanan.id,
        pesanan.total_harga,
        pesanan.tanggal_pesanan,
        pesanan.status_pesanan,
        pelanggan.nama,
        pelanggan.email,
        products.nama_produk,
        pelanggan.image_url
      FROM pesanan
      JOIN pelanggan ON pesanan.pelanggan_id = pelanggan.id
      JOIN products ON pesanan.product_id = products.id
      WHERE
        pelanggan.nama ILIKE ${`%${query}%`} OR
        pelanggan.email ILIKE ${`%${query}%`} OR
        products.nama_produk ILIKE ${`%${query}%`} OR
        pesanan.total_harga::text ILIKE ${`%${query}%`} OR
        pesanan.tanggal_pesanan::text ILIKE ${`%${query}%`} OR
        pesanan.status_pesanan ILIKE ${`%${query}%`}
      ORDER BY pesanan.tanggal_pesanan DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    const pesanan = data.rows.map((item) => ({
      ...item,
      total_harga: formatCurrency(item.total_harga),
    }));

    return pesanan;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pesanan.');
  }
}

export async function fetchPesananPages(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const count = await sql`SELECT COUNT(*)
    FROM pesanan
    JOIN pelanggan ON pesanan.pelanggan_id = pelanggan.id
    JOIN products ON pesanan.product_id = products.id
    WHERE
      pelanggan.nama ILIKE ${`%${query}%`} OR
      pelanggan.email ILIKE ${`%${query}%`} OR
      products.nama_produk ILIKE ${`%${query}%`} OR
      pesanan.total_harga::text ILIKE ${`%${query}%`} OR
      pesanan.tanggal_pesanan::text ILIKE ${`%${query}%`} OR
      pesanan.status_pesanan ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of pesanan.');
  }
}

export async function fetchPesananById(id: string) {
  noStore();
  try {
    const data = await sql<PesananForm>`
      SELECT
        pesanan.id,
        pesanan.pelanggan_id,
        pesanan.total_harga,
        pesanan.status_pesanan
      FROM pesanan
      WHERE pesanan.id = ${id};
    `;

    const pesanan = data.rows.map((pesanan) => ({
      ...pesanan,
      total_harga: pesanan.total_harga / 100,
    }));

    return pesanan[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pesanan.');
  }
}

export async function fetchPelanggan() {
  noStore();
  try {
    const data = await sql<PelangganField>`
      SELECT
        id,
        nama,
        alamat,
        nomor_telepon
      FROM pelanggan
      ORDER BY nama ASC
    `;

    const pelanggan = data.rows;
    return pelanggan;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all pelanggan.');
  }
}

export async function fetchFilteredPelanggan(query: string, currentPage: number) {
  noStore();

  const itemsPerPage = 6; // Batas jumlah pelanggan per halaman
  const offset = (currentPage - 1) * itemsPerPage; // Hitung offset berdasarkan halaman saat ini

  try {
    const data = await sql<Pelanggan>`
      SELECT
        pelanggan.id,
        pelanggan.nama,
        pelanggan.email,
        pelanggan.alamat,
        pelanggan.nomor_telepon,
        pelanggan.image_url
      FROM pelanggan
      WHERE
        pelanggan.nama ILIKE ${`%${query}%`} OR
        pelanggan.email ILIKE ${`%${query}%`} OR
        pelanggan.alamat ILIKE ${`%${query}%`} OR
        pelanggan.nomor_telepon::text ILIKE ${`%${query}%`}
      ORDER BY nama ASC
      LIMIT ${itemsPerPage} OFFSET ${offset}
    `;

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch pelanggan table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchPelangganPage(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const count = await sql`SELECT COUNT(*)
    FROM pelanggan
    WHERE
      nama ILIKE ${`%${query}%`} OR
      email ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of pelanggan.');
  }
}

export async function fetchPelangganById(id: string) {
  noStore();
  try {
    const data = await sql<PelangganForm>`
      SELECT
        pelanggan.id,
        pelanggan.nama,
        pelanggan.email,
        pelanggan.image_url
      FROM pelanggan
      WHERE pelanggan.id = ${id};
    `;

    const pelanggan = data.rows.map((pelanggan) => ({
      ...pelanggan,
    }));

    console.log(pelanggan);
    return pelanggan[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pelanggan.');
  }
}


export async function fetchProduk() {
  noStore();
  try {
    const data = await sql<ProdukField>`
      SELECT
        id,
        nama_produk,
        harga,
        stok,
        kategori,
        image_url
      FROM products
      ORDER BY products.nama_produk ASC
    `;
 
    const products = data.rows;
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all produk.');
  }
}

export async function fetchFilteredProduk(query: string, currentPage: number) {
  noStore();

  const itemsPerPage = 6; // Batas jumlah produk per halaman
  const offset = (currentPage - 1) * itemsPerPage; // Hitung offset berdasarkan halaman saat ini

  try {
    const data = await sql<Produk>`
      SELECT
      products.id,
      products.nama_produk,
      products.harga,
      products.stok,
      products.kategori,
      products.image_url
      FROM products
      WHERE
      products.nama_produk ILIKE ${`%${query}%`} OR
      products.harga::text ILIKE ${`%${query}%`} OR
      products.stok::text ILIKE ${`%${query}%`} OR
      products.kategori ILIKE ${`%${query}%`}
      ORDER BY products.nama_produk ASC
      LIMIT ${itemsPerPage} OFFSET ${offset}
    `;

    const produk = data.rows.map((item) => ({
      ...item,
      harga: formatCurrency(item.harga),
    }));

    return produk;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch produk table.');
  }
}

export async function fetchProdukById(id: string) {
  noStore();
  try {
    const data = await sql<ProdukForm>`
      SELECT
        id,
        nama_produk,
        harga,
        stok,
        kategori,
        image_url
      FROM products
      WHERE id = ${id};
    `;

    const products = data.rows.map((products) => ({
      ...products,
      harga: products.harga / 100, // Format harga jika diperlukan
    }));
    console.log(products);
    return products[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch produk.');
  }
}


export async function fetchProdukPages(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const count = await sql`SELECT COUNT(*)
    FROM products
    WHERE
      nama_produk ILIKE ${`%${query}%`} OR
      harga::text ILIKE ${`%${query}%`} OR
      stok::text ILIKE ${`%${query}%`} OR
      kategori ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of produk.');
  }
}



export async function fetchFilteredMember(query: string, currentPage: number) {
  noStore(); // Pastikan fungsi ini didefinisikan di tempat lain
  const ITEMS_PER_PAGE = 6; 
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const members = await sql<MemberTable>`
      SELECT
        member.id,
        member.jenis_member,
        member.tanggal_bergabung,
        member.status_keanggotaan,
        pelanggan.nama,
        pelanggan.email,
        pelanggan.image_url
      FROM member
      JOIN pelanggan ON member.pelanggan_id = pelanggan.id
      WHERE
        pelanggan.nama ILIKE ${`%${query}%`} OR
        pelanggan.email ILIKE ${`%${query}%`} OR
        member.jenis_member::text ILIKE ${`%${query}%`} OR
        member.tanggal_bergabung::text ILIKE ${`%${query}%`} OR
        member.status_keanggotaan::text ILIKE ${`%${query}%`}
      ORDER BY member.tanggal_bergabung DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return members.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch member.');
  }
}


export async function fetchMemberPages(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const count = await sql`SELECT COUNT(*)
    FROM member
    JOIN pelanggan ON member.pelanggan_id = pelanggan.id
    WHERE
      pelanggan.nama ILIKE ${`%${query}%`} OR
      pelanggan.email ILIKE ${`%${query}%`} OR
      member.jenis_member::text ILIKE ${`%${query}%`} OR
      member.tanggal_bergabung::text ILIKE ${`%${query}%`} OR
      member.status_keanggotaan ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of member.');
  }
}

export async function fetchMemberById(id: string) {
  noStore();
  try {
    const data = await sql<MemberForm>`
      SELECT
        member.id,
        member.pelanggan_id,
        member.jenis_member,
        member.status_keanggotaan
      FROM member
      WHERE member.id = ${id};
    `;

    const member = data.rows.map((member) => ({
      ...member,
      
    }));
    console.log(member);
    return member[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch member.');
  }
}

