import React from 'react';
import Card from '../../components/Card';
import { IProduct } from '../../interfaces/interfaces';

interface CartItemProps {
  product: IProduct;
  onPurchase: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, onPurchase }) => {
  const handleRemoveFromCart = async (productId: number) => {
    // Implementar la lógica para eliminar el producto del carrito en el backend
  };

  const handlePurchase = async (productId: number) => {
    // Lógica para reducir el stock en el frontend
    onPurchase(productId);

    // Lógica para actualizar el stock en el backend
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Usuario no logeado');
        return;
      }

      const response = await fetch(`http://localhost:5767/products/${productId}/reduce-stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ quantity: 1 }),
      });

      if (!response.ok) {
        console.log('Error al actualizar el stock en el backend');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="card border border-gray-300 p-4 rounded-lg shadow-md">
      <Card {...product} />
      <button onClick={() => handleRemoveFromCart(product.id)} className="btn-primary mt-4 border border-gray-300 rounded">
        Eliminar
      </button>
      <button onClick={() => handlePurchase(product.id)} className="btn-primary mt-4 border border-gray-300 rounded">
        Comprar
      </button>
    </div>
  );
};

export default CartItem;