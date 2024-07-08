import { fetchProducts } from '../../utils/fetchProducts';
import { FaCrown, FaArrowUp } from "react-icons/fa";
import { TbCrown } from "react-icons/tb";
import { CgCrown } from "react-icons/cg";
import { CiMedal } from "react-icons/ci";

const Home = async () => {
  const products = await fetchProducts();
  const product = products.find(p => p.id === 1) || null;
  const product2 = products.find(p => p.id === 2) || null;
  const product3 = products.find(p => p.id === 3) || null;
  const product4 = products.find(p => p.id === 4) || null;

  return (
    <div className="flex flex-col items-center m-4">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-yellow-500 p-2 rounded-full">
          <FaCrown className="text-yellow-300" size={32} />
        </div>
      </div>
      <div className="w-full md:w-1/4 bg-blue-950 p-4 text-white rounded-lg border-4 border-gray-800 transform transition duration-500 hover:scale-105 mb-4 md:mb-0">
        {product && (
          <div className="mt-4">
            <img src={product.image} alt={product.name} className="w-full h-auto" />
            <hr className="my-4 border-t-2 border-gray-300" />
            <div className="flex justify-between mt-2">
              <h2 className="text-lg">{product.name}</h2>
              <p className="text-lg">${product.price}</p>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col items-center p-4 text-center">
        <FaArrowUp className="text-blue-950" size={32} />
        <h1 className="text-4xl mt-2">¡Consíguelo ya mismo antes que se acabe!</h1>
        <p className="text-2xl mt-2">¡Encuentralo en Productos!</p>
      </div>
      <div className="flex justify-center space-x-4 mt-4 flex-wrap md:flex-nowrap">
        {[product2, product3, product4].map((prod, index) => (
          prod && (
            <div key={index} className="w-full md:w-1/5 bg-blue-950 p-4 text-white rounded-lg border-4 border-gray-800 transform transition duration-500 hover:scale-105 mb-4 md:mb-0">
              <div className="flex items-center justify-center mb-4">
                {index === 0 && (
                  <div className="bg-gray-300 p-2 rounded-full">
                    <TbCrown className="text-gray-100" size={32} />
                  </div>
                )}
                {index === 1 && (
                  <div className="bg-yellow-700 p-2 rounded-full">
                    <CgCrown className="text-yellow-600" size={32} />
                  </div>
                )}
                {index === 2 && (
                  <div className="bg-gray-800 p-2 rounded-full">
                    <CiMedal className="text-white" size={32} />
                  </div>
                )}
              </div>
              <div className="mt-4">
                <img src={prod.image} alt={prod.name} className="w-full h-auto" />
                <hr className="my-4 border-t-2 border-gray-300" />
                <div className="flex justify-between mt-2">
                  <h2 className="text-lg">{prod.name}</h2>
                  <p className="text-lg">${prod.price}</p>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Home;