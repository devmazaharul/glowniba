'use client';

import { Search, User, ShoppingCart } from 'lucide-react';
import { Pacifico } from 'next/font/google';
import { MdOutlineExpandMore } from 'react-icons/md';
import Link from 'next/link';
import { useCartStore } from '@/store/addTocart';
import { motion } from 'framer-motion';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import CustomSheetContent from '../others/CustomSheetContent';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { defaultValues } from '@/constants';

const pacifico = Pacifico({
  style: 'normal',
  subsets: ['vietnamese'],
  weight: '400',
});

const Header = () => {
  const cartItems = useCartStore((state) => state.cart);
  const path = usePathname();

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > 500) {
          // স্ক্রল নিচের দিকে যাচ্ছে
          setShowHeader(false);
        }

        if (lastScrollY > window.scrollY) {
          setShowHeader(true);
        }

        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: showHeader ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0  w-full z-50 bg-white border-b border-gray-100"
    >
      <div className="max-w-[90%] mx-auto flex items-center justify-between">
        {/* তোমার আগের সব কোড এখানে থাকবে */}

        {/* Brand Section */}
        <div className="flex items-center gap-2 md:gap-6">
          <div className={pacifico.className}>
            <Link href="/">
              <p className="text-2xl text-gray-700 font-bold cursor-pointer">
                {defaultValues.siteName || 'Glow niba'}
              </p>
            </Link>
          </div>
          <p className="text-gray-400 font-extralight relative top-1">|</p>
          <motion.div
            className="flex items-center gap-1 text-lg text-gray-600 cursor-pointer hover:text-gray-800 relative top-1"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <p>Shops </p>
            <MdOutlineExpandMore className="relative top-0.5" />
          </motion.div>
        </div>

        {/* Icon Section */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Search */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href="/products" className="p-2 rounded-full">
              <Search
                className={`${
                  path == '/products' ? 'text-yellow-500' : 'text-gray-700'
                } text-2xl`}
              />
            </Link>
          </motion.div>

          {/* User */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href="/user" className="p-2 rounded-full">
              <User
                className={`${
                  path == '/user' ? 'text-yellow-500' : 'text-gray-700'
                } text-2xl`}
              />
            </Link>
          </motion.div>

          {/* Cart */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Sheet>
              <SheetTrigger asChild>
                <div className="relative">
                  <button className="flex items-center cursor-pointer z-50" >
                    <ShoppingCart className="text-gray-700 text-2xl" />
                    <p className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItems.length || 0}
                    </p>
                  </button>
                </div>
              </SheetTrigger>
              <CustomSheetContent />
            </Sheet>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
