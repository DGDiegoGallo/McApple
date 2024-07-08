"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IProduct } from '../../interfaces/interfaces';
import CartProduct from '../../components/ProductsComponent/CartProduct';
import { fetchProducts } from '../../utils/fetchProducts';
import SearchBar from '../../components/ProductsComponent/SearchBar';
import { categoryMap } from '../../utils/categoryMap';
import PaginationProducts from '../../components/PaginationComponent/PaginationProducts';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('Todos los productos');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'Todos los productos') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => categoryMap[product.categoryId] === category);
      setFilteredProducts(filtered);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col md:flex-row">
      <button
        className="md:hidden p-2 bg-gray-800 text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
      <div className={`w-full md:w-1/6 p-2 bg-gray-800 text-white shadow-inner-custom ${isMenuOpen ? 'min-h-full' : 'min-h-screen'} ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <h2 className="text-xl font-bold mb-4">Filtrar por Categoría</h2>
        <div>
          <label className="block mb-2 border-b border-gray-600 pb-2">
            <input
              type="radio"
              name="category"
              value="Todos los productos"
              checked={selectedCategory === 'Todos los productos'}
              onChange={() => handleCategoryChange('Todos los productos')}
              className="mr-2"
            />
            Todos los productos
          </label>
          {Object.values(categoryMap).map(category => (
            <label key={category} className="block mb-2 border-b border-gray-600 pb-2">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center p-24 w-full md:w-4/5">
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map(product => (
            <div key={product.id} className={`card p-4 rounded-lg shadow-md cursor-pointer ${product.stock === 0 ? 'bg-gray-300' : ''}`}>
              <Link href={`/Products/${product.id}`}>
                <div className="relative">
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-800 to-transparent z-10 rounded-lg"></div>
                  <img src={product.image} alt={product.name} className="w-full h-64 object-contain z-20 relative rounded-lg" />
                </div>
                <h2 className="text-xl font-bold mt-2">{product.name}</h2>
                <p className="text-gray-700 text-right">${product.price}</p>
                <p className="text-gray-700 font-bold border border-green-500 rounded-lg p-1 inline-block">Stock: {product.stock}</p>
                <p className="text-gray-700">Categoría: {categoryMap[product.categoryId]}</p>
              </Link>
              <CartProduct product={product} />
            </div>
          ))}
        </div>
        <PaginationProducts
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default ProductsPage;