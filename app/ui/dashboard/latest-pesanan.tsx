import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestPesanan  } from '@/app/lib/definitions'; // Tetap menggunakan nama untuk tipe data
import { fetchLatestPesanan } from '@/app/lib/data'; // Pastikan fungsi pengambilan data pesanan terbaru sudah diimplementasikan

export default async function LatestPesanant() { // Ubah nama fungsi
  const latestPesanan = await fetchLatestPesanan();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Riwayat Pesanan 
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-800 p-4">
        <div className="bg-gray-900 px-6">
          {latestPesanan.map((pesanan, i) => {
            return (
              <div
                key={pesanan.id_pesanan}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={pesanan.image_url}
                    alt={`${pesanan.nama}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {pesanan.nama}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {pesanan.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {pesanan.total_harga}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
