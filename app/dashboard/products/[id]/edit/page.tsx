import Form from '@/app/ui/products/edit-form';
import Breadcrumbs from '@/app/ui/products/breadcrumbs';
import { fetchProdukById, fetchProduk } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [products] = await Promise.all([
    fetchProdukById(id),
    fetchProduk(),
  ]);

  if (!products) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Produk', href: '/dashboard/products' },
          {
            label: 'Edit Produk',
            href: `/dashboard/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form products={products}/>
    </main>
  );
}
