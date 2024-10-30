import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import { useCreateReviewMutation, useGetProductDetailsQuery } from "../slices/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "../components/ProductDetails";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import Qty from "../components/Qty";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";
import Meta from "../components/Meta";


const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setQty(event.target.value);
  };

  const { id: productId } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: isProductReviewLoading }] = useCreateReviewMutation();
  const addToCartHandler = (event) => {
    event.preventDefault();
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment
      }).unwrap();
      refetch();
      toast.success("Review updated");
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const signInMessage = (
    <>
      <Link className="underline font-semibold " to="/login">Sign In</Link> to review the product
    </>
  );
  
  return <>
    <div className="max-w-6xl m-2 mx-auto">
      <button className="bg-slate-300 font-semibold px-3 py-1 m-2 rounded-md hover:bg-slate-200" >
        <Link to="/">Go Back</Link>
      </button>
 
      {isLoading ?
        <Loader /> : (
          error
        ) ? (
          <AlertMessage message={error.data?.message || error.error} />
        ) : (
          <>
            <Meta title={product.name} />
            <div className="p-2 md:flex md:space-x-2">
              <div className="">
                <img src={product.image}
                  className=" object-contain"
                  alt="" />
              </div>
                
              <ProductDetails product={product} />

              <div className="bg-white-50  p-3 text-gray-700 shadow-md shadow-slate-800">
                <div className="py-2 my-2">
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-500">Price: <strong className="px-4 py-1">${product.price}</strong></span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-500">Stock: <strong className="px-4 py-1">{product.countInStock}</strong></span>
                  </div>
                </div>
                  
                {product.countInStock > 0 && <div>
                  <Qty qty={qty}
                    values={product.countInStock}
                    handleChange={handleChange}
                  />
                  <button
                    disabled={product.countInStock === 0}
                    className="bg-gray-700 my-1 p-2 rounded-sm hover:bg-gray-500 text-white text-sm border-2 border-gray-700 font-semibold"
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </button>
                </div>}
              </div>
            </div>
            <div className="max-w-xl m-2">
                
              <h3 className="text-3xl font-semibold my-2 text-gray-600">Reviews</h3>
              {product.reviews.length === 0 && <AlertMessage message="No reviews" color="info" />}
                
              {product.reviews.map((review, index) => (
                <div key={index} className="p-2 mb-1 bg-slate-100 flex-col space-y-2">
                  <p className="text-xl"><strong>{review.name}</strong></p>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p className="font-semibold text-xl">"{review.comment}"</p>
                </div>
              ))}
              <h2 className="my-1 tracking-tight mt-7 text-2xl font-semibold text-gray-600">Write a customer review</h2>
              {!userInfo ? <AlertMessage message={signInMessage} color="info" /> : (
                <form onSubmit={handleSubmit} className="max-w-lg">
                  <div className="mb-5">
                    <label className="block mb-2 text-lg font-medium text-gray-500">Rating</label>
                    
                    <select className="input-box" onChange={(e) => setRating(e.target.value)}>
                      <option>5</option>
                      <option>4</option>
                      <option>3</option>
                      <option>2</option>
                      <option>1</option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 text-lg font-medium text-gray-500">Write a Review</label>
                    <textarea className="input-box" placeholder='write a review...' onChange={(e) => setComment(e.target.value)}></textarea>
                  </div>
                    
                  <button className="btn">Submit</button>
                </form>
              )}
            </div>
          </>
        )}
      
    </div>
  </>;
};

export default ProductScreen