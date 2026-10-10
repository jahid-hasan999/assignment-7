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

  // Calculate Min and Max markets dynamically if markets exist
  let minMarket = details.markets?.[0];
  let maxMarket = details.markets?.[0];
  let totalMin = 0;
  let totalMax = 0;

  if (details.markets && details.markets.length > 0) {
    details.markets.forEach(m => {
      if (m.min < minMarket.min) minMarket = m;
      if (m.max > maxMarket.max) maxMarket = m;
      totalMin += m.min;
      totalMax += m.max;
    });
  }

  
  return (
    <div className="container mx-auto space-y-8 bg-white p-4 sm:p-6 rounded-2xl max-w-4xl">
      <div>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline font-bold text-gray-900">
            হোম
          </Link>
          <span>›</span>
          <span className="text-gray-600">{details.categoryNameBn}</span>
          <span>›</span>
          <span className="text-gray-900 font-semibold">{details.nameBn}</span>
        </nav>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 border border-gray-100 rounded-3xl p-6 bg-white shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-6xl p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center">
                {details.image}
              </span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                    {details.categoryIcon} {details.categoryNameBn}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {details.nameBn}
                </h1>
                <p className="text-gray-500 text-sm">
                  প্রতি {unitBn} • {details.categoryNameBn}
                </p>

               
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
          </div>

          {/* Today's Price Badge */}
          <div className="bg-gray-50/80 border border-gray-100 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
            <p className="text-gray-500 text-xs font-medium">আজকের দাম</p>
            <h2 className="text-4xl font-extrabold text-gray-900 pt-1">
              {toBengaliNumber(details.today)}
            </h2>
            <p className="text-gray-500 text-xs font-medium pt-0.5">
              টাকা / {unitBn}
            </p>
            <div className="pt-2">
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  details.change.dir === 'up'
                    ? 'bg-red-50 text-red-600'
                    : details.change.dir === 'down'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                {details.change.dir === 'up' && '▲ '}
                {details.change.dir === 'down' && '▼ '}
                {toBengaliNumber(Math.abs(details.change.pct))}%
              </span>
            </div>
          </div>
        </div>

       
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Minimum Price */}
            <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">সর্বনিম্ন দাম</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {toBengaliNumber(minMarket?.min || details.today)} টাকা
              </p>
              <p className="text-xs text-gray-500 mt-2 truncate">
                সবচেয়ে কম দামের বাজার:{' '}
                <span className="text-gray-800 font-medium">
                  {minMarket?.market || 'তথ্য নেই'}
                </span>
              </p>
            </div>

            {/* Maximum Price */}
            <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">সর্বাধিক দাম</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {toBengaliNumber(maxMarket?.max || details.today)} টাকা
              </p>
              <p className="text-xs text-gray-500 mt-2 truncate">
                সবচেয়ে বেশি দামের বাজার:{' '}
                <span className="text-gray-800 font-medium">
                  {maxMarket?.market || 'তথ্য নেই'}
                </span>
              </p>
            </div>

            
            <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">গড় দাম</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {toBengaliNumber(details.today)} টাকা
              </p>
              <p className="text-xs text-gray-500 mt-2">
                প্রতি {unitBn}-এর হিসাবে
              </p>
            </div>
          </div>

          
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-3 text-center">
              <p className="text-xs text-gray-500">গতকাল</p>
              <p className="text-base font-bold text-gray-800 mt-1">
                {toBengaliNumber(details.yesterday)} টাকা
              </p>
            </div>
            <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-3 text-center">
              <p className="text-xs text-gray-500">গত সপ্তাহ</p>
              <p className="text-base font-bold text-gray-800 mt-1">
                {toBengaliNumber(details.lastWeek)} টাকা
              </p>
            </div>
            <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-3 text-center">
              <p className="text-xs text-gray-500">গত মাস</p>
              <p className="text-base font-bold text-gray-800 mt-1">
                {toBengaliNumber(details.lastMonth)} টাকা
              </p>
            </div>
          </div>
        </div>

        
        {details.markets && details.markets.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="border border-gray-200/80 rounded-2xl overflow-hidden bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 text-sm bg-gray-50/50">
                    <th className="py-3 px-4 font-semibold">বাজার</th>
                    <th className="py-3 px-4 font-semibold">বিভাগ</th>
                    <th className="py-3 px-4 font-semibold text-right">
                      সর্বনিম্ন
                    </th>
                    <th className="py-3 px-4 font-semibold text-right">
                      সর্বাধিক
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {details.markets.map((m, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-gray-800 text-sm">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 text-sm">
                        {m.division}
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-emerald-600 text-sm">
                        {toBengaliNumber(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-red-600 text-sm">
                        {toBengaliNumber(m.max)} টাকা
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
  );
};

export default ProductDetailsCard;
