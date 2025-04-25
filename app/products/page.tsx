
import React from 'react';
import ProductCart from '../components/server/ProductCard';
import { productsData } from '@/lib/source';
const Page = () => {
  
  return (
    <div className="grid my-4 section md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4">
      {productsData.map((item) => {
        return <ProductCart quantity={0} key={Math.random()} {...item}  />;
      })}
    </div>
  );
};

export default Page;
