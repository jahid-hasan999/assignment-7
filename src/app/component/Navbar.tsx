import CategoryLinks from './CategoryLinks';

export type Category = {
  slug: string;
  nameBn: string;
  id: string;
  icon: string;
};

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      'https://api.api-store.workers.dev/api/bazardor/categories',
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];

    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch {
    return [];
  }
}

const Navbar = async () => {
  const categories = await getCategories();
  return <CategoryLinks categories={categories} />;
};

export default Navbar;
