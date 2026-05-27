import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Cart, CartItem } from '../data/types';
import type { ReactNode } from 'react';

interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'price'> & { price: number }) => void;
  removeFromCart: (productId: number, variantId: string) => void;
  updateQuantity: (productId: number, variantId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'pdp_cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({ items: [], totalPrice: 0, totalQuantity: 0 });

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        // Invalid JSON, skip
      }
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'price'> & { price: number }) => {
    setCart((prev) => {
      const existing = prev.items.find(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );

      let newItems: CartItem[];
      if (existing) {
        newItems = prev.items.map((i) =>
          i.productId === item.productId && i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        newItems = [...prev.items, item];
      }

      const totalPrice = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const totalQuantity = newItems.reduce((sum, i) => sum + i.quantity, 0);

      return { items: newItems, totalPrice, totalQuantity };
    });
  };

  const removeFromCart = (productId: number, variantId: string) => {
    setCart((prev) => {
      const newItems = prev.items.filter(
        (i) => !(i.productId === productId && i.variantId === variantId)
      );
      const totalPrice = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const totalQuantity = newItems.reduce((sum, i) => sum + i.quantity, 0);
      return { items: newItems, totalPrice, totalQuantity };
    });
  };

  const updateQuantity = (productId: number, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart((prev) => {
      const newItems = prev.items.map((i) =>
        i.productId === productId && i.variantId === variantId
          ? { ...i, quantity }
          : i
      );
      const totalPrice = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const totalQuantity = newItems.reduce((sum, i) => sum + i.quantity, 0);
      return { items: newItems, totalPrice, totalQuantity };
    });
  };

  const clearCart = () => {
    setCart({ items: [], totalPrice: 0, totalQuantity: 0 });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
