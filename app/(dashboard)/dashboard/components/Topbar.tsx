import { Fredericka_the_Great } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const pacifico = Fredericka_the_Great({
  style: 'normal',
  subsets: ['latin'],
  weight: '400',
});

const Topbar = () => {
  return (
    <div className="bg-gray-800 text-gray-100 px-6 py-2 flex items-center justify-between">
      <div className="text-2xl font-bold ">
        <Link href={"/dashboard"} className={pacifico.className}> Dashboard</Link>
      </div>
      <div>
                    <Image
          src="https://amimazaharul.vercel.app/_next/image?url=%2Fmaza-original_processed1.jpg&w=640&q=75"
          width={150} // Optional: you can remove this if using Tailwind width
          height={50} // Optional: same here
          alt="logo"
          className="h-[40px] w-[40px] object-contain rounded-full"
        />
      </div>
    </div>
  );
};

export default Topbar;
