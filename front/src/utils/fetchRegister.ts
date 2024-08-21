import { IRegisterUser } from '../interfaces/interfaces';

const fetchRegister = async (userData: IRegisterUser) => {
  try {
    const response = await fetch('http://localhost:5767/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};

export default fetchRegister;