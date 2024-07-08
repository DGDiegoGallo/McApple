

interface ValidationRegisterProps {
  errors: {
    nameEmpty: boolean;
    nameInvalid: boolean;
    emailEmpty: boolean;
    emailInvalid: boolean;
    passwordEmpty: boolean;
    passwordWeak: boolean;
    addressEmpty: boolean;
    addressInvalid: boolean;
    phoneEmpty: boolean;
    phoneInvalid: boolean;
  };
}

const ValidationRegister: React.FC<ValidationRegisterProps> = ({ errors }) => {
  return (
    <div className="text-red-500 text-sm">
      {errors.nameEmpty && <p>El nombre es obligatorio.</p>}
      {!errors.nameEmpty && errors.nameInvalid && <p>Nombre inválido.</p>}
      {errors.emailEmpty && <p>El email es obligatorio.</p>}
      {!errors.emailEmpty && errors.emailInvalid && <p>Email inválido.</p>}
      {errors.passwordEmpty && <p>La contraseña es obligatoria.</p>}
      {!errors.passwordEmpty && errors.passwordWeak && <p>Contraseña poca segura.</p>}
      {errors.addressEmpty && <p>La dirección es obligatoria.</p>}
      {!errors.addressEmpty && errors.addressInvalid && <p>Dirección inválida.</p>}
      {errors.phoneEmpty && <p>El teléfono es obligatorio.</p>}
      {!errors.phoneEmpty && errors.phoneInvalid && <p>Teléfono inválido.</p>}
    </div>
  );
};

export default ValidationRegister;