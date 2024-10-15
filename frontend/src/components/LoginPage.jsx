import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return <>
        
        <div className='max-w-sm mx-auto py-3'>
            <h1 className='text-3xl font-semibold text-gray-600 py-2'>Sign In</h1>
            <form className='bg-slate-100 p-8 my-2 rounded-md'>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" required />
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                </div>
            
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>

                <p className='py-2 text-gray-500 '>Already have an account? <Link to="/register" className='font-semibold hover:underline'>Sign Up</Link></p>
            </form>
        </div>
    </>
}

export default LoginPage