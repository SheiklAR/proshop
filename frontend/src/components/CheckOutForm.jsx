import { useEffect, useState } from "react"
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js"
import { usePayOrderMutation, useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import { useParams } from "react-router-dom";


const CheckOutForm = ({setIsPaid, setPaidStatus}) => {
    const { id: orderId } = useParams();
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const { data: order } = useGetOrderDetailsQuery(orderId);

    const [payOrderInDB, { data: updatedOrderDetails, isLoading, error: payDBError }] = usePayOrderMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/orders/${orderId}`
            },
            redirect: "if_required"
        })

        if (error) {
            console.log("paymentError(stripe)", error);

        } else if (paymentIntent && paymentIntent.status === 'succeeded') {

            payOrderInDB({orderId,...order});
            
            if (payDBError) {
                console.log(payDBError);
            }
            if (updatedOrderDetails) {
                console.log("uod",updatedOrderDetails);
                setIsPaid(updatedOrderDetails.isPaid);
                setPaidStatus(updatedOrderDetails.paidAt);
            }
        }


        setIsProcessing(false);
        window.location.reload()
    }

    return <>
        <form onSubmit={handleSubmit}>
        <PaymentElement />
            <button
                type="submit"
                className="btn bg-green-500 text-black"
                disabled={isProcessing} >
                {isProcessing ? 'Processing' : 'Pay'}
            </button>
        </form>
    </>;
}

export default CheckOutForm