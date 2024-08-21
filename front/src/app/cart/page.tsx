"use client"

import React, { useEffect, useState } from 'react';
import CartList from '../../components/CartComponent/CartList';
import { IProduct } from '../../interfaces/interfaces';
import { useGetToken } from '../context/auth';
import withAuth from '../../components/Validations/ProtectedRoute';

const Cart: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const token = useGetToken();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (token) {
      const cartKey = `cart_${token}`;
      const storedCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
      setProducts(storedCart);
    }
  }, [token]);

  if (!isMounted) {
    return null;
  }

  if (!token) {
    return <div>Usuario no logeado</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl font-bold">
        {products.length === 0 ? '¡No tienes ningún producto en el Carrito!' : 'Carrito de Compras'}
      </h1>
      {products.length > 0 && <CartList products={products} />}
    </main>
  );
};

export default withAuth(Cart);