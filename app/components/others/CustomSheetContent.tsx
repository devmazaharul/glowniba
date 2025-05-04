'use client';
import { ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCartStore } from '@/store/addTocart';
import Link from 'next/link';
import { defaultValues } from '@/constants';
import { productInformation } from '@/types/product';
import { FaMinus, FaPlus } from 'react-icons/fa';

const CustomSheetContent = () => {
  const { increaseQuantity, decreaseQuantity, cart, removeFromCart } =
    useCartStore();


  return (
    <SheetContent>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-col h-full"
      >
        {/* Header */}
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
            <span>My Cart</span>
            <div>
              <ShoppingBag className="w-6 h-6 text-gray-600" />
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-2">
          {[...cart].length > 0 ? (
            [...cart].reverse().map((item: productInformation) => (
              <div
                key={item.productID}
                className="flex items-center justify-between border-b border-dashed last:border-b-0 p-2"
              >
                <div className="flex items-center gap-4">
                  <Image
                    width={500}
                    height={500}
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <h4 className="text-md font-medium">
                      {item.name.length > 20
                        ? item.name.slice(0, 35) + '.'
                        : item.name}
                    </h4>
                    <p className="text-sm text-gray-500">{item.price}৳</p>
                    <div className="flex items-center gap-3 my-2">
                      <Button
                        onClick={() => decreaseQuantity(item.productID)}
                        variant={'outline'}
                        disabled={item.quantity == 1 && true}
                      className="cursor-pointer h-7 w-8 text-gray-600"
                      >
                        <FaMinus />
                      </Button>
                      <b className='text-gray-500'>{item.quantity}</b>
                      <Button
                        onClick={() => increaseQuantity(item.productID)}
                        disabled={
                          item.quantity == defaultValues.addProductLimit && true
                        }
                        className="cursor-pointer h-7 w-8 text-gray-600"
                        variant={'outline'}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => removeFromCart(item.productID)}
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer"
                >
                  <X className="h-4 w-4 hover:bg-gray-50" />
                </Button>
              </div>
            ))
          ) : (
            <div className="flex gap-2 items-center justify-center h-full text-gray-400">
              <p>Your cart is empty</p>
              <Link href="/products" className="text-blue-800">
                continue shopping
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <SheetFooter className="pt-4 border-t border-gray-100 mt-2">
          <div className="flex flex-col w-full gap-4">
            {/* Total Price */}
            <div className="flex justify-between">
              <span className="text-lg font-semibold">Total:</span>
              <p className="font-semibold">
                {cart.reduce(
                  (total, item) => total + item.price * (item.quantity ?? 1),
                  0
                )}
                ৳
              </p>
            </div>
            <small className="text-gray-400">
              Shipping and taxes calculated at checkout.
            </small>

            {/* Buttons */}
            {cart.length > 0 && (
              <div className="w-full">
                <div className="my-2">
                  <Link href="/cart" className="w-full">
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                      >
                        View cart
                      </Button>
                    </SheetClose>
                  </Link>
                </div>
                <Link href="/checkout" className="w-full ">
                  <SheetClose asChild>
                    <Button className="w-full cursor-pointer">Checkout</Button>
                  </SheetClose>
                </Link>
              </div>
            )}
          </div>
        </SheetFooter>
      </motion.div>
    </SheetContent>
  );
};

export default CustomSheetContent;
