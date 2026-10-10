
import ProductDetailsCard from '@/app/component/ProductDetailsCard';
import { ProductDetail } from '@/type/Type';
import { notFound } from 'next/navigation';

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    'https://api.api-store.workers.dev/api/bazardor/products',
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: ProductDetail[] = await res.json();

  // ID দিয়ে প্রোডাক্ট খুঁজে বের করা
  const product = data.find((p) => String(p.id) === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="container mx-auto px-4">
        <ProductDetailsCard details={product} />
      </div>
    </div>
  );
};

export default SingleProductPage;

