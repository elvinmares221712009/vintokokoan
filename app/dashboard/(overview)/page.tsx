// 'use client';

// import { useState, useEffect } from 'react';
import { kanit } from '@/app/ui/fonts';
import Image from 'next/image';
import CardWrapper from '@/app/ui/dashboard/cards'; // Import the CardWrapper component
import LatestPesanan from '@/app/ui/dashboard/latest-pesanan'; // Import the LatestPesanan component
import RevenueChart from '@/app/ui/dashboard/revenue-chart'; // Import the RevenueChart component
import { fetchCardData } from '@/app/lib/data';
import { fetchLatestPesanan } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton,LatestPesananSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

export default async function Dashboard() {
  const latestPesanan = await fetchLatestPesanan();
  const {
    numberOfPesanan,
    numberOfPelanggan,
    totalPaidPesanan,
    totalPendingPesanan,
  } = await fetchCardData();
  return (
    <main className="flex flex-col bg-gray-900 text-white min-h-screen">
      <header className="flex items-center justify-between p-6 bg-gray-800 shadow-lg">
        <div className="flex items-center gap-3">
          <Image src="/vape-logobaru.jpg" width={50} height={50} alt="Logo" className="rounded-full" />
          <h1 className={`${kanit.className} text-2xl`}>Vape Vibes Dashboard</h1>
        </div>
      </header>

      <section className="flex-grow p-6">
        <CardWrapper /> {/* Include the CardWrapper component */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestPesananSkeleton />}>
          <LatestPesanan />
        </Suspense>
        </div>
        
      </section>

      <footer className="p-4 bg-gray-800 text-center text-gray-400">
        &copy; 2024 VapeVibes. All rights reserved.
      </footer>
    </main>
  );
}