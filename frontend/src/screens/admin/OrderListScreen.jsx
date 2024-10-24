import { Link } from 'react-router-dom';
import { useGetAllOrdersQuery } from '../../slices/ordersApiSlice'
import Loader from '../../components/Loader';
import AlertMessage from '../../components/AlertMessage';
import { FaTimes } from 'react-icons/fa';


const OrderListScreen = () => {
    const { data: allOrders, isLoading, error } = useGetAllOrdersQuery();
    console.log(allOrders)
    return <>
        <h1 className='p-2 text-2xl font-semibold text-gray-600'>Orders</h1>
        {isLoading ? (<Loader />) : error ? (<AlertMessage message={error} />) : (
            

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-400 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    USER
                </th>
                <th scope="col" className="px-6 py-3">
                    TOTAL
                </th>
                <th scope="col" className="px-6 py-3">
                    PAID
                </th>
                <th scope="col" className="px-6 py-3">
                    DELIVERED
                </th>
                <th scope="col" className="px-6 py-3">
                </th>
            </tr>
        </thead>
        <tbody>
            {allOrders.map((order, index) => (
            <tr key={index} className=" border-b bg-gray-800 ">
                <td className="px-6 py-4">
                    {order._id}
                </td>
                <td className="px-6 py-4">
                    {order.user.name}
                </td>
                <td className="px-6 py-4">
                    ${order.totalPrice}
                </td>
                <td className="px-6 py-4">
                    {order.isPaid ? (order.paidAt.substring(0,10)) : (<FaTimes style={{color: "Red"}} />)}
                </td>
                <td className="px-6 py-4">
                    {order.isDelivered ? (order.deliveredAt.substring(0,10)) : (<FaTimes style={{color: "Red"}} />)}
                </td>
                <td className="px-6 py-4">
                   <Link to={`/orders/${order._id}`}>
                        <button>Details</button>
                   </Link>
                </td>
            </tr>
            ))}
            
        </tbody>
    </table>
</div>

        )}
    </>
}

export default OrderListScreen