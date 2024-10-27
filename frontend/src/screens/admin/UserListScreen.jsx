import { Link } from 'react-router-dom';
import { useDeleteUserMutation, useGetUsersQuery } from '../../slices/userApiSlice';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const UserListScreen = () => {
  const { data:users, isLoading,  refetch, error } = useGetUsersQuery();
    
    const [deleteUser, { isLoading: isDeleteUserLoading }] = useDeleteUserMutation();


  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure`)) {
        try {
            await deleteUser(id);
            refetch();
            toast.success('User Deleted');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
  }

  return <>
    <div className='container  md:max-w-4xl mx-auto py-2'>
           
      <h1 className='m-2 text-gray-600 font-bold text-3xl'>Users</h1>
            
      {isLoading ? <Loader /> : (
        
        <div className="overflow-hidden">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="text-md text-gray-700 uppercase bg-gray-400 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Admin
                </th>
                <th scope="col" className="px-6 py-3">
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className=" border-b bg-gray-700 ">
                  <td className="px-6 py-4">
                    {user._id}
                  </td>
                  <td className="px-6 py-4">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? <FaCheck color='green' /> : <FaTimes color='red' />}
                  </td>
                  <td className="px-6 py-4 inline-flex space-x-2 font-semibold text-lg">
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button>
                        <FaEdit />
                      </button>
                    </Link>
                    
                    <button onClick={() => handleDelete(user._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            
            </tbody>
          </table>
        </div>
      )}
    </div>
  </>
}

export default UserListScreen