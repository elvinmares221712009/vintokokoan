import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex flex-none w-64">
        <SideNav />
      </div>
      <div className="flex-grow overflow-y-auto p-6 bg-gray-900 text-white">
        {children}
      </div>
    </div>
  );
}
