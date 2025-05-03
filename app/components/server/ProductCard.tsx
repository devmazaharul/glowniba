import Image from 'next/image';
import Rating from '../others/Rating';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useCartStore } from '@/store/addTocart';
import React from 'react';
import { useWishlistStore } from '@/store/addTowishlist';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { productInformation } from '@/types/product';
import { MdBookmarkAdd } from 'react-icons/md';
import { toast } from 'sonner';

const ProductCart = ({ prop }: { prop: productInformation }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const isWishList = useWishlistStore((state) =>
    state.isWishlisted(prop.productID)
  );
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
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      addToCart({ ...prop });
    } catch {
      toast.error('Add to cart failed');
    }
  };

  return (
    <motion.div
      key={prop.productID}
      className="cursor-pointer shadow-2xl shadow-gray-100 p-3 border border-gray-100 w-[85%] sm:w-full mx-auto rounded-2xl bg-white duration-500 ease-in-out"
    >
      <div className="rounded-md">
        <div className="flex items-center px-1 relative top-[2px] justify-between w-full">
          <div className="w-full pb-2">
            {prop.isDiscount ? (
              <p className="bg-blue-100 text-blue-800 px-1 rounded-sm w-fit my-3 capitalize text-sm">
                discount
              </p>
            ) : (
              <p className="bg-gray-100 text-gray-800 px-1 rounded-sm w-fit my-3 capitalize text-sm">
                {prop.status || 'new'}
              </p>
            )}
          </div>
          <div className="w-full text-right">
            <button onClick={(e) => handleToggleWishList(prop.productID, e)}>
              <Heart
                tabIndex={1}
                className={`${
                  isWishList && 'fill-black'
                } cursor-pointer duration-800 ease-in-out h-9 w-9 p-2 border rounded-full bg-white outline-none`}
              />
            </button>
          </div>
        </div>
        <Link href={`/products/${prop.slug}`}>
          <motion.div transition={{ type: 'spring', stiffness: 50 }}>
            <Image
              src={prop.image}
              alt={prop.brand}
              width={300}
              height={300}
              className="w-full h-[250px] object-cover rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </motion.div>
        </Link>
      </div>

      <div className="px-2 py-3">
        <Link href={`/products/${prop.slug}`}>
          <h1 className="text-lg font-semibold capitalize py-2">
            {prop.name.slice(0, 18)} 
          </h1>
        </Link>

        <div className="flex items-center justify-between">
          <Rating rating={prop.rating} reviews={prop.reviews} />
        </div>

        <div className="py-1">
          <small className="text-gray-500">
            {prop.shortDescription.length > 60
              ? prop.shortDescription.slice(0, 60) + '...'
              : prop.shortDescription}
          </small>
        </div>

        <div className="flex w-[95%] mx-auto items-center py-2">
          <b
            className={`${
              prop.isDiscount && 'line-through'
            } px-2 flex items-center`}
          >
            ৳ {parseInt(prop.price.toString())}
          </b>
          {prop.isDiscount ? (
            <p className="text-gray-700">
              <b>
                ৳{' '}
                {parseInt(
                  (
                    prop.price -
                    (prop.price * Number(prop.discount || 0)) / 100
                  ).toString()
                )}
              </b>
              <small> less price</small>
            </p>
          ) : (
            <small>{' - Limited stock'}</small>
          )}
        </div>

        <div className="w-[80%] md:w-fit mx-auto text-center my-6">
          <Button
            variant={'default'}
            onClick={handleAddproduct}
            className="cursor-pointer w-full hover:bg-gray-600"
          >
            <MdBookmarkAdd className="text-lg hidden md:block " />
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCart;
