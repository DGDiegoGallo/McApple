"use client"

import React, { useEffect, useState } from 'react';
import CartList from '../../components/CartComponent/CartList';
import { IProduct } from '../../interfaces/interfaces';
import { fetchProducts } from '../../utils/fetchProducts';
import { useGetToken } from '../context/auth';

const Cart: React.FC<{ searchParams: { productId: string } }> = ({ searchParams }) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const token = useGetToken();

  useEffect(() => {
    const loadProduct = async () => {
      if (!token) {
        console.log('Usuario no logeado');
        return;
      }

      const productId = searchParams.productId;
      if (!productId) {
        console.log('No se ha seleccionado ningún producto');
        return;
      }

      const products = await fetchProducts();
      const foundProduct = products.find(p => p.id === Number(productId));

      if (!foundProduct) {
        console.log('Producto no encontrado');
        return;
      }

      setProduct(foundProduct);
    };

    loadProduct();
  }, [token, searchParams.productId]);

  if (!token) {
    return <div>Usuario no logeado</div>;
  }

  if (!searchParams.productId) {
    return <div>No se ha seleccionado ningún producto</div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl font-bold">Carrito de Compras</h1>
      <CartList products={[product]} />
    </main>
  );
};

export default Cart;