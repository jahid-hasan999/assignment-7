
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { authClient } from '../lib/auth-client';

const SignInOut = () => {
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);

  if (isPending) {
    return <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-200" />;
  }

  const user = session?.user;

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/sign-in" className="text-sm font-medium">
          সাইন আপ
        </Link>
        <Link
          href="/sign-up"
          className="rounded-lg bg-green-700 px-4 py-2 text-sm text-white"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100"
      >
        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || 'Profile'}
              fill
              sizes="32px"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-semibold">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          )}
        </div>

        <span className="max-w-24 truncate text-sm font-medium">
          {user.name || 'User'}
        </span>

        <span className="text-xs text-gray-500">⌄</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border bg-white p-2 shadow-lg">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
          >
            My Profile
          </Link>

          <button
            type="button"
            onClick={async () => {
              try {
                const result = await authClient.signOut();

                if (result.error) {
                  toast.error(result.error.message || 'Logout failed!');
                  return;
                }

                toast.success('Logout successful!');
                setOpen(false);
              } catch {
                toast.error('Logout failed!');
              }
            }}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default SignInOut;

