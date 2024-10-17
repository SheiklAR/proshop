import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
    const { shippingAddress } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [pinCode, setPinCode] = useState(shippingAddress?.pinCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, pinCode, country }));
        navigate('/payment')
    }

    return <>
        <CheckoutSteps step1 step2 />
        <div className='max-w-lg mx-auto py-3'>
            <h1 className='text-3xl mx-1 font-semibold text-gray-600 py-2'>Shipping Address</h1>
            <form onSubmit={handleSubmit}
                className='bg-slate-100 p-8 my-2 rounded-md'
            >
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-500">Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="input-box" placeholder="Enter Address" />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-500">City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="input-box" placeholder="Enter City" />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-500">Pin Code</label>
                    <input
                        type="text"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        className="input-box" placeholder="Enter Pincode (Postalcode)" />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-500">Country</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="input-box" placeholder='Enter Country' />
                </div>
      
                <button type="submit" className="btn" >Continue</button>
            </form>
        </div>
    </>;
}

export default ShippingScreen