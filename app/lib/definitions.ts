// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Pelanggan = {
  id: string;
  nama: string;
  email: string;
  alamat: string;
  nomor_telepon: string;
  image_url: string;
};

export type Pesanan = {
  id: string;
  pelanggan_id: string;
  produk_id: string;
  tanggal_pesanan: string;
  total_harga: number;
  status_pesanan: string;
  jumlah:number;
};

export type DetailPesanan = {

  id_detail_pesanan: string;
  pelanggan_id: string;
  pesanan_id: string;
  produk_id: string;

  jumlah: number;
  harga_per_item: number;
};

export type Produk = {
  id: string;
  nama_produk: string;
  deskripsi: string;
  harga: number;
  stok: number;
  kategori: string;
  image_url: string;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestPesanan = {
  id_pesanan: string;
  pelanggan_id: string;
  produk_id: string;
  nama: string;
  image_url: string;
  email: string;
  total_harga: string;

};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestPesananRaw = Omit<LatestPesanan, 'total_harga'> & {
  total_harga: number;
};

export type MemberTable = {
  id: string;
  pelanggan_id: string;
  nama: string;
  email: string;
  image_url: string;
  jenis_member: string;
  tanggal_bergabung: string;
  status_keanggotaan: string;
};

export type PesananTable = {
  id: string;
  pelanggan_id: string;
  produk_id: string;
  nama: string;
  nama_produk: string;
  email: string;
  image_url: string;
  tanggal_pesanan: string;
  total_harga: number;
  status_pesanan: string;
  jumlah:number;
};

export type PelangganTableType = {
  id: string;
  nama: string;
  email: string;
  alamat: string;
  nomor_telepon: string;
  image_url: string;
  
};

export type FormattedPelangganTable = {
  id_pelanggan: string;
  nama: string;
  email: string;
  alamat: string;
  nomor_telepon: string;
  image_url: string;
};

export type PesananForm = {
  id: string;
  pelanggan_id: string;
  product_id: string;
  total_harga: number;
  status_pesanan: string;
  jumlah:number;
};


export type PelangganField = {
  id: string;
  nama: string;
  email: string;
  alamat: string;
  nomor_telepon: string;
  image_url: string;
};

export type PelangganForm = {
  message: any;
  errors: any;
  id: string;
  nama: string;
  email: string;
  alamat: string;
  nomor_telepon: string;
  image_url: string;
};

export type ProdukForm = {
  id: string;
  nama_produk: string;
  deskripsi: string;
  harga: number;
  stok: number;
  kategori: string;
  image_url: string;
};

export type MemberForm = {
  id: string;
  pelanggan_id: string;
  nama: string;
  email: string;
  image_url: string;
  jenis_member: string;
  tanggal_bergabung: string;
  status_keanggotaan: string;
};

export type ProdukField = {
  id: string;
  nama_produk: string;
  harga: number;
  stok: number;
  kategori: string;
  image_url: string;
};