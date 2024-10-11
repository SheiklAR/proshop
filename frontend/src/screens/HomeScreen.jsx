import { useState, useEffect } from 'react';
import ProductCard from "./ProductCard";
import axios from 'axios'



const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }

    fetchProducts();
  }, [])
  return (
      <>
          <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-6 container mx-auto px-12">
              {products.map((product) => (
                  <ProductCard
                    key={product._id}
                      product={product} />
              ))}
        </div>
      </>
  )
}

export default HomeScreen