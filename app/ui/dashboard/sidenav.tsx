import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { kanit } from '@/app/ui/fonts';
import Image from 'next/image';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg rounded-none ">
      <Link
        className="mb-4 flex h-20 items-center justify-start rounded-md bg-gradient-to-r from-blue-500 to-purple-600 p-4 md:h-24 shadow-md transform transition-transform duration-800 hover:scale-110"
        href="/"
      >
        <div className="flex items-center gap-3">
          <Image src="/vape-logobaru.jpg" width={40} height={40} alt="Logo" className="rounded-full" />
          <p className={`${kanit.className} text-xl text-white md:text-2xl`}>
            Vape Vibes
          </p>
        </div>
      </Link>

      <div className="flex grow flex-col justify-between space-y-4 ">
        <div className="space-y-2 ">
          <NavLinks />
        </div>
        
        <div className="space-y-2 ">
          {/* <Link href="/">
            <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 p-3 text-sm font-medium text-white hover:bg-blue-700 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors duration-200">
              <ArrowUturnLeftIcon className="w-6" />
              <div className="hidden md:block">Back</div>
            </button>
          </Link> */}
          
          <form action={async () => {
            'use server';
            await signOut();
          }} className="w-full">
            <button type="submit" className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-red-500 to-orange-600 p-3 text-sm font-medium text-white hover:bg-red-700 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors duration-200 shadow-md transform transition-transform duration-800 hover:scale-110">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        </div>
      </div>

      <footer className="mt-4 text-center text-sm text-gray-400">
        &copy; 2024 VapeVibes. All rights reserved.
      </footer>
    </div>
  );
}
