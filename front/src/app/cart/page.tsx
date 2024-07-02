"use client"

import React, { useEffect, useState } from 'react';
import { IOrder } from '../../interfaces/interfaces';
import CartList from '../../components/CartComponent/CartList';
import { fetchCartOrders } from '../../utils/fetchOrder';

const Cart: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const loadCartOrders = async () => {
      const orders = await fetchCartOrders();
      if (orders) {
        setOrders(orders);
      }
    };

    loadCartOrders();
  }, []);

  const handlePurchase = (productId: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => ({
        ...order,
        products: order.products.map((product) =>
          product.id === productId ? { ...product, stock: product.stock - 1 } : product
        ),
      }))
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl font-bold">Carrito de Compras</h1>
      <CartList orders={orders} onPurchase={handlePurchase} />
    </main>
  );
};

export default Cart;
