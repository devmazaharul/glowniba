// stores/useCartStore.ts
import {  defaultValues} from '@/constants';
import { CartStateType } from '@/types';
import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create<CartStateType>()(
  persist(
    (set, get) => ({
      cart: [],
    
      addToCart: (product) => {
        if(get().cart.length>=defaultValues.addTocartLimit){
          toast.warning(`Add to cart limit reached`, {
            description: `You can only add ${defaultValues.addTocartLimit} products added to cart at a time.`,
            duration: 2000,
          }
          )
          return
        }
        const exists = get().cart.find((item) => item.productID === product.productID);
        if (exists) {
          if (exists.quantity == defaultValues.addProductLimit) {
            toast.warning(`Product added faild `, {
              description: `You can only add ${defaultValues.addProductLimit} of this product at a time.`,
              duration: 2000,
            });
            return;
          } else {
            set({
              cart: get().cart.map((item) =>
                item.productID === product.productID
                  ? { ...item, quantity: (item.quantity ?? 1) + 1 }
                  : item
              ),
            });
            toast.success('Product has been added', {
              description: `Successfully added ${product.name} to cart`,
              duration: 2000,
            });
          }
        } else {
          set({ cart: [...get().cart, { ...product, quantity: 1 }] });

          toast.success('Product has been added', {
            description: `Successfully added ${product.name}`,
            duration: 2000,
          });
        }
      },
      removeFromCart: (productid) => {
        set({ cart: get().cart.filter((item) => item.productID !== productid) });
        toast.success('Product has been removed', {
          description: `Successfully removed product from cart`,
          duration: 2000,
        });
      },
      increaseQuantity: (productid) => {
        get().cart.map((item) => {
          if (item.productID == productid) {
            if ((item.quantity ?? 1) < defaultValues.addProductLimit) {
              set({
                cart: get().cart.map((item) =>
                  item.productID == productid
                    ? { ...item, quantity: (item.quantity ?? 1) + 1 }
                    : item
                ),
              });
            } else {
              toast.warning(`Product is not added.`, {
                description: `You can only add ${defaultValues.addProductLimit} of this product at a time.`,
                duration: 3000,
              });
              return;
            }
          }
        });
      },
      decreaseQuantity: (id) => {
        set({
          cart: get().cart.map((item) =>
            item.productID === id && item.quantity !== 0
              ? { ...item, quantity: (item.quantity ?? 1) - 1 }
              : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cartitems',
    }
  )
);
