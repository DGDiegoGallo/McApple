"use client";

import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes agregar validaciones adicionales si es necesario
    if (email && password) {
      console.log('Logeo exitoso');
      // Limpiar los campos después del logeo
      setEmail('');
      setPassword('');
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