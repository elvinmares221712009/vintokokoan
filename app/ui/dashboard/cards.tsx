import {
  ShoppingCartIcon,
  ClockIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon, // Import icon for members
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  totalPaidPesanan: ShoppingCartIcon,
  totalPendingPesanan: ClockIcon,
  numberOfPesanan: ClipboardDocumentCheckIcon,
  numberOfPelanggan: UsersIcon,
  numberOfMember: UserGroupIcon, // Map icon for members
};

export default async function CardWrapper() {
  const {
    numberOfPesanan,
    numberOfPelanggan,
    numberOfMember, // Include numberOfMember
    totalPaidPesanan,
    totalPendingPesanan,
  } = await fetchCardData();
  
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 p-4">
      <Card title="Bayar Selesai" value={totalPaidPesanan} type="totalPaidPesanan" />
      <Card title="Bayar Tertunda" value={totalPendingPesanan} type="totalPendingPesanan" />
      <Card title="Total Pesanan" value={numberOfPesanan} type="numberOfPesanan" />
      <Card title="Total Pelanggan" value={numberOfPelanggan} type="numberOfPelanggan" />
      <Card title="Total Member" value={numberOfMember} type="numberOfMember" /> {/* Add card for members */}
    </div>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'totalPaidPesanan' | 'totalPendingPesanan' | 'numberOfPesanan' | 'numberOfPelanggan' | 'numberOfMember'; // Add 'numberOfMember' type
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-lg bg-gradient-to-b from-purple-500 to-indigo-600 p-2 shadow-md text-white hover:bg-indigo-700 transition duration-300 ease-in-out">
      <div className="flex p-2 items-center">
        {Icon ? <Icon className="h-5 w-5 text-gray-300" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-lg bg-gray-700 px-3 py-4 text-center text-lg`}
      >
        {value}
      </p>
    </div>
  );
}
