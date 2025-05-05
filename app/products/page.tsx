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
import { BiSearch } from 'react-icons/bi';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Page = () => {
  const limit = productLimitation.productShowLImit;
  const [visibleCount, setVisibleCount] = useState<number>(limit);
  const [isLoading, setIsLoading] = useState(true);
  const [productInfo, setProductsInfo] = useState<productInformation[]>([]);
  const [search, setSearch] = useState('');
  const [wait, setWait] = useState(false);
  const [sortkey,setSortkey]=useState("")

  useEffect(() => {
    const getProducts = async () => {
      const res = await getProductsClient();
      if ('data' in res) {
        const productData = (res?.data as productInformation[]) || [];
        setProductsInfo(productData);
      } else {
        toast.error('Failed to load products');
      }
      setIsLoading(false);
    };
    getProducts();
  }, []);

  const handleLoadMore = () => {
    setWait(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + limit);
      setWait(false);
    }, 1000);
  };

  const sortedProducts = [...productInfo].filter((item) =>
    `${item.name} ${item.category} ${item.brand} ${item.shortDescription}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  
  if (sortkey === 'hightolow') {
    sortedProducts.sort((a, b) => {
      const priceA = a.isDiscount ? a.price - (a.price * (a.discount || 0) / 100) : a.price;
      const priceB = b.isDiscount ? b.price - (b.price * (b.discount || 0) / 100) : b.price;
      return priceB - priceA; // High to low
    });
  } else if (sortkey === 'lowtohigh') {
    sortedProducts.sort((a, b) => {
      const priceA = a.isDiscount ? a.price - (a.price * (a.discount || 0) / 100) : a.price;
      const priceB = b.isDiscount ? b.price - (b.price * (b.discount || 0) / 100) : b.price;
      return priceA - priceB; // Low to high
    });
  }
   else if (sortkey === 'discount') {
    sortedProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
  } else if (sortkey === 'new') {
    sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortkey === 'popular') {
    sortedProducts.sort((a, b) => Number((b.reviews|| 0)) - (Number(a.reviews || 0)))
  }
  
  const visibleProducts = sortedProducts.slice(0, visibleCount);
  

  const isAllLoaded = visibleProducts.length >= sortedProducts.length;

  return (
    <div className="p-4 section1">
      <SectionTop title="Products" desc="Your favourite products all in here" />

     <div className='md:flex space-y-4 md:space-y-0  items-center justify-between gap-5 mb-6 px-4'>
     <div className=" md:w-2/3 ">
     <Label className='pb-2'>Search</Label>
       
       <div className='flex items-center gap-3  bg-white rounded-xl px-3  border  border-[#eeeeee] shadow-2xl shadow-gray-100'>
       <BiSearch className="text-2xl text-gray-500" />
       <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for products..."
          className="w-full py-2 outline-none bg-transparent"
        />
       </div>
      </div>

      <div className='md:w-1/3'>
  <Label className='block mb-2'>Sort by</Label>
  <Select value={sortkey} onValueChange={setSortkey}>
    <SelectTrigger className="w-full py-5 px-4 rounded-xl border border-[#eeeeee] bg-white shadow-2xl shadow-gray-100 outline-none ">
      <SelectValue placeholder="Select type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="hightolow" className="cursor-pointer">Price high to low</SelectItem>
      <SelectItem value="lowtohigh" className="cursor-pointer">Price low to high</SelectItem>
      <SelectItem value="discount" className="cursor-pointer">Discount</SelectItem>
      <SelectItem value="new" className="cursor-pointer">New products</SelectItem>
      <SelectItem value="popular" className="cursor-pointer">Popular products</SelectItem>
    </SelectContent>
  </Select>
</div>

     </div>

      <div className="grid gap-4 lg:w-[95%] mx-auto grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!isLoading &&
          visibleProducts.map((item) => (
            <ProductCart key={item.productID} prop={item} />
          ))}

        {(isLoading || wait) &&
          Array.from({ length: limit }).map((_, index) => (
            <div
              key={index}
              className="p-4 border border-gray-100 w-[90%] sm:w-full mx-auto rounded-2xl bg-white shadow-2xl shadow-gray-100"
            >
              <Skeleton className="h-52 w-full mb-3" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
      </div>
       {/* Show if no product found */}
  {!isLoading && visibleProducts.length === 0 && (
    <div className="col-span-full text-center py-10 text-gray-500 text-lg font-medium">
      😞 No products found matching your search.
    </div>
  )}

      {!isAllLoaded && !isLoading && (
        <div className="w-full text-center my-6">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleLoadMore}
            disabled={wait}
          >
            {wait ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
