'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export function ConditionalHeader() {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard')) {
    return null; 
  }
  if (pathname.startsWith('/checkout')) {
    return null; 
  }
  if (pathname.startsWith('/laststep')) {
    return null; 
  }

  return (
    <>
      <Header />
    </>
  );
}
