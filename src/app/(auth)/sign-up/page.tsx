'use client';

import React, { useState } from 'react';
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/app/lib/auth-client';


const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      toast.error('পাসওয়ার্ড দুটি মিলছে না!');
      return;
    }

    try {
      setLoading(true);
      await signUp.email(
        {
          email,
          password,
          name,
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            toast.success(
              'সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে! অনুগ্রহ করে সাইন ইন করুন।',
            );
            router.push('/sign-in'); 
          },
          onError: ctx => {
            toast.error(ctx.error.message || 'রেজিস্ট্রেশন করতে সমস্যা হয়েছে!');
          },
        },
      );
    } catch (err: any) {
      toast.error('কোথাও কোনো ত্রুটি ঘটেছে!');
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
        {/* Title for registration */}
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-gray-500 text-sm">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Registration Form */}
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="name"
            validate={value => {
              if (value.length < 3) {
                return 'নাম অন্তত ৩ অক্ষরের হতে হবে';
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-gray-700">নাম</Label>
            <Input
              placeholder="নাম"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 text-sm"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={value => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return 'দয়া করে একটি সঠিক ইমেইল দিন';
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-gray-700">ইমেইল</Label>
            <Input
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 text-sm"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={value => {
              if (value.length < 8) {
                return 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে';
              }
              if (!/[A-Z]/.test(value)) {
                return 'কমপক্ষে একটি বড় হাতের অক্ষর থাকতে হবে';
              }
              if (!/[0-9]/.test(value)) {
                return 'কমপক্ষে একটি সংখ্যা থাকতে হবে';
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-gray-700">
              পাসওয়ার্ড
            </Label>
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 text-sm"
            />
            <Description className="text-xs text-gray-400 mt-1">
              কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর এবং ১টি সংখ্যা।
            </Description>
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField isRequired name="confirmPassword" type="password">
            <Label className="text-sm font-semibold text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>
            <Input
              placeholder="আবার লিখুন"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 text-sm"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Register Button */}
          <Button
            type="submit"
            isDisabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm cursor-pointer mt-2"
          >
            {loading ? 'লোড হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
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

        {/* Link for Login */}
        <div className="text-center text-sm text-gray-500 pt-2">
          অ্যাকাউন্ট আছে?{' '}
          <Link
            href="/sign-in"
            className="text-emerald-600 font-semibold hover:underline"
          >
            সাইন ইন করুন
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

export default SignUpPage;
