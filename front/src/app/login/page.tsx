import React from 'react';
import Login from '../components/login';

const LoginPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <Login />
    </main>
  );
};

export default LoginPage;