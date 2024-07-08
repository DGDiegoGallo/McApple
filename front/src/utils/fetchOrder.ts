import { IOrder } from '../interfaces/interfaces';

export const fetchCartOrders = async (token: string): Promise<IOrder[] | null> => {
  if (!token) {
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
      return null;
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return null;
  }
};