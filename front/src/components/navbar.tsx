import React from 'react';
import Link from 'next/link';
import { IoPersonCircleOutline } from "react-icons/io5";
import { TfiApple } from "react-icons/tfi";
import CartIconWithCount from './CartIconWithCount';

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  return (
    <nav className="bg-gray-800 p-4 flex flex-col md:flex-row justify-between items-center md:items-stretch h-auto md:h-16">
      <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center md:items-stretch">
        <li className="md:border-r border-gray-400 h-full flex items-center">
          <Link href="/home" className="text-white p-2 block">
            <div className="flex items-center p-2 bg-gray-700 rounded shadow-lg transform transition-transform duration-200 hover:scale-95">
              <TfiApple className="mr-2" />
              McApple
            </div>
          </Link>
        </li>
        <li className="md:border-r border-gray-400 h-full flex items-center">
          <Link href="/Products" className="text-white p-2 block">
            <div className="p-2 bg-gray-700 rounded shadow-lg transform transition-transform duration-200 hover:scale-95">
              Productos
            </div>
          </Link>
        </li>
      </ul>
      <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0 items-center md:items-stretch">
        {isLoggedIn && (
          <>
            <li className="border-none h-full flex items-center">
              <CartIconWithCount />
            </li>
            <li className="md:border-l border-gray-400 h-full flex items-center">
              <Link href="/dashboard" className="text-white p-2 block">
                <div className="p-2 bg-gray-700 rounded shadow-lg transform transition-transform duration-200 hover:scale-95">
                  <IoPersonCircleOutline size={28} />
                </div>
              </Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li className="md:border-r border-gray-400 h-full flex items-center">
              <Link href="/login" className="text-white p-2 block">
                <div className="p-2 bg-gray-700 rounded shadow-lg transform transition-transform duration-200 hover:scale-95">
                  Login
                </div>
              </Link>
            </li>
            <li className="md:border-r border-gray-400 h-full flex items-center">
              <Link href="/register" className="text-white p-2 block">
                <div className="p-2 bg-gray-700 rounded shadow-lg transform transition-transform duration-200 hover:scale-95">
                  Register
                </div>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;