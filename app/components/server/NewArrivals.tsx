'use client';

import { useEffect, useState } from 'react';
import CommonCard from '../others/CommonCard';
import SectionTop from '../others/SectionTop';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/action/product';
import { productInformation } from '@/types/product';
import { ProductCardSkeleton } from './FeatureProduct';

const NewArrivals = () => {
  const [products, setProducts] = useState<productInformation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((response) => {
        if (response?.status !== 200 || !('items' in response)) throw new Error();
        const newArrivalProducts = response.items.filter(
          (item: productInformation) => item.featured === false
        );
        setProducts(newArrivalProducts);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-[96%] mx-auto md:w-[93%] py-10">
      <SectionTop
        title="New Arrivals"
        desc="একদম নতুন যোগ হওয়া আমাদের বেস্ট স্কিন কেয়ার পণ্যগুলো দেখে নিন, যেগুলো আপনার সৌন্দর্য আরও বাড়াবে।"
      />
      <div className="flex items-center justify-between py-2">
        <p></p>
        <Link href={'/products'}>
          <Button variant={'outline'} className='cursor-pointer'>See all products</Button>
        </Link>
      </div>

      <div className="grid space-y-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : products.slice(0, 10).map((item) => (
              <CommonCard
                item={item}
                color="bg-green-100 text-green-800"
                key={item.productID}
              />
            ))}
      </div>
    </div>
  );
};

export default NewArrivals;
