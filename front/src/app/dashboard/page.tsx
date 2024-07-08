import React from 'react';
import { cookies } from 'next/headers';
import Logout from '../../components/DashboardComponent/Logout';
import Pagination from '../../components/PaginationComponent/PaginationDashboard';
import UserInfo from '../../components/DashboardComponent/UserInfo';
import { IOrder } from '../../interfaces/interfaces';
import { fetchCartOrders } from '../../utils/fetchOrder';
import Link from 'next/link';

const Dashboard = async ({ searchParams }) => {
    const token = cookies().get('token')?.value || null;
    if (!token) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg text-center">
                    <h2 className="text-xl font-bold">¡Tienes que iniciar sesión!</h2>
                    <Link href="/login">
                        <h2 className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">Iniciar Sesión</h2>
                    </Link>
                </div>
            </div>
        );
    }

    let orders: IOrder[] = [];
    const currentPage = parseInt(searchParams.page) || 1;
    const itemsPerPage = 5;

    const fetchedOrders = await fetchCartOrders(token);
    if (fetchedOrders) {
        orders = fetchedOrders;
    }

    const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-24">
            <h1 className="text-4xl font-bold">Dashboard de Usuario</h1>
            <Logout />
            <UserInfo />
            <section className="mt-8 w-full">
                <h2 className="text-2xl font-bold mb-4 mt-8">Historial de Compras</h2>
                {paginatedOrders.length > 0 ? (
                    <ul className="w-full">
                        {paginatedOrders.map((order) => (
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
                <Pagination
                    totalItems={orders.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                />
            </section>
        </main>
    );
};

export default Dashboard;