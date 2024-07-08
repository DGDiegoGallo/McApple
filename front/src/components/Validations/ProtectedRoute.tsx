"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetToken } from '../../app/context/auth';

const withAuth = (WrappedComponent: React.FC) => {
  const AuthComponent: React.FC = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const token = useGetToken();
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== 'undefined') {
        if (!token) {
          setShowModal(true);
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          setIsAuthenticated(true);
        }
      }
    }, [token, router]);

    if (!isAuthenticated) {
      return (
        <>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-xl font-bold">¡Tienes que iniciar sesión!</h2>
              </div>
            </div>
          )}
        </>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;