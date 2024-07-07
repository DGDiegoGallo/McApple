"use client";

import React from 'react';
import Card from '../../components/Card';
import { IProduct } from '../../interfaces/interfaces';
import { useGetToken } from '../../app/context/auth';

interface CartItemProps {
  product: IProduct;
  onPurchase: (productId: number) => void;
  onRemove: (productId: number) => void;
}

export const handlePurchase = async (productId: number, token: string | null, onPurchase: (productId: number) => void) => {
  onPurchase(productId);

  try {
    if (!token) {
      console.log('Usuario no logeado');
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
      console.log('Orden de compra creada para el producto:', productId);

      await fetch(`http://localhost:5767/products/${productId}/reduce-stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ quantity: 1 }),
      });

      window.location.href = '/dashboard';
    } else {
      const errorData = await response.json();
      console.log('Error al crear la orden de compra:', errorData);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};

const CartItem: React.FC<CartItemProps> = ({ product, onPurchase, onRemove }) => {
  const token = useGetToken();

  const handleRemoveFromCart = async (productId: number) => {
    if (!token) {
      console.log('Usuario no logeado');
      return;
    }

    const cartKey = `cart_${token}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const updatedCart = cart.filter((item: IProduct) => item.id !== productId);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    console.log('Producto eliminado del carrito:', productId);
    onRemove(productId);
  };

  return (
    <div className="card border border-gray-300 p-4 rounded-lg shadow-md">
      <Card {...product} />
      <button onClick={() => handleRemoveFromCart(product.id)} className="btn-primary mt-4 border border-gray-300 rounded">
        Eliminar
      </button>
      <button onClick={() => handlePurchase(product.id, token, onPurchase)} className="btn-primary mt-4 border border-gray-300 rounded">
        Comprar
      </button>
    </div>
  );
};

export default CartItem;