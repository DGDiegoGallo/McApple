import React from 'react';
import products from '../../../../public/products.json';
import Card from '../../components/Card';
import { IProduct } from '../../interfaces/interfaces';

const ProductDetail: React.FC<{ product: IProduct | null }> = ({ product }) => {
  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <main className="flex flex-col items-center p-24">
      <Card {...product} />
    </main>
  );
};

export default async function Page({ params }: { params: { productId: string[] } }) {
  const product = products.find((p) => p.id.toString() === params.productId[0]) || null;
  return <ProductDetail product={product} />;
}
