import Form from '@/app/ui/pesanan/edit-form';
import Breadcrumbs from '@/app/ui/pesanan/breadcrumbs';
import { fetchPesananById, fetchPelanggan, fetchProduk } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  
  // Ambil data pesanan, pelanggan, dan produk
  const [pesanan, pelanggan, products] = await Promise.all([
    fetchPesananById(id),
    fetchPelanggan(),
    fetchProduk()
  ]);

  if (!pesanan) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Pesanan', href: '/dashboard/pesanan' },
          {
            label: 'Edit Pesanan',
            href: `/dashboard/pesanan/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form pesanan={pesanan} pelanggan={pelanggan} products={products} />
    </main>
  );
}
