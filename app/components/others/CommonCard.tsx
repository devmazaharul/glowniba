'use client';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { commonCartType } from '@/types';
import Rating from './Rating';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/addTocart';
import { FaGripfire } from "react-icons/fa";

const CommonCard = ({
  item,
  color,
}: {
  item: commonCartType;
  color: string;
}) => {
  const {
    brand,
    id,
    image,
    name,
    price,
    rating,
    reviews,
    shortDescription,
    description,
    stock,
    tags
  } = item;
  const cardVariants = {
    offscreen: {
      opacity: 0,
      y: 50,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 0.8,
      },
    },
  };

  const addProudctTocart = useCartStore((state) => state.addToCart);
  const productLink = `/products/${(name + ' ' + id).split(' ').join('-')}`;

  return (
    <>
      <div className="shadow-2xl  shadow-gray-100 p-4 border border-gray-100 rounded-2xl bg-white hover:translate-y-2 duration-500 ease-in-out">
      {item.isDiscount ?<p className='w-fit flex items-center  bg-yellow-100 rounded-md px-2 text-yellow-800  '> <FaGripfire/> {parseInt(item.discount || '0')}% less</p>:<p className='opacity-0'>new</p>}
        <Link href={productLink}>
          <motion.div
            className="text-center "
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={image}
              width={500}
              height={500}
              alt={item.name}
              className="w-[140px] mx-auto h-[140px] object-contain"
            />

        
       
           <p
              className={`${color} px-3 py-1 rounded-full mx-auto w-fit my-3 capitalize text-sm`}
            >
              {item.isDiscount && item.discount ?  <span> <span className='line-through'> ৳{item.price}</span>  ৳{item.price - (item.price * Number(item.discount || 0)) / 100}</span> :  '৳'+item.price}
            </p>
      

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {name.slice(0, 18)}
              </h3>
              <div>
                <Rating rating={rating} reviews={reviews} />
              </div>
              <p className="text-gray-500 mt-2 text-sm">
                {shortDescription.slice(0, 50)}
              </p>
            </div>
          </motion.div>
        </Link>
        <div className="w-fit mx-auto my-2">
          <Button
            onClick={() =>
              addProudctTocart({
                id,
                brand,
                image,
                name,
                price,
                quantity: 0,
                rating,
                reviews,
                shortDescription,
                description,
                stock,
                discount: '20',
                isDiscount: true,
                status: 'new',
                tags
              })
            }
            variant={'outline'}
          >
            Add to card
          </Button>
        </div>
      </div>
    </>
  );
};

export default CommonCard;
