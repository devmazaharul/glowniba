'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTop from '../others/SectionTop';
import { MdExpandMore } from 'react-icons/md';
import { faqData } from '@/lib/source';
import Link from 'next/link';


const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleAnswer = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="section bg-white">
      <SectionTop
        title="Frequently Asked Questions"
        desc="এখানে কিছু সাধারণ প্রশ্ন ও তাদের উত্তর দেওয়া হয়েছে।"
      />

      <div className="max-w-2xl mx-auto mt-8 space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className=" ">
            <motion.button
              onClick={() => toggleAnswer(index)}
              className={`${
                activeIndex !== index ? 'border rounded-md' : ''
              } w-full text-left py-4 px-4 text-xl font-medium text-gray-700 shadow-2xl shadow-gray-100 rounded-t-md border-gray-200 cursor-pointer border-t border-r border-l hover:bg-gray-50 focus:outline-none`}
              whileHover={{ scale: 1.0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>{item.question}</div>
                <motion.div
                  className="inline-block mr-3"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdExpandMore />
                </motion.div>
              </div>
            </motion.button>
            {activeIndex === index && (
              <motion.div
                className="px-6 py-4 text-gray-600 bg-gray-50 rounded-b-md shadow-2xl shadow-gray-100 border-b border-r border-l border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  {item.answer.includes('ফেসবুক পেজ') ? (
                    <div>
                      আমরা একটি সহজ প্রক্রিয়ায় প্রোডাক্ট বিক্রি করি। আপনি আমাদের
                      ওয়েবসাইটে অথবা
                      <Link
                        href={'https://facebook.com/glowniba'}
                        className="text-blue-400"
                        target="_blank"
                      >
                        ফেসবুক পেজ
                      </Link>{' '}
                      গিয়ে প্রোডাক্ট নির্বাচন করে অর্ডার করতে পারবেন।
                    </div>
                  ) : (
                    item.answer
                  )}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
