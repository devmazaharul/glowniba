'use client';
import { productItem } from '@/types';
import Image from 'next/image';
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CiDiscount1 } from 'react-icons/ci';
import { Poppins } from 'next/font/google';
import Rating from '../others/Rating';
import { Button } from '@/components/ui/button';
const poppins = Poppins({
  weight: '700',
  style: 'normal',
  subsets: ['latin-ext'],
});
const SingleProduct = ({ item }: { item: productItem }) => {
  const productLink = `/products/${(item.name + ' ' + item.id)
    .split(' ')
    .join('-')}`;

  return (
    <div className="w-[90%] mx-auto section">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
        <div>
          <Image
            className="w-full h-full shadow-2xl shadow-gray-50 border border-gray-100 rounded-2xl cursor-zoom-in"
            src={item.image}
            width={600}
            height={700}
            alt={item.name}
          />
        </div>
        <div className="py-3">
          <div>
            <h1
              className={`${poppins.className} text-3xl pb-4 font-bold capitalize`}
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
                  item.price
                )}
              </div>
              <div className="bg-red-100 px-2 flex items-center gap-1 rounded-md w-fit text-md">
                {' '}
                <CiDiscount1 className="fill-red-700" /> Sale
              </div>
              <div className="w-fit mx-auto">
                <QRCodeSVG size={80} value={productLink} />
                <small className="text-center block py-1 text-gray-600">
                  Scan now
                </small>
              </div>
            </div>
            <div className="w-fit py-2">
              <Rating rating={item.rating} reviews={item.reviews} />
            </div>
            <p className="text-gray-500 capitalize">
              {item.description || 'description text'}
            </p>
            {/* product size */}
            <div className="py-6">
              <div className="flex items-center gap-2">
                <button className="border-2 font-semibold rounded-md py-1 px-4  border-gray-400 focus:bg-gray-700 cursor-pointer focus:text-gray-100 text-gray-600">
                  10 Ml
                </button>
                <button className="border-2 font-semibold rounded-md py-1 px-4  border-gray-400 focus:bg-gray-700 cursor-pointer focus:text-gray-100 text-gray-600">
                  50 Ml
                </button>
                <button className="border-2 font-semibold rounded-md py-1 px-4  border-gray-400 focus:bg-gray-700 cursor-pointer focus:text-gray-100 text-gray-600">
                  100 Ml
                </button>
              </div>
            </div>

            {/*prouduct add to cart and checkout*/}
            <div>
              <div className="flex items-center gap-2">
                <Button variant={'outline'}>Add to cart</Button>
                <Button className="cursor-pointer" variant={'default'}>
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
