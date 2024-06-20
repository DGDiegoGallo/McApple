import React from 'react';
import Card from '../components/Card';
import products from '../../../public/products.json';

const ProductsPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center p-24">
      {products.map(product => (
        <Card key={product.id} {...product} />
      ))}
    </main>
  );
};

export default ProductsPage;