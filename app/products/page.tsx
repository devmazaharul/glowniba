'use client';
import React, { useEffect, useState } from 'react';
import ProductCart from '../components/server/ProductCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { getProductsClient } from '@/action/product';
import { productInformation } from '@/types/product';
import SectionTop from '../components/others/SectionTop';
import { productLimitation } from '@/constants';

const Page = () => {
  const limit = productLimitation.productShowLImit;
  const [visibleCount, setVisibleCount] = useState<number>(limit); // Start with 6 products visible
  const [isLoading, setIsLoading] = useState(true);
  const [productInfo, setProductsInfo] = useState<productInformation[]>([]);

  useEffect(() => {
    const getproducts = async () => {
      const res = await getProductsClient();
      if ('data' in res) {
        setProductsInfo((res?.data as productInformation[]) || []); // Store fetched products in state
      } else {
        toast.error('Get products failed');
      }
    };
    getproducts();
    setIsLoading(false);
  }, []);

  const [wait,setWait]=useState(false)
  const handleLoadMore = () => {
    setWait(true)
    setTimeout(() => {
      setVisibleCount((prev) => prev + limit); // Increase the count by 6 more products when 'Load More' is clicked
      setWait(false)
    }, 1000); // simulate loading delay
  };

  // Slice the products to show only the first `visibleCount` number
  const visibleProducts = productInfo && productInfo.slice(0, visibleCount);
  const isAllLoaded = visibleProducts.length >= productInfo.length;

  return (
    <div className="section">
      <SectionTop title="Products" desc="Your favourite products all in here" />

        <div>
          <div className="grid space-y-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4 w-[80%] md:w-full mx-auto">
            {/* Display products */}
            {!isLoading &&
              visibleProducts.map((item) => (
                <ProductCart key={item.productID} prop={item} />
              ))}

            {/* Loading Skeleton */}
            {isLoading &&
              Array.from({ length: limit }).map((_, index) => (
                <div
                  key={index}
                  className="shadow-2xl shadow-gray-100 p-4 border border-gray-100 w-[85%] sm:w-full mx-auto rounded-2xl bg-white duration-500 ease-in-out"
                >
                  <Skeleton className="h-55 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            {wait &&
              Array.from({ length: limit }).map((_, index) => (
                <div
                  key={index}
                  className="shadow-2xl shadow-gray-100 p-4 border border-gray-100 w-[85%] sm:w-full mx-auto rounded-2xl bg-white duration-500 ease-in-out"
                >
                  <Skeleton className="h-55 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}

          </div>

          {!isAllLoaded && (
            <div className="w-full text-center my-4">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </div>



      
    </div>
  );
};

export default Page;
