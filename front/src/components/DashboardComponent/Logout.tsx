"use client";

import React from 'react';
import { useGetToken } from '../../app/context/auth';

const Logout: React.FC = () => {
  const token = useGetToken();

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem(`cart_${token}`);
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    window.location.href = '/';
  };

  return (
    <button onClick={handleLogout} className="btn-primary mt-4">
      Deslogear
    </button>
  );
};

export default Logout;