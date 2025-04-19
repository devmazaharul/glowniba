'use client';
import { ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCartStore } from '@/store/addTocart';
import { productItem } from '@/types';
import Spiner from './Spiner';
import { useState } from 'react';
import { toast } from 'sonner';

const CustomSheetContent = () => {
  const { increaseQuantity, decreaseQuantity, cart, removeFromCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const HandleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast('Order has been placed', {
        description: `Your order has been placed successfully`,
        duration: 5000,
        style: {
          backgroundColor: '#fff',
          color: '#000',
        },
        action: {
          label: 'close',
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }, 5000);
  };

  return (
    <>
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
            <SheetClose className="absolute right-4 top-4 z-10 cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-all" />
            <SheetTitle className="flex items-center gap-1">
              <span className="text-lg font-semibold">My Cart</span>
              <ShoppingBag />
            </SheetTitle>
          </SheetHeader>

          {/* Cart Items with Scroll */}
          <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-2">
            {cart.length > 0 ? (
              cart.map((item: productItem) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b p-2"
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
                      <h4 className="text-md font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.price}৳</p>
                      <div className="flex items-center gap-3 my-2">
                        <Button onClick={() => decreaseQuantity(item.id)} variant={"outline"} disabled={item.quantity == 1} className={`${item.quantity == 1 ? 'disabled:bg-gray-200' : ''}`}>
                          -
                        </Button>
                        <button>{item.quantity}</button>
                        <Button onClick={() => increaseQuantity(item.id)} variant={"outline"}>
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    variant="ghost"
                    size="sm"
                    className='cursor-pointer'
                  >
                    <X className="h-4 w-4 hover:bg-gray-50 " />
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Your cart is empty
              </div>
            )}
          </div>

          {/* Footer */}
          <SheetFooter className="pt-4 border-t mt-2">
            <div className="flex flex-col w-full gap-4">
              {/* Total Price */}
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Subtotal:</span>
                <p className="font-semibold">
                  {cart.reduce((total, item) => total + item.price * item.quantity, 0)}৳
                </p>
              </div>
              <small className="text-gray-400">
                Shipping and taxes calculated at checkout.
              </small>

              {/* Checkout Button */}
              {cart.length > 0 && (
                <div className="w-full">
                  <Button onClick={HandleClick} variant={'grayType'} className="w-full">
                    {loading ? <Spiner /> : 'Checkout'}
                  </Button>
                </div>
              )}
            </div>
          </SheetFooter>

        </motion.div>
      </SheetContent>
    </>
  );
};

export default CustomSheetContent;
