const unitMap: Record<string, string> = {
  kg: 'কেজি',
  litre: 'লিটার',
  liter: 'লিটার',
  piece: 'পিস',
  dozen: 'ডজন',
};

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

const Marquee = async () => {
  const res = await fetch(
    'https://api.api-store.workers.dev/api/bazardor/products',
    { next: { revalidate: 60 } },
  );
  const data: Product[] = await res.json();

  return (
    <div className="w-full bg-green-300 border-y border-gray-200/60 py-2 sm:py-2.5">
      <div className="container mx-auto px-4 flex items-center gap-3">
        {/* Fixed Left Badge: দ্রব্যমূল্য */}
        <div className="shrink-0 bg-emerald-600 text-white text-xs sm:text-sm font-semibold px-5 p-3  z-10 shadow-sm">
          দ্রব্যমূল্য
        </div>

        {/* Marquee Content Area */}
        <div className="overflow-hidden flex-1">
          <div className="flex w-max animate-marquee space-x-6 sm:space-x-8 hover:[animation-play-state:paused]">
            {/* Main List */}
            <div className="flex items-center space-x-6 sm:space-x-8">
              {data.map((item: Product) => (
                <div
                  key={item.id}
                  className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium whitespace-nowrap pr-6 border-r border-gray-200/60"
                >
                  <span className="text-sm sm:text-base">{item.image}</span>
                  <span className="text-gray-800">{item.nameBn}</span>
                  <span className="text-gray-700">
                    ৳{item.today} টাকা/
                    {unitMap[item.unit?.toLowerCase()] || item.unit}
                  </span>
                  <span
                    className={`flex items-center text-[10px] sm:text-xs font-bold ${
                      item.change.dir === 'up'
                        ? 'text-red-500'
                        : item.change.dir === 'down'
                          ? 'text-emerald-600'
                          : 'text-gray-500'
                    }`}
                  >
                    {item.change.dir === 'up' && '▲ '}
                    {item.change.dir === 'down' && '▼ '}
                    {Math.abs(item.change.pct)}%
                  </span>
                </div>
              ))}
            </div>

            {/* Duplicate List for Continuous Loop */}
            <div
              className="flex items-center space-x-6 sm:space-x-8"
              aria-hidden="true"
            >
              {data.map((item: Product) => (
                <div
                  key={`dup-${item.id}`}
                  className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium whitespace-nowrap pr-6 border-r border-gray-200/60"
                >
                  <span className="text-sm sm:text-base">{item.image}</span>
                  <span className="text-gray-800">{item.nameBn}</span>
                  <span className="text-gray-700">
                    ৳{item.today} টাকা/
                    {unitMap[item.unit?.toLowerCase()] || item.unit}
                  </span>
                  <span
                    className={`flex items-center text-[10px] sm:text-xs font-bold ${
                      item.change.dir === 'up'
                        ? 'text-red-500'
                        : item.change.dir === 'down'
                          ? 'text-emerald-600'
                          : 'text-gray-500'
                    }`}
                  >
                    {item.change.dir === 'up' && '▲ '}
                    {item.change.dir === 'down' && '▼ '}
                    {Math.abs(item.change.pct)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
