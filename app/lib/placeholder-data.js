// const users = [
//   {
//     id: '410544b2-4001-4271-9855-fec4b6a6442a',
//     name: 'User',
//     email: 'user@nextmail.com',
//     password: '123456',
//   },
//   {
//     id: '420544b2-4001-4271-9855-fec4b6a6442a',
//     name: 'GTR123',
//     email: 'GTR@nextmail.com',
//     password: 'NISSAN123',
//   },
// ];

// const customers = [
//   {
//     id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
//     name: 'Delba de Oliveira',
//     email: 'delba@oliveira.com',
//     image_url: '/customers/delba-de-oliveira.png',
//   },
//   {
//     id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
//     name: 'Lee Robinson',
//     email: 'lee@robinson.com',
//     image_url: '/customers/lee-robinson.png',
//   },
//   {
//     id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
//     name: 'Hector Simpson',
//     email: 'hector@simpson.com',
//     image_url: '/customers/hector-simpson.png',
//   },
//   {
//     id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
//     name: 'Steven Tey',
//     email: 'steven@tey.com',
//     image_url: '/customers/steven-tey.png',
//   },
//   {
//     id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
//     name: 'Steph Dietz',
//     email: 'steph@dietz.com',
//     image_url: '/customers/steph-dietz.png',
//   },
//   {
//     id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
//     name: 'Michael Novotny',
//     email: 'michael@novotny.com',
//     image_url: '/customers/michael-novotny.png',
//   },
//   {
//     id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
//     name: 'Evil Rabbit',
//     email: 'evil@rabbit.com',
//     image_url: '/customers/evil-rabbit.png',
//   },
//   {
//     id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
//     name: 'Emil Kowalski',
//     email: 'emil@kowalski.com',
//     image_url: '/customers/emil-kowalski.png',
//   },
//   {
//     id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
//     name: 'Amy Burns',
//     email: 'amy@burns.com',
//     image_url: '/customers/amy-burns.png',
//   },
//   {
//     id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
//     name: 'Balazs Orban',
//     email: 'balazs@orban.com',
//     image_url: '/customers/balazs-orban.png',
//   },
// ];

// const invoices = [
//   {
//     customer_id: customers[0].id,
//     amount: 15795,
//     status: 'pending',
//     date: '2022-12-06',
//   },
//   {
//     customer_id: customers[1].id,
//     amount: 20348,
//     status: 'pending',
//     date: '2022-11-14',
//   },
//   {
//     customer_id: customers[4].id,
//     amount: 3040,
//     status: 'paid',
//     date: '2022-10-29',
//   },
//   {
//     customer_id: customers[3].id,
//     amount: 44800,
//     status: 'paid',
//     date: '2023-09-10',
//   },
//   {
//     customer_id: customers[5].id,
//     amount: 34577,
//     status: 'pending',
//     date: '2023-08-05',
//   },
//   {
//     customer_id: customers[7].id,
//     amount: 54246,
//     status: 'pending',
//     date: '2023-07-16',
//   },
//   {
//     customer_id: customers[6].id,
//     amount: 666,
//     status: 'pending',
//     date: '2023-06-27',
//   },
//   {
//     customer_id: customers[3].id,
//     amount: 32545,
//     status: 'paid',
//     date: '2023-06-09',
//   },
//   {
//     customer_id: customers[4].id,
//     amount: 1250,
//     status: 'paid',
//     date: '2023-06-17',
//   },
//   {
//     customer_id: customers[5].id,
//     amount: 8546,
//     status: 'paid',
//     date: '2023-06-07',
//   },
//   {
//     customer_id: customers[1].id,
//     amount: 500,
//     status: 'paid',
//     date: '2023-08-19',
//   },
//   {
//     customer_id: customers[5].id,
//     amount: 8945,
//     status: 'paid',
//     date: '2023-06-03',
//   },
//   {
//     customer_id: customers[2].id,
//     amount: 8945,
//     status: 'paid',
//     date: '2023-06-18',
//   },
//   {
//     customer_id: customers[0].id,
//     amount: 8945,
//     status: 'paid',
//     date: '2023-10-04',
//   },
//   {
//     customer_id: customers[2].id,
//     amount: 1000,
//     status: 'paid',
//     date: '2022-06-05',
//   },
// ];

