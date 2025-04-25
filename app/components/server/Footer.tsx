'use client';
import { ArrowRight, Mail } from 'lucide-react';
import { FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { toast } from 'sonner';
import { useState } from 'react';
import { isValidEmail } from '@/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdErrorOutline } from 'react-icons/md';
import { IoShieldCheckmarkSharp  } from "react-icons/io5";
import { subscribeUser } from '@/action/subscribe';
import { CustomError } from '@/utils/error';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function Footer() {
  const [state, setState] = useState('');
  const [laoding, setLoading] = useState(false);
  const pathName=usePathname()

  const HandleSubscribe =async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (!state) {
        toast('Invalid Email address', {
          description: 'Email address is required to subscribe.',
          duration: 2000,
          icon:<MdErrorOutline className='text-xl text-red-500'/>
        });
        return;
      }
      if (!isValidEmail(state)) {
        toast('Please provide a valid email address.', {
          description: 'The email address you provided is not valid.',
          duration: 2000,
          icon:<MdErrorOutline className='text-xl text-red-500'/>
        
        });
        return;
      }
  
      const subscibeAction=await subscribeUser(state);
      if(subscibeAction.status!==200){
        throw new CustomError(subscibeAction.message,subscibeAction.status)
      }
        toast('Thank you for subscribing!', {
          description: 'You will receive the latest updates and special offers.',
          duration: 2000,
          icon:<IoShieldCheckmarkSharp  className='text-xl text-green-500'/>
          
        });
       
  
     
   

    } catch (error) {
          if (error instanceof CustomError) {
              toast.warning(error.message, {
                description:
                  error.status === 400
                    ? 'Invalid credentials, please try again.'
                    : 'Please try again later',
                duration: 3000,
              });
            }
    }finally{
      setState("")
      setLoading(false)
    }
  };

  return (
    <footer className="  bg-gray-50 text-center text-gray-700 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto m-3 grid grid-cols-2 md:grid-cols-5 gap-6">
        {/* Shop Links */}
        <motion.div className='col-span-1' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h3 className="font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/collections" className="hover:underline">Collections</Link></li>
            <li><Link href="/products" className="hover:underline">Products</Link></li>
            <li><Link href="/search" className="hover:underline">Search</Link></li>
          </ul>
        </motion.div>

        {/* About Links */}
        <motion.div className='col-span-1'  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <h3 className="font-semibold mb-3">About</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/blogs" className="hover:underline">Blogs</Link></li>
          </ul>
        </motion.div>

        {/* Policies Links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h3 className="font-semibold mb-3">Policies</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/policies/privacy-policy" className={`${pathName=="/policies/privacy-policy" ? 'text-blue-400':"hover:underline"}`}>Privacy Policy</Link></li>
            <li><Link href="/policies/return-policy"  className={`${pathName=="/policies/return-policy" ? 'text-blue-400':"hover:underline"}`}>Return & Refund Policy</Link></li>
            <li><Link href="/policies/terms-conditions"  className={`${pathName=="/policies/terms-conditions" ? 'text-blue-400':"hover:underline"}`}>Terms & Conditions</Link></li>
            <li><Link href="/policies/shipping-policy"  className={`${pathName=="/policies/shipping-policy" ? 'text-blue-400':"hover:underline"}`}>Shipping & Delivery Policy</Link></li>
            <li><Link href="/policies/payment-policy"  className={`${pathName=="/policies/payment-policy" ? 'text-blue-400':"hover:underline"}`}>Payment Policy</Link></li>
            <li><Link href="/policies/disclaimer"  className={`${pathName=="/policies/disclaimer" ? 'text-blue-400':"hover:underline"}`}>Disclaimer</Link></li>
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }} className="md:col-span-2 bg-white rounded-xl col-span-2">
          <div className="border border-gray-100 px-6 py-8 rounded-xl  shadow-2xl shadow-gray-100">
            <h3 className="flex items-center gap-2 font-bold mb-4">
              <Mail />
              Stay up to date
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for latest updates and exclusive offers.
            </p>
            <div className="flex items-center border rounded-xl p-2">
              <input
                type="email"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-2 py-1 text-sm outline-none lowercase"
              />
              <button
                onClick={HandleSubscribe}
                className="bg-black text-white cursor-pointer p-2 rounded-full hover:bg-gray-700"
              >
              {laoding ?<AiOutlineLoading3Quarters className='animate-spin w-5 h-5'/>:  <ArrowRight className='w-5 h-5' />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
      >
        <p>© 2025 glowniba.com. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-black"><FaFacebook size={20} /></a>
          <a href="#" className="text-gray-600 hover:text-black"><FaTiktok size={20} /></a>
          <a href="#" className="text-gray-600 hover:text-black"><BsInstagram size={20} /></a>
          <a href="#" className="text-gray-600 hover:text-black"><FaYoutube size={20} /></a>
        </div>
      </motion.div>
    </footer>
  );
}
