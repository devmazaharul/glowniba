import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function middleware(request: NextRequest) {
  try {
    console.log('request...');
  } catch (error) {
    console.log('er' + error);
    // টোকেন invalid হলে login page এ পাঠাবে
    return NextResponse.redirect(new URL('/admin', request.url));
  }
}

export const config = {
  matcher: ['/dashfboard/:path*'], // শুধুমাত্র /admin routes গুলোতে apply হবে
};
