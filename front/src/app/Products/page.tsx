"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IProduct } from '../../interfaces/interfaces';
import CartProduct from '../../components/ProductsComponent/CartProduct';
import { fetchProducts } from '../../utils/fetchProducts';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center p-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="card p-4 rounded-lg shadow-md cursor-pointer">
            <Link href={`/Products/${product.id}`}>
              <div className="relative">
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-800 to-transparent z-10 rounded-lg"></div>
                <img src={product.image} alt={product.name} className="w-full h-64 object-contain z-20 relative rounded-lg" />
              </div>
              <h2 className="text-xl font-bold mt-2">{product.name}</h2>
              <p className="text-gray-700 text-right">${product.price}</p>
              <p className="text-gray-700 font-bold border border-green-500 rounded-lg p-1 inline-block">Stock: {product.stock}</p>
            </Link>
            <CartProduct product={product} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductsPage;