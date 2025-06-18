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

    // First, check if we have any orders
    const orderCount = await sql`SELECT COUNT(*) as count FROM orders`;
    const hasOrders = orderCount.rows[0].count > 0;

    if (!hasOrders) {
      // Return sample data if no orders exist
      return [
        { month: 'January', revenue: 0 },
        { month: 'February', revenue: 0 },
        { month: 'March', revenue: 0 },
        { month: 'April', revenue: 0 },
        { month: 'May', revenue: 0 },
        { month: 'June', revenue: 0 },
      ];
    }

    const data = await sql<Revenue>`
      WITH RECURSIVE months AS (
        SELECT 
          DATE_TRUNC('month', NOW()) as month
        UNION ALL
        SELECT 
          DATE_TRUNC('month', month - INTERVAL '1 month')
        FROM months
        WHERE month > NOW() - INTERVAL '6 months'
      ),
      monthly_revenue AS (
        SELECT
          DATE_TRUNC('month', order_date) as month,
          SUM(total_amount) as revenue
        FROM orders
        WHERE status = 'completed'
          AND order_date >= NOW() - INTERVAL '6 months'
        GROUP BY DATE_TRUNC('month', order_date)
      )
      SELECT
        TO_CHAR(m.month, 'Month') as month,
        COALESCE(mr.revenue, 0) as revenue
      FROM months m
      LEFT JOIN monthly_revenue mr ON m.month = mr.month
      ORDER BY m.month ASC
      LIMIT 6;
    `;

    console.log('Revenue data:', data.rows);

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    
    // Return sample data as fallback
    return [
      { month: 'January', revenue: 0 },
      { month: 'February', revenue: 0 },
      { month: 'March', revenue: 0 },
      { month: 'April', revenue: 0 },
      { month: 'May', revenue: 0 },
      { month: 'June', revenue: 0 },
    ];
  }
}

export async function fetchLatestPesanan() {
  noStore();
  try {
    const data = await sql<LatestPesananRaw>`
      SELECT orders.id as id_pesanan, orders.total_amount as total_harga, 
             members.name as nama, members.email, members.id as member_id
      FROM orders
      JOIN members ON orders.member_id = members.id
      ORDER BY orders.order_date DESC
      LIMIT 5`;

    const latestPesanan = data.rows.map((pesanan) => ({
      ...pesanan,
      total_harga: formatCurrency(pesanan.total_harga),
      image_url: '/customers/default.png' // Add a default image since members table doesn't have images
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
    // Debug: Get all tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('Available tables:', tables.rows);

    const ordersData = await sql`SELECT * FROM orders`;
    console.log('Orders data:', ordersData.rows);

    const membersData = await sql`SELECT * FROM members`;
    console.log('Members data:', membersData.rows);

    // Execute all queries in parallel
    const data = await Promise.all([
      // Count orders
      sql`SELECT COUNT(*)::integer as count FROM orders`,
      
      // Count members
      sql`SELECT COUNT(*)::integer as count FROM members`,
      
      // Count member status (using members table instead)
      sql`SELECT COUNT(*)::integer as count FROM members`,
      
      // Sum order amounts by status
      sql`
        SELECT
          COALESCE(SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END), 0) AS completed,
          COALESCE(SUM(CASE WHEN status = 'pending' THEN total_amount ELSE 0 END), 0) AS pending
        FROM orders
      `
    ]);

    console.log('Query results:', {
      orders: data[0].rows[0],
      members: data[1].rows[0],
      memberStatus: data[2].rows[0],
      amounts: data[3].rows[0]
    });

    const numberOfPesanan = data[0].rows[0]?.count ?? 0;
    const numberOfPelanggan = data[1].rows[0]?.count ?? 0;
    const numberOfMember = data[2].rows[0]?.count ?? 0;
    const totalPaidPesanan = formatCurrency(data[3].rows[0]?.completed ?? 0);
    const totalPendingPesanan = formatCurrency(data[3].rows[0]?.pending ?? 0);

    return {
      numberOfPelanggan,
      numberOfPesanan,
      numberOfMember,
      totalPaidPesanan,
      totalPendingPesanan,
    };
  } catch (error: any) {
    console.error('Database Error:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    });
    throw new Error('Failed to fetch card data. See server logs for details.');
  }
}


const ITEMS_PER_PAGE = 6;

export async function fetchFilteredPesanan(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<PesananTable>`
      SELECT
        orders.id,
        orders.total_amount as total_harga,
        orders.order_date as tanggal_pesanan,
        orders.status as status_pesanan,
        members.name as nama,
        members.email,
        products.name as nama_produk,
        '/customers/default.png' as image_url
      FROM orders
      JOIN members ON orders.member_id = members.id
      JOIN order_details ON orders.id = order_details.order_id
      JOIN products ON order_details.product_id = products.id
      WHERE
        members.name ILIKE ${`%${query}%`} OR
        members.email ILIKE ${`%${query}%`} OR
        products.name ILIKE ${`%${query}%`} OR
        orders.total_amount::text ILIKE ${`%${query}%`} OR
        orders.order_date::text ILIKE ${`%${query}%`} OR
        orders.status ILIKE ${`%${query}%`}
      GROUP BY orders.id, members.name, members.email, products.name
      ORDER BY orders.order_date DESC
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
  try {
    const count = await sql`SELECT COUNT(DISTINCT orders.id)
    FROM orders
    JOIN members ON orders.member_id = members.id
    JOIN order_details ON orders.id = order_details.order_id
    JOIN products ON order_details.product_id = products.id
    WHERE
      members.name ILIKE ${`%${query}%`} OR
      members.email ILIKE ${`%${query}%`} OR
      products.name ILIKE ${`%${query}%`} OR
      orders.total_amount::text ILIKE ${`%${query}%`} OR
      orders.order_date::text ILIKE ${`%${query}%`} OR
      orders.status ILIKE ${`%${query}%`}
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
        orders.id,
        orders.member_id as pelanggan_id,
        orders.total_amount as total_harga,
        orders.status as status_pesanan
      FROM orders
      WHERE orders.id = ${id};
    `;

    const pesanan = data.rows.map((pesanan) => ({
      ...pesanan,
      total_harga: pesanan.total_harga,
    }));

    return pesanan[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pesanan.');
  }
}

// Products functions
export async function fetchProduk() {
  noStore();
  try {
    const data = await sql`
      SELECT
        id,
        name as nama_produk,
        description as deskripsi,
        price as harga,
        stock as stok,
        image_url
      FROM products
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all produk.');
  }
}

export async function fetchFilteredProduk(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT
        id,
        name as nama_produk,
        description as deskripsi,
        price as harga,
        stock as stok,
        image_url
      FROM products
      WHERE
        name ILIKE ${`%${query}%`} OR
        description ILIKE ${`%${query}%`} OR
        price::text ILIKE ${`%${query}%`}
      ORDER BY name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch produk.');
  }
}

export async function fetchProdukPages(query: string, currentPage: number) {
  noStore();
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM products
      WHERE
        name ILIKE ${`%${query}%`} OR
        description ILIKE ${`%${query}%`} OR
        price::text ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of produk.');
  }
}

export async function fetchProdukById(id: string) {
  noStore();
  try {
    const data = await sql`
      SELECT
        id,
        name as nama_produk,
        description as deskripsi,
        price as harga,
        stock as stok,
        image_url
      FROM products
      WHERE id = ${id}
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch produk.');
  }
}

// Pelanggan functions
export async function fetchPelangganPage(query: string, currentPage: number) {
  noStore();
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM members
      WHERE
        name ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`} OR
        phone ILIKE ${`%${query}%`} OR
        address ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of pelanggan.');
  }
}

