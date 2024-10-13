import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSignInAlt, FaBars } from 'react-icons/fa';
import  Badge  from '@mui/material/Badge';


const NavBar = () => {

    const { cartItems } = useSelector((state) => state.cart)
 
    return (
        <div className='bg-gray-900 p-4'>
            <div className='flex container items-center text-white justify-between'>
                <div className='font-bold py-4 text-2xl'>
                    Proshop
                </div>
                <div>
                    <div className='flex space-x-4 font-medium text-2xl items-center justify-center'>
                        <Link to='#' className='inline-flex'>
                            <Badge badgeContent={ cartItems.length } color='primary'>
                                <FaShoppingCart />
                            </Badge>
                        </Link>
                        <Link to="#">
                            <FaSignInAlt />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar