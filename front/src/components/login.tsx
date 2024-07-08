"use client";

import React, { useState } from 'react';
import { useGetToken } from '../app/context/auth';
import ValidationLogin from '../components/Validations/loginvalidations';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    emailEmpty: false,
    passwordEmpty: false,
    emailInvalid: false,
  });
  const [showModal, setShowModal] = useState(false);
  const token = useGetToken();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailEmpty = !email;
    const passwordEmpty = !password;
    const emailInvalid = !validateEmail(email);

    const newErrors = {
      emailEmpty: false,
      passwordEmpty: false,
      emailInvalid: false,
    };

    if (emailEmpty) {
      newErrors.emailEmpty = true;
    } else if (emailInvalid) {
      newErrors.emailInvalid = true;
    }

    if (passwordEmpty) {
      newErrors.passwordEmpty = true;
    }

    setErrors(newErrors);

    if (newErrors.emailEmpty || newErrors.passwordEmpty || newErrors.emailInvalid) {
      return;
    }

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
        localStorage.setItem('user', JSON.stringify(json.user));
        setEmail('');
        setPassword('');
        window.location.reload(); // Recargar la página para que se actualice el estado de autenticación
      } else if (response.status === 400) {
        console.log('Error al logar el usuario');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen p-4" noValidate>
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <ValidationLogin errors={{ emailEmpty: errors.emailEmpty, emailInvalid: errors.emailInvalid, passwordEmpty: false }} />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <ValidationLogin errors={{ emailEmpty: false, emailInvalid: false, passwordEmpty: errors.passwordEmpty }} />
        <button type="submit" className="btn-primary mt-4">Login</button>
      </form>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">¡El usuario no existe!</h2>
            <button onClick={() => setShowModal(false)} className="btn-primary mt-4">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;