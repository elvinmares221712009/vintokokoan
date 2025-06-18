import Image from 'next/image';
import { UpdatePelanggan, DeletePelanggan } from '@/app/ui/pelanggan/button';
import { fetchFilteredPelanggan } from '@/app/lib/data';

export default async function PelangganTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const pelanggans = await fetchFilteredPelanggan(query, currentPage);

  if (pelanggans.length === 0) {
    return <p>No pelanggan found.</p>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-800 p-2 md:pt-0">
          <table className="min-w-full text-gray-200">
            <thead className="rounded-lg bg-gray-700 text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nama
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Alamat
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nomor Telepon
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900">
              {pelanggans.map((pelanggan) => (
                <tr key={pelanggan.id} className="w-full border-b border-gray-700 py-3 text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={pelanggan.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${pelanggan.nama}'s profile picture`}
                      />
                      <p>{pelanggan.nama}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {pelanggan.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {pelanggan.alamat}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {pelanggan.nomor_telepon}
                  </td>
                  <td className="whitespace-nowrap py-3 px-3">
                    <div className="flex justify-end gap-2">
                      <UpdatePelanggan id={pelanggan.id} />
                      <DeletePelanggan id={pelanggan.id} />
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
