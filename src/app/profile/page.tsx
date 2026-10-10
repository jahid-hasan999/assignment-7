
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { authClient } from '../lib/auth-client';


export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newName = name.trim();

    if (!newName) {
      setMessage('আপনার নাম লিখুন।');
      return;
    }

    if (newName === user?.name) {
      setMessage('আপনার নামে কোনো পরিবর্তন করা হয়নি।');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const { error } = await authClient.updateUser({
        name: newName,
      });

      if (error) {
        setMessage(error.message || 'নাম আপডেট করা যায়নি।');
        return;
      }

      setMessage('নাম সফলভাবে আপডেট হয়েছে!');
    } catch (error) {
      console.error('Profile update failed:', error);
      setMessage('সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f0f5f0] px-5 py-8">
        <div className="mx-auto max-w-5xl animate-pulse rounded-2xl bg-white p-8">
          প্রোফাইল লোড হচ্ছে...
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] p-5">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
          <p className="mb-4 text-gray-700">
            প্রোফাইল দেখতে আগে Sign In করুন।
          </p>
          <Link
            href="/sign-in"
            className="inline-block rounded-lg bg-green-700 px-5 py-2 text-white hover:bg-green-800"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-5 py-7 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Heading */}
        <header className="mb-7">
          <h1 className="text-2xl font-bold text-[#202c24] sm:text-3xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-[#737c75] sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        {/* Profile Information Card */}
        <section className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-[#dfe7df] bg-white/75 p-5 sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-[84px] sm:w-[84px]">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || 'Profile picture'}
                  fill
                  sizes="84px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-green-800">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-[#253128] sm:text-xl">
                {user.name || 'User'}
              </h2>
              <p className="mt-1 break-all text-sm text-[#727b74] sm:text-base">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="shrink-0 rounded-lg border border-red-400 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <span aria-hidden="true">↩ </span>
            সাইন আউট
          </button>
        </section>

        {/* Update Profile Form */}
        <section className="rounded-2xl border border-[#dfe7df] bg-white/75 p-5 sm:p-6 sm:px-8 sm:py-7">
          <h2 className="mb-9 text-base font-bold text-[#253128] sm:text-lg">
            তথ্য
          </h2>

          <form onSubmit={handleUpdate}>
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm font-medium text-[#303a32]"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              required
              maxLength={100}
              className="mb-4 h-11 w-full rounded-lg border border-[#dfe5df] bg-transparent px-3 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            {message && (
              <p
                role="status"
                className={`mb-3 text-sm ${
                  message.includes('সফলভাবে')
                    ? 'text-green-700'
                    : 'text-red-600'
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-[#078b43] text-sm font-semibold text-white shadow-[0_3px_3px_rgba(0,0,0,0.2)] transition hover:bg-[#067638] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'আপডেট হচ্ছে...' : 'আপডেট'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
