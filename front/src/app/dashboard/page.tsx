"use client"

import React from 'react';
import Logout from '../components/DashboardComponent/Logout';

const Dashboard: React.FC = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-24">
            <h1 className="text-4xl font-bold">Dashboard de Usuario</h1>
            <Logout />
        </main>
    );
};

export default Dashboard;