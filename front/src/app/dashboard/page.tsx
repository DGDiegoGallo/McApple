import React from 'react';
import { cookies } from 'next/headers';
import Logout from '../../components/DashboardComponent/Logout';
import { IOrder } from '../../interfaces/interfaces';
import { fetchCartOrders } from '../../utils/fetchOrder';

const Dashboard: React.FC = async () => {
    const token = cookies().get('token')?.value || null;
    let orders: IOrder[] = [];

    if (token) {
        const fetchedOrders = await fetchCartOrders(token);
        if (fetchedOrders) {
            orders = fetchedOrders;
        }
    } else {
        console.log('Usuario no logeado');
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-24">
            <h1 className="text-4xl font-bold">Dashboard de Usuario</h1>
            <Logout />
            <section className="mt-8 w-full">
                <h2 className="text-2xl font-bold mb-4">Historial de Compras</h2>
                {orders.length > 0 ? (
                    <ul className="w-full">
                        {orders.map((order) => (
                            <li key={order.id} className="border-b border-gray-300 py-4">
                                <h3 className="text-xl font-semibold">Orden #{order.id}</h3>
                                <p className="text-gray-600">Fecha: {new Date(order.date).toLocaleDateString()}</p>
                                <ul className="pl-4">
                                    {order.products.map((product) => (
                                        <li key={product.id} className="py-2">
                                            <p className="font-medium">{product.name}</p>
                                            <p className="text-gray-600">${product.price}</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay compras realizadas.</p>
                )}
            </section>
        </main>
    );
};

export default Dashboard;