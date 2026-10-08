'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Category } from './Navbar';

export default function CategoryLinks({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white">
      <ul className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 [scrollbar-width:none] md:justify-center [&::-webkit-scrollbar]:hidden">
        {categories.map(nav => {
          const href = `/category/${nav.slug}`;
          const isActive = pathname === href;

          return (
            <li key={nav.id} className="shrink-0">
              
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 py-2.5 text-sm transition ${
                  isActive
                    ? 'border-green-600 font-semibold text-green-700'
                    : 'border-transparent text-gray-600 hover:text-green-700'
                }`}
              >
                
                <span>{nav.icon}</span>
                <span>{nav.nameBn}</span>
              </Link>
              
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
