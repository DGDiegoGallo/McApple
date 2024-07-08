import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-4">
      <Link href={`?page=${currentPage - 1}`} passHref>
        <button
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
      </Link>
      {Array.from({ length: totalPages }, (_, index) => (
        <Link key={index + 1} href={`?page=${index + 1}`} passHref>
          <button
            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        </Link>
      ))}
      <Link href={`?page=${currentPage + 1}`} passHref>
        <button
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </Link>
    </div>
  );
};

export default Pagination;