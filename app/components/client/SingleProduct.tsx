'use client';
import { productItem } from '@/types';
import Image from 'next/image';
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaGripfire } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa6';
import { Poppins } from 'next/font/google';
import Rating from '../others/Rating';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/addTocart';
import { defualtValue } from '@/constants';
const poppins = Poppins({
  weight: '700',
  style: 'normal',
  subsets: ['latin-ext'],
});
const SingleProduct = ({ item }: { item: productItem }) => {
  const {
    name,
    description,
    shortDescription,
    brand,
    id,
    image,
    price,
    rating,
    stock,
    status,
    reviews,
    discount,
    isDiscount,
    quantity,
  } = item;
  const productLink = defualtValue.siteUrl+`/products/${(item.name + ' ' + item.id)
    .split(' ')
    .join('-')}`;

  const { cart, addToCart, increaseQuantity, decreaseQuantity } =
    useCartStore();
  const finPoduct = cart.find((item) => item.id == item.id);

  return (
    <div className="w-[90%] mx-auto ">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
        <div className=" shadow-gray-50 rounded-2xl cursor-zoom-in p-2">
          <div className="bg-yellow-100 flex opacity-100 md:opacity-0 px-2 md:flex items-center gap-1 rounded-md w-fit text-md">
            {' '}
            <FaGripfire className="fill-yellow-700" /> available
          </div>

          <Image
            className="w-full h-full "
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
              {finPoduct && (finPoduct.quantity ?? 0) > 0 && (
                <div className="flex items-center gap-2 mb-8">
                  <Button
                    disabled={finPoduct?.quantity == 0 ? true : false}
                    onClick={() => decreaseQuantity(item.id)}
                    variant={'outline'}
                  >
                    <FaMinus />
                  </Button>

                  <Button
                    className="cursor-pointer font-bold w-20"
                    variant={'grayType'}
                  >
                    {finPoduct?.quantity || 0}
                  </Button>
                  <Button
                    disabled={
                      finPoduct?.quantity == defualtValue.addProductLimit
                        ? true
                        : false
                    }
                    variant={'outline'}
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <FaPlus />
                  </Button>
                </div>
              )}

              {/*prouduct add to cart and checkout*/}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() =>
                    addToCart({
                      name,
                      brand,
                      stock,
                      shortDescription,
                      description,
                      id,
                      image,
                      price,
                      rating,
                      reviews,
                      discount,
                      isDiscount,
                      quantity,
                      status,
                    })
                  }
                  className="cursor-pointer"
                  variant={'default'}
                >
                  Add to cart
                </Button>
                {finPoduct && (finPoduct.quantity ?? 0) > 0 && <Button variant={'outline'}>Check out</Button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
