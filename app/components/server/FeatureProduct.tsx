'use client';
import React from 'react';
import { productsData } from '@/lib/source';
import SectionTop from '../others/SectionTop';
import { defualtValue } from '@/constants';
import CommonCard from '../others/CommonCard';

const FeatureProduct = () => {
  const featuredProducts = productsData.filter((item) => {
    return item?.isFeatured;
  });

  return (
    <div className="section">
      <SectionTop
        title="✨ Featured Products ✨"
        desc=" আমরা বেছে নিয়েছি সেরা কিছু প্রোডাক্ট, যেগুলো আপনার স্কিন কেয়ারে দেবে অসাধারণ ফলাফল।"
      />
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {featuredProducts
            .slice(0, defualtValue.featureListSize)
            .map((item, idx) => (
              <CommonCard key={idx} item={item} color='bg-yellow-100 text-yellow-800' />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;
