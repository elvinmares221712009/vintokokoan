import Pagination from '@/app/ui/pelanggan/pagination';
import Search from '@/app/ui/search';
import PelangganTable from '@/app/ui/pelanggan/table'; 
import { CreatePelanggan } from '@/app/ui/pelanggan/button';
import { lusitana, kanit } from '@/app/ui/fonts';
import { PelangganTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchPelangganPage } from '@/app/lib/data';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Pelanggan',
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

  const totalPages = await fetchPelangganPage(query, currentPage);

  return (
    <div className="w-full">
      <header className="flex items-center justify-between p-6 bg-gray-800 shadow-lg">
        <div className="flex items-center gap-3">
          <Image src="/vape-logobaru.jpg" width={50} height={50} alt="Logo" className="rounded-full" />
          <h1 className={`${kanit.className} text-2xl`}>Vape Vibes Pelanggan</h1>
        </div>
      </header>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}></h1>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search pelanggan..." />
          <CreatePelanggan />
        </div>
        <Suspense key={query + currentPage} fallback={<PelangganTableSkeleton />}>
          <PelangganTable query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
