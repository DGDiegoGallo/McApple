import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/Products">
        <button className="btn-primary">
          Ver Productos
        </button>
      </Link>
    </main>
  );
};

export default Home;