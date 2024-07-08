import React from 'react';
import Link from 'next/link';
import { MdEditDocument, MdAddShoppingCart } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";

const Landing: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('https://treemily.com/wp-content/uploads/2023/05/modern-stationary-collection-arrangement-1-scaled.jpg')" }}>
      <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
      <div className="flex flex-col items-center justify-center mt-4 p-6 bg-white rounded-lg relative z-10">
        <h2 className="text-2xl font-bold text-gray-800">Innovación y Tecnología con Apple</h2>
        <p className="text-gray-600 mt-2">Descubre los últimos productos y avances tecnológicos que Apple tiene para ofrecer</p>
        <p className="text-gray-600 mt-2">Con tan solo registrarse y podrás iniciar sesión, para comprar todos nuestros productos</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4 relative z-10">
        <div className="bg-white p-4 rounded-lg shadow-md w-64 flex flex-col items-center min-h-[150px]">
          <div className="flex items-center justify-center bg-gray-800 p-2 rounded-full mb-2">
            <MdEditDocument className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 text-center">Regístrate con tus datos necesarios.</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-64 flex flex-col items-center min-h-[150px]">
          <div className="flex items-center justify-center bg-gray-800 p-2 rounded-full mb-2">
            <MdAddShoppingCart className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 text-center">Inicia sesión para añadir productos a tu carrito.</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-64 flex flex-col items-center min-h-[150px]">
          <div className="flex items-center justify-center bg-gray-800 p-2 rounded-full mb-2">
            <IoBagCheckOutline className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 text-center">Confirma la compra y espera pacientemente el envío.</h3>
        </div>
      </div>
    </main>
  );
};

export default Landing;