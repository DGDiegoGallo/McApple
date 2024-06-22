import React from 'react';
import Link from 'next/link';

const Landing: React.FC = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-24">
            <h1 className="text-4xl font-bold">Bienvenido a nuestra tienda</h1>
            <Link href="/home">
                <button className="btn-primary mt-4">Ir a Home</button>
            </Link>
        </main>
    );
};

export default Landing;