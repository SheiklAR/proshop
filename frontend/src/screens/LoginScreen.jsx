import { useState, useEffect } from "react";
import LoginPage from "../components/LoginPage";
import { useLoginMutation } from "../slices/usersSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [login, { isLoading }] = useLoginMutation();
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
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res, }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }

    }

    return  <>
        
    <div className='max-w-sm mx-auto py-3'>
        <h1 className='text-3xl font-semibold text-gray-600 py-2'>Sign In</h1>
        <form onSubmit={handleSubmit}
            className='bg-slate-100 p-8 my-2 rounded-md'
        >
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
        
            <button type="submit" className="btn" disabled={isLoading}>Submit</button>

            {isLoading && <Loader />}

                <p className='py-2 text-gray-500'>Already have an account?
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}
                        className='font-semibold hover:underline'>Sign Up</Link></p>
        </form>
    </div>
</>
}

export default LoginScreen