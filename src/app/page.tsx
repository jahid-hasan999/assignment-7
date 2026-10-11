import AllProductPage from './component/AllProduct';
import Banner from './component/Banner';
import UpPriceDownCard from './component/UpPrice';

interface Product {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
}

const HomePage = async () => {
  const res = await fetch(
    'https://api.api-store.workers.dev/api/bazardor/products',
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data: Product[] = await res.json();

 
const upProducts = data
  .filter(item => item.change.dir === 'up')
  .sort((a, b) => b.change.pct - a.change.pct)
  .slice(0, 6);

const downProducts = data
  .filter(item => item.change.dir === 'down')
  .sort((a, b) => a.change.pct - b.change.pct)
  .slice(0, 6);


  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <Banner />

      {/* Up Price Section */}
      <section>
        <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
          <span>▲</span> বাজারে যেসব পণ্যের দাম বেড়েছে ({upProducts.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {upProducts.map(item => (
            <UpPriceDownCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* Down Price Section */}
      <section>
        <h2 className="text-xl font-bold text-emerald-600 mb-4 flex items-center gap-2">
          <span>▼</span> বাজারে যেসব পণ্যের দাম কমেছে ({downProducts.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {downProducts.map(item => (
            <UpPriceDownCard key={item.id} product={item} />
          ))}
        </div>
      </section>
      {/* all porduct */}
      <section id="সব-পণ্য">
        <h2 className="text-xl font-bold text-emerald-600 mb-4 flex items-center gap-2">
          বাজারের সব পণ্য ({data.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map(item => (
            <AllProductPage key={item.id} products={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
