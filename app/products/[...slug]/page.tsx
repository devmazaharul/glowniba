'use client';

import { useParams } from 'next/navigation';
import SingleProduct from '@/app/components/client/SingleProduct';
import { productsData } from '@/lib/source';

const Page = () => {
  // useRouter হুক ব্যবহার করে slug মান পাওয়া
  const { slug } = useParams(); // slug এর মান নিয়ে আসা

  if (!slug) {
    return <div>Loading...</div>; // যদি slug না পাওয়া যায়, তাহলে লোডিং শো করা
  }

  const slugValue = slug[0]; // প্রথম অংশটি পণ্য আইডি হিসেবে ব্যবহার
  
  const splitProd = slugValue.split('-');
  const productID = splitProd[splitProd.length - 1];
  const productName=splitProd.slice(0,splitProd.length-productID.length).join(" ")

  const getProduct = productsData.find((item) => item.id === productID && item.name==productName);
  if (!getProduct) {
    throw new Error('Product not found'); // পণ্য না পেলে ত্রুটি ফেলা
  }

const similarProduct=productsData.filter((item)=>item.tags.includes(getProduct.tags[0]))


  return (
    <div className="py-10 section w-[90%] mx-auto ">
      {/* SingleProduct কম্পোনেন্টে পণ্য তথ্য পাঠানো */}
      <SingleProduct item={getProduct} />

      <h1></h1>
    </div>
  );
};

export default Page;
