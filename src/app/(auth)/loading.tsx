
export default function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md animate-pulse space-y-5 rounded-xl p-6">
        <div className="mx-auto h-10 w-10 rounded-full bg-gray-300"></div>

        <div className="mx-auto h-6 w-40 rounded bg-gray-300"></div>

        <div className="h-12 rounded-lg bg-gray-200"></div>

        <div className="h-12 rounded-lg bg-gray-200"></div>

        <div className="h-11 rounded-lg bg-gray-300"></div>
      </div>
    </div>
  );
}

