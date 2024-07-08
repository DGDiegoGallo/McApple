import React from 'react';

interface ValidationLoginProps {
  errors: {
    emailEmpty: boolean;
    passwordEmpty: boolean;
    emailInvalid: boolean;
  };
}

const ValidationLogin: React.FC<ValidationLoginProps> = ({ errors }) => {
  return (
    <>
      {errors.emailEmpty && <p className="text-red-500 mt-2">El campo de correo electrónico no puede estar vacío.</p>}
      {errors.emailInvalid && <p className="text-red-500 mt-2">El correo electrónico es inválido.</p>}
      {errors.passwordEmpty && <p className="text-red-500 mt-2">El campo de contraseña no puede estar vacío.</p>}
    </>
  );
};

export default ValidationLogin;