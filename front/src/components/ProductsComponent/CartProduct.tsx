"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IProduct } from '../../interfaces/interfaces';
import { useGetToken } from '../../app/context/auth';

interface CartProductProps {
  product: IProduct;
}

const CartProduct: React.FC<CartProductProps> = ({ product }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const token = useGetToken(); // Llamada al hook fuera de useEffect
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    setIsLoggedIn(!!token);
  }, [token]); // Dependencia de token

  const handleAddToCart = () => {
    if (!token) {
      console.log('Usuario no logeado');
      return;
    }

    router.push(`/cart?productId=${product.id}`);  // Redirigir al carrito de compras con el ID del producto
  };

  if (!isLoggedIn || !isClient) {
    return null;
  }

  return (
    <button onClick={handleAddToCart} className="btn-primary mt-4 border border-gray-300 rounded">
      Carrito
    </button>
  );
};

export default CartProduct;