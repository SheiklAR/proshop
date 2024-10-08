import { useState } from 'react';
import { FaShoppingCart, FaSignInAlt, FaBars } from 'react-icons/fa';


const NavBar = () => {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <div className='bg-gray-900 p-4'>
            <div className='flex container items-center text-white justify-between'>
                <div className='font-bold py-4 text-2xl'>
                    Proshop
                </div>
                <div>
                    {isClicked && (
                        <div className=' md:flex md:space-x-4 font-semibold text-2xl'>
                            <a href="#">
                                <FaShoppingCart /> Cart
                            </a>
                            <a href="#">
                                <FaSignInAlt /> SignIn
                            </a>
                        </div>
                    )}
                </div>
                <button className='md:hidden text-2xl'
                    onClick={() => setIsClicked(!isClicked)}>
                    <FaBars />
                </button>
            </div>
        </div>
    );
}

export default NavBar