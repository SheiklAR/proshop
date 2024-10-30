import { useState, useEffect } from "react";
import LoginPage from "../components/LoginForm";
import { useLoginMutation, useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";


const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);


    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (confirmPassword != password) {
            toast.error("Passwords do not match");
            return
        } else {
            try {
                const res = await register({name, email, password }).unwrap();
                dispatch(setCredentials({ ...res, }));
                navigate(redirect);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
       

    }

    return  <>
        
    <div className='max-w-sm mx-auto py-3'>
        <h1 className='text-3xl font-semibold text-gray-600 py-2'>Sign Up</h1>
        <form onSubmit={handleSubmit}
            className='bg-slate-100 p-8 my-2 rounded-md'
        >
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-500">Enter Your Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-box" placeholder="Enter name" />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-500">Your email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-box" placeholder="name@flowbite.com" />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-500">Your password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-box"
                    placeholder='Enter Password'/>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-500">Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-box"
                    placeholder='Confirm Password'/>
            </div>
        
            <button type="submit" className="btn" disabled={isLoading}>Sign Up</button>

            {isLoading && <Loader />}

                <p className='py-2 text-gray-500'>Already have an account?
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}
                        className='font-semibold hover:underline'>Sign In</Link></p>
        </form>
    </div>
</>
}

export default RegisterScreen