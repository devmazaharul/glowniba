'use client';
import { useParams } from 'next/navigation';
import SingleProduct from '@/app/components/client/SingleProduct';
import { useEffect, useState } from 'react';
import { productInformation } from '@/types/product';
import { getProductbySlug } from '@/action/product';
import SingleProductSkeleton from '@/app/components/others/SingleProductSkeleton';
import Link from 'next/link';

const Page = () => {
  const  {slug} = useParams();
  const [err, setErr] = useState(false);
  const [product, setProduct] = useState<productInformation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const getproductbyslug=async()=>{
      try {
        const decodeslug=decodeURIComponent(slug.toString().trim())
        const responce=await getProductbySlug(decodeslug)
        if ('data' in responce && responce.status==200) {
          setProduct(responce.data as productInformation);
        } else {
          console.log(responce);
          setErr(true);
        }

      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    }
    getproductbyslug()
  }, [slug]);

  

  return (
    <div className="py-10 section w-[90%] mx-auto">
      {loading && <SingleProductSkeleton />}
      {!loading && product && <SingleProduct item={product} key={product.productID} />}
      {!loading && err && <div className="text-center font-semibold">No product found <Link className='text-blue-400' href={"/products"}>Continue</Link></div>}
    </div>
  );
};

export default Page;
