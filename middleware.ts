// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const token = await cookies();
  const getToken = token.get('isLogin');
  console.log(getToken);
  // Check if token exists in cookies
  if (!getToken) {
    // If no token, redirect the user to the login page
    return NextResponse.redirect(new URL('/user', request.url));
  }

  // If token exists, continue with the request
  return NextResponse.next();
}

// This middleware will only run on the specified paths
export const config = {
  matcher: ['/dashboard'], // Define the paths where this middleware should apply
};
