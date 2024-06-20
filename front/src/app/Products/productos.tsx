import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { IProduct } from '../interfaces/interfaces';

const Products: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/products.json');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="products-grid">
            {products.map(product => (
                <Card
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    stock={product.stock}
                    image={product.image}
                    categoryId={product.categoryId}
                />
            ))}
        </div>
    );
};

export default Products;
