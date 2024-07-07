"use client";

import React, { useState } from 'react';
import { useGetToken } from '../app/context/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = useGetToken();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await fetch('http://localhost:5767/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const json = await response.json();
          console.log('Usuario logado:', json);
          document.cookie = `token=${json.token}; path=/; SameSite=Lax`;
          setEmail('');
          setPassword('');
          window.location.reload(); // Recargar la página para que se actualice el estado de autenticación
        } else {
          console.log('Error al logar el usuario');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    } else {
      console.log('Por favor, complete todos los campos');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="btn-primary mt-4">Login</button>
    </form>
  );
};

export default Login;