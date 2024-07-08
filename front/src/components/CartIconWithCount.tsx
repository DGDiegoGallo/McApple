"use client"

import React, { useEffect, useState } from 'react';
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useGetToken } from '../app/context/auth';
import Link from 'next/link';

const CartIconWithCount: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  const token = useGetToken();

  useEffect(() => {
    if (token) {
      const cartKey = `cart_${token}`;
      const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
      setCartCount(cart.length);
    }
  }, [token]);

  return (
    <Link href="/cart" className="text-white p-2 block relative">
      <HiMiniShoppingCart size={28} />
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartIconWithCount;