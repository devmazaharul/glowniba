'use client';

import React from 'react';
import SectionTop from '../others/SectionTop';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import Rating from '../others/Rating';

const Reviews = () => {
  const customers = [
    {
      id: 1,
      name: "Sarah Ahmed",
      date: "March 10, 2025",
      comment: "Amazing products and super fast delivery!",
      image: "https://amimazaharul.vercel.app/_next/image?url=%2Fmazaharul-islam.png&w=384&q=75",
    },
    {
      id: 2,
      name: "John Doe",
      date: "April 5, 2025",
      comment: "Loved the packaging and quality!",
      image: "https://amimazaharul.vercel.app/_next/image?url=%2Fmazaharul-islam.png&w=384&q=75",
    },
    {
      id: 3,
      name: "Emily Smith",
      date: "April 12, 2025",
      comment: "Will definitely order again. Highly recommended!",
      image: "https://amimazaharul.vercel.app/_next/image?url=%2Fmazaharul-islam.png&w=384&q=75",
    },
    {
      id: 4,
      name: "Emily Smith",
      date: "April 12, 2025",
      comment: "Will definitely order again. Highly recommended!",
      image: "https://amimazaharul.vercel.app/_next/image?url=%2Fmazaharul-islam.png&w=384&q=75",
    },
    {
      id: 5,
      name: "Emily Smith",
      date: "April 12, 2025",
      comment: "Will definitely order again. Highly recommended!",
      image: "https://amimazaharul.vercel.app/_next/image?url=%2Fmaza-original_processed1.jpg&w=640&q=75",
    },
    // আরো কাস্টমার data...
  ];

  const cardVariants = {
    offscreen: {
      opacity: 0,
      y: 50,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 0.8,
      },
    },
  };

  return (
    <div className="py-10">
      {/* Top Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionTop
          title="What Our Customers Say" 
          desc="Real stories from our happy customers. See why they love Glow Niba!"
        />
      </motion.div>

      {/* Marquee Section */}
      <div className="mt-10">
        <Marquee pauseOnClick speed={50} gradient={false}>
          {customers.map((item, idx) => (
            <motion.div
              key={idx}
              className="mx-5 w-[300px] min-w-[250px] text-center shadow-2xl shadow-gray-50 p-6 border border-gray-100 rounded-2xl bg-white hover:scale-95 duration-500 ease-in-out"
              variants={cardVariants}
              
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src={item.image}
                  width={70}
                  height={70}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <p className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full mx-auto w-fit my-3 capitalize text-sm">
                {item.date}
              </p>

              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <Rating rating={5}   reviews={9999}/>
              <p className="text-gray-500 mt-2 text-sm">{item.comment}</p>
            </motion.div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Reviews;
