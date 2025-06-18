'use client';

import { PelangganField, ProdukField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createPesanan } from '@/app/lib/actions';

export default function Form({ pelanggan, products }: { pelanggan: PelangganField[], products: ProdukField[] }) {
  return (
    <form action={createPesanan} method="post" className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Create Pesanan</h2>
      <div className="rounded-md bg-gray-800 p-4 md:p-6">
        {/* Nama Pelanggan */}
        <div className="mb-4">
          <label htmlFor="pelanggan" className="mb-2 block text-sm font-medium text-white">
            Masukan Pelanggan
          </label>
          <div className="relative">
            <select
              id="pelanggan"
              name="pelangganId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-violet-500"
              defaultValue=""
            >
              <option value="" disabled>
                Pilih pelanggan
              </option>
              {pelanggan.map((pelanggan) => (
                <option key={pelanggan.id} value={pelanggan.id}>
                  {pelanggan.nama}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Produk */}
        <div className="mb-4">
          <label htmlFor="produk" className="mb-2 block text-sm font-medium text-white">
            Pilih Produk
          </label>
          <div className="relative">
            <select
              id="produk"
              name="productId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-violet-500"
              defaultValue=""
            >
              <option value="" disabled>
                Pilih produk
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.nama_produk}
                </option>
              ))}
            </select>
            <ShoppingCartIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Pesanan Amount */}
        <div className="mb-4">
          <label htmlFor="total_harga" className="mb-2 block text-sm font-medium text-white">
            Masukan Total Harga
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="total_harga"
                name="total_harga"
                type="number"
                step="0.01"
                placeholder="Total Harga"
                className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-violet-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-white">
            Pilih Status Pesanan
          </legend>
          <div className="rounded-md border border-gray-700 bg-gray-800 px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status_pesanan"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-800 text-gray-600 focus:ring-violet-500"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="completed"
                  name="status_pesanan"
                  type="radio"
                  value="completed"
                  className="h-4 w-4 cursor-pointer border-gray-600 bg-gray-800 text-gray-600 focus:ring-violet-500"
                />
                <label
                  htmlFor="completed"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Completed <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/pesanan"
          className="flex h-10 items-center rounded-lg bg-gray-700 px-4 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-600"
        >
          Cancel
        </Link>
        <Button type="submit" className="h-10 rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-600">
          Create Pesanan
        </Button>
      </div>
    </form>
  );
}
