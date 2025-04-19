'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = "404 | Page Not Found";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black text-center px-4">
      <div>
        <p className="text-4xl font-bold">Page Not Found</p>
        <p className="text-gray-500 py-2">The page you are looking for does not exist.</p>
       
      </div>
   <Link href={'/'} className="mt-4 text-blue-500 hover:underline">
   <button className='btn_secondary'>Go to home page</button>
      </Link>
      
    </div>
  );
}
