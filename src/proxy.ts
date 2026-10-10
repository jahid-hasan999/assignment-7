import { auth } from '@/app/lib/auth';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // User login না থাকলে sign-in page-এ পাঠাবে
  if (!session?.user) {
    const signInUrl = new URL('/sign-in', request.url);

    // Login করার পর আগের পেজে ফিরে আসার জন্য
    signInUrl.searchParams.set(
      'callbackURL',
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );

    return NextResponse.redirect(signInUrl);
  }

  // Login থাকলে requested page-এ যেতে পারবে
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/products/:path*', '/product/:path*'],
};