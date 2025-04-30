"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const fakeCartItems: CartItem[] = [
  {
    id: "1",
    name: "Jigott UV Sun Block SPF50+",
    price: 520,
    quantity: 2,
    image: "/b.webp",
  },
  {
    id: "2",
    name: "Whitening Face Cream",
    price: 750,
    quantity: 1,
    image: "/a.webp",
  },
];

const Page = () => {
  const [cart, setCart] = useState<CartItem[]>(fakeCartItems);

  const handleRemove = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-[90%] mx-auto p-4 section1">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
     <div className="md:grid space-y-4 md:space-y-0 grid-cols-3 gap-2 ">
         <div className="space-y-4 col-span-2 border border-gray-200 p-2 rounded-md shadow-2xl shadow-gray-100">
          {cart.map(item => (
            <div key={item.id} className="flex border-b border-dashed  last:border-b-0 items-center justify-between   p-4  ">
              <div className="flex items-center gap-4">
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md" />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">{item.price} x {item.quantity} = {item.price * item.quantity} BDT</p>
                </div>
              </div>
              <button onClick={() => handleRemove(item.id)} className="cursor-pointer">
               <MdOutlineDelete className="text-xl fill-red-400 hover:fill-red-500"/>
              </button>
            </div>
          ))}

          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total: {totalPrice} BDT</p>
          </div>
        </div>
        <div className="border p-4 col-span-1 border-gray-200 shadow-2xl shadow-gray-100 rounded-md">
        <div>
          <h1 className="text-xl font-semibold pb-3">Checkout Summary</h1>
          <div className="flex items-center border-b border-dashed py-2 px-1 justify-between">
            <p>Subtotal</p>
            <p>1500 BDT</p>
          </div>
          <div className="flex items-center border-b border-dashed py-2 px-1 justify-between">
            <p>Online fee</p>
            <p>80 BDT</p>
          </div>
          <b className="flex items-center py-2 mt-4 px-1 justify-between">
            <p>Total</p>
            <p>1580 BDT</p>
          </b>

          <div className="mt-7 text-center">
            <Button className="cursor-pointer hover:bg-gray-700 flex items-center gap-1 w-fit mx-auto">Proceed to Checkout <FaArrowRightLong className="text-xl animate-caret-blink ease-in-out duration-100"/></Button>
          </div>
         
        </div>
        </div>
     </div>
      )}
    </div>
  );
};

export default Page;
