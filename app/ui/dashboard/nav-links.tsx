'use client';

// 'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentCheckIcon,
  ShoppingBagIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Products', href: '/dashboard/products', icon: TagIcon },
  { name: 'Pelanggan', href: '/dashboard/pelanggan', icon: UserGroupIcon },
  { name: 'Pesanan', href: '/dashboard/pesanan', icon: ShoppingBagIcon },
  { name: 'Member', href: '/dashboard/member', icon: ClipboardDocumentCheckIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col space-y-4">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'relative flex h-16 items-center justify-center gap-2 rounded-full p-3 text-sm font-medium text-white transition-all duration-500 md:justify-start md:px-3',
              'bg-gradient-to-r from-purple-600 to-indigo-800 hover:from-purple-700 hover:to-indigo-900',
              'shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:rotate-6',
              'backdrop-blur-lg backdrop-opacity-50 bg-opacity-30 hover:bg-opacity-60',
              'overflow-hidden', // Tambahkan overflow-hidden
              {
                'bg-gradient-to-l from-indigo-800 to-purple-600': pathname === link.href,
              }
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-500 hover:opacity-50 rounded-full"></div>
            <LinkIcon className="relative w-10 h-10 transition-transform duration-500 transform group-hover:scale-125" />
            <span className="relative hidden md:inline">{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
