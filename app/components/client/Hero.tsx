'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Poppins } from 'next/font/google';
import { HeroSlideImage } from '@/lib/source';

const poppins = Poppins({
  weight: '700',
  style: 'normal',
  subsets: ['latin'],
});

export default function BackgroundImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === HeroSlideImage.length - 1 ? 0 : prev + 1));
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = HeroSlideImage[currentIndex];

  return (
    <section className="w-full relative overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage.url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${currentImage.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col justify-center h-[300px] sm:h-[400px] md:h-[400px] lg:h-[500px] px-4 md:px-10">
        <div
          className={`${poppins.className} max-w-2xl md:max-w-3xl lg:max-w-4xl`}
        >
          {/* Short Title */}
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-sm md:text-base text-gray-700 font-semibold uppercase tracking-widest mb-2"
          >
            {currentImage.shortTitle}
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-800 capitalize text-2xl md:text-4xl lg:text-5xl font-bold mb-3"
          >
            {currentImage.title}
          </motion.h1>

          {/* Subtitle */}
          <div className={poppins.className}>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gray-600 text-md sm:text-lg lg:text-xl font-medium leading-relaxed drop-shadow"
            >
              {currentImage.subtitle}
            </motion.p>
          </div>

          {/* Button */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href={'/search'}>
              <Button variant={'grayType'} className="my-6 cursor-pointer">
                <Search /> Explore Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {HeroSlideImage.map((_, idx) => (
          <button
            onClick={() => setCurrentIndex(idx)}
            key={idx}
            className={`w-10 h-1 rounded-full cursor-pointer duration-500 ${
              idx === currentIndex ? 'bg-gray-800 animate-pulse' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
