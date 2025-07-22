'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Rating from './Rating';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/addTocart';
import { FaGripfire } from 'react-icons/fa';
import { productInformation } from '@/types/product';
import { MdBookmarkAdd } from 'react-icons/md';

const CommonCard = ({
  item,
  color,
}: {
  item: productInformation;
  color: string;
}) => {
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
  } as const;

  const addProudctTocart = useCartStore((state) => state.addToCart);
  const productLink = `/products/${encodeURIComponent(item.slug)}`;

  return (
    <div className="shadow-2xl shadow-gray-100 p-4 border border-gray-100 rounded-2xl bg-white hover:translate-y-1 duration-500 ease-in-out">
      {/* Discount badge */}
      {item.isDiscount ? (
        <p className="w-fit flex items-center bg-yellow-100 rounded-md px-2 text-yellow-800">
          <FaGripfire /> {parseInt(item.discount.toString())}% less
        </p>
      ) : (
        <p className="opacity-0">{item.status || 'new'}</p>
      )}

      {/* Product image and info */}
      <Link href={productLink}>
        <motion.div
          className="text-center"
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src={item.image}
            width={160}
            height={160}
            alt={item.name}
            className="w-[160px] h-[160px] rounded-md object-cover mx-auto"
          />

          {/* Price badge */}
          <p
            className={`${color} px-3 py-1 rounded-md font-semibold mx-auto w-fit my-3 capitalize text-sm`}
          >
            {item.isDiscount && item.discount ? (
              <span>
                <span className="line-through">৳{item.price}</span> ৳
                {parseInt(
                  (
                    item.price -
                    (item.price * Number(item.discount || 0)) / 100
                  ).toString()
                )}
              </span>
            ) : (
              '৳' + parseInt(item.price.toString())
            )}
          </p>

          {/* Product title and rating */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.name.slice(0, 18)}
            </h3>
            <div>
              <Rating rating={item.rating} reviews={item.reviews} />
            </div>
            <p className="text-gray-500 mt-2 text-sm">
              {item.shortDescription.slice(0, 50)}
            </p>
          </div>
        </motion.div>
      </Link>

      {/* Add to Cart Button */}
      <div className="w-[80%] md:w-fit mx-auto text-center my-4">
        <Button
          variant="outline"
          onClick={() => addProudctTocart({ ...item })}
          className="cursor-pointer w-full hover:bg-gray-100"
        >
          <MdBookmarkAdd className="text-lg md:block" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default CommonCard;
