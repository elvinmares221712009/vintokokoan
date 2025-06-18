import { PelangganField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  UserCircleIcon,
  EnvelopeIcon,
  InboxArrowDownIcon,
  HomeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createPelanggan } from '@/app/lib/actions';

export default function Form({ pelanggan }: { pelanggan: PelangganField[] }) {
  return (
    <form action={createPelanggan} className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Tambah Pelanggan</h2>
      <div className="mb-4">
        <label htmlFor="nama" className="block text-sm font-medium text-white">
          Nama
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="nama"
            name="nama"
            type="text"
            step="0.01"
            placeholder="Nama"
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
          />
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-violet-500" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="email"
            name="email"
            type="text"
            step="0.01"
            placeholder="Email"
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
          />
          <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-violet-500" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="alamat" className="block text-sm font-medium text-white">
          Alamat
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="alamat"
            name="alamat"
            type="text"
            step="0.01"
            placeholder="Alamat"
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
          />
          <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-violet-500" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="nomor_telepon" className="block text-sm font-medium text-white">
          Nomor Telepon
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="nomor_telepon"
            name="nomor_telepon"
            type="text"
            step="0.01"
            placeholder="Nomor Telepon"
            className="peer block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
          />
          <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-violet-500" />
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
          <InboxArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-violet-500" />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/pelanggan"
          className="flex h-10 items-center rounded-lg bg-gray-700 px-4 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-600"
        >
          Batal
        </Link>
        <Button type="submit" className="h-10 rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-600">
          Create Pelanggan
        </Button>
      </div>
    </form>
  );
}
