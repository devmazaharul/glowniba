'use client';

import { useParams } from 'next/navigation';
import SingleProduct from "@/app/components/client/SingleProduct";
import { productsData } from "@/lib/source";

const Page = () => {
  // useRouter হুক ব্যবহার করে slug মান পাওয়া
  const { slug } = useParams();  // slug এর মান নিয়ে আসা

  if (!slug) {
    return <div>Loading...</div>; // যদি slug না পাওয়া যায়, তাহলে লোডিং শো করা
  }

  const productID = slug[0]; // প্রথম অংশটি পণ্য আইডি হিসেবে ব্যবহার
  const getProduct = productsData.find((item) => item.id === productID);

  if (!getProduct) {
    throw new Error("Product not found"); // পণ্য না পেলে ত্রুটি ফেলা
  }

  return (
    <div className="py-10">
      {/* SingleProduct কম্পোনেন্টে পণ্য তথ্য পাঠানো */}
      <SingleProduct item={getProduct} />
    </div>
  );
};

export default Page;
