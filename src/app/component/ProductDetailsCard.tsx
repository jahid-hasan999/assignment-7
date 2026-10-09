import { ProductDetail } from '@/type/Type';
import Link from 'next/link';

const unitMap: Record<string, string> = {
  kg: 'কেজি',
  litre: 'লিটার',
  liter: 'লিটার',
  piece: 'পিস',
  dozen: 'ডজন',
};

const toBengaliNumber = (num: number | string): string => {
  const englishToBengaliDigits: { [key: string]: string } = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };
  return String(num).replace(
    /[0-9]/g,
    digit => englishToBengaliDigits[digit] || digit,
  );
};

const ProductDetailsCard = ({ details }: { details: ProductDetail }) => {
  const unitBn = unitMap[details.unit?.toLowerCase()] || details.unit;
  const priceDiff = Math.abs(details.today - details.yesterday);

  let minMarket = details.markets?.[0];
  let maxMarket = details.markets?.[0];

  if (details.markets && details.markets.length > 0) {
    details.markets.forEach(m => {
      if (m.min < minMarket.min) minMarket = m;
      if (m.max > maxMarket.max) maxMarket = m;
    });
  }

  return (
    <div className="container mx-auto space-y-8 bg-white p-4 sm:p-6 rounded-2xl">
      <div>
        {/* Breadcrumb */}
        <nav className="items-center gap-2 text-sm text-black mb-4">
          <Link href="/" className="hover:underline font-bold text-3xl">
            হোম
          </Link>
        </nav>

        {/* Top Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between mx-auto gap-4">
          <div className="space-y-6">
            <div className="border border-gray-100/80 rounded-3xl p-5 bg-white shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-5xl p-3 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-center justify-center">
                  {details.image}
                </span>
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {details.nameBn}
                  </h1>
                  <p className="text-gray-500 text-sm">
                    প্রতি {unitBn} • {details.categoryNameBn}
                  </p>

                  {/* দাম বাড়া / কমা এর বার্তা */}
                  <p className="text-sm font-medium text-gray-700 pt-1">
                    গতকালকের তুলনায় আজ দাম{' '}
                    <span
                      className={
                        details.change.dir === 'up'
                          ? 'text-red-600 font-bold'
                          : details.change.dir === 'down'
                            ? 'text-emerald-600 font-bold'
                            : 'text-gray-600'
                      }
                    >
                      {details.change.dir === 'up'
                        ? 'বেড়েছে'
                        : details.change.dir === 'down'
                          ? 'কমেছে'
                          : 'একই আছে'}
                    </span>
                    {priceDiff > 0 && ` • ${toBengaliNumber(priceDiff)} টাকা`}
                  </p>
                </div>
              </div>

              {/* আজকের দামের বক্স */}
              <div className="bg-gray-50/60 rounded-2xl p-6 text-center space-y-1">
                <p className="text-gray-500 text-sm font-medium">আজকের দাম</p>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 pt-1">
                  {toBengaliNumber(details.today)}
                </h2>
                <p className="text-gray-500 text-sm font-medium pt-1">
                  টাকা / {unitBn}
                </p>

                <div className="pt-2 flex justify-center items-center">
                  <span
                    className={`inline-flex items-center gap-1 text-sm font-bold ${
                      details.change.dir === 'up'
                        ? 'text-red-600'
                        : details.change.dir === 'down'
                          ? 'text-emerald-600'
                          : 'text-gray-600'
                    }`}
                  >
                    {details.change.dir === 'up' && '▲ '}
                    {details.change.dir === 'down' && '▼ '}
                    {toBengaliNumber(Math.abs(details.change.pct))}%
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                দামের সারসংক্ষেপ
              </h2>

              <div className="space-y-3">
                {/* সর্বনিম্ন দাম */}
                <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-4">
                  <p className="text-xs text-gray-500 font-medium">
                    সর্বনিম্ন দাম
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">
                    {toBengaliNumber(minMarket?.min || details.today)} টাকা
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    সবচেয়ে কম দামের বাজার:{' '}
                    <span className="text-gray-800 font-medium">
                      {minMarket?.market || 'তথ্য নেই'}
                    </span>
                  </p>
                </div>

                {/* সর্বোচ্চ দাম */}
                <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-4">
                  <p className="text-xs text-gray-500 font-medium">
                    সর্বোচ্চ দাম
                  </p>
                  <p className="text-2xl font-bold text-red-600 mt-1">
                    {toBengaliNumber(maxMarket?.max || details.today)} টাকা
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    সবচেয়ে বেশি দামের বাজার:{' '}
                    <span className="text-gray-800 font-medium">
                      {maxMarket?.market || 'তথ্য নেই'}
                    </span>
                  </p>
                </div>

                {/* গড় দাম */}
                <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-4">
                  <p className="text-xs text-gray-500 font-medium">গড় দাম</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {toBengaliNumber(details.today)} টাকা
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    প্রতি {unitBn}-এর হিসাবে
                  </p>
                </div>

                {/* ৩টি ক্ষুদ্র হিস্ট্রি বক্স  */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-3 text-center">
                    <p className="text-xs text-gray-500">গতকাল</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">
                      {toBengaliNumber(details.yesterday)} টাকা
                    </p>
                  </div>
                  <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-3 text-center">
                    <p className="text-xs text-gray-500">গত সপ্তাহ</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">
                      {toBengaliNumber(details.lastWeek)} টাকা
                    </p>
                  </div>
                  <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-3 text-center">
                    <p className="text-xs text-gray-500">গত মাস</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">
                      {toBengaliNumber(details.lastMonth)} টাকা
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* বাজারের তালিকা */}
          {details.markets && details.markets.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                বাজারভিত্তিক আজকের দাম
              </h2>

              <div className="border border-gray-200/80 rounded-2xl overflow-hidden bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500 text-sm bg-gray-50/50">
                      <th className="py-3 px-4 font-semibold">বাজার</th>
                      <th className="py-3 px-4 font-semibold text-right">
                        বিভাগ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {details.markets.map((m, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-bold text-gray-800 text-base">
                          {m.market}
                        </td>
                        <td className="py-3.5 px-4 text-right text-gray-600 text-base">
                          {m.division}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
