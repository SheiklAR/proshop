import React from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const LoginPage = ({email, password, handleEmailChange, handlePasswordChange, handleSubmit, isLoading}) => {
    return
    <>
        
        <div className='max-w-sm mx-auto py-3'>
            <h1 className='text-3xl font-semibold text-gray-600 py-2'>Sign In</h1>
            <form
                onSubmit={handleSubmit}
                className='bg-slate-100 p-8 my-2 rounded-md'
            >
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-500">Your email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="input-box" placeholder="name@flowbite.com" />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-500">Your password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="input-box"
                        placeholder='Enter Password'/>
                </div>
            
                <button type="submit" className="btn" disabled={isLoading}>Submit</button>

                {isLoading && <Loader />}

                <p className='py-2 text-gray-500 '>Already have an account? <Link to="/register" className='font-semibold hover:underline'>Sign Up</Link></p>
            </form>
        </div>
    </>
}

export default LoginPage