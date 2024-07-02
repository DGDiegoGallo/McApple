"use client";

import React, { useState } from 'react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes agregar validaciones adicionales si es necesario
    if (name && email && password && address && phone) {
      const userData = { name, email, password, address, phone };
      console.log('Datos enviados:', userData);

      try {
        const response = await fetch('http://localhost:5767/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          console.log('Usuario registrado');
          // Limpiar los campos después del registro
          setName('');
          setEmail('');
          setPassword('');
          setAddress('');
          setPhone('');
        } else {
          console.log('Error al registrar el usuario');
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
      <h1 className="text-4xl font-bold mb-4">Registro</h1>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Nombre"
        className="mb-2 p-2 border border-gray-300 rounded"
      />
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
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Dirección"
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="Teléfono"
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="btn-primary mt-4">Registrar</button>
    </form>
  );
};

export default Register;