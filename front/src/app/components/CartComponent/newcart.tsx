import React from 'react';
import { useRouter } from 'next/router';
import { IProduct } from '../../interfaces/interfaces';

interface NewCartProps {
  product: IProduct;
}

const NewCart: React.FC<NewCartProps> = ({ product }) => {
  const router = useRouter();

  const handleAddToCart = () => {
    // Obtener el carrito actual del localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Agregar el producto al carrito
    cart.push(product);

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Log para verificar los datos
    console.log('Producto agregado al carrito:', product);
    console.log('Carrito actualizado:', cart);

    // Redirigir a la página del carrito
    router.push('/cart');
  };

  return (
    <button onClick={handleAddToCart} className="btn-primary mt-4 border border-gray-300 rounded">
      Carrito
    </button>
  );
};

export default NewCart;
