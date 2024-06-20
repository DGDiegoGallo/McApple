import React from 'react';

interface CardProps {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
}

import Image from 'next/image';

const Card: React.FC<CardProps> = ({ name, description, price, stock, image }) => {
    return (
        <div className="card">
            <Image src={image} alt={name} width={500} height={500} />
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Price: ${price}</p>
            <p>Stock: {stock}</p>
        </div>
    );
};

export default Card;