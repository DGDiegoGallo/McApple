"use client";

import React from 'react';
import Card from '../../components/Card';
import { IProduct } from '../../interfaces/interfaces';
import { useGetToken } from '../../app/context/auth';

interface CartItemProps {
  product: IProduct;
  onPurchase: (productId: number) => void;
  onRemove: (productId: number) => void;
  onUpdateCart: (updatedCart: IProduct[]) => void;
}

export const handlePurchase = async (productId: number, token: string | null, onPurchase: (productId: number) => void, onUpdateCart: (updatedCart: IProduct[]) => void) => {
  onPurchase(productId);

  try {
    if (!token) {
      return;
    }

    const requestBody = { products: [productId] };
    const response = await fetch('http://localhost:5767/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      await fetch(`http://localhost:5767/products/${productId}/reduce-stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ quantity: 1 }),
      });

      const cartKey = `cart_${token}`;
      const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
      const updatedCart = cart.filter((item: IProduct) => item.id !== productId);
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));

      onUpdateCart(updatedCart);

      window.location.href = '/dashboard';
    } else {
      const errorData = await response.json();
      console.error('Error al crear la orden de compra:', errorData);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};

const CartItem: React.FC<CartItemProps> = ({ product, onPurchase, onRemove, onUpdateCart }) => {
  const token = useGetToken();

  const handleRemoveFromCart = async (productId: number) => {
    if (!token) {
      return;
    }

    const cartKey = `cart_${token}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const updatedCart = cart.filter((item: IProduct) => item.id !== productId);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    onRemove(productId);

    onUpdateCart(updatedCart);
  };

  return (
    <div className={`card border border-gray-300 p-4 rounded-lg shadow-md ${product.stock === 0 ? 'bg-gray-300' : ''}`}>
      <Card {...product} />
      <div className="flex flex-col items-center mt-4">
        <button
          onClick={() => handlePurchase(product.id, token, onPurchase, onUpdateCart)}
          className="btn-primary mb-4 border border-gray-300 rounded bg-green-500 hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 py-3 px-6"
          disabled={product.stock === 0}
        >
          Comprar
        </button>
        <button
          onClick={() => handleRemoveFromCart(product.id)}
          className="btn-primary border border-gray-300 rounded bg-red-500 hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 py-3 px-6"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;