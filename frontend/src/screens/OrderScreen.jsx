import { useParams, Link } from "react-router-dom"
import { useGetOrderDetailsQuery, useGetStripeClientSecretMutation, useUpdateOrderDeliverMutation } from "../slices/ordersApiSlice"
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
    
    const [orderDeliver, { data: deliverData, refetch: deliverRefetch, isLoading: isDeliverLoading, error: deliverError }] = useUpdateOrderDeliverMutation();

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
            console.log("isdeliverloading",isDeliverLoading);
            deliverRefetch();
            toast.success('Order Delivered');
            window.location.reload();
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
        
    }

    return <>
        {isLoading ? (
            <Loader />
        ) : (<>
            <h1 className="text-2xl p-2 font-extrabold text-gray-600 md:max-w-lg mx-auto">Order {order._id}</h1>
                
            <div className="p-3 text-gray-600 md:grid-cols-3">
                <div className="md:grid-span-2 divide-y-2">
                    <div>
                        <h2 className="text-2xl font-semibold py-2 pb-3">Shipping</h2>
                        <ul className="py-2 ">
                            <li className="font-medium"><strong>Name:</strong> {order.user.name}</li>
                            <li className="font-medium"><strong>Email:</strong> {order.user.email}</li>
                            <li className="font-medium"><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.country}</li>
                        </ul>
                        <AlertMessage message={isDelivered ? `Delivered at ${order.deliveredAt.substring(0,10)}` : 'Not delivered'} color={isDelivered ? 'success' : 'error'} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold py-2 pb-3">Payment Method</h2>
                            
                        <p className="font-medium pb-2"><strong>Method:</strong> {order.paymentMethod}</p>
                            
                        <AlertMessage message={isPaid ? `Paid at ${paidStatus.substring(0,10)}`: 'Not Paid'} color={isPaid ? 'success' : 'error'} />
                        </div>
                        
                        <h2 className="text-2xl font-semibold py-2 pb-3">Order Items</h2>
                        
                    <table className="table-auto">
                        <tbody>
                            {order.orderItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div key={index}>
                                                <div className="flex gap-2 col-span-2">
                                                    <img src={item.image} alt={item.name} className="w-16 h-12 rounded-lg" />
                                                    <Link to={`/product/${item._id}`} className="underline font-medium">{item.name}</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.qty} x {item.price} = {item.qty * item.price}
                                        </td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2 className="text-2xl font-semibold py-2 pb-3">Summary</h2>
                        
                        <table className="table-auto text-gray-600">
                            <tbody>
                            <tr>
                                <td className="font-semibold">Items</td>
                            <td>${order.itemsPrice}</td>
                                </tr>
                            <tr>
                                <td className="font-semibold">Shipping</td>
                            <td>${order.shippingPrice}</td>
                                </tr>
                            <tr>
                                <td className="font-semibold">Tax</td>
                            <td>${order.taxPrice}</td>
                                </tr>
                            <tr>
                                <td className="font-semibold">Total</td>
                            <td>${order.totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                <div>
                    
                    </div>

                    {clientSecret && !isPaid && userInfo && !userInfo.isAdmin && (

                    <Elements stripe={stripePromise} options={{clientSecret: clientSecret.clientSecret}}>
                        <CheckOutForm setIsPaid={setIsPaid} setPaidStatus={setPaidStatus} />
                    </Elements>
                    )}

                    {userInfo && userInfo.isAdmin && isPaid && !isDelivered && (
                        <button className="btn my-2" onClick={handleOrderDeliver}>Mark as Delivered</button>
                    )}

                    {isDeliverLoading && (<Loader />)}

            </div>
        </>
        )}
    </>
}

export default OrderScreen