
import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext.jsx';

export default function Navbar() {
    const [visible, setVisible] = useState(false);

    const {
        setShowSearch,
        getCartCount,
        navigate,
        token,
        setToken,
        setCartItems
    } = useContext(ShopContext);

    const navItems = [
        { name: 'HOME', path: '/' },
        { name: 'ABOUT', path: '/about' },
        { name: 'COLLECTIONS', path: '/collections' },
        { name: 'CONTACT', path: '/contact' }
    ];

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
        setVisible(false);
        navigate('/login');
    };

    const desktopLinkClass = ({ isActive }) =>
        `relative py-2 text-xs md:text-sm font-medium tracking-wide transition-colors duration-300
        ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}
        after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:transition-all after:duration-300
        ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`;

    return (
        <>
            {/* NAVBAR */}
            <nav className="w-full border-b border-gray-200 bg-white">
                <div className="max-w-[1400px] mx-auto min-h-[80px] px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">

                    {/* LOGO */}
                    <Link to="/" className="shrink-0">
                        <img
                            src={assets.logo}
                            className="w-24 sm:w-28 lg:w-32"
                            alt="Forever Logo"
                        />
                    </Link>

                    {/* DESKTOP NAVIGATION */}
                    <ul className="hidden sm:flex flex-1 items-center justify-center gap-4 md:gap-7 lg:gap-10 whitespace-nowrap">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.path === '/'}
                                    className={desktopLinkClass}
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* RIGHT ICONS */}
                    <div className="flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-5">

                        {/* SEARCH */}
                        <button
                            onClick={() => setShowSearch(true)}
                            className="flex items-center justify-center"
                            aria-label="Search"
                        >
                            <img
                                src={assets.search_icon}
                                className="w-5 sm:w-6"
                                alt=""
                            />
                        </button>

                        {/* PROFILE */}
                        <div className="relative group">
                            <button
                                onClick={() => !token && navigate('/login')}
                                className="flex items-center justify-center"
                                aria-label="Profile"
                            >
                                <img
                                    src={assets.profile_icon}
                                    className="w-5 sm:w-6"
                                    alt=""
                                />
                            </button>

                            {token && (
                                <div className="hidden group-hover:block absolute right-0 top-full pt-3 z-50">
                                    <div className="flex flex-col gap-3 w-44 p-4 bg-white shadow-xl border border-gray-100 rounded-xl text-sm text-gray-600">
                                        <Link
                                            to="/orders"
                                            className="hover:text-black"
                                        >
                                            My Orders
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="text-left text-red-500 hover:text-red-700"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CART */}
                        <Link to="/cart" className="relative flex items-center">
                            <img
                                src={assets.cart_icon}
                                className="w-6 min-w-6"
                                alt="Cart"
                            />
                            <span className="absolute -right-2 -bottom-2 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-black text-white text-[10px]">
                                {getCartCount()}
                            </span>
                        </Link>

                        {/* MOBILE MENU BUTTON */}
                        <button
                            onClick={() => setVisible(true)}
                            className="sm:hidden flex items-center justify-center"
                            aria-label="Open menu"
                        >
                            <img
                                src={assets.menu_icon}
                                className="w-6"
                                alt=""
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE SIDEBAR */}
            <div
                className={`fixed inset-0 z-[100] sm:hidden transition-colors duration-300 ${
                    visible
                        ? 'visible bg-black/40'
                        : 'invisible pointer-events-none bg-transparent'
                }`}
                onClick={() => setVisible(false)}
            >
                <div
                    className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
                        visible ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* SIDEBAR HEADER */}
                    <div className="flex items-center justify-between p-5 border-b border-gray-200">
                        <Link to="/" onClick={() => setVisible(false)}>
                            <img
                                src={assets.logo}
                                className="w-28"
                                alt="Forever Logo"
                            />
                        </Link>

                        <button
                            onClick={() => setVisible(false)}
                            className="text-2xl text-gray-700"
                            aria-label="Close menu"
                        >
                            &times;
                        </button>
                    </div>

                    {/* SIDEBAR LINKS */}
                    <div className="flex flex-col p-5 gap-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/'}
                                onClick={() => setVisible(false)}
                                className={({ isActive }) =>
                                    `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-black text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}

                        {token && (
                            <>
                                <Link
                                    to="/orders"
                                    onClick={() => setVisible(false)}
                                    className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    MY ORDERS
                                </Link>

                                <button
                                    onClick={logout}
                                    className="px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    LOGOUT
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
