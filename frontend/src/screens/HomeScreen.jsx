import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../slices/productApiSlice";
import ProductCard from "./ProductCard";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import { Link } from "react-router-dom";


const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });
  // useEffect(() => { console.log(data) }, [data]);
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        
        <AlertMessage message={error.data?.message || error.error} />
      ) : (
        <>
              {keyword &&
                <Link to={`/`}>
                <button className="btn mx-28 my-4 ">Go back</button>
              </Link> }
          <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-6 container mx-auto px-12">
            {data.products.map((product) => (
              <ProductCard
                key={product._id}
                product={product} />
            ))}
              </div>
              <div className="px-12">
              <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
              </div>
        </>
      )}
    </>
  );
};

export default HomeScreen