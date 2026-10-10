import NavItemPage from '@/app/component/NavItem';
import Link from 'next/link';

interface Product {
  category: string;
  id: number;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
}

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    'https://api.api-store.workers.dev/api/bazardor/products',
    {
      next: { revalidate: 60 },
    },
  );
  const data: Product[] = await res.json();

  // ক্যাটাগরি (যেমন: chal, dal, tel, sobji) দিয়ে ফিল্টার করা
  const filteredProducts = data.filter(
    item => item.category.toLowerCase() === categoryId.toLowerCase(),
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      <Link
        href="/"
        className="text-emerald-600 font-medium hover:underline inline-block text-sm"
      >
        ← হোমপেজে ফিরে যান
      </Link>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {filteredProducts[0]?.categoryNameBn || categoryId} ক্যাটাগরির
            পণ্যসমূহ
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            মোট {filteredProducts.length} টি পণ্য পাওয়া গেছে
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map(pro => (
          <NavItemPage key={pro.id} productItem={pro} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
