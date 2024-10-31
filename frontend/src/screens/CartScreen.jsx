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
    <div className="px-2 md:flex">
      <div className="max-w-fit m-2 md:ml-20 divide-y">
        <h1 className="text-4xl my-4 md:my-8 font-semibold text-gray-500">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <>
            <AlertMessage message={`Cart is empty...`} />
            <button className="bg-slate-300 font-semibold px-3 py-1 my-2 rounded-md hover:bg-slate-200">
              <Link to="/">Go Back</Link>
            </button>
          </>
        ) : (<>
          {cartItems.map((item) => (
            <div key={item._id} className='container md:flex my-2 mx-2'>
          
              <div className="flex justify-start my-5  space-x-4 items-start max-w-lg">

                <div className="flex space-x-2">
                  <img src={item.image} alt="" className="h-24 
            w-24" />
                  <p className="underline my-auto max-w-44">{item.name}</p>
                </div>

                <div className="flex items-center space-x-2 my-auto ">
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

                <div className="my-auto">
                  <strong>${item.price}</strong>
                </div>
          
              </div>
            </div>
          ))}
        </>
        )}

      </div>
      <div className="m-2 mt-16 md:m-8">
        <div className="border-2 rounded-md  divide-y-2 max-w-fit my-2">
          <div className="p-2 md:p-6 py-4 md:pr-32 space-y-2">
            <h2 className="text-3xl text-gray-500 font-medium">
              Subtotal ({cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </h2>

            <p><strong className="text-gray-700">${cart.totalPrice}</strong></p>
          </div>
          <div className="p-2 md:p-6 py-4 md:pr-32">
            <button
              className="block bg-gray-700 rounded-md text-white px-[0.40rem] py-[0.35rem] hover:bg-gray-600"
              disabled={cartItems.length === 0}
              onClick={checkOutHandler}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
          
      </div>
    </div>
  </>
}

export default CartScreen