'use client';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

import Image from 'next/image';
import SectionTop from '../others/SectionTop';
import {categories  } from '@/lib/source';

export default function Category() {
  return (
    <section className=" section">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTop
          title="Shop by Category"
          desc="Discover a variety of skincare, beauty, and baby care products — handpicked to cater to your unique needs."
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Marquee pauseOnHover speed={30} gradient={false}>
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                className="w-40 sm:w-48 mx-3 bg-white rounded-2xl overflow-hidden border border-gray-100 hover:scale-105 ease-in-out  transition-all duration-300 cursor-pointer shadow-sm shadow-gray-50"
                initial={{ scale: 0.95 }}
              >
                <div className="relative w-full h-40 sm:h-48">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    width={300}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center py-3 bg-white">
                  <h3 className="text-base font-semibold text-gray-700">
                    {cat.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}
