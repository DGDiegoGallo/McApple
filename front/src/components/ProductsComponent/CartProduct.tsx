"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IProduct } from '../../interfaces/interfaces';
import { useGetToken } from '../../app/context/auth';
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useCart } from '../../app/context/CartContext';

interface CartProductProps {
  product: IProduct;
}

const CartProduct: React.FC<CartProductProps> = ({ product }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const token = useGetToken();
  const router = useRouter();
  const { updateCartCount } = useCart();

  useEffect(() => {
    setIsClient(true);
    setIsLoggedIn(!!token);
  }, [token]);

  const handleAddToCart = () => {
    if (!token) {
      return;
    }

    const cartKey = `cart_${token}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const updatedCart = [...cart, product];
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));

    setIsClicked(true);
    updateCartCount();
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  if (!isLoggedIn || !isClient) {
    return null;
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`btn-primary mt-4 border-black rounded flex items-center transform transition duration-500 hover:scale-105 ${isClicked ? 'bg-green-500' : ''}`}
      disabled={product.stock === 0}
    >
      {isClicked ? 'Producto enviado exitosamente.' : (
        <>
          <HiMiniShoppingCart className="mr-2" />
          Enviar a mi Carrito
        </>
      )}
    </button>
  );
};

export default CartProduct;