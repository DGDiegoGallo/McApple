import React from 'react';
import Card from '../components/Card';
import { IProduct } from '../interfaces/interfaces';

const fetchProducts = async (): Promise<IProduct[]> => {
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
          <Card key={product.id} {...product} />
        ))}
      </div>
    </main>
  );
};

export default ProductsPage;
