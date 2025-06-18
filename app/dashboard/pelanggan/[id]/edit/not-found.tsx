import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gray-900 p-6 text-white">
      <div className="flex flex-col items-center gap-4 p-6 bg-gray-800 rounded-xl shadow-xl">
        <FaceFrownIcon className="w-16 h-16 text-red-500 animate-bounce" />
        <h2 className="text-3xl font-bold drop-shadow-lg">404 Tidak Ditemukan</h2>
        <p className="text-lg text-gray-300">Kami tidak dapat menemukan halaman yang Anda cari.</p>
        <Link
          href="/dashboard/pelanggan"
          className="mt-4 rounded-lg bg-blue-500 px-6 py-3 text-lg font-medium text-white transition-transform transform hover:scale-105 hover:bg-blue-400"
        >
          Kembali ke Pelanggan
        </Link>
      </div>
    </main>
  );
}
