import { useParams, Link } from "react-router-dom"
import { useGetOrderDetailsQuery, useGetStripeClientSecretMutation, useUpdateOrderDeliverMutation } from "../slices/orderApiSlice"
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import { useEffect, useState } from "react";
import CheckOutForm from "../components/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";



const OrderScreen = () => {
    const [isPaid, setIsPaid] = useState(false);
    const [paidStatus, setPaidStatus] = useState('Not Paid');
    const [isDelivered, setIsDelivered] = useState(false);
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);
    const { userInfo } = useSelector((state) => state.auth);


    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
    
    const [getClientSecret, { data: clientSecret, isLoading: isSecretLoading, error: secretError }] = useGetStripeClientSecretMutation();
    
    const [orderDeliver, { data: deliverData, isLoading: isDeliverLoading, error: deliverError }] = useUpdateOrderDeliverMutation();

    useEffect(() => {
        if (order) {
            setIsPaid(order.isPaid);
            setIsDelivered(order.isDelivered || false);

            if (order.isPaid) {
                setPaidStatus(order.paidAt)

            } else {
                getClientSecret({ amount: order.totalPrice });
            }
            if (secretError) {
                toast.error(secretError);
            }
        }
    }, [order, getClientSecret, secretError]);
    
    // console.log("cs",clientSecret)

    const handleOrderDeliver = async () => {
        try {
            await orderDeliver({ orderId });
            console.log("isdeliverloading", isDeliverLoading);
            refetch();
            toast.success('Order Delivered');
            window.location.reload();
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
        
    }

    return <>
        {isLoading ? (
            <Loader />
        ) : (
            <>
                <div className="max-w-6xl md:flex md:justify-around mx-auto">
                    <div className="max-w-4xl">
                        <h1 className="text-2xl p-2 font-extrabold text-gray-600 ">Order {order._id}</h1>
                        <div className="p-3 text-gray-600 ">
                            <div className="divide-y-2">
                                <div>
                                    <h2 className="text-2xl font-semibold py-2 pb-3">Shipping</h2>
                                    <ul className="py-2 ">
                                        <li className="font-medium"><strong>Name:</strong> {order.user.name}</li>
                                        <li className="font-medium"><strong>Email:</strong> {order.user.email}</li>
                                        <li className="font-medium"><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.country}</li>
                                    </ul>
                                    <AlertMessage message={isDelivered ? `Delivered at ${order.deliveredAt.substring(0, 10)}` : 'Not delivered'} color={isDelivered ? 'success' : 'error'} />
                                </div>
                                <div className="my-4">
                                    <h2 className="text-2xl font-semibold py-2 pb-3">Payment Method</h2>
                            
                                    <p className="font-medium pb-2"><strong>Method:</strong> {order.paymentMethod}</p>
                            
                                    <AlertMessage message={isPaid ? `Paid at ${paidStatus.substring(0, 10)}` : 'Not Paid'} color={isPaid ? 'success' : 'error'} />
                                </div>
                                <div>
                                    
                                    <h2 className="text-2xl font-semibold py-2 pb-3">Order Items</h2>
                            
                                    <table className="table-auto">
                                        <tbody className="border-2 divide-y ">
                                            {order.orderItems.map((item, index) => (
                                                <tr key={index} className="">
                                                    <td>
                                                        <div key={index}>
                                                            <div className="flex m-1 gap-2 items-center p-2">
                                                                <img src={item.image} alt={item.name} className="w-16 h-12rounded-lg" />
                                                                <Link to={`/product/${item._id}`} className="underline font-medium">{item.name}</Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="font-semibold pr-5">
                                                        {item.qty} x {item.price} = {item.qty * item.price}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div>
                    
                            </div>



                        </div>
                    </div>
                    <div>
                        <div className="mx-2 max-w-2xl">
                            <h2 className="text-3xl text-gray-600 font-semibold py-2 pb-3">Summary</h2>
                                    
                            <table className=" text-gray-600">
                                <tbody className="border-2 divide-y-2">
                                    <tr>
                                        <td className="px-6 py-3 font-semibold">Items</td>
                                        <td className="px-6 pr-24 py-3 font-semibold">${order.itemsPrice}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-3 font-semibold">Shipping</td>
                                        <td className="px-6 pr-24  py-3 font-semibold">${order.shippingPrice}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-3 font-semibold">Tax</td>
                                        <td className="px-6 pr-24  py-3 font-semibold">${order.taxPrice}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-3 font-semibold">Total</td>
                                        <td className="px-6 pr-24 py-3 font-semibold">${order.totalPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mx-2">
                            {clientSecret && !isPaid && userInfo && (

                                <Elements stripe={stripePromise} options={{ clientSecret: clientSecret.clientSecret }}>
                                    <CheckOutForm setIsPaid={setIsPaid} setPaidStatus={setPaidStatus} />
                                </Elements>
                            )}

                            {userInfo && userInfo.isAdmin && isPaid && !isDelivered && (
                                <button className="btn my-2" onClick={handleOrderDeliver}>Mark as Delivered</button>
                            )}

                            {isDeliverLoading && (<Loader />)}
                        </div>
                    </div>                 
                </div>
                    
                            
            </>
        )}
    </>
}

export default OrderScreen;