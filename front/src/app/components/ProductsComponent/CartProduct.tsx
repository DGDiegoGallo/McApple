"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IProduct } from '../../interfaces/interfaces';

interface CartProductProps {
  product: IProduct;
}

const CartProduct: React.FC<CartProductProps> = ({ product }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleAddToCart = async () => {
    if (!router) return;
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Usuario no logeado');
      return;
    }

    console.log('Token enviado:', token); // Agregar este log

    const requestBody = { products: [product.id] };
    console.log('Datos enviados:', requestBody);

    try {
      const response = await fetch('http://localhost:5767/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log('Producto agregado al carrito:', product);
        router.push('/cart');
      } else {
        const errorData = await response.json();
        console.log('Error al agregar el producto al carrito:', errorData);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
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
