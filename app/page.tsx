import {
  UserIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col relative">
      {/* Background layer */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          backgroundImage: 'url("/bg-vapenew.png")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center'
        }}
      />
      {/* Overlay layer */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      {/* Content layer */}
      <div className="relative flex flex-col p-6 z-20">
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-75 shadow-lg rounded-lg">
          <div className="flex items-center gap-3">
            <Image src="/vape-logobaru.jpg" width={50} height={50} alt="Logo"/>
            <p className="text-xl font-semibold text-white md:text-3xl md:leading-normal ml-4">Toko Kokoan</p>
          </div>
          <Link href="/login" className="flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
            <span className="hidden md:block">Login</span>
            <UserIcon className="w-6 h-6 md:hidden" />
          </Link>
        </header>

        <div className="mt-8 flex flex-col md:flex-row gap-6">
          <section className="flex flex-col justify-center bg-gray-900 bg-opacity-75 rounded-lg p-6 md:w-1/2 text-white">
            <p className="text-lg text-blue-400">Welcome to</p>
            <h1 className="text-4xl md:text-6xl text-white leading-tight font-bold tracking-tight mt-2">Toko Kokoan</h1>
          </section>

          <section className="flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 rounded-lg p-6 md:w-1/2">
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-gray-900 bg-opacity-75 p-4 rounded-lg shadow-lg text-center w-60 hover:bg-purple-700 transition-colors duration-300">
                <ChartBarIcon className="w-10 h-10 text-purple-500 mb-2" />
                <h2 className="text-xl text-purple-400">Total Sales</h2>
                <p className="text-2xl font-bold text-white">1200</p>
              </div>
              <div className="bg-gray-900 bg-opacity-75 p-4 rounded-lg shadow-lg text-center w-60 hover:bg-purple-700 transition-colors duration-300">
                <ShoppingCartIcon className="w-10 h-10 text-purple-500 mb-2" />
                <h2 className="text-xl text-purple-400">New Orders</h2>
                <p className="text-2xl font-bold text-white">80</p>
              </div>
              <div className="bg-gray-900 bg-opacity-75 p-4 rounded-lg shadow-lg text-center w-60 hover:bg-purple-700 transition-colors duration-300">
                <UserGroupIcon className="w-10 h-10 text-purple-500 mb-2" />
                <h2 className="text-xl text-purple-400">Active Users</h2>
                <p className="text-2xl font-bold text-white">300</p>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-8 py-4 bg-gray-900 bg-opacity-75 text-white text-center rounded-lg shadow-lg">
          <p>&copy; 2025 Toko Kokoan. All rights reserved.</p>
          <p>Contact us at <a href="mailto:info@atmavape.com" className="text-blue-400">info@vapevibes.com</a></p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="https://facebook.com" className="hover:text-blue-500"><Image src="/icons/facebook.png" width={24} height={24} alt="Facebook" /></Link>
            <Link href="https://twitter.com" className="hover:text-blue-500"><Image src="/icons/x.png" width={24} height={24} alt="Twitter" /></Link>
            <Link href="https://instagram.com" className="hover:text-blue-500"><Image src="/icons/instagram.png" width={24} height={24} alt="Instagram" /></Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
