'use client';
import Image from 'next/image';
import Rating from '../others/Rating';
import { productItem } from '@/types';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useCartStore } from '@/store/addTocart';
import React from 'react';
import { useWishlistStore } from '@/store/addTowishlist';
import { SlEnergy } from 'react-icons/sl';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

const ProductCart = (prop: productItem) => {
  const {
    name,
    image,
    rating,
    stock,
    reviews,
    shortDescription,
    price,
    brand,
    id,
    discount,
    isDiscount,
    status,
  } = prop;

  // State management section
  const addToCart = useCartStore((state) => state.addToCart);
  const isWishList = useWishlistStore((state) => state.isWishlisted(id));
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  const handleToggleWishList = (
    pId: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(pId);
  };

  const handleAddproduct = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    {
      name,
      image,
      rating,
      stock,
      reviews,
      shortDescription,
      price,
      brand,
      id,
      discount,
      isDiscount,
      status,
    }: productItem
  ) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({
      name,
      image,
      rating,
      stock,
      reviews,
      shortDescription,
      price,
      brand,
      id,
      discount,
      isDiscount,
      status,
      quantity: 0,
    });
  };

  return (
    <Link href={`/products/${id}/${name.split(' ').join('-')}`}>
      <motion.div
        key={Math.random()}
        className="cursor-pointer shadow-2xl shadow-gray-100 p-4 border border-gray-100 w-[85%] sm:w-full mx-auto rounded-2xl bg-white  duration-500 ease-in-out "
      >
        <div className=" rounded-md">
          <div className="flex items-center px-2 relative top-[8px] justify-between w-full">
            <div className="w-full">
              {isDiscount ? (
                <p className={`bg-blue-100 text-blue-800 px-3 py-1 rounded-full  w-fit my-3 capitalize text-sm`}>
                 discount
                </p>
              ) : (
                <p  className={`bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full  w-fit my-3 capitalize text-sm`}>
                  {status || 'new'}
                </p>
              )}
            </div>
            <div className="w-full text-right">
              <button onClick={(e) => handleToggleWishList(id, e)}>
                <Heart
                  tabIndex={1}
                  className={`${
                    isWishList && 'fill-black'
                  } cursor-pointer duration-800 ease-in-out h-9 w-9 p-2 border rounded-full bg-white outline-none`}
                />
              </button>
            </div>
          </div>
          <motion.div
            transition={{ type: 'spring', stiffness: 50 }}
          >
            <Image
              src={image}
              alt={name}
              width={500}
              height={700}
              className="w-[200px] h-[200px] mx-auto md:hover:scale-110 duration-300 ease-in-out"
            />
          </motion.div>
        </div>
        <div className="px-2 py-3">
          <h1 className="text-lg font-semibold capitalize py-2">{name.slice(0,18)}</h1>
          <div className="flex items-center justify-between">
            <div>
              <Rating rating={rating} reviews={reviews} />
            </div>
          </div>
          <div className="py-1">
            <small className="text-gray-500">
            {shortDescription.length>60?shortDescription.slice(0,60)+"...":shortDescription}
              </small>
          </div>
          <div>
            <div className="flex w-[95%] mx-auto items-center  py-2">
              <b className={`${isDiscount && 'line-through'} px-2`}>
                ৳ {price}
              </b>
              {isDiscount ? (
                <p className="text-gray-700">
                  <b>৳ {price - (price * Number(discount || 10)) / 100}</b>
                  <small> - discount price</small>
                </p>
              ) : (
                <small className=''>{' - Limited stock'}</small>
              )}
            </div>

            <div className="w-[80%] md:w-fit mx-auto text-center my-6">
              <Button
                onClick={(e) =>
                  handleAddproduct(e, {
                    brand,
                    id,
                    image,
                    name,
                    price,
                    rating,
                    reviews,
                    shortDescription,
                    stock,
                    quantity: 0,
                    discount,
                    isDiscount,
                    status,
                  })
                }
                variant={'outline'}
                className="cursor-pointer w-full"
              >
                <SlEnergy className="text-lg hidden md:block" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCart;