// const revenue = [
//   { month: 'Jan', revenue: 2000 },
//   { month: 'Feb', revenue: 1800 },
//   { month: 'Mar', revenue: 2200 },
//   { month: 'Apr', revenue: 2500 },
//   { month: 'May', revenue: 2300 },
//   { month: 'Jun', revenue: 3200 },
//   { month: 'Jul', revenue: 3500 },
//   { month: 'Aug', revenue: 3700 },
//   { month: 'Sep', revenue: 2500 },
//   { month: 'Oct', revenue: 2800 },
//   { month: 'Nov', revenue: 3000 },
//   { month: 'Dec', revenue: 4800 },
// ];



const products = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    nama_produk: 'Vape 1',
    harga: 100.00,
    stok: 50,
    kategori: 'Liquid',
    image_url: '/products/vape.jpeg',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    nama_produk: 'Vape 2',
    harga: 150.00,
    stok: 30,
    kategori: 'Pod',
    image_url: '/products/vape.jpeg',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    nama_produk: 'Vape 3',
    harga: 200.00,
    stok: 20,
    kategori: 'Mod',
    image_url: '/products/vape.jpeg',
  },
];

const pelanggan = [
  {
    id: '958dc9e7-12f4-4377-85e9-fec4b6a6442a',
    nama: 'Kumar',
    email: 'kumar@example.com',
    alamat: 'Yogyakarta',
    nomor_telepon: '081234567890',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '8b5a4f6d-9178-4e5e-af4c-3dc2f98b3c16',
    nama: 'Kadir',
    email: 'kadir@example.com',
    alamat: 'Jakarta',
    nomor_telepon: '081234567891',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: 'c16993ab-6a5e-49cf-b3e2-d06ec7088843',
    nama: 'Doyok',
    email: 'doyok@example.com',
    alamat: 'Bandung',
    nomor_telepon: '081234567892',
    image_url: '/customers/amy-burns.png',
  },
];

const pesanan = [
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    pelanggan_id: pelanggan[0].id,
    produk_id: products[0].id,
    tanggal_pesanan: new Date('2023-01-01T10:00:00'),
    total_harga: 200.00,
    status_pesanan: 'pending',
    
  },
  {
    id_pesanan: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    pelanggan_id: pelanggan[1].id,
    produk_id: products[1].id,
    tanggal_pesanan: new Date('2023-01-02T11:00:00'),
    total_harga: 150.00,
    status_pesanan: 'completed',
    
  },
  {
    id_pesanan: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    pelanggan_id: pelanggan[2].id,
    produk_id: products[2].id,
    tanggal_pesanan: new Date('2023-01-03T12:00:00'),
    total_harga: 400.00,
    status_pesanan: 'completed',
    
  },
];

// const detailPesanan = [
//   {
//     pelanggan_id: pelanggan[0].id,
//     pesanan_id: pesanan[0].id_pesanan,
//     produk_id: products[0].id_produk,
//     jumlah: 2,
//     harga_per_item: 100.00,
//   },
//   {
//     pelanggan_id: pelanggan[1].id,
//     pesanan_id: pesanan[1].id_pesanan,
//     produk_id: products[1].id_produk,
//     jumlah: 1,
//     harga_per_item: 150.00,
//   },
//   {
//     pelanggan_id: pelanggan[2].id,
//     pesanan_id: pesanan[2].id_pesanan,
//     produk_id: products[2].id_produk,
//     jumlah: 3,
//     harga_per_item: 150.00,
//   },
//   // {
//   //   id_pesanan: 3,
//   //   id_produk: 3,
//   //   jumlah: 2,
//   //   harga_per_item: 200.00,
//   // },
// ];

// const member = [
//   {
//     id_member: '550e8400-e29b-41d4-a716-446655440000',
//     pelanggan_id: pelanggan[0].id,
//     jenis_member: 'Silver',
//     tanggal_bergabung: new Date('2023-01-01T10:00:00'),
//     status_keanggotaan: 'Aktif',
//   },
//   {
//     id_member: '123e4567-e89b-12d3-a456-426614174000',
//     pelanggan_id: pelanggan[1].id,
//     jenis_member: 'Gold',
//     tanggal_bergabung: new Date('2023-01-02T11:00:00'),
//     status_keanggotaan: 'Aktif',
//   },
//   {
//     id_member: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
//     pelanggan_id: pelanggan[2].id,
//     jenis_member: 'Platinum',
//     tanggal_bergabung: new Date('2023-01-03T12:00:00'),
//     status_keanggotaan: 'Aktif',
//   },
// ];


module.exports = {
  // users,
  // revenue,
  products,
  pelanggan,
  pesanan,
  // detailPesanan,
  // member,
  
};
