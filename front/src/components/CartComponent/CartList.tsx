import React from 'react';
import { IProduct } from '../../interfaces/interfaces';
import CartItem from './CartItem';

interface CartListProps {
  products: IProduct[];
}

const CartList: React.FC<CartListProps> = ({ products }) => {
  return (
    <div>
      {products.map(product => (
        <CartItem
          key={product.id}
          product={product}
          onPurchase={() => {}}
          onRemove={() => {}}
        />
      ))}
    </div>
  );
};

export default CartList;