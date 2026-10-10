'use client';

import { useState } from 'react';
import NavItemPage from '@/app/component/NavItem';

interface Product {
  category: string;
  id: number;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  today: number | string;
  unit: string;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
}

interface Props {
  products: Product[];
}

type SortOption = 'default' | 'low-high' | 'high-low';

const getNumericPrice = (price: number | string) => {
  const bengaliDigits = '০১২৩৪৫৬৭৮৯';

  const normalizedPrice = String(price)
    .replace(/[০-৯]/g, digit => String(bengaliDigits.indexOf(digit)))
    .replace(/,/g, '')
    .replace(/[^\d.-]/g, '');

  const numericPrice = Number(normalizedPrice);

  return Number.isFinite(numericPrice) ? numericPrice : 0;
};

export default function CategoryProductList({ products }: Props) {
  const [sort, setSort] = useState<SortOption>('default');

  const sortedProducts = [...products];

  if (sort === 'low-high') {
    sortedProducts.sort(
      (a, b) => getNumericPrice(a.today) - getNumericPrice(b.today),
    );
  }

  if (sort === 'high-low') {
    sortedProducts.sort(
      (a, b) => getNumericPrice(b.today) - getNumericPrice(a.today),
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end gap-3">
        <label
          htmlFor="category-sort"
          className="text-sm font-medium text-gray-700"
        >
          সাজান
        </label>

        <div className="relative">
          <select
            id="category-sort"
            value={sort}
            onChange={event => setSort(event.target.value as SortOption)}
            className="appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-3 pr-10 text-sm font-medium text-gray-700 outline-none transition focus:border-emerald-500"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>

          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              d="m6 9 6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {sortedProducts.map(pro => (
          <NavItemPage key={pro.id} productItem={pro} />
        ))}
      </div>
    </div>
  );
}
