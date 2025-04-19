'use client';
import { Search, User, ShoppingCart } from 'lucide-react';
import { Pacifico } from 'next/font/google';
import { MdOutlineExpandMore } from 'react-icons/md';
import Link from 'next/link';
import { useCartStore } from '@/store/addTocart';
import { motion } from 'framer-motion'; // Importing Framer Motion
import { Sheet,SheetTrigger } from '@/components/ui/sheet';
import CustomSheetContent from '../others/CustomSheetContent';

const pacifico = Pacifico({
  style: 'normal',
  subsets: ['vietnamese'],
  weight: '400',
});

const Header = () => {
  const cartItems = useCartStore((state) => state.cart); // Accessing cart from the state

  return (
    <div className=" bg-white max-w-[90%] mx-auto ">
      <div className="flex items-center justify-between">
        {/* Brand and Shops Section */}
        <div className="flex items-center gap-2 md:gap-6">
          <div className={pacifico.className}>
            <Link href="/">
              <p className={`text-2xl text-gray-700 font-bold cursor-pointer`}>
                {' '}
                Glow niba
              </p>
            </Link>
          </div>

          <p className="text-gray-400 font-extralight relative top-1">|</p>
          <motion.div
            className="flex items-center gap-1 text-lg text-gray-600 cursor-pointer hover:text-gray-800 relative top-1"
            whileHover={{ scale: 1.1 }} // Adding hover effect with motion
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <p>Shops</p>
            <MdOutlineExpandMore className="relative top-0.5" />
          </motion.div>
        </div>

        {/* Icon Section (Search, User, Cart) */}
        <div className="flex items-center gap-3 md:gap-6">
          <motion.div
            whileHover={{ scale: 1.1 }} // Adding hover animation to Search icon
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              href="/products"
              className=" duration-100 ease-in-out p-2 rounded-full"
            >
              <Search className="text-gray-700 text-2xl" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }} // Adding hover animation to User icon
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              href="/user"
              className=" duration-100 ease-in-out p-2 rounded-full"
            >
              <User className="text-gray-700 text-2xl" />
            </Link>
          </motion.div>

          {/* Cart with badge */}
          <motion.div
            whileHover={{ scale: 1.1 }} // Adding hover animation to Cart icon
            transition={{ type: 'spring', stiffness: 300 }}
          >
       
         
            
        
           
            <Sheet>
      <SheetTrigger asChild>
      <div className="relative">
              <button className="flex duration-700 ease-in-out transition-all items-center cursor-pointer">
                <ShoppingCart className="text-gray-700 text-2xl" />
                <p className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length || 0}
                </p>
              </button>
            </div>
      </SheetTrigger>
  <CustomSheetContent/>
  
    </Sheet>


           
          </motion.div>
        </div>
      </div>

     
    </div>
  );
};

export default Header;
