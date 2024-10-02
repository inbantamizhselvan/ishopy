import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [profileVisible, setProfileVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, getUserMessages, newMessagesCount } = useContext(ShopContext);
    const [timeoutId, setTimeoutId] = useState(null);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    }

    const handleMouseEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setProfileVisible(true);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => {
            setProfileVisible(false);
        }, 200); 
        setTimeoutId(id);
    };

    return (
        <nav className='flex items-center justify-between py-6 px-2 bg-white'>
            {/* Logo */}
            <Link to='/'>
                <img 
                    src={assets.logo} 
                    className='w-36 h-10 hover:opacity-80 transition-opacity' 
                    alt="Logo" 
                />
            </Link>

            {/* Navbar Links */}
            <ul className='hidden sm:flex gap-8 text-sm text-gray-700 font-semibold'>
                {['/', '/collection', '/about', '/contact'].map((path, index) => (
                    <NavLink
                        key={index}
                        to={path}
                        className='relative flex flex-col items-center gap-1 group transition-transform hover:scale-105'
                        activeClassName='text-black'>
                        <p className='group-hover:text-black transition-colors'>{path.slice(1).toUpperCase() || 'HOME'}</p>
                        <hr className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-700 group-hover:w-full transition-all duration-300 ease-in-out' />
                    </NavLink>
                ))}
            </ul>

            {/* Icons Section */}
            <div className='flex items-center gap-6'>
                {/* Search Icon */}
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer hover:scale-110 transition-transform' alt="Search" />

                {/* Profile Dropdown */}
                <div 
                    className='relative' 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        onClick={() => token ? null : navigate('/login')} 
                        src={assets.profile_icon} 
                        className='w-5 cursor-pointer hover:scale-110 transition-transform' 
                        alt="Profile" 
                    />{newMessagesCount > 0 && <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-600 text-white rounded-full text-[8px]'>
                    {newMessagesCount}
                     </p>}
                    {token && profileVisible && (
                        <div className='absolute right-0 mt-2 py-2 w-40 bg-white rounded-lg shadow-lg z-50'>
                            <p onClick={() => navigate('/myprofile')} className='px-4 py-2 cursor-pointer hover:bg-purple-200'>My Profile</p>
                            <p onClick={() => navigate('/orders')} className='px-4 py-2 cursor-pointer hover:bg-purple-200'>Orders</p>
                            <p onClick={logout} className='px-4 py-2 cursor-pointer hover:bg-purple-200'>Logout</p>
                            <p onClick={()=>navigate('/chats')} className='flex px-4 py-2 cursor-pointer hover:bg-purple-200'>Chat{newMessagesCount > 0 && <p className='relative right-[-5px] bottom-[-5px] w-4 h-4 text-center leading-4 bg-red-600 text-white rounded-full text-[8px]'>
                    {newMessagesCount}
                     </p>}</p>
                        </div>
                    )}
                </div>

                {/* Cart Icon */}
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5 cursor-pointer hover:scale-110 transition-transform' alt="Cart" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#69159d] text-white rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>

                {/* Mobile Menu Icon */}
                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className='w-6 cursor-pointer sm:hidden hover:scale-110 transition-transform'
                    alt="Menu"
                />
            </div>

            {/* Sidebar (Mobile) */}
            <div
                className={`fixed top-0 right-0 bottom-0 bg-white z-40 transform transition-transform duration-300 ease-in-out shadow-lg ${visible ? 'translate-x-0' : 'translate-x-full'} w-3/4 sm:w-1/3`}>
                <div className='flex flex-col text-gray-600'>
                    {/* Close Button */}
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Back" />
                        <p>Back</p>
                    </div>

                    {/* Sidebar Links */}
                    {['/', '/collection', '/about', '/contact'].map((path, index) => (
                        <NavLink
                            key={index}
                            to={path}
                            onClick={() => setVisible(false)}
                            className='py-3 px-6 text-lg hover:bg-gray-100 transition-colors hover:scale-105 rounded'
                            activeClassName='text-black'>
                            {path.slice(1).toUpperCase() || 'HOME'}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Overlay */}
            {visible && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 z-30'
                    onClick={() => setVisible(false)}
                ></div>
            )}
        </nav>
    );
};

export default Navbar;
