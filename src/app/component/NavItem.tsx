import Link from 'next/link';
interface Product {
  category: string;
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

const NavItemPage = ({ productItem }: { productItem: Product }) => {
  return (
    <div>
      <Link href={`/category/${productItem.id}`}>
        <div className="p-4 border border-gray-200/70 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">{productItem.image}</span>
            <span
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                productItem.change.dir === 'up'
                  ? 'bg-red-50 text-red-600 border border-red-100'
                  : productItem.change.dir === 'down'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    : 'bg-gray-100 text-gray-600'
              }`}
            >
              {productItem.change.dir === 'up' && '▲'}
              {productItem.change.dir === 'down' && '▼'}
              {Math.abs(productItem.change.pct)}%
            </span>
          </div>

          <h3 className="font-bold text-gray-800 text-lg mb-1">
            {productItem.nameBn}
          </h3>
          <p className="text-gray-600 text-sm font-medium">
            ৳{productItem.today} টাকা /{' '}
            {unitMap[productItem.unit?.toLowerCase()] || productItem.unit}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default NavItemPage;
