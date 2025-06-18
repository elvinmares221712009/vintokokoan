import Form from '@/app/ui/products/create-form';
import Breadcrumbs from '@/app/ui/products/breadcrumbs';
import { fetchProduk } from '@/app/lib/data';
 
export default async function Page() {
  const products = await fetchProduk();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Produk', href: '/dashboard/products' },
          {
            label: 'Create Produk',
            href: '/dashboard/products/create',
            active: true,
          },
        ]}
      />
      <Form products={products} />
    </main>
  );
}
