import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import logo from "../Assets/llll.png";
import logo1 from "../Assets/logo blue1111.png";
import { RiHomeLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineHomeWork } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from '../Contexts/UserContext';

const PropertyLayout = () => {

    const { logOut } = useContext(AuthContext);

    const handleLogOut = e => {
        logOut();
    }

    return (
        <div>

            <div className='flex items-center p-4 block md:hidden'>
                <label htmlFor="property-drawer"
                    className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50 lg:hidden"
                >
                    <div>
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

                    </div>
                </label>
                <div className='w-48 mx-auto'>
                    <img src={logo1} alt="" className='' />
                </div>
            </div>

            <div className="drawer drawer-mobile">
                <input id="property-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-base-200">
                    <Outlet></Outlet>
                </div>

                <div className="drawer-side">
                    <label htmlFor="property-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-72 text-base-content bg-blue-900">
                        <>
                            <img src={logo} alt="" />
                        </>
                        <div className='mt-10'>
                            <li className='text-white'><Link to='/home'><RiHomeLine />Home</Link></li>
                            <li className='text-white mt-2'><Link to='/properties/dashboard'><RxDashboard />Dashboard</Link></li>
                            <li className='text-white mt-2'><Link to='/properties'><MdOutlineHomeWork />My Properties</Link></li>
                            <li onClick={handleLogOut} className='text-white mt-2'><Link to='/login'><FiLogOut />Log Out</Link></li>
                        </div>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default PropertyLayout;