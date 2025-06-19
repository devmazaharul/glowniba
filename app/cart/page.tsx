'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa6';
import { useCartStore } from '@/store/addTocart';
import { FaRegFaceSadTear } from 'react-icons/fa6';
import Link from 'next/link';
import { defaultValues } from '@/constants';
import Removecart from '../(dashboard)/dashboard/components/Removecart';

const Page = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useCartStore();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 0),
    0
  );




  return (
    <div className="max-w-[98%] mx-auto p-4 section1">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500 flex items-center gap-1 w-fit mx-auto">
            Your cart is empty <FaRegFaceSadTear />
          </p>
          <Link
            href={'/products'}
            className="text-gray-600 relative top-2 text-2xl"
          >
            Continue shoping
          </Link>
        </div>
      ) : (
        <div className="md:grid space-y-4 md:space-y-0 grid-cols-3 gap-2 ">
          <div className="space-y-4 py-4 col-span-2 border border-gray-100 p-2 rounded-md shadow-2xl shadow-gray-100">
            {[...cart].reverse().map((item) => (
              <div
                key={item.productID}
                className="md:flex space-y-4   border-b border-dashed  last:border-b-0 items-center justify-between py-2  "
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-contain w-[100px] h-[100px]"
                  />
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.price} x {item.quantity} ={' '}
                      {item.price * (item.quantity || 0)} BDT
                    </p>
                  </div>
                </div>

                <div className="flex items-center  gap-4 w-fit mx-auto my-2 md:justify-around justify-around ">
                  <div className="flex items-center gap-6 py-1 ">
                    <Button
                      onClick={() => decreaseQuantity(item.productID)}
                      variant={'outline'}
                      disabled={item.quantity == 1 && true}
                       className="cursor-pointer h-7 w-8 text-gray-600"
                    >
                      <FaMinus />
                    </Button>
                    <b className='text-gray-500'>{item.quantity || 0}</b>
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
                  <Removecart productId={item.productID} />
                </div>
              </div>
            ))}
          </div>
          <div className="border p-4 col-span-1 border-gray-100 shadow-2xl shadow-gray-100 rounded-md">
            <div>
              <h1 className="text-xl font-semibold pb-3">Checkout Summary</h1>
              <div className="flex items-center border-b border-dashed py-2 px-1 justify-between">
                <p>Subtotal</p>
                <p>{totalPrice} BDT</p>
              </div>
              <div className="flex items-center border-b border-dashed py-2 px-1 justify-between">
                <p>Online fee</p>
                <p>{defaultValues.processingFee || 0} BDT</p>
              </div>
              <b className="flex items-center py-2 mt-4 px-1 justify-between">
                <p>Total</p>
                <p>{totalPrice + (defaultValues.processingFee || 0)} BDT</p>
              </b>
              <div className="mt-7 text-center">
                <Link href={"/checkout"}>
                <Button className="cursor-pointer hover:bg-gray-700 flex items-center gap-1 w-fit mx-auto">
                  Proceed to Checkout{' '}
                  <FaArrowRightLong className="text-xl animate-caret-blink ease-in-out duration-100" />
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
