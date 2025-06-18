'use client';

import { useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="flex flex-col items-center gap-4 p-6 bg-gray-800 rounded-xl shadow-xl">
        <ExclamationTriangleIcon className="w-16 h-16 text-yellow-300 animate-pulse" />
        <h2 className="text-3xl font-bold drop-shadow-lg">Terjadi Kesalahan!</h2>
        <p className="text-lg text-gray-300 text-center">Kami mengalami masalah saat memuat halaman ini. Silakan coba lagi.</p>
        <button
          className="mt-4 rounded-lg bg-blue-500 px-6 py-3 text-lg font-medium text-white transition-transform transform hover:scale-105 hover:bg-blue-400"
          onClick={() => reset()}
        >
          Coba Lagi
        </button>
      </div>
    </main>
  );
}
