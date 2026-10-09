import Link from "next/link";

interface Products {
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

const unitMap: Record<string, string> = {
  kg: 'কেজি',
  litre: 'লিটার',
  liter: 'লিটার',
  piece: 'পিস',
  dozen: 'ডজন',
};

const AllProductPage = ({products}:{products:Products}) => {
  return (
    <Link href={`/products/${products.id}`}>
      <div className="p-4 border border-gray-200/70 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl">{products.image}</span>
          <span
            className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
              products.change.dir === 'up'
                ? 'bg-red-50 text-red-600 border border-red-100'
                : products.change.dir === 'down'
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            {products.change.dir === 'up' && '▲'}
            {products.change.dir === 'down' && '▼'}
            {Math.abs(products.change.pct)}%
          </span>
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-1">
          {products.nameBn}
        </h3>
        <p className="text-gray-600 text-sm font-medium">
          ৳{products.today} টাকা /{' '}
          {unitMap[products.unit?.toLowerCase()] || products.unit}
        </p>
      </div>
    </Link>
  );
};

export default AllProductPage;
