import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../slices/userApiSlice";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserEditScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);


    const { id: userId } = useParams();

    const navigate = useNavigate();

    const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);
    
    const [updateUser, { data: updatedUser, isLoading: isLoadingUserUpdate }] = useUpdateUserMutation();
    
    
    useEffect(() => { 
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedUser = {
            userId,
            name, 
            email,
            isAdmin,
        }
        
        try {
            await updateUser(updatedUser);
            toast.success('User Updated');
            refetch();
            navigate('/admin/userlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }

    }



    return <>
        <div className='max-w-6xl m-2 mx-auto'>
            <Link to='/admin/userlist'>
            <button className='btn bg-slate-100 font-semibold text-black hover:bg-slate-50 m-2'>Go back</button>
            </Link>
        </div>
        {isLoadingUserUpdate && <Loader />}

        {isLoading ? <Loader /> : error ? <AlertMessage message={error?.data?.message || error.error}/> : (
        <div className="max-w-5xl m-2 mx-auto">
            <h1 className="text-4xl font-semibold text-gray-500">Edit User</h1>

            <form onSubmit={handleUpdate}
            className='bg-slate-100 p-8 my-2 rounded-md'
        >
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-500">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-box" placeholder="User name" />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-500">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-box" placeholder="User Email" />
            </div>
            <div className="mb-5">
                <div className="inline-flexflex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        placeholder='Admin Name'/>
                    <label className="mb-2 text-sm font-medium text-gray-500">Is Admin</label>
                </div>
            </div>

        
            <button type="submit" className="btn" disabled={isLoading}>Update</button>

            {isLoading && <Loader />}

        </form>
        </div>
        )}
    </>
}

export default UserEditScreen