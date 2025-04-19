'use client';

import Image from 'next/image';
import SectionTop from '../others/SectionTop';
import Link from 'next/link';
import { motion } from 'framer-motion';

const cardVariants = {
  offscreen: {
    opacity: 0,
    scale: 0.9,
  },
  onscreen: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

const Common = () => {
  const items = [
    { id: 1, name: 'Aging', url: '/p1.webp' },
    { id: 2, name: 'Congestion', url: '/p2.webp' },
    { id: 3, name: 'Texture', url: '/p3.webp' },
    { id: 4, name: 'Eye Care', url: '/p4.webp' },
    { id: 5, name: 'Dryness', url: '/p5.webp' },
  ];

  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionTop
          title="Common Concerns"
          desc="Not sure where to begin? Here are some common skin concerns."
        />
      </motion.div>

      <div className="grid md:grid-cols-5 grid-cols-3 gap-4 mt-8">
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.4 }}
          >
            <Link href="/" className="block group">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={item.url}
                  width={500}
                  height={500}
                  alt="problem_image"
                  className="w-full h-fit rounded-md group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
              <p className="text-lg font-medium mt-3 text-center group-hover:text-pink-600 duration-300">
                {item.name}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Common;
