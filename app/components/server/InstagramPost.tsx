'use client';
import React from 'react';
import { motion } from 'framer-motion';
import SectionTop from '../others/SectionTop';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa'; // Add Heart Icon
import { instaPosts } from '@/lib/source';
import Link from 'next/link';
import { defaultValues } from '@/constants';

const InstagramPost = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i:number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };
  return (
    <div className="py-16 bg-gradient-to-b bg-white ">
      {/* Section Top */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <SectionTop
          title="Glow With Us On Instagram ✨"
          desc="See real results, new launches, and glowing skin inspirations. Follow @GlowNiba today!"
        />
      </motion.div>
      {/* Instagram Post Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 px-5">
        {instaPosts.map((post, idx) => (
          <motion.div
            key={post.id}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl group shadow-2xl shadow-gray-100 hover:shadow-pink-300 transition duration-500 cursor-pointer"
          >
            <Image
              src={post.image}
              alt={post.alt}
              width={500}
              height={500}
              className="w-fit h-fit object-cover transform group-hover:scale-110 transition duration-700"
            />
            {/* Heart Icon on Hover */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
              <FaHeart tabIndex={1} className="text-white text-3xl outline-none animate-pulse focus:fill-red-600" />
            </div>
          </motion.div>
        ))}
      </div>
      {/* CTA Button */}
      <div className="flex justify-center mt-12">
        <Link
          href={defaultValues.instagramUrl}
          target="_blank"
          className="inline-block px-7 py-3 bg-gray-600 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-2xl`"
        >
          Follow {defaultValues.instagramUserName}
        </Link>
      </div>
    </div>
  );
}

export default InstagramPost;
