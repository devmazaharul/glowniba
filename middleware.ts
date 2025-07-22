// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from './utils/token';

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      throw new Error('No token found');
    }
    const response = NextResponse.next();

  
  const decoded = await verifyJwt(token);

  if (!decoded || typeof decoded !== 'object' || !decoded.email) {

    return NextResponse.redirect(new URL('/login', request.url));
  }

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/checkout'],
};
