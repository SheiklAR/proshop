import { useParams, Link } from "react-router-dom"
import { useGetOrderDetailsQuery, usePayOrderMutation } from "../slices/ordersApiSlice"
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import { useGetStripeClientIdMutation } from "../slices/ordersApiSlice";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";


const OrderScreen = () => {
    const { id: orderId } = useParams();
    const [alertInfo, setAlertInfo] = useState('Not Paid')

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    return <>
        {isLoading ? (
            <>
                <Loader />
            </>
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
                        <AlertMessage message={`Not Delivered`} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold py-2 pb-3">Payment Method</h2>
                            
                        <p className="font-medium pb-2"><strong>Method:</strong> {order.paymentMethod}</p>
                            
                        <AlertMessage message={alertInfo} />
                    </div>
                        
                    <h2 className="text-2xl font-semibold py-2 pb-3">Order Items</h2>
                        
                    <table className="table-auto">
                        <tbody>
                            {order.orderItems.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div>
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
            </div>
        </>
        )}
    </>
}

export default OrderScreen