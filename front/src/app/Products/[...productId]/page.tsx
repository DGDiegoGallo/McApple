import Card from '../../../components/Card';
import { fetchProducts } from '../../../utils/fetchProducts';

const Product = async ({ params }) => {
  const products = await fetchProducts();
  const product = products.find(p => p.id === Number(params.productId));
  if (!product) {
    return <div>Producto no encontrado</div>;
  }
  return <Card {...product} />;
}

export default Product;