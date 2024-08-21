"use client"

import React, { useEffect, useState } from 'react';

const WelcomeUser: React.FC = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return null;
    }

    return <p>Bienvenido, {user.name}</p>;
};

export default WelcomeUser;