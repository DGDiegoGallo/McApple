import React from 'react';
import { IOrder } from '../../interfaces/interfaces';
import CartItem from './CartItem';

interface CartListProps {
  orders: IOrder[];
  onPurchase: (productId: number) => void;
}

const CartList: React.FC<CartListProps> = ({ orders, onPurchase }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {orders.map((order) =>
        order.products.map((product) => (
          <CartItem key={product.id} product={product} onPurchase={onPurchase} />
        ))
      )}
    </div>
  );
};

export default CartList;