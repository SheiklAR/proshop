import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import Qty from "../components/Qty";
import { FaTrash } from "react-icons/fa";
import AlertMessage from "../components/AlertMessage";
import { addToCart, removeFromCart } from "../slices/cartSlice";


const CartScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart

  const addToCartHandler = (event, item) => {
    const qty = event.target.value
    dispatch(addToCart({ ...item, qty }));
  }

  const deleteCartItem = (id) => {
    dispatch(removeFromCart(id));
  }

  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return <>
    <h1>Shopping Cart</h1>
    
    {cartItems.length === 0 ? (
      <>
        <AlertMessage message={`Cart is empty...`} />
        <button className="bg-slate-300 font-semibold px-3 py-1 my-2 rounded-md hover:bg-slate-200">
          <Link to="/">Go Back</Link>
        </button>
      </>
    ) : (cartItems.map((item) => (
      <div key={item._id} className='container md:flex my-2 mx-2'>
        
        <div className="md:flex mt-10 justify-start  gap-4 md:divide-y space-x-6 items-start max-w-lg">

          <div className="md:flex space-x-2">
            <img src={item.image} alt="" className="h-24 
          w-24" />
            <span className="underline ">{item.name}</span>
          </div>

          <div className="flex items-center">
            <Qty
              qty={item.qty}
              values={item.countInStock}
              handleChange={(event) => addToCartHandler(event, item)}
              
            />

            <button onClick={(event) => deleteCartItem(item._id)}>
              <FaTrash
                className="bg-slate-200 text-2xl p-1 hover:bg-slate-100"
              />
            </button>
          </div>

          <div>
            <strong>${item.price}</strong>
          </div>
        
        </div>
      </div>
    ))
     
    )}

    <div>
      <div className="">
        <h3 className="text-2xl text-gray-500 font-medium">
          Subtotal ({cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
        </h3>
        <strong className="">${cart.totalPrice}</strong>
      </div>
      <button
        className="bg-gray-700 rounded-md text-white px-[0.40rem] py-[0.35rem] hover:bg-gray-600"
        disabled={cartItems.length === 0}
        onClick={checkOutHandler}
      >
        Proceed to Checkout
      </button>
    </div>
    
  </>
}

export default CartScreen