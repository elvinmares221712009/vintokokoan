import Form from '@/app/ui/member/create-form';
import Breadcrumbs from '@/app/ui/member/breadcrumbs';
import { fetchPelanggan } from '@/app/lib/data';
 
export default async function Page() {
  const pelanggan = await fetchPelanggan();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Member', href: '/dashboard/member' },
          {
            label: 'Create Member',
            href: '/dashboard/member/create',
            active: true,
          },
        ]}
      />
      <Form pelanggan={pelanggan} />
    </main>
  );
}
