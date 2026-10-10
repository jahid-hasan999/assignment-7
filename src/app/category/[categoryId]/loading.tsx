export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6 animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded" />

      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <div className="h-7 w-64 bg-gray-200 rounded mb-3" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(item => (
          <div
            key={item}
            className="rounded-2xl border border-gray-100 p-4 space-y-3"
          >
            <div className="h-40 bg-gray-200 rounded-xl" />
            <div className="h-5 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
