"use client"

import React from 'react';
import { useGetToken } from '../../app/context/auth';

const Logout: React.FC = () => {
  const token = useGetToken();

  const handleLogout = () => {
    if (token) {
      localStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    }
    window.location.href = '/';
  };

  return (
    <button onClick={handleLogout} className="btn-primary mt-4 bg-gray-600 rounded text-white">
      Cerrar sesión.
    </button>
  );
};

export default Logout;