import { useState, useEffect } from 'react'
import { savePaymentMethod } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';



const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }


    return <>
        <div className="max-w-6xl mx-auto">
            <CheckoutSteps step1 step2 step3 />
            <div className="max-w-lg mx-auto">
                <h2 className='text-3xl font-semibold text-gray-600 py-2 mx-2'>
                    Payment
                </h2>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="mb-5 mx-1">
                        <label className="flex items-center mb-2 text-xl font-medium text-gray-700">
                            <input
                                type="radio"
                                value={paymentMethod}
                                onChange={(e) => { setPaymentMethod(e.target.value) }}
                                checked={true}
                                className='mx-2'
                            />
                            PayPal or Credit card</label>
                    </div>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    </>;
}

export default PaymentScreen