"use client"

import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { IProduct, IOrder } from '../interfaces/interfaces';

const Cart: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchCartOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Usuario no logeado');
        return;
      }

      try {
        const response = await fetch('http://localhost:5767/users/orders', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (response.ok) {
          const orders: IOrder[] = await response.json();
          setOrders(orders);
        } else {
          console.log('Error al obtener las órdenes del carrito');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchCartOrders();
  }, []);

  const handleRemoveFromCart = async (productId: number) => {
    // Implementar la lógica para eliminar el producto del carrito en el backend
  };

  const handlePurchase = (productId: number) => {
    handleRemoveFromCart(productId);
    // Aquí puedes agregar la lógica para procesar la compra
    console.log('Producto comprado:', productId);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl font-bold">Carrito de Compras</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {orders.map((order) => (
          order.products.map((product) => (
            <div key={product.id} className="card border border-gray-300 p-4 rounded-lg shadow-md">
              <Card {...product} />
              <button onClick={() => handleRemoveFromCart(product.id)} className="btn-primary mt-4 border border-gray-300 rounded">
                Eliminar
              </button>
              <button onClick={() => handlePurchase(product.id)} className="btn-primary mt-4 border border-gray-300 rounded">
                Comprar
              </button>
            </div>
          ))
        ))}
      </div>
    </main>
  );
};

export default Cart;