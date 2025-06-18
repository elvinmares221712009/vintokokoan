const { db } = require('@vercel/postgres');
const data = require('../app/lib/placeholder-data.js');
console.log('Imported data:', data);

const {
  users,
  products,
  members,
  orders,
  orderDetails,
  pesanan,
  // detailPesanan,
  // member,
} = data;
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    
    // Create users table
    const createUsersTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Create products table
    const createProductsTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0,
        image_url TEXT
      );
    `;

    console.log(`Created "products" table`);

    // Create members table
    const createMembersTable = await client.sql`
      CREATE TABLE IF NOT EXISTS members (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone VARCHAR(20),
        address TEXT,
        join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "members" table`);

    // Create orders table
    const createOrdersTable = await client.sql`
      CREATE TABLE IF NOT EXISTS orders (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        member_id UUID REFERENCES members(id),
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending'
      );
    `;

    console.log(`Created "orders" table`);

    // Create order_details table
    const createOrderDetailsTable = await client.sql`
      CREATE TABLE IF NOT EXISTS order_details (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        order_id UUID REFERENCES orders(id),
        product_id UUID REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      );
    `;

    console.log(`Created "order_details" table`);

    // Insert admin user
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createUsersTable,
      createProductsTable,
      createMembersTable,
      createOrdersTable,
      createOrderDetailsTable,
      users: insertedUsers
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

async function seedProducts(client) {
  try {
    const insertedProducts = await Promise.all(
      products.map((product) => {
        return client.sql`
          INSERT INTO products (id, name, description, price, stock, image_url)
          VALUES (${product.id}, ${product.name}, ${product.description}, ${product.price}, ${product.stock}, ${product.image_url})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedProducts.length} products`);
    return insertedProducts;
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}

async function seedMembers(client) {
  try {
    const insertedMembers = await Promise.all(
      members.map((member) => {
        return client.sql`
          INSERT INTO members (id, name, email, phone, address, join_date)
          VALUES (${member.id}, ${member.name}, ${member.email}, ${member.phone}, ${member.address}, ${member.join_date})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedMembers.length} members`);
    return insertedMembers;
  } catch (error) {
    console.error('Error seeding members:', error);
    throw error;
  }
}

async function seedOrders(client) {
  try {
    const insertedOrders = await Promise.all(
      orders.map((order) => {
        return client.sql`
          INSERT INTO orders (id, member_id, order_date, total_amount, status)
          VALUES (${order.id}, ${order.member_id}, ${order.order_date}, ${order.total_amount}, ${order.status})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedOrders.length} orders`);
    return insertedOrders;
  } catch (error) {
    console.error('Error seeding orders:', error);
    throw error;
  }
}

async function seedOrderDetails(client) {
  try {
    const insertedOrderDetails = await Promise.all(
      orderDetails.map((detail) => {
        return client.sql`
          INSERT INTO order_details (id, order_id, product_id, quantity, price)
          VALUES (${detail.id}, ${detail.order_id}, ${detail.product_id}, ${detail.quantity}, ${detail.price})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedOrderDetails.length} order details`);
    return insertedOrderDetails;
  } catch (error) {
    console.error('Error seeding order details:', error);
    throw error;
  }
}

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

  try {
    await seedUsers(client);
    await seedProducts(client);
    await seedMembers(client);
    await seedOrders(client);
    await seedOrderDetails(client);
    await seedPesanan(client);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});


