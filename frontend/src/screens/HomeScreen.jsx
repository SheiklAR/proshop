import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../slices/productApiSlice";
import ProductCard from "./ProductCard";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import { useEffect } from "react";


const HomeScreen = () => {

  const { data: products, isLoading, error } = useGetProductsQuery();
  useEffect(()=> {console.log(products)}, [products])
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (

        <AlertMessage message={error.data?.message || error.error} />
      ) : (
        <>
          <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-6 container mx-auto px-12">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default HomeScreen