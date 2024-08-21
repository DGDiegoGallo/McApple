"use client"

import React from 'react';
import { HiMiniShoppingCart } from "react-icons/hi2";
import Link from 'next/link';
import { useCart } from '../app/context/CartContext';

const CartIconWithCount: React.FC = () => {
  const { cartCount } = useCart();

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