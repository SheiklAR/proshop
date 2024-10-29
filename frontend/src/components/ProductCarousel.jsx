import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? products.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === products.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full max-w-xl bg-gray-200 my-2 mx-auto overflow-hidden">
      <div
        className="flex transition-transform ease-in-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full flex-shrink-0 flex flex-col items-center p-4"
            >
                <Link to={`/product/${product._id}`}>    
                    <img src={product.image} alt={product.name} className="w-48 h-48 object-cover rounded-lg" />
                    <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                    <p className="text-gray-500 mt-2">${product.price}</p>
                </Link>
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        ❮
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        ❯
      </button>
    </div>
  );
};

export default ProductCarousel;
