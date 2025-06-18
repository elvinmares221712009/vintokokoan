import Form from '@/app/ui/pesanan/create-form';
import Breadcrumbs from '@/app/ui/pesanan/breadcrumbs';
import { fetchPelanggan, fetchProduk } from '@/app/lib/data';

export default async function Page() {
  const pelanggan = await fetchPelanggan();
  const products = await fetchProduk();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Pesanan', href: '/dashboard/pesanan' },
          {
            label: 'Create Pesanan',
            href: '/dashboard/pesanan/create',
            active: true,
          },
        ]}
      />
      <Form pelanggan={pelanggan} products={products} />
    </main>
  );
}
