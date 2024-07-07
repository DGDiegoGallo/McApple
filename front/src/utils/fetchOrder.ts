import { IOrder } from '../interfaces/interfaces';

export const fetchCartOrders = async (token: string): Promise<IOrder[] | null> => {
  if (!token) {
    console.log('Usuario no logeado');
    return null;
  }

  try {
    const response = await fetch('http://localhost:5767/users/orders', {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.log('Error al obtener las órdenes del carrito');
      return null;
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return null;
  }
};
