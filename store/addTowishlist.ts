// stores/useWishlistStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WishlistState = {
  wishlist: string[]; // 
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (productId) => {
        const exists = get().wishlist.includes(productId);
        if (exists) {
          set({
            wishlist: get().wishlist.filter((id) => id !== productId),
          });
        } else {
          set({
            wishlist: [...get().wishlist, productId],
          });
        }
      },
      isWishlisted: (productId) => get().wishlist.includes(productId),
    }),
    {
      name: 'wishlist', // localStorage key
    }
  )
);
