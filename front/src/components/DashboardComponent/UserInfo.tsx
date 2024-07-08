"use client"

import React, { useEffect, useState } from 'react';

const UserInfo: React.FC = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return <p>Cargando información del usuario...</p>;
    }

    return (
        <section className="mt-8 w-full">
            <h2 className="text-2xl font-bold mb-4">Información del Usuario</h2>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Dirección: {user.address}</p>
            <p>Teléfono: {user.phone}</p>
        </section>
    );
};

export default UserInfo;