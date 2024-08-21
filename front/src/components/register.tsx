"use client";

import React, { useState } from 'react';
import ValidationRegister from './Validations/registervalidations';
import fetchRegister from '../utils/fetchRegister';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  });

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

  const validators = {
    name: (value: string) => /^[a-zA-Z\s]+$/.test(value),
    email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    password: (value: string) => /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/.test(value),
    address: (value: string) => /^[a-zA-Z0-9\s,.-]+$/.test(value),
    phone: (value: string) => /^[0-9]+$/.test(value),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const value = formData[key as keyof typeof formData];
      acc[`${key}Empty`] = !value;
      acc[`${key}Invalid`] = value && !validators[key as keyof typeof validators](value);
      return acc;
    }, {} as typeof errors);

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    try {
      const newUser = await fetchRegister(formData);
      setFormData({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: ''
      });
      window.location.href = '/login';
    } catch (error) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      address: '',
      phone: ''
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-4">Registro</h1>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <input
              type={key === 'password' ? 'password' : 'text'}
              name={key}
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="mb-2 p-2 border border-gray-300 rounded"
            />
            <ValidationRegister errors={{
              [`${key}Empty`]: errors[`${key}Empty`],
              [`${key}Invalid`]: errors[`${key}Invalid`]
            }} />
          </div>
        ))}
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