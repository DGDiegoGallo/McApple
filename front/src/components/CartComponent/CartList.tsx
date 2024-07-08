import React, { useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/interfaces';
import CartItem from './CartItem';
import { useGetToken } from '../../app/context/auth';

interface CartListProps {
  products?: IProduct[];
}

const CartList: React.FC<CartListProps> = ({ products = [] }) => {
  const [cartProducts, setCartProducts] = useState<IProduct[]>(products);
  const token = useGetToken();

  useEffect(() => {
    if (token) {
      const cartKey = `cart_${token}`;
      const storedCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
      setCartProducts(storedCart);
    }
  }, [token]);

  const handleUpdateCart = (updatedCart: IProduct[]) => {
    setCartProducts(updatedCart);
  };

  return (
    <div>
      {cartProducts.map(product => (
        <CartItem
          key={product.id}
          product={product}
          onPurchase={() => {}}
          onRemove={() => {}}
          onUpdateCart={handleUpdateCart}
        />
      ))}
    </div>
  );
};

export default CartList;