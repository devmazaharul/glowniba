'use client';

import { productItem } from '@/types';
import { useEffect, useState } from 'react';

const Page = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cartItems = JSON.parse(
        window.localStorage.getItem('glow-niba-cart') || '[]'
      );
      setItems(cartItems?.state?.cart);
    }
  }, []);

  return (
    <div>
      {items && (
        <div>
          {items.map((item: productItem) => (
            <div key={item.id} className="flex items-center gap-4">
              <p>{item.name}</p>
              <p>{item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
