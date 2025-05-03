"use client";
import React, { useEffect, useState } from 'react';
import ProductCart from '../components/server/ProductCard';
import { productsData } from '@/lib/source';
import SectionTop from '../components/others/SectionTop';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { getProducts } from '@/action/product';
import { productInformation } from '@/types/product';
const Page = () => {
  const [visibleCount, setVisibleCount] = useState(16);
  const [isLoading, setIsLoading] = useState(false);
  const [productInfo,setProductsInfo]=useState<productInformation[]>([])

 useEffect(() => {
    const getproducts = async () => {
      const res = await getProducts();
      if ("items" in res) {
        setProductsInfo(res.items.reverse());
      }else{
        toast.error("Get products faild")
      }
    
    };
    getproducts();
  }, []);


  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setIsLoading(false);
    }, 500); // simulate loading delay
  };


  const visibleProducts = productInfo && productInfo.slice(0, visibleCount);
  const isAllLoaded = visibleCount >= productsData.length;

  return (
    <div className="section">
      <SectionTop title="Products" desc="Your favourite products all in here" />

      <div className="grid space-y-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4 w-[80%] md:w-full mx-auto">
        {!isLoading && visibleProducts.map((item) => (
          <ProductCart key={item.productID} prop={item}/>
        ))}

        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="shadow-2xl shadow-gray-100 p-4 border border-gray-100 w-[85%] sm:w-full mx-auto rounded-2xl bg-white  duration-500 ease-in-out">
              <Skeleton className="h-55 w-full mb-2" />
              <Skeleton className="h-6 w-3/4 mb-1" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
      </div>

      {!isAllLoaded && (
        <div className="w-full text-center my-4">
          <Button variant="outline" className="cursor-pointer" onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
