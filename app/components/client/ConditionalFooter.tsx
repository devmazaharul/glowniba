'use client';
import { usePathname } from 'next/navigation';
import Footer from '../server/Footer';

export function ConditionalFooter() {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard')) {
    return null; // Dashboard এ Header দেখাবো না
  }

  return (
    <>
      {/* Global Header */}
      <Footer />
    </>
  );
}
