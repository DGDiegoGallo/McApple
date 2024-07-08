"use client";

import React, { useState } from 'react';
import ValidationRegister from './Validations/registervalidations';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({
    nameEmpty: false,
    nameInvalid: false,
    emailEmpty: false,
    emailInvalid: false,
    passwordEmpty: false,
    passwordWeak: false,
    addressEmpty: false,
    addressInvalid: false,
    phoneEmpty: false,
    phoneInvalid: false,
  });
  const [showModal, setShowModal] = useState(false);

  const validateName = (name: string) => /^[a-zA-Z\s]+$/.test(name);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/.test(password);
  const validateAddress = (address: string) => /^[a-zA-Z0-9\s,.-]+$/.test(address);
  const validatePhone = (phone: string) => /^[0-9]+$/.test(phone);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameEmpty = !name;
    const emailEmpty = !email;
    const passwordEmpty = !password;
    const addressEmpty = !address;
    const phoneEmpty = !phone;

    const newErrors = {
      nameEmpty,
      nameInvalid: !nameEmpty && !validateName(name),
      emailEmpty,
      emailInvalid: !emailEmpty && !validateEmail(email),
      passwordEmpty,
      passwordWeak: !passwordEmpty && !validatePassword(password),
      addressEmpty,
      addressInvalid: !addressEmpty && !validateAddress(address),
      phoneEmpty,
      phoneInvalid: !phoneEmpty && !validatePhone(phone),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

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
        setName('');
        setEmail('');
        setPassword('');
        setAddress('');
        setPhone('');
        window.location.href = '/login';
      } else {
        console.log('Error al registrar el usuario');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setName('');
    setEmail('');
    setPassword('');
    setAddress('');
    setPhone('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-4">Registro</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <ValidationRegister errors={{ nameEmpty: errors.nameEmpty, nameInvalid: errors.nameInvalid }} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <ValidationRegister errors={{ emailEmpty: errors.emailEmpty, emailInvalid: errors.emailInvalid }} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <ValidationRegister errors={{ passwordEmpty: errors.passwordEmpty, passwordWeak: errors.passwordWeak }} />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Dirección"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <ValidationRegister errors={{ addressEmpty: errors.addressEmpty, addressInvalid: errors.addressInvalid }} />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Teléfono"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <ValidationRegister errors={{ phoneEmpty: errors.phoneEmpty, phoneInvalid: errors.phoneInvalid }} />
        <button type="submit" className="btn-primary mt-4">Registrar</button>
      </form>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">¡El usuario ya fue creado!</h2>
            <button onClick={handleCloseModal} className="btn-primary mt-4">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;