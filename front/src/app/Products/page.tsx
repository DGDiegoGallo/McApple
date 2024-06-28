import React from 'react';
import Link from 'next/link';
import { IProduct } from '../interfaces/interfaces';
import CartProduct from '../components/ProductsComponent/CartProduct';

export const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await fetch('http://localhost:5767/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

const ProductsPage: React.FC = async () => {
  const products = await fetchProducts();

  return (
    <main className="flex flex-col items-center p-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="card border border-gray-300 p-4 rounded-lg shadow-md cursor-pointer">
            <Link href={`/Products/${product.id}`}>
              <div>
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <h2 className="text-xl font-bold mt-2">{product.name}</h2>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-gray-700">Stock: {product.stock}</p>
              </div>
            </Link>
            <CartProduct product={product} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductsPage;
