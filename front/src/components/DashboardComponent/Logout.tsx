import React from 'react';
import { useRouter } from 'next/navigation';

const Logout: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <button onClick={handleLogout} className="btn-primary mt-4">
      Deslogear
    </button>
  );
};

export default Logout;
