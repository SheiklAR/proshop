import ProductCard from "../components/ProductCard";
import products from '../products'

import React from 'react'

const HomeScreen = () => {
  return (
      <>
          <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-6 container mx-auto px-12">
              {products.map((product) => (
                  <ProductCard
                    id={product._id}
                      image={product.image} imageName={product.name} />
              ))}
        </div>
      </>
  )
}

export default HomeScreen