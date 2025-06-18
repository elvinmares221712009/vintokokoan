import Form from '@/app/ui/member/edit-form';
import Breadcrumbs from '@/app/ui/member/breadcrumbs';
import { fetchMemberById, fetchPelanggan } from '@/app/lib/data';
import { pesanan } from '@/app/lib/placeholder-data';
import { notFound } from 'next/navigation';

 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [member, pelanggan] = await Promise.all([
        fetchMemberById(id),
        fetchPelanggan(),
      ]);

      if (!member) {
        notFound();
      }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Member', href: '/dashboard/member' },
          {
            label: 'Edit Member',
            href: `/dashboard/member/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form member={member} pelanggan={pelanggan} />
    </main>
  );
}