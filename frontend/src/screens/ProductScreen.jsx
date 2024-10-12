import { useParams, Link } from "react-router-dom"
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import ProductDetails from "../components/ProductDetails";


const ProductScreen = () => {

  const { id: productId } = useParams();


  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  
  return <>
    <div className="container mx-auto">
      <button className="bg-slate-300 font-semibold px-3 py-1 my-2 rounded-md hover:bg-slate-200">
        <Link to="/">Go Back</Link>
      </button>

      {isLoading ? (<h1>
        Loading...
      </h1>) : (
        error
      ) ? (
        <h1>{error.data?.message || error.error}</h1>
      ) : (
        <>
          <div className="p-2 md:grid md:gird-col-3 md:gap-2">
            <ProductDetails product={product} />

            <div className="">
              <img src={product.image}
                className="h-96 w-96 object-contain"
                alt="" />
            </div>

            <div className="bg-white shadow-md">
              <span>Price: <strong className="px-4 py-1">${product.price}</strong></span>
              <span>Status: <strong className="px-4 py-1">{product.countInStock}</strong></span>
              <Link to="/">
                <button
                  disabled={product.countInStock === 0}
                  className="bg-gray-700 p-2 rounded-md hover:bg-gray-500 text-white text-sm border-2 border-gray-950 font-semibold"
                >
                  Add to cart
                </button>
              </Link>
          
              <hr className="max-w-48 mx-auto  py-4 bg-gray-300" />
          
            </div>
          </div>
        </>
      )}
      
    </div>
  </>
}

export default ProductScreen