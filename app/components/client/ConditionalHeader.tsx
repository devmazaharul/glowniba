'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export function ConditionalHeader() {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard')) {
    return null; // Dashboard এ Header দেখাবো না
  }
  if (pathname.startsWith('/checkout')) {
    return null; // Dashboard এ Header দেখাবো না
  }

  return (
    <>
      {/* Global Header */}
      <Header />
    </>
  );
}
