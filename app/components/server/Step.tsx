'use client';

import Image from 'next/image';
import React from 'react';
import SectionTop from '../others/SectionTop';
import { motion } from 'framer-motion';
import { stepData } from './../../../lib/source';

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

const Step = () => {
  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2 }}
      >
        <SectionTop
          title="How Glow Niba Works"
          desc="Discover how easy it is to shop your favorite skincare products. Glow beautifully, naturally!"
        />
      </motion.div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-5">
        <h1>{typeof window!=="undefined" &&window.navigator.userAgent.toLocaleLowerCase().includes("windows")?"yes windows":"not windows " }</h1>
        {stepData.map((item, idx) => (
          <motion.div
            key={idx}
            className="text-center shadow-2xl shadow-gray-100 p-4 border border-gray-100 rounded-2xl bg-white hover:translate-y-2 duration-500 ease-in-out"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={item.img}
              width={500}
              height={500}
              alt={item.title}
              className="w-[140px] mx-auto h-[140px] object-contain"
            />

            <p
              className={`${item.bg} ${item.textColor} px-3 py-1 rounded-full mx-auto w-fit my-3 capitalize text-sm`}
            >
              {item.step}
            </p>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-500 mt-2 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Step;
