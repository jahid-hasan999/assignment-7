import Link from "next/link";

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

const unitMap: Record<string, string> = {
  kg: 'কেজি',
  litre: 'লিটার',
  liter: 'লিটার',
  piece: 'পিস',
  dozen: 'ডজন',
};

const UpPriceDownCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="p-4 border border-gray-200/70 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl">{product.image}</span>
          <span
            className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
              product.change.dir === 'up'
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : product.change.dir === 'down'
                  ? 'bg-red-50 text-red-600 border border-red-100'
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            {product.change.dir === 'up' && '▲'}
            {product.change.dir === 'down' && '▼'}
            {Math.abs(product.change.pct)}%
          </span>
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-1">
          {product.nameBn}
        </h3>
        <p className="text-gray-600 text-sm font-medium">
          <span className="block text-xs text-gray-500 mb-1">আজকের দাম</span>৳
          {product.today} টাকা /{' '}
          {unitMap[product.unit?.toLowerCase()] || product.unit}
        </p>
      </div>
    </Link>
  );
};

export default UpPriceDownCard;
