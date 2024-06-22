import React from 'react';
import Card from '../components/Card';
import products from '../../../public/products.json';

const ProductsPage: React.FC = () => {
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