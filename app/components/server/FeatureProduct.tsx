'use client';
import React, { useEffect, useState } from 'react';
import SectionTop from '../others/SectionTop';
import { defaultValues } from '@/constants';
import { productInformation } from '@/types/product';
import CommonCard from '../others/CommonCard';
import { getProducts } from '@/action/product';

const FeatureProduct = () => {
  const [products, setProducts] = useState<productInformation[]>([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (res?.status !== 200 || !('items' in res)) throw new Error();
        setProducts(res.items.filter((item) => item.featured === true));
        setErr(false);
      })
      .catch(() => {
        setErr(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-[96%] mx-auto md:w-[93%]">
      <SectionTop
        title="✨ Featured Products ✨"
        desc="আমরা বেছে নিয়েছি সেরা কিছু প্রোডাক্ট, যেগুলো আপনার স্কিন কেয়ারে দেবে অসাধারণ ফলাফল।"
      />

      <div className="grid space-y-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {loading
          ? Array.from({ length: defaultValues.featureListSize }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.slice(0, defaultValues.featureListSize).map((item) => (
              <CommonCard
                key={item._id}
                item={item}
                color="bg-green-100 text-green-700"
              />
            ))}
      </div>

      {err && (
        <div className="text-center py-6 text-red-600 font-semibold">
          কিছু ভুল হয়েছে, প্রোডাক্ট লোড হচ্ছে না।
        </div>
      )}
    </div>
  );
};


export const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse p-3 border border-gray-100 rounded-md shadow-2xl shadow-gray-100 space-y-2">
      <div className="bg-gray-200 h-[160px] w-full rounded-md" />
      <div className="h-4 bg-gray-100 rounded w-3/4"></div>
      <div className="h-4 bg-gray-100 rounded w-1/2"></div>
      <div className="h-6 bg-gray-100 rounded w-full mt-3" />
    </div>
  );
};

export default FeatureProduct;
