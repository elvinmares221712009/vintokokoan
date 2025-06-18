'use client';

import { ProdukForm } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { updateProduk } from '@/app/lib/actions';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function EditProdukForm({
  products,
}: {
  products: ProdukForm;
}) {
  const updateProdukWithId = updateProduk.bind(null, products.id);
  const imageUrlInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imageUrlInputRef.current) {
      imageUrlInputRef.current.value = ''; // Clear file input value to avoid browser security issues
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  return (
    <form action={updateProdukWithId} method="post" encType="multipart/form-data" className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Edit Produk</h2>
      {/* Customer Name */}
      <div className="mb-4">
        <label htmlFor="nama_produk" className="block text-sm font-medium text-white">
          Nama
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="nama_produk"
            name="nama_produk"
            type="text"
            placeholder="Nama"
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
            defaultValue={products.nama_produk}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="harga" className="block text-sm font-medium text-white">
          Harga
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="harga"
            name="harga"
            type="number"
            placeholder="Harga"
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
            defaultValue={products.harga}
          />
        </div>
      </div>

      {/* Alamat */}
      <div className="mb-4">
        <label htmlFor="stok" className="block text-sm font-medium text-white">
          Stok
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="stok"
            name="stok"
            type="text"
            placeholder="Stok"
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
            defaultValue={products.stok}
          />
        </div>
      </div>

      {/* Nomor Telepon */}
      <div className="mb-4">
        <label htmlFor="kategori" className="block text-sm font-medium text-white">
          Kategori
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="kategori"
            name="kategori"
            type="text"
            placeholder="Kategori"
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
            defaultValue={products.kategori}
          />
        </div>
      </div>

      {/* Upload Image */}
      <div className="mb-4">
        <label htmlFor="image_url" className="block text-sm font-medium text-white">
          Upload Image
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            ref={imageUrlInputRef}
            id="image_url"
            name="image_url"
            type="file"
            onChange={handleImageChange}
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/pelanggan"
          className="flex h-10 items-center rounded-lg bg-gray-700 px-4 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-600"
        >
          Batal
        </Link>
        <Button type="submit" className="h-10 rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-600">
          Edit Produk
        </Button>
      </div>
    </form>
  );
}
