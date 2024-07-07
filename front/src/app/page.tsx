import React from 'react';
import Link from 'next/link';
import styles from '../style/landing/landing.module.css';

const Landing: React.FC = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-24">
            <h1 className="text-4xl font-bold text-white">Bienvenido a nuestra tienda</h1>
            <Link href="/home">
                <button className="btn-primary mt-4">Ir a Home</button>
            </Link>
            <div className={`${styles.parallax} w-full h-64 mt-4`}></div>
        </main>
    );
};

export default Landing;