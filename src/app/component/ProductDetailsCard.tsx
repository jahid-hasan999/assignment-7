
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
  const englishToBengaliDigits: Record<string, string> = {
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
    (digit) => englishToBengaliDigits[digit] || digit,
  );
};

const ProductDetailsCard = ({
  details,
}: {
  details: ProductDetail;
}) => {
  const unitBn =
    unitMap[details.unit?.toLowerCase()] || details.unit;

  const priceDiff = Math.abs(details.today - details.yesterday);

  // Market data
  const markets = details.markets ?? [];

  // Find minimum and maximum price markets
  const minMarket =
    markets.length > 0
      ? markets.reduce((lowest, market) =>
          market.min < lowest.min ? market : lowest,
        )
      : undefined;

  const maxMarket =
    markets.length > 0
      ? markets.reduce((highest, market) =>
          market.max > highest.max ? market : highest,
        )
      : undefined;

  // Average of each market's minimum and maximum prices
  const averagePrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (total, market) =>
              total + (market.min + market.max) / 2,
            0,
          ) / markets.length,
        )
      : details.today;

  return (
    <div className="container mx-auto max-w-4xl space-y-8 rounded-2xl bg-white p-4 sm:p-6">
      <div>
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link
            href="/"
            className="font-bold text-gray-900 hover:underline"
          >
            হোম
          </Link>

          <span>›</span>

          <span className="text-gray-600">
            {details.categoryNameBn}
          </span>

          <span>›</span>

          <span className="font-semibold text-gray-900">
            {details.nameBn}
          </span>
        </nav>

        {/* Product Summary */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col justify-between space-y-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:col-span-2">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-3 text-6xl">
                {details.image}
              </span>

              <div className="min-w-0 space-y-1.5">
                {/* Category Tag */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {details.categoryIcon}{' '}
                    {details.categoryNameBn}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-3xl font-bold text-gray-900">
                  {details.nameBn}
                </h1>

                {/* Unit and Category */}
                <p className="text-sm text-gray-500">
                  প্রতি {unitBn} • {details.categoryNameBn}
                </p>

                {/* Description */}
                <p className="text-sm leading-6 text-gray-600">
                  {details.nameBn}-এর আজকের বাজারদর,
                  দাম পরিবর্তন এবং বিভিন্ন বাজারের
                  মূল্যতালিকা এখানে দেখুন।
                </p>

                {/* Price Change Summary */}
                <p className="pt-1 text-sm font-medium text-gray-700">
                  গতকালকের তুলনায় আজ দাম{' '}

                  <span
                    className={
                      details.change.dir === 'up'
                        ? 'font-bold text-red-600'
                        : details.change.dir === 'down'
                          ? 'font-bold text-emerald-600'
                          : 'font-bold text-gray-600'
                    }
                  >
                    {details.change.dir === 'up'
                      ? 'বেড়েছে'
                      : details.change.dir === 'down'
                        ? 'কমেছে'
                        : 'একই আছে'}
                  </span>

                  {priceDiff > 0 &&
                    ` ${toBengaliNumber(priceDiff)} টাকা`}
                </p>
              </div>
            </div>
          </div>

          {/* Today's Price Badge */}
          <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-gray-50/80 p-6 text-center shadow-sm">
            <p className="text-xs font-medium text-gray-500">
              আজকের দাম
            </p>

            <h2 className="pt-1 text-4xl font-extrabold text-gray-900">
              {toBengaliNumber(details.today)}
            </h2>

            <p className="pt-0.5 text-xs font-medium text-gray-500">
              টাকা / {unitBn}
            </p>

            <div className="pt-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  details.change.dir === 'up'
                    ? 'bg-red-50 text-red-600'
                    : details.change.dir === 'down'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                {details.change.dir === 'up' && '▲ '}
                {details.change.dir === 'down' && '▼ '}

                {toBengaliNumber(
                  Math.abs(details.change.pct),
                )}%
              </span>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="mb-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Minimum Price */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 shadow-sm">
              <p className="text-xs font-medium text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-2xl font-bold text-emerald-600">
                {toBengaliNumber(
                  minMarket?.min ?? details.today,
                )}{' '}
                টাকা
              </p>

              <p className="mt-2 truncate text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার:{' '}
                <span className="font-medium text-gray-800">
                  {minMarket?.market ?? 'তথ্য নেই'}
                </span>
              </p>
            </div>

            {/* Maximum Price */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 shadow-sm">
              <p className="text-xs font-medium text-gray-500">
                সর্বাধিক দাম
              </p>

              <p className="mt-1 text-2xl font-bold text-red-600">
                {toBengaliNumber(
                  maxMarket?.max ?? details.today,
                )}{' '}
                টাকা
              </p>

              <p className="mt-2 truncate text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার:{' '}
                <span className="font-medium text-gray-800">
                  {maxMarket?.market ?? 'তথ্য নেই'}
                </span>
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 shadow-sm">
              <p className="text-xs font-medium text-gray-500">
                গড় দাম
              </p>

              <p className="mt-1 text-2xl font-bold text-blue-600">
                {toBengaliNumber(averagePrice)} টাকা
              </p>

              <p className="mt-2 text-xs text-gray-500">
                {markets.length > 0
                  ? `${toBengaliNumber(markets.length)}টি বাজারের গড়`
                  : 'আজকের দামের ভিত্তিতে'}
              </p>
            </div>
          </div>

          {/* Previous Prices */}
          <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-3 text-center">
              <p className="text-xs text-gray-500">গতকাল</p>

              <p className="mt-1 text-base font-bold text-gray-800">
                {toBengaliNumber(details.yesterday)} টাকা
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-3 text-center">
              <p className="text-xs text-gray-500">গত সপ্তাহ</p>

              <p className="mt-1 text-base font-bold text-gray-800">
                {toBengaliNumber(details.lastWeek)} টাকা
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-3 text-center">
              <p className="text-xs text-gray-500">গত মাস</p>

              <p className="mt-1 text-base font-bold text-gray-800">
                {toBengaliNumber(details.lastMonth)} টাকা
              </p>
            </div>
          </div>
        </div>

        {/* Market-wise Today's Prices */}
        {markets.length > 0 ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                বাজারভিত্তিক আজকের দাম
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                বিভিন্ন বাজারে {details.nameBn}-এর সর্বনিম্ন
                ও সর্বোচ্চ দাম
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200/80 bg-white shadow-sm">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50 text-sm text-gray-500">
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      বাজার
                    </th>

                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      বিভাগ
                    </th>

                    <th className="whitespace-nowrap px-4 py-3 text-right font-semibold">
                      সর্বনিম্ন
                    </th>

                    <th className="whitespace-nowrap px-4 py-3 text-right font-semibold">
                      সর্বাধিক
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${market.division}-${index}`}
                      className="transition-colors hover:bg-gray-50/50"
                    >
                      <td className="whitespace-nowrap px-4 py-3.5 text-sm font-bold text-gray-800">
                        {market.market}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm font-medium text-emerald-600">
                        {toBengaliNumber(market.min)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm font-medium text-red-600">
                        {toBengaliNumber(market.max)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center">
            <p className="font-semibold text-gray-700">
              বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি
            </p>

            <p className="mt-1 text-sm text-gray-500">
              এই পণ্যের জন্য বর্তমানে আলাদা বাজারের তথ্য নেই।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsCard;
