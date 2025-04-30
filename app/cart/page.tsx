"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdOutlineDelete } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useCartStore } from "@/store/addTocart";
import { FaRegFaceSadTear } from "react-icons/fa6";
import Link from "next/link";
import { defaultValues } from "@/constants";




const Page = () => {


  const {cart,increaseQuantity,decreaseQuantity,removeFromCart}=useCartStore()

  const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 0), 0);

  return (
    <div className="max-w-[90%] mx-auto p-4 section1">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
       <div className="text-center py-6">
         <p className="text-gray-500 flex items-center gap-1 w-fit mx-auto">Your cart is empty <FaRegFaceSadTear/></p>
         <Link href={"/products"} className="text-blue-400 relative top-5 text-2xl">Continue shoping</Link>
       </div>
      ) : (
     <div className="md:grid space-y-4 md:space-y-0 grid-cols-3 gap-2 ">
         <div className="space-y-4 py-4 col-span-2 border border-gray-100 p-2 rounded-md shadow-2xl shadow-gray-100">
          {cart.map(item => (
            <div key={item.id} className="flex border-b border-dashed  last:border-b-0 items-center justify-between py-2  ">
              <div className="flex items-center gap-4">
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md" />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">{item.price} x {item.quantity} = {item.price * (item.quantity || 0)} BDT</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <Button onClick={()=>decreaseQuantity(item.id)} variant={"outline"} disabled={item.quantity==1 && true}  className="cursor-pointer h-8 w-8"> <FaMinus/></Button>
                <b>{item.quantity || 0}</b>
                <Button onClick={()=>increaseQuantity(item.id)} disabled={item.quantity==defaultValues.addProductLimit && true} className="cursor-pointer h-8 w-8" variant={"outline"}><FaPlus/></Button>
              </div>

              <button onClick={() => removeFromCart(item.id)} className="cursor-pointer">
               <MdOutlineDelete className="text-xl fill-red-400 hover:fill-red-500"/>
              </button>
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
            <p>80 BDT</p>
          </div>
          <b className="flex items-center py-2 mt-4 px-1 justify-between">
            <p>Total</p>
            <p>{totalPrice+80} BDT</p>
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
