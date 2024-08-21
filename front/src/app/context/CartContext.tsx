"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useGetToken } from './auth';

interface CartContextProps {
  cartCount: number;
  updateCartCount: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const token = useGetToken();

  const updateCartCount = useCallback(() => {
    if (token) {
      const cartKey = `cart_${token}`;
      const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
      setCartCount(cart.length);
    }
  }, [token]);

  useEffect(() => {
    updateCartCount();
  }, [token, updateCartCount]);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};