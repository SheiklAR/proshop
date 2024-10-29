import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSignInAlt, FaBars } from 'react-icons/fa';
import Badge from '@mui/material/Badge';
import NavDropDown from './NavDropDown';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';
import AdminDropDown from './AdminDropDown';
import SearchBar from './SearchBar';


const NavBar = () => {

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [logoutApiCall] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
        
    }   

 
    return (
        <div className='bg-gray-900 p-4'>
            <div className='flex container items-center text-white justify-between'>
                <Link to="/">
                    <div className='font-bold py-4 text-2xl'>
                        Proshop
                    </div>
                </Link>
                <div>
                    <div className='flex space-x-4 font-medium text-2xl items-center justify-center'>
                        <SearchBar />
                        <Link to='/cart' className='inline-flex'>
                            <Badge badgeContent={ cartItems.length } color='primary'>
                                <FaShoppingCart />
                            </Badge>
                        </Link>

                        {userInfo ? (
                            <NavDropDown profileName={ userInfo.name } handleLogout={handleLogout} />
                        ) : (
                        <Link to="/login">
                            <FaSignInAlt />
                        </Link>
     
                        )}

                        {userInfo && userInfo.isAdmin && (
                            <AdminDropDown />
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar