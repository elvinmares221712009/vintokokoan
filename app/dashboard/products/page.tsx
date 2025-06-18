import Pagination from '@/app/ui/products/pagination';
import Search from '@/app/ui/search';
import ProdukTable from '@/app/ui/products/table'; 
import { CreateProduk } from '@/app/ui/products/button';
import { lusitana, kanit } from '@/app/ui/fonts';
import { ProdukTableSkeleton, LatestPelangganSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchProdukPages } from '@/app/lib/data';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Products',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchProdukPages(query, currentPage);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="w-full">
      <header className="flex items-center justify-between p-6 bg-gray-800 shadow-lg">
        <div className="flex items-center gap-3">
          <Image src="/vape-logobaru.jpg" width={50} height={50} alt="Logo" className="rounded-full" />
          <h1 className={`${kanit.className} text-2xl`}>Vape Vibes Products</h1>
        </div>
      </header>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>
          {/* Pelanggan */}
          {/* <br />
          <span className="text-sm">
            221711859
            <br />
            Bernardus John{' '}
          </span> */}
        </h1>
      </div>
      <div className="mt-4">
        <Suspense fallback={<ProdukTableSkeleton />}>
          <div className="flex justify-between items-center mb-4">
            <Suspense fallback={<LatestPelangganSkeleton />}>
              <Search placeholder="Search Produk..." />
            </Suspense>
            <Suspense fallback={<LatestPelangganSkeleton />}>
              <CreateProduk />
            </Suspense>
          </div>
        </Suspense>
        <Suspense key={query + currentPage} fallback={<ProdukTableSkeleton />}>
          <ProdukTable query={query} currentPage={currentPage} /> 
        </Suspense>
        <div className="mt-4 flex justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

//