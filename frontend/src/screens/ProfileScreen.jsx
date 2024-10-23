import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useUpdateMutation } from "../slices/usersSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const { data: myOrders } = useGetMyOrdersQuery();

    const [updateProfile, { isLoading:isUpdateProfileLoading }] = useUpdateMutation();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email)
        }
    }, [userInfo.name, userInfo.email]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            toast.error('Password do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile Updated Successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
            
        }
        
    

    return <>
        <div className='container mx-auto my-2'>
            <div className="md:flex m-2 space-x-8">
                <form onSubmit={handleSubmit} className=' p-2' >
                    <p className="font-semibold text-3xl text-gray-500 pb-2 uppercase">Profile</p>
                    <label htmlFor="name" className='font-medium text-md text-gray-500 my-1'>
                        Change Name
                        <input
                        type="text" name='name' id='name' 
                        placeholder='name'
                        className="input-ch-box" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label htmlFor="email" className='font-medium text-md text-gray-500 my-1'>
                        Change Email
                        <input 
                        type="email" name='email' id='email' 
                        value={email} className="input-ch-box"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email' />
                    </label>
                    <label htmlFor="password" className='font-medium text-md text-gray-500 my-1'>
                        Change Password
                        <input 
                        type="password" name='password' id='password' 
                        className="input-ch-box" 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password' />

                    </label>
                    <label htmlFor="confirmPassword" className='font-medium text-md text-gray-500 my-1'>
                        Confirm Password
                        <input 
                        type="password" name='password' id='confirmPassword' 
                        className="input-ch-box"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='confirmPassword' />
                    </label>
                    <button type="submit" className="btn my-2">Update</button>
                </form>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="font-bold text-gray-400">ID</th>
                            <th className="font-bold text-gray-400">DATE</th>
                            <th className="font-bold text-gray-400">TOTAL</th>
                            <th className="font-bold text-gray-400">PAID</th>
                            <th className="font-bold text-gray-400">Delivered</th>
                        </tr>
                        {myOrders && (
                            myOrders.map((order, index) => (
                                
                        <tr key={index} className="font-semibold text-gray-600">
                            <td>{order._id}</td>
                            <td>{(order.createdAt).substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? (
                                order.paidAt.substring(0,10)
                            ) : (<FaTimes style={{color: "red"}} />)}</td>
                            <td>
                                {order.isDelivered ? (order.DeliveredAt) : (<FaTimes style={{color: "red"}} />)}
                            </td>
                            <td>
                                <Link to={`/orders/${order._id}`}>
                                    <button className="btn">Details</button>
                                </Link>
                            </td>
                        </tr>
                            ))
                        )}
                    </thead>
                </table>
                
            </div>
            
    </div>
    </>
}

export default ProfileScreen