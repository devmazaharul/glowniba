'use client';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaGripfire } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa6';
import { Poppins } from 'next/font/google';
import Rating from '../others/Rating';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/addTocart';
import { defaultValues } from '@/constants';
import { productInformation } from '@/types/product';
import { toast } from 'sonner';
import { getProductsClient } from '@/action/product';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCart from '../server/ProductCard';
const poppins = Poppins({
  weight: '700',
  style: 'normal',
  subsets: ['latin-ext'],
});
const SingleProduct = ({ item }: { item: productInformation }) => {
  const productLink =
    defaultValues.siteUrl +
    `/products/${decodeURIComponent(item.slug.toString())}`;

  const { cart, addToCart, increaseQuantity, decreaseQuantity } =
    useCartStore();

  const finPoduct = cart.find(
    (val) => val.productID == item.productID && val.slug == item.slug
  );

  const [related, setIsrelated] = useState<productInformation[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const relatedProduct = async () => {
      try {
        const productRes = await getProductsClient();
        if ('data' in productRes) {
          const productsArr = productRes?.data as productInformation[];

          setTimeout(() => {
            setIsrelated(
              productsArr.filter((info) => {
                return info.tags.some((tag) => {
                  return (
                    item.tags.includes(tag) && item.productID != info.productID
                  );
                });
              })
            );
            setLoading(false);
          }, 200);
        }
      } catch {
        toast.error('No related prodcicts');
      }
    };
    relatedProduct();
  }, [item.tags, item.productID]);

  function shuffleProduct(
    arr: productInformation[] = []
  ): productInformation[] {
    return arr.sort(() => Math.random() - 0.5);
  }

  const relatedProduct = useMemo(() => {
    return shuffleProduct(related).slice(0, 8);
  }, [related]);

  return (
    <div className="">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
        <div className="md:mr-5  cursor-zoom-in ">
          <div className="bg-yellow-100 flex opacity-100  relative top-7 left-1 md:opacity-0 px-2 md:flex items-center gap-1 rounded-md w-fit text-md">
            {' '}
            <FaGripfire className="fill-yellow-700" /> available
          </div>

          <Image
            className="w-full max-w-[300px] h-auto rounded-md mx-auto object-contain"
            src={item.image}
            width={600}
            height={600}
            alt={item.name}
          />
        </div>
        <div className="py-3">
          <div>
            <h1
              className={`${poppins.className} overflow-hidden text-3xl pb-4 font-bold capitalize`}
            >
              {item.name || 'Product name'}
            </h1>

            <div className="flex items-center gap-2  ">
              <div className="text-xl text-emerald-500 flex items-center border-emerald-500 rounded-md  px-3 border-2  font-semibold">
                {item.isDiscount ? (
                  <div className="flex items-center gap-1">
                    {' '}
                    <p>৳ {item.price.toFixed(2)}</p>{' '}
                    <p className="line-through text-gray-400 text-sm">
                      ৳{item.price.toFixed(2)}
                    </p>
                  </div>
                ) : (
                  '৳' + item.price
                )}
              </div>
              <div className="bg-yellow-100 opacity-0 md:opacity-100 px-2 md:flex items-center gap-1 rounded-md w-fit text-md">
                {' '}
                <FaGripfire className="fill-yellow-700" /> Trending
              </div>

              <div className="w-fit mx-auto">
                <QRCodeSVG marginSize={1} size={80} value={productLink} />
                <small className="text-center block  text-gray-600">
                  Scan now
                </small>
              </div>
            </div>
            <div className="w-fit py-2">
              <Rating rating={item.rating} reviews={item.reviews} />
            </div>
            <p className="text-gray-500 capitalize">
              {item.shortDescription || 'description text'}
            </p>
            {/* product size */}
            <div className="py-6">
              <div className="flex items-center gap-2">
                {item.size.map((s, i) => (
                  <button
                    key={i}
                    className="border-2 font-semibold rounded-md py-1 px-4  border-gray-400 focus:bg-gray-700 cursor-pointer focus:text-gray-100 text-gray-600"
                  >
                    {s || '10ml'}
                  </button>
                ))}
              </div>
            </div>

            {/*prouduct add to cart and checkout*/}
            <div>
              {finPoduct && (finPoduct.quantity ?? 0) > 0 && (
                <div className="flex items-center gap-2 mb-8">
                  <Button
                    className="cursor-pointer"
                    disabled={finPoduct?.quantity == 1 ? true : false}
                    onClick={() => decreaseQuantity(item.productID)}
                    variant={'outline'}
                  >
                    <FaMinus />
                  </Button>

                  <Button className="font-bold w-20 " variant={'outline'}>
                    {finPoduct?.quantity || 0}
                  </Button>
                  <Button
                    disabled={
                      finPoduct?.quantity == defaultValues.addProductLimit
                        ? true
                        : false
                    }
                    variant={'outline'}
                    onClick={() => increaseQuantity(item.productID)}
                    className="cursor-pointer"
                  >
                    <FaPlus />
                  </Button>
                </div>
              )}

              {/*prouduct add to cart and checkout*/}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => addToCart({ ...item })}
                  className="cursor-pointer"
                  variant={'default'}
                >
                  Add to cart
                </Button>
                {finPoduct && (finPoduct.quantity ?? 0) > 0 && (
                  <Button className="cursor-pointer" variant={'outline'}>
                    Check out
                  </Button>
                )}
              </div>

              <div className="my-6">
                <b className="mb-2 block">Additional information</b>
                <div>
                  <p className="text-gray-500">Brand : {item.brand}</p>
                </div>

                <div className="flex text-gray-500 capitalize">
                  Tags :{' '}
                  {item.tags ? item.tags.join(',') : 'glow_niba,face,serum'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* related products */}

      <div className="mt-50">
        {related && (
          <div>
            <h1 className=" text-xl font-semibold py-2">Related products</h1>
          </div>
        )}
        <div className="grid space-y-2 md:grid-cols-3 relative  lg:grid-cols-4 grid-cols-2 sm:grid-cols-2 gap-4 w-[95%] md:w-full mx-auto">
          {loading ? (
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="shadow-2xl shadow-gray-100 p-4 border border-gray-100 w-[85%] sm:w-full mx-auto rounded-2xl bg-white duration-500 ease-in-out"
                >
                  <Skeleton className="h-55 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </>
          ) : (
            <>
              {relatedProduct.map((item) => (
                <div key={item.productID}>
                  <ProductCart prop={item} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
