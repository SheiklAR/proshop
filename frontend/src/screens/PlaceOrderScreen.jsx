import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps"
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";
import AlertMessage from "../components/AlertMessage";
import Loader from "../components/Loader";



const PlaceOrderScreen = () => {
    const cart = useSelector((state) => state.cart);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();


    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);
   

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            await dispatch(clearCartItems());
            navigate(`/orders/${res._id}`);
            
        } catch (err) {
            toast.error(err.data.message);
        }
    }

    return <>
        <div className="max-w-6xl mx-auto">
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="grid grid-cols-1 md:grid-cols-3  mx-auto gap-2">
                <div className="mx-2 md:grid-span-2">
                    <div className="py-2 border-b-2 mx-2">
                        <h1 className='text-4xl font-bold text-gray-600 py-2 mx-1'>
                            Shipping Address
                        </h1>
                        <p className="font-semibold text-gray-500 py-4 mx-1 flex">
                            <span className="font-bold">Address: </span> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.pinCode}, {cart.shippingAddress.country}
                        </p>
                    </div>
                    <div className="py-2 border-b-2 mx-2">
                        <h1 className='text-3xl font-semibold text-gray-600 py-2 mx-1'>
                            Payment Method
                        </h1>
                        <p className="font-semibold text-gray-500 py-4 mx-1 flex">
                            <span className="font-bold">Payment Method: <span className="font-semibold">{cart.paymentMethod}</span></span>
                        </p>
                    </div>
                    <div className="py-2 border-b-2 mx-2">
                        <h1 className='text-3xl font-semibold text-gray-600 py-2 mx-1'>
                            Order Items
                        </h1>
                        <div className="divide-y space-y-4">
                            {cart.cartItems.map((item, index) => (
                                <div key={index}>
                                    <div className="flex gap-2 items-center py-2">
                                        <img src={item.image}
                                            alt={item.name} className="w-24 h-24 rounded" />
                                        <div>
                                            <Link to={`/product/${item._id}`} className="underline">{item.name}</Link>
                                            <p className="py-1 text-gray-700">
                                                {item.qty} x ${item.price} = ${item.price * item.qty}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-gray-500 py-2 mx-1 flex">
                                        <span className="font-bold">Payment Method <span className="font-semibold">{cart.paymentMethod}</span></span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border-b-2 ">
                    <h1 className='text-3xl font-semibold text-gray-600 py-2 mx-1 mb-4'>
                        Total
                    </h1>
                    <ul className="font-semibold text-gray-500 border-y-2 space-y-8">
                        <li className="mx-2 mt-3">Items: ${cart.itemsPrice}</li>
                        <li className="mx-2">Shipping: ${cart.shippingPrice}</li>
                        <li className="mx-2">Tax: ${cart.taxPrice}</li>
                        <li className="mx-2 pb-4">Total: ${cart.totalPrice}</li>
                    </ul>
                    <div>{error && <AlertMessage message={error.data.message} />}</div>
                    <button
                        type="button"
                        className="btn my-2"
                        onClick={handlePlaceOrder}
                        disabled={cart.cartItems.length === 0}
                    >Place Order</button>

                    {isLoading && <Loader />}
                </div>
            </div>
        </div>
    </>;
};

export default PlaceOrderScreen