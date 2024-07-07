import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between">
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
        {isLoggedIn && (
          <li>
            <Link href="/dashboard" className="text-white">Dashboard</Link>
          </li>
        )}
      </ul>
      <ul className="flex space-x-4">
        {!isLoggedIn && (
          <>
            <li>
              <Link href="/login" className="text-white">Login</Link>
            </li>
            <li>
              <Link href="/register" className="text-white">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;