'use client';
import { ArrowRight, Mail } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { FaTiktok } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { toast } from 'sonner';
import { useState } from 'react';
import { isValidEmail } from '@/utils';
import { motion } from 'framer-motion';

export default function Footer() {
  const [state, setState] = useState('');
  
  const HandleSubsctibe = () => {
    if (!state) {
      toast('Please provide an email address.',{
        description: 'Email address is required to subscribe.',
        duration: 3000,
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
        style: {
          backgroundColor: '#f0f0f0',
          color: '#333',
          borderRadius: '8px',
          padding: '16px',
        },
       
      });
   
      return;
    }
    if (!isValidEmail(state)) {
      toast('Please provide a valid email address.',{
        description: 'The email address you provided is not valid.',
        duration: 3000,
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
        style: {
          backgroundColor: '#f0f0f0',
          color: '#333',
          borderRadius: '8px',
          padding: '16px',
        },
      });
      return;
    }
    toast('Thank you for subscribing!', {
      description: 'You will receive the latest updates and special offers.',
      duration: 3000,
      action: {
        label: 'Close',
        onClick: () => toast.dismiss(),
      },
      style: {
        backgroundColor: '#f0f0f0',
        color: '#333',
        borderRadius: '8px',
        padding: '16px',
      },
    });
  };

  return (
    <footer className="bg-white text-center text-gray-700 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto m-3 grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h3 className="font-semibold mb-3">Search</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home page</a></li>
            <li><a href="#" className="hover:underline">Search</a></li>
            <li><a href="#" className="hover:underline">All collections</a></li>
            <li><a href="#" className="hover:underline">Backpack</a></li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="space-y-2"
        >
          <h3 className="font-semibold mb-3">Home page</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home page</a></li>
            <li><a href="#" className="hover:underline">Search</a></li>
            <li><a href="#" className="hover:underline">Backpack</a></li>
            <li><a href="#" className="hover:underline">Home page</a></li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <h3 className="font-semibold mb-3">All collections</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Recycled Blanket</a></li>
            <li><a href="#" className="hover:underline">Home page</a></li>
            <li><a href="#" className="hover:underline">Search</a></li>
            <li><a href="#" className="hover:underline">All collections</a></li>
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="space-y-4 max-w-[80%] border border-gray-100 px-4 py-8 rounded-xl shadow shadow-gray-50 col-span-2"
        >
          <h3 className="flex border-b py-2 border-gray-100 px-2 items-center gap-2 font-bold mb-3">
            <Mail />
            <p>Stay up to date</p>
          </h3>
          <p className="text-sm text-gray-400">
            Subscribe to our newsletter to get the latest updates and special offers.
          </p>
          <div className="flex h-11 items-center rounded-xl px-2 border border-gray-200">
            <input
              type="email"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="Enter your email address"
              className="w-full border-gray-300 focus:outline-none"
            />
            <button
              onClick={HandleSubsctibe}
              className="bg-black text-white p-1 rounded-full hover:bg-gray-700 cursor-pointer"
            >
              <ArrowRight />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
      >
        <p>© 2025 glowniba.com. Ltd. All rights reserved.</p>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-black">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            <FaTiktok size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            <BsInstagram size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            <FaYoutube size={20} />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
