import { IProduct } from '../interfaces/interfaces';

export const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await fetch('http://localhost:5767/products', {
    method: 'GET',
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};