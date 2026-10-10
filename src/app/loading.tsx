export default function HomeLoading() {
  return (
    <main className="container mx-auto max-w-6xl space-y-8 px-4 py-8 animate-pulse">
      {/* Banner skeleton */}
      <div className="h-48 rounded-2xl bg-gray-200 sm:h-64" />

      {/* Market ticker skeleton */}
      <div className="flex gap-4 overflow-hidden rounded-xl border border-gray-100 p-4">
        <div className="h-5 w-28 shrink-0 rounded bg-gray-200" />
        <div className="h-5 w-36 shrink-0 rounded bg-gray-200" />
        <div className="h-5 w-32 shrink-0 rounded bg-gray-200" />
      </div>

      {/* Section heading skeleton */}
      <div className="space-y-3">
        <div className="h-7 w-52 rounded bg-gray-200" />
        <div className="h-4 w-72 max-w-full rounded bg-gray-200" />
      </div>

      {/* Product cards skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map(item => (
          <div
            key={item}
            className="space-y-4 rounded-2xl border border-gray-100 p-4"
          >
            <div className="h-40 rounded-xl bg-gray-200" />
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-7 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
