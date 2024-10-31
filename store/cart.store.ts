import { GetAllProductsServiceSuccessProps } from '@/api/services.product.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CartItemProps {
  item: GetAllProductsServiceSuccessProps;
  counter: number;
}

interface CartStateProps {
  cart: CartItemProps[];
}

interface CartActions {
  addItem: (item: GetAllProductsServiceSuccessProps) => void;
  removeItem: (id: string) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<CartStateProps & CartActions>(
    (set) => ({
      cart: [],
      addItem: (item: GetAllProductsServiceSuccessProps) => {
        set((state) => {
          const existingItem = state.cart.find((cartItem) => cartItem.item.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.item.id === item.id ? { ...cartItem, counter: cartItem.counter + 1 } : cartItem
              ),
            };
          } else {
            return {
              cart: [...state.cart, { item, counter: 1 }],
            };
          }
        });
      },
      removeItem: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((cartItem) => cartItem.item.id !== id),
        }));
      },
      incrementItem: (id: string) => {
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.item.id === id ? { ...cartItem, counter: cartItem.counter + 1 } : cartItem
          ),
        }));
      },
      decrementItem: (id: string) => {
        set((state) => {
          const updatedCart = state.cart
            .map((cartItem) => (cartItem.item.id === id ? { ...cartItem, counter: cartItem.counter - 1 } : cartItem))
            .filter((cartItem) => cartItem.counter > 0);
          return { cart: updatedCart };
        });
      },
      clearCart: () => {
        set(() => ({
          cart: [],
        }));
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
