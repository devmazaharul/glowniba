// stores/useCartStore.ts
import { defualtValue } from '@/constants';
import { CartStateType, productItem } from '@/types';
import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create<CartStateType>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product: productItem) => {
        const exists = get().cart.find((item) => item.id === product.id);
        if (exists) {
          if (exists.quantity == defualtValue.addProductLimit) {
            toast.warning(`Product added faild `, {
              description: `You can only add ${defualtValue.addProductLimit} of this product at a time.`,
              duration: 2000,
            });
            return;
          } else {
            set({
              cart: get().cart.map((item) =>
                item.id === product.id
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
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
        toast.success('Product has been removed', {
          description: `Successfully removed product from cart`,
          duration: 2000,
        });
      },
      increaseQuantity: (id) => {
        get().cart.map((item) => {
          if (item.id == id) {
            if ((item.quantity ?? 1) < defualtValue.addProductLimit) {
              set({
                cart: get().cart.map((item) =>
                  item.id == id
                    ? { ...item, quantity: (item.quantity ?? 1) + 1 }
                    : item
                ),
              });
              // toast.success(`Product quantity increased`, {
              //   description: `Product quantity has been increased`,
              //   duration: 3000,
              // });
            } else {
              toast.warning(`Product added faild `, {
                description: `You can only add ${defualtValue.addProductLimit} of this product at a time.`,
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
            item.id === id && item.quantity !== 0
              ? { ...item, quantity: (item.quantity ?? 1) - 1 }
              : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'glow-niba-cart',
    }
  )
);
