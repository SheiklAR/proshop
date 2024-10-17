import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
    return <>
        <div className='max-w-sm mx-auto my-2 p-2 flex justify-between items-center'>
            <div className='text-base font-semibold text-gray-700'>
                {step1 ? <Link to="/login">Sign In</Link>
                    : <button disabled style={{ color: 'gray' }}>Sign In</button>}
            </div>
            <div className='text-base font-semibold text-gray-700'>
                {step2 ? <Link to="/shipping">Shipping</Link>
                    : <button disabled style={{ color: 'gray' }}>Shipping</button>}
            </div>
            <div className='text-base font-semibold text-gray-700'>
                {step3 ? <Link to="/payment">Payment</Link>
                    : <button disabled style={{ color: 'gray' }}>Payment</button>}
            </div>
            <div className='text-base font-semibold text-gray-700'>
                {step4 ? <Link to="/">Order</Link>
                    : <button disabled style={{ color: 'gray' }}>Order</button>}
            </div>
        </div>
    </>
}

export default CheckoutSteps