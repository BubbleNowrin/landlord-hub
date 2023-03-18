import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/UserContext';
import logo from "../../../Assets/logo blue1111.png"


const Navbar = () => {
    const { logOut, user } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPos(window.pageYOffset);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navbarStyles = {
        backgroundColor: scrollPos > 50 ? "white" : "white",
        transition: "background-color 0.5s ease-out",
    };


    const handleLogOut = e => {
        logOut();
    }

    return (

        <div className="px-4 py-5 fixed top-0 z-10 w-full mx-auto md:px-24 lg:px-8" style={navbarStyles}>
            <div className="flex items-center justify-between">
                <Link
                    to="/"
                    aria-label="Company"
                    title="Company"
                    className="inline-flex items-center"
                >
                    <img src={logo} alt="" className='w-72' />
                </Link>
                <div className='flex gap-3'>
                    <ul className="flex items-center hidden space-x-8 lg:flex">
                        {/* <li>
                            <Link
                                to="/"
                                aria-label="Our product"
                                title="Our product"
                                className="font-medium tracking-wide text-blue-900 transition-colors duration-200 hover:text-blue-800 text-lg"
                            >
                                Home
                            </Link>
                        </li> */}
                        {
                            user?.uid &&
                            <li>
                                <Link
                                    to="/properties/dashboard"
                                    aria-label="Our product"
                                    title="Our product"
                                    className="font-medium tracking-wide text-blue-900 transition-colors duration-200 hover:text-blue-800 text-lg"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        }
                        {
                            user?.uid &&
                            <li>
                                <Link
                                    to="/properties"
                                    aria-label="Our product"
                                    title="Our product"
                                    className="font-medium tracking-wide text-blue-900 transition-colors duration-200 hover:text-blue-800 text-lg"
                                >
                                    My Properties
                                </Link>
                            </li>
                        }


                    </ul>
                    <ul className="flex items-center hidden space-x-8 lg:flex">

                        {
                            user?.email ?
                                <li onClick={handleLogOut}>
                                    <Link
                                        to="/signup"
                                        className="px-7 py-3 text-md font-semibold text-center text-white transition duration-300 rounded-sm hover:from-blue-700 hover:to-blue-400 ease bg-gradient-to-br from-blue-800 to-blue-500 md:w-auto"
                                        aria-label="Sign up"
                                        title="Log Out"
                                    >
                                        Log Out
                                    </Link>
                                </li>
                                :
                                <li>

                                    <Link to="/login" class="px-7 py-3 text-md font-semibold text-center text-white transition duration-300 rounded-sm hover:from-blue-700 hover:to-blue-400 ease bg-gradient-to-br from-blue-800 to-blue-500 md:w-auto">
                                        Login
                                    </Link>
                                </li>
                        }
                    </ul>
                </div>
                <div className="lg:hidden">
                    <button
                        aria-label="Open Menu"
                        title="Open Menu"
                        className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                            />
                        </svg>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute top-0 left-0 w-full">
                            <div className="p-5 bg-white border rounded shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <Link
                                            to="/"
                                            aria-label="Company"
                                            title="Company"
                                            className="inline-flex items-center"
                                        >
                                            <img src={logo} className="w-60" alt="" />
                                        </Link>
                                    </div>
                                    <div>
                                        <button
                                            aria-label="Close Menu"
                                            title="Close Menu"
                                            className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <nav>
                                    <ul className="space-y-4">
                                        {/* <li>
                                            <Link
                                                to="/"
                                                aria-label="Our product"
                                                title="Our product"
                                                className="font-medium tracking-wide text-blue-900 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                            >
                                                Home
                                            </Link>
                                        </li> */}
                                        {
                                            user?.uid &&
                                            <li>
                                                <Link
                                                    to="/properties/dashboard"
                                                    aria-label="Our product"
                                                    title="Our product"
                                                    className="font-medium tracking-wide text-blue-900 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                        }
                                        {
                                            user?.uid &&
                                            <li>
                                                <Link
                                                    to="/properties"
                                                    aria-label="Our product"
                                                    title="Our product"
                                                    className="font-medium tracking-wide text-blue-900 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                                >
                                                    My Properties
                                                </Link>
                                            </li>
                                        }

                                        {
                                            user?.email ?
                                                <li onClick={handleLogOut}>
                                                    <Link
                                                        to="/signup"
                                                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md hover:from-blue-700 hover:to-blue-400 ease bg-gradient-to-br from-blue-800 to-blue-500 text-white "
                                                        aria-label="Sign up"
                                                        title="Sign up"
                                                    >
                                                        Log Out
                                                    </Link>
                                                </li>
                                                :
                                                <li>
                                                    <Link
                                                        to="/login"
                                                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide hover:from-blue-700 hover:to-blue-400 ease bg-gradient-to-br from-blue-800 to-blue-500 transition duration-200 rounded shadow-md text-white "
                                                        aria-label="Sign up"
                                                        title="Sign up"
                                                    >
                                                        Log In
                                                    </Link>
                                                </li>
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Navbar;