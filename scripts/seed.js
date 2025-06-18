const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
  products,
  pelanggan,
  pesanan,
  detailPesanan,
  member,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

// async function seedUsers(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS users (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         password TEXT NOT NULL
//       );
//     `;

//     console.log(`Created "users" table`);

//     const insertedUsers = await Promise.all(
//       users.map(async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         return client.sql`
//           INSERT INTO users (id, name, email, password)
//           VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//           ON CONFLICT (id) DO NOTHING;
//         `;
//       })
//     );

//     console.log(`Seeded ${insertedUsers.length} users`);

//     return { createTable, users: insertedUsers };
//   } catch (error) {
//     console.error('Error seeding users:', error);
//     throw error;
//   }
// }

// async function seedInvoices(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS invoices (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         customer_id UUID NOT NULL,
//         amount INT NOT NULL,
//         status VARCHAR(255) NOT NULL,
//         date DATE NOT NULL
//       );
//     `;

//     console.log(`Created "invoices" table`);

//     const insertedInvoices = await Promise.all(
//       invoices.map(
//         (invoice) => client.sql`
//           INSERT INTO invoices (customer_id, amount, status, date)
//           VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//           ON CONFLICT (id) DO NOTHING;
//         `
//       )
//     );

//     console.log(`Seeded ${insertedInvoices.length} invoices`);

//     return { createTable, invoices: insertedInvoices };
//   } catch (error) {
//     console.error('Error seeding invoices:', error);
//     throw error;
//   }
// }

// async function seedCustomers(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS customers (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         image_url VARCHAR(255) NOT NULL
//       );
//     `;

//     console.log(`Created "customers" table`);

//     const insertedCustomers = await Promise.all(
//       customers.map(
//         (customer) => client.sql`
//           INSERT INTO customers (id, name, email, image_url)
//           VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//           ON CONFLICT (id) DO NOTHING;
//         `
//       )
//     );

//     console.log(`Seeded ${insertedCustomers.length} customers`);

//     return { createTable, customers: insertedCustomers };
//   } catch (error) {
//     console.error('Error seeding customers:', error);
//     throw error;
//   }
// }

