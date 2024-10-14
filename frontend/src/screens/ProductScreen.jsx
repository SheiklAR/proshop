import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import { useDispatch } from "react-redux";
import ProductDetails from "../components/ProductDetails";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import Qty from "../components/Qty";
import { addToCart } from "../slices/cartSlice";


const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setQty(event.target.value);
  };

  const { id: productId } = useParams();

  const addToCartHandler = (event) => {
    event.preventDefault();
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart')
  }


  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  
  return <>
    <div className="container mx-auto">
      <button className="bg-slate-300 font-semibold px-3 py-1 my-2 rounded-md hover:bg-slate-200">
        <Link to="/">Go Back</Link>
      </button>
 
      {isLoading ? 
      <Loader /> : (
        error
        ) ? (
            <AlertMessage message={error.data?.message || error.error}/>
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
                  
                  { product.countInStock > 0 &&
                    <Qty qty={qty}
                      values={product.countInStock}
                      handleChange={handleChange}
                    /> }
                  
              <Link to="/">
                <button
                  disabled={product.countInStock === 0}
                      className="bg-gray-700 p-2 rounded-md hover:bg-gray-500 text-white text-sm border-2 border-gray-950 font-semibold"
                      onClick={addToCartHandler}
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