import Image from 'next/image';
import { UpdateProduk, DeleteProduk } from '@/app/ui/products/button';
import { fetchFilteredProduk } from '@/app/lib/data';

export default async function ProdukTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProduk(query, currentPage);

  if (products.length === 0) {
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
                  Harga
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Stok
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Kategori
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900">
              {products.map((product) => (
                <tr key={product.id} className="w-full border-b border-gray-700 py-3 text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${product.nama_produk}'s profile picture`}
                      />
                      <p>{product.nama_produk}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.harga}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.stok}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.kategori}
                  </td>
                  <td className="whitespace-nowrap py-3 px-3">
                    <div className="flex justify-end gap-2">
                      <UpdateProduk id={product.id} />
                      <DeleteProduk id={product.id} />
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