// async function seedRevenue(client) {
//   try {
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS revenue (
//         month VARCHAR(4) NOT NULL UNIQUE,
//         revenue INT NOT NULL
//       );
//     `;

//     console.log(`Created "revenue" table`);

//     const insertedRevenue = await Promise.all(
//       revenue.map(
//         (rev) => client.sql`
//           INSERT INTO revenue (month, revenue)
//           VALUES (${rev.month}, ${rev.revenue})
//           ON CONFLICT (month) DO NOTHING;
//         `
//       )
//     );

//     console.log(`Seeded ${insertedRevenue.length} revenue`);

//     return { createTable, revenue: insertedRevenue };
//   } catch (error) {
//     console.error('Error seeding revenue:', error);
//     throw error;
//   }
// }

// async function seedProducts(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS products (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         nama_produk VARCHAR(255) NOT NULL,
//         harga DECIMAL(10, 2) NOT NULL,
//         stok INT NOT NULL,
//         kategori VARCHAR(255),
//         image_url VARCHAR(255)
//       );
//     `;

//     console.log(`Created "products" table`);

//     const insertedProducts = await Promise.all(
//       products.map(
//         (product) => client.sql`
//         INSERT INTO products (nama_produk, harga, stok, kategori, image_url)
//         VALUES (${product.nama_produk}, ${product.harga}, ${product.stok}, ${product.kategori}, ${product.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedProducts.length} products`);

//     return {
//       createTable,
//       products: insertedProducts,
//     };
//   } catch (error) {
//     console.error('Error seeding products:', error);
//     throw error;
//   }
// }

// async function seedPelanggan(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS pelanggan (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         nama VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         alamat TEXT,
//         nomor_telepon VARCHAR(20),
//         image_url VARCHAR(255)
//       );
//     `;

//     console.log(`Created "pelanggan" table`);

//     const insertedPelanggan = await Promise.all(
//       pelanggan.map(
//         (pelanggan) => client.sql`
//           INSERT INTO pelanggan (id, nama, email, alamat, nomor_telepon, image_url)
//           VALUES (${pelanggan.id}, ${pelanggan.nama}, ${pelanggan.email}, ${pelanggan.alamat}, ${pelanggan.nomor_telepon}, ${pelanggan.image_url})
//           ON CONFLICT (id) DO NOTHING;
//         `,
//       ),
//     );
    

//     console.log(`Seeded ${insertedPelanggan.length} pelanggan`);

//     return {
//       createTable,
//       pelanggan: insertedPelanggan,
//     };
//   } catch (error) {
//     console.error('Error seeding pelanggan:', error);
//     throw error;
//   }
// }

async function seedPesanan(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS pesanan (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        pelanggan_id UUID NOT NULL,
        produk_id UUID NOT NULL,
        tanggal_pesanan TIMESTAMP NOT NULL,
        total_harga DECIMAL(10, 2) NOT NULL,
        status_pesanan VARCHAR(50)
           
      );
    `;

    console.log(`Created "pesanan" table`);

    const insertedPesanan = await Promise.all(
      pesanan.map(
        (pesanan) => client.sql`
        INSERT INTO pesanan (pelanggan_id, produk_id, tanggal_pesanan, total_harga, status_pesanan)
        VALUES (${pesanan.pelanggan_id}, ${pesanan.produk_id}, ${pesanan.tanggal_pesanan}, ${pesanan.total_harga}, ${pesanan.status_pesanan})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedPesanan.length} pesanan`);

    return {
      createTable,
      pesanan: insertedPesanan,
    };
  } catch (error) {
    console.error('Error seeding pesanan:', error);
    throw error;
  }
}

// async function seedDetailPesanan(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS detailPesanan (
//         id_detail_pesanan UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         pelanggan_id UUID NOT NULL,
//         pesanan_id UUID NOT NULL,
//         produk_id UUID NOT NULL,
//         jumlah INT NOT NULL,
//         harga_per_item DECIMAL(10, 2) NOT NULL
//       );
//     `;

//     console.log(`Created "detailPesanan" table`);

//     const insertedDetailPesanan = await Promise.all(
//       detailPesanan.map(
//         (detail) => client.sql`
//         INSERT INTO detailPesanan (pelanggan_id, pesanan_id, produk_id, jumlah, harga_per_item)
//         VALUES (${detail.pelanggan_id}, ${detail.pesanan_id}, ${detail.produk_id}, ${detail.jumlah}, ${detail.harga_per_item})
//         ON CONFLICT (id_detail_pesanan) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedDetailPesanan.length} detailPesanan`);

//     return {
//       createTable,
//       detailPesanan: insertedDetailPesanan,
//     };
//   } catch (error) {
//     console.error('Error seeding detailPesanan:', error);
//     throw error;
//   }
// }



// async function seedMember(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS member (
//         id_member UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         pelanggan_id UUID NOT NULL,
//         jenis_member VARCHAR(50),
//         tanggal_bergabung TIMESTAMP NOT NULL,
//         status_keanggotaan VARCHAR(50)
        
//       );
//     `;

//     console.log(`Created "member" table`);

//     const insertedMember = await Promise.all(
//       member.map(
//         (member) => client.sql`
//         INSERT INTO member (pelanggan_id, jenis_member, tanggal_bergabung, status_keanggotaan)
//         VALUES (${member.pelanggan_id}, ${member.jenis_member}, ${member.tanggal_bergabung}, ${member.status_keanggotaan})
//         ON CONFLICT (id_member) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedMember.length} member`);

//     return {
//       createTable,
//       member: insertedMember,
//     };
//   } catch (error) {
//     console.error('Error seeding member:', error);
//     throw error;
//   }
// }


async function main() {
  const client = await db.connect();

  // await seedUsers(client);
  // await seedProducts(client);
  // await seedPelanggan(client);
  await seedPesanan(client);
  // await seedDetailPesanan(client);
  // await seedMember(client);
  // await seedRevenue(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});