export async function fetchFilteredPelanggan(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT
        id,
        name as nama,
        email,
        phone as nomor_telepon,
        address as alamat,
        '/customers/default.png' as image_url
      FROM members
      WHERE
        name ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`} OR
        phone ILIKE ${`%${query}%`} OR
        address ILIKE ${`%${query}%`}
      ORDER BY name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pelanggan.');
  }
}

export async function fetchPelanggan() {
  noStore();
  try {
    const data = await sql`
      SELECT
        id,
        name as nama,
        email,
        phone as nomor_telepon,
        address as alamat,
        '/customers/default.png' as image_url
      FROM members
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all pelanggan.');
  }
}

// Member functions
export async function fetchFilteredMembers(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<MemberTable>`
      WITH member_stats AS (
        SELECT 
          member_id,
          COUNT(*) as total_orders,
          SUM(total_amount) as total_spent
        FROM orders
        GROUP BY member_id
      )
      SELECT 
        m.id,
        m.name as nama,
        m.email,
        '/customers/default.png' as image_url,
        COALESCE(ms.total_orders, 0) as total_orders,
        CASE 
          WHEN ms.total_orders >= 10 OR COALESCE(ms.total_spent, 0) >= 1000 THEN 'Platinum'
          WHEN ms.total_orders >= 5 OR COALESCE(ms.total_spent, 0) >= 500 THEN 'Gold'
          ELSE 'Silver'
        END as jenis_member,
        m.join_date as tanggal_bergabung,
        CASE 
          WHEN m.join_date > NOW() - INTERVAL '3 months' THEN 'Aktif'
          ELSE 'Tidak Aktif'
        END as status_keanggotaan
      FROM members m
      LEFT JOIN member_stats ms ON m.id = ms.member_id
      WHERE
        m.name ILIKE ${`%${query}%`} OR
        m.email ILIKE ${`%${query}%`}
      ORDER BY ms.total_orders DESC NULLS LAST, m.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch members.');
  }
}

export async function fetchMemberPages(query: string, currentPage: number) {
  noStore();
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM members
      WHERE
        name ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of members.');
  }
}

export async function fetchMemberById(id: string) {
  noStore();
  try {
    const data = await sql<MemberTable>`
      WITH member_stats AS (
        SELECT 
          member_id,
          COUNT(*) as total_orders,
          SUM(total_amount) as total_spent
        FROM orders
        GROUP BY member_id
      )
      SELECT 
        m.id,
        m.name as nama,
        m.email,
        '/customers/default.png' as image_url,
        COALESCE(ms.total_orders, 0) as total_orders,
        CASE 
          WHEN ms.total_orders >= 10 OR COALESCE(ms.total_spent, 0) >= 1000 THEN 'Platinum'
          WHEN ms.total_orders >= 5 OR COALESCE(ms.total_spent, 0) >= 500 THEN 'Gold'
          ELSE 'Silver'
        END as jenis_member,
        m.join_date as tanggal_bergabung,
        CASE 
          WHEN m.join_date > NOW() - INTERVAL '3 months' THEN 'Aktif'
          ELSE 'Tidak Aktif'
        END as status_keanggotaan
      FROM members m
      LEFT JOIN member_stats ms ON m.id = ms.member_id
      WHERE m.id = ${id}
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch member.');
  }
}

