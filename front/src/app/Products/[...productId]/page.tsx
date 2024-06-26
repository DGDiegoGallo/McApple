import Card from '../../components/Card';
import { IProduct } from '../../interfaces/interfaces';

export const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await fetch('http://localhost:5767/products');
  const products = await response.json();
  return products;
}

const Product = async ({ params }) => {
  const products = await fetchProducts();
  const product = products.find(p => p.id === parseInt(params.productId, 10));
  if (!product) {
    return <div>Producto no encontrado</div>;
  }
  return <Card {...product} />;
}

export default Product;
