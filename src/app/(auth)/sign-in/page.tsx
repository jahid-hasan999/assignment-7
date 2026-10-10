'use client';

import React, { useState } from 'react';
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { signIn } from '@/app/lib/auth-client';

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      setLoading(true);
       await signIn.email(
        {
          email,
          password,
          callbackURL: '/', 
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            toast.success('সফলভাবে সাইন ইন হয়েছে!');
            router.push('/'); 
          },
          onError: ctx => {
            toast.error(ctx.error.message || 'ইমেইল বা পাসওয়ার্ড সঠিক নয়!');
          },
        },
      );
    } catch (err: any) {
      toast.error('লগইন করার সময় সমস্যা হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

const handleSocialLogin = async (provider: 'google' | 'github') => {
  try {
    const result = await signIn.social({
      provider,
      callbackURL: '/',
    });

    if (result.error) {
      toast.error(result.error.message || 'লগইন ব্যর্থ হয়েছে!');
    }
  } catch {
    toast.error('সার্ভারে সমস্যা হয়েছে! আবার চেষ্টা করো।');
  }
};

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 bg-gray-50/50">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
        {/* Title for Login */}
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            সাইন ইন
          </h1>
          <p className="text-gray-500 text-sm">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Login Form */}
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField isRequired name="email" type="email">
            <Label className="text-sm font-semibold text-gray-700">ইমেইল</Label>
            <Input
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 text-sm"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField isRequired minLength={8} name="password" type="password">
            <Label className="text-sm font-semibold text-gray-700">
              পাসওয়ার্ড
            </Label>
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 text-sm"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm cursor-pointer mt-2"
          >
            {loading ? 'লগইন হচ্ছে...' : 'সাইন ইন'}
          </Button>
        </Form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs">অথবা</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Social Login Button */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span>🌐</span> Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('github')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span>💻</span> GitHub
          </button>
        </div>

        {/* Link for Register */}
        <div className="text-center text-sm text-gray-500 pt-2">
          অ্যাকাউন্ট নেই?{' '}
          <Link
            href="/sign-up"
            className="text-emerald-600 font-semibold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>

        <div className="text-center pt-2 border-t border-gray-100">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
