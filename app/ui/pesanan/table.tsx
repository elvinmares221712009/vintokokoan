import Image from 'next/image';
import { UpdatePesanan, DeletePesanan } from '@/app/ui/pesanan/button';
import { fetchFilteredPesanan } from '@/app/lib/data';

export default async function PesananTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const pesanans = await fetchFilteredPesanan(query, currentPage);

  if (pesanans.length === 0) {
    return <p>No pesanan found.</p>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-800 p-2 md:pt-0">
          <table className="min-w-full text-gray-200">
            <thead className="rounded-lg bg-gray-700 text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-6 py-5 font-medium text-left">
                  Nama
                </th>
                <th scope="col" className="px-6 py-5 font-medium text-left">
                  Email
                </th>
                <th scope="col" className="px-6 py-5 font-medium text-left">
                  Produk
                </th>
                <th scope="col" className="px-6 py-5 font-medium text-left">
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-5 font-medium text-left">
                  Total Harga
                </th>
                <th scope="col" className="px-6 py-5 font-medium text-left">
                  Status Pesanan
                </th>
                <th scope="col" className="px-6 py-5 font-medium text-left"></th>
              </tr>
            </thead>
            <tbody className="bg-gray-900">
              {pesanans.map((pesanan) => (
                <tr key={pesanan.id} className="w-full border-b border-gray-700 py-3 text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap px-6 py-5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={pesanan.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${pesanan.nama}'s profile picture`}
                      />
                      <p>{pesanan.nama}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    {pesanan.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    {pesanan.nama_produk}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    {new Date(pesanan.tanggal_pesanan).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    {pesanan.total_harga}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    {pesanan.status_pesanan}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <UpdatePesanan id={pesanan.id} />
                      <DeletePesanan id={pesanan.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
