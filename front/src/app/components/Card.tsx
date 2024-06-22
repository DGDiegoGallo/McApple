import React from 'react';
import { IProduct } from '../interfaces/interfaces';
import Image from 'next/image';
import Link from 'next/link';

const Card: React.FC<IProduct> = ({ id, name, description, price, stock, image }) => {
  return (
    <Link href={`/Products/${id}`}>
      <div className="card border border-gray-300 p-4 rounded-lg shadow-md cursor-pointer">
        <Image src={image} alt={name} width={500} height={500} />
        <h2 className="text-xl font-bold mt-2">{name}</h2>
        <p className="text-gray-700">{description}</p>
        <p className="text-gray-700">${price}</p>
        <p className="text-gray-700">Stock: {stock}</p>
      </div>
    </Link>
  );
};

export default Card;
