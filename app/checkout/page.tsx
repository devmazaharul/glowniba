"use client";
import Image from "next/image";
import { useState } from "react";

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
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md" />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">৳{item.price} x {item.quantity} = ৳{item.price * item.quantity}</p>
                </div>
              </div>
              <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:underline">
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total: ৳{totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
