import React from 'react';
import { IProduct } from '../interfaces/interfaces';
import Image from 'next/image';
import Link from 'next/link';

const Card: React.FC<IProduct> = ({ id, name, description, price, stock, image }) => {
  return (
    <Link href={`/Products/${id}`}>
      <div className="card border border-gray-300 p-4 rounded-lg shadow-md cursor-pointer text-center">
        <div className="flex justify-center">
          <Image src={image} alt={name} width={500} height={500} />
        </div>
        <h2 className="text-xl font-bold mt-2">{name}</h2>
        <p className="text-gray-700">${price}</p>
        <p className="text-gray-700 border border-green-500 rounded-lg p-2 inline-block">
          Stock: {stock}
        </p>
        <div className="md:hidden">
          <button 
            className="mt-2 text-blue-500 underline" 
            onClick={(e) => {
              e.preventDefault();
              const desc = e.currentTarget.nextElementSibling;
              if (desc) {
                desc.classList.toggle('hidden');
              }
            }}
          >
            Descripción
          </button>
          <p className="text-gray-700 hidden">{description}</p>
        </div>
        <p className="text-gray-700 mt-2 hidden md:block">{description}</p>
      </div>
    </Link>
  );
};

export default Card;