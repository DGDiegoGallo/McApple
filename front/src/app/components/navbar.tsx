import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white">Inicio</Link>
        </li>
        <li>
          <Link href="/home" className="text-white">Home</Link>
        </li>
        <li>
          <Link href="/Products" className="text-white">Productos</Link>
        </li>
        <li>
          <Link href="/cart" className="text-white">Carrito</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;  