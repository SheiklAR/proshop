import { useGetProductsQuery } from "../slices/productApiSlice";
import ProductCard from "./ProductCard";



const HomeScreen = () => {

  const { data: products, isLoading, error } = useGetProductsQuery();
  
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <h1> {error.data?.message || error.error}</h1>)
        : (
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