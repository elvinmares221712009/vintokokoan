import { ProdukField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  TagIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
  ListBulletIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createProduk } from '@/app/lib/actions';

export default function Form({ products }: { products: ProdukField[] }) {
  return (
    <form action={createProduk} className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Tambah Produk</h2>
      <div className="mb-4">
        <label htmlFor="nama" className="block text-sm font-medium text-white">
          Nama
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="nama_produk"
            name="nama_produk"
            type="text"
            step="0.01"
            placeholder="Nama"
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
          />
          <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-violet-500" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="harga" className="block text-sm font-medium text-white">
          Harga
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="harga"
            name="harga"
            type="number"
            step="0.01"
            placeholder="Harga"
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
          />
          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-violet-500" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="stok" className="block text-sm font-medium text-white">
          Stok
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="stok"
            name="stok"
            type="number"
            step="0.01"
            placeholder="Stok"
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
          />
          <ArchiveBoxIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-violet-500" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="kategori" className="block text-sm font-medium text-white">
          Kategori
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="kategori"
            name="kategori"
            type="text"
            step="0.01"
            placeholder="Kategori"
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
          />
          <ListBulletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-violet-500" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="image_url" className="block text-sm font-medium text-white">
          Upload Image
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="image_url"
            name="image_url"
            type="file"
            step="0.01"
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
          />
          <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-violet-500" />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-700 px-4 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-600"
        >
          Batal
        </Link>
        <Button type="submit" className="h-10 rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-600">
          Create Produk
        </Button>
      </div>
    </form>
  );
}
