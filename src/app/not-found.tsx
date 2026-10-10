import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-50 text-6xl">
          🧺
        </div>

        <p className="mb-3 text-sm font-bold tracking-[0.2em] text-emerald-600">
          ERROR 404
        </p>

        <h1 className="mb-4 text-2xl font-extrabold leading-relaxed text-gray-900 sm:text-3xl">
          দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          আপনি যে পেজটি খুঁজছেন, সেটি সরানো হয়েছে অথবা ঠিকানাটি ভুল। চলুন, আবার
          বাজার-দরের হোমপেজে ফিরে যাই।
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          <span>←</span>
          হোমপেজে ফিরে যান
        </Link>

        <p className="mt-8 text-xs text-gray-400">
          Bazar-Dor · সঠিক বাজারদর, সহজে
        </p>
      </div>
    </main>
  );
}
