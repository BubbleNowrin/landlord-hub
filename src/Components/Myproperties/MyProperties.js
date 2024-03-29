import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import AddPropertyModal from '../Modals/AddPropertyModal';
import { AuthContext } from '../../Contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import MyProperty from './MyProperty';
import Dashboard from '../Dashboard/Dashboard';
import Loader from '../Loader/Loader';
import { BsSearch } from 'react-icons/bs';
import { IoIosArrowDropdown } from 'react-icons/io';

const MyProperties = () => {
    // const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    // console.log(user.email);

    //get the user specific bookings data
    const { data: properties, refetch, isLoading } = useQuery({
        queryKey: ['properties'],
        queryFn: () => fetch(`https://landlord-hub.vercel.app/property?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                return logOut();
            }
            return res.json()
        })

    })

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <section className='w-11/12 mx-auto'>
            <div className='flex flex-col md:flex-row-reverse  my-5 max-w-4xl mx-auto'>
                <div className="dropdown dropdown-bottom block lg:hidden">
                    <label tabIndex={0} className="btn btn-primary m-1"><span className='text-sm mr-2'>Sort</span><IoIosArrowDropdown /></label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 my-2">
                        <li><Link to='/properties/archived' className='hidden md:block px-4 py-2 rounded-md border-[1px] border-[#A6A6A6]  font-semibold bg-white text-black hover:bg-blue-900 hover:text-white'>Archived Properties</Link></li>
                        <li><Link to='/properties/archived' className='block md:hidden px-2  rounded-md border-[1px] border-[#A6A6A6]   font-semibold bg-white text-black hover:bg-blue-900 hover:text-white'>Archived Properties</Link></li>
                        <li><button className='px-2  md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6] font-semibold bg-white text-black hover:bg-blue-900 hover:text-white'>Under Repair</button></li>
                        <li><button className='px-2 md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6]   font-semibold bg-white text-black hover:bg-blue-900 hover:text-white'>Available</button></li>
                        <li><button className='px-2  md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6]   font-semibold bg-white text-black hover:bg-blue-900 hover:text-white'>Active Lease</button></li>
                        <li> <button className='hidden md:block md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6]  font-semibold bg-white hover:bg-blue-900 hover:text-white text-black'>All Properties</button></li>
                        <li><button className='block md:hidden px-2 rounded-md border-[1px] border-[#A6A6A6]   font-semibold bg-white hover:bg-blue-900 hover:text-white text-black'>All</button></li>
                    </ul>
                </div>

                <div className='hidden  md:flex md:flex-row-reverse gap-[2px] md:gap-3 mt-3 md:mt-0'>
                    <Link to='/properties/archived' className='hidden md:block px-4 py-2 rounded-md border-[1px] border-[#A6A6A6]  font-semibold bg-white text-black hover:bg-blue-900 hover:text-white'>Archived Properties</Link>
                    <Link to='/properties/archived' className='block md:hidden px-2  rounded-md border-[1px] border-[#A6A6A6]   font-semibold bg-white text-black hover:bg-blue-900 hover:text-white'>Archived Properties</Link>
                    <button className='px-2  md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6] font-semibold bg-white text-black hover:bg-blue-900 hover:text-white'>Under Repair</button>
                    <button className='px-2 md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6]   font-semibold bg-white text-black hover:bg-blue-900 hover:text-white'>Available</button>
                    <button className='px-2  md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6]   font-semibold bg-white text-black hover:bg-blue-900 hover:text-white'>Active Lease</button>
                    <button className='hidden md:block md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6]  font-semibold bg-white hover:bg-blue-900 hover:text-white text-black'>All Properties</button>
                    <button className='block md:hidden px-2 rounded-md border-[1px] border-[#A6A6A6]   font-semibold bg-white hover:bg-blue-900 hover:text-white text-black'>All</button>
                </div>


            </div>

            {
                properties?.length > 0 ? <div className='grid grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto my-5 gap-4'>
                    {
                        properties?.map(property => <MyProperty property={property} key={property._id}></MyProperty>)
                    }

                    {/* add property */}
                    <div>
                        <label onClick={() => setModalOpen(true)} htmlFor="add-property" className="rounded-lg p-4 shadow-lg shadow-indigo-200 bg-white h-[392px] flex justify-center items-center hover:scale-90 ease-in duration-100">
                            <div>
                                <FaPlus className='text-7xl text-blue-900' />
                            </div>
                        </label>
                    </div>
                    <div className='flex justify-end items-end'>

                    </div>
                    <AddPropertyModal refetch={refetch} modalOpen={modalOpen} setModalOpen={setModalOpen}></AddPropertyModal>
                </div>
                    :
                    <div className='flex flex-col h-[80vh] w-full items-center justify-center gap-10'>
                        <p className='text-xl lg:text-5xl font-medium text-blue-900 text-center'>No Properties to Show</p>
                        {/* add property */}
                        <div >
                            <label onClick={() => setModalOpen(true)} htmlFor="add-property" className="rounded-lg p-4 shadow-lg shadow-indigo-200 bg-white h-full flex justify-center items-center hover:scale-110 ease-in duration-100">
                                <div>
                                    <FaPlus className='text-7xl text-blue-900' />
                                </div>
                            </label>
                        </div>
                        <AddPropertyModal refetch={refetch} modalOpen={modalOpen} setModalOpen={setModalOpen}></AddPropertyModal>
                    </div>
            }

        </section>
    );
};

export default MyProperties;