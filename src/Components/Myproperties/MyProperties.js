import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import AddPropertyModal from '../Modals/AddPropertyModal';
import { AuthContext } from '../../Contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import MyProperty from './MyProperty';
import Dashboard from '../Dashboard/Dashboard';
import Loader from '../Loader/Loader';

const MyProperties = () => {
    // const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const { user } = useContext(AuthContext);
    // console.log(user.email);

    //get the user specific bookings data
    const { data: properties, refetch, isLoading } = useQuery({
        queryKey: ['properties'],
        queryFn: () => fetch(`https://landlord-hub.vercel.app/property?email=${user?.email}`).then(res => res.json())

    })

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        properties?.length > 0 ? <div className='grid grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto my-32 gap-4'>
            {
                properties?.map(property => <MyProperty property={property} key={property._id}></MyProperty>)
            }

            {/* add property */}
            <div>
                <label onClick={() => setModalOpen(true)} htmlFor="add-property" className="rounded-lg p-4 shadow-lg shadow-indigo-200 h-[375px] flex justify-center items-center hover:scale-90 ease-in duration-100">
                    <div>
                        <FaPlus className='text-7xl text-blue-900' />
                    </div>
                </label>
            </div>
            <div className='flex justify-end items-end'>
                <Link to='/archived' className='text-2xl mt-5 text-blue-900 font-semibold underline cursor-pointer'>View Archived Properties</Link>
            </div>
            <AddPropertyModal refetch={refetch} modalOpen={modalOpen} setModalOpen={setModalOpen}></AddPropertyModal>
        </div>
            :
            <div className='flex flex-col h-[80vh] w-full items-center justify-center gap-10'>
                <p className='text-xl lg:text-5xl font-medium text-blue-900 text-center'>No Properties to Show</p>
                {/* add property */}
                <div>
                    <label onClick={() => setModalOpen(true)} htmlFor="add-property" className="rounded-lg p-4 shadow-lg shadow-indigo-200 h-full flex justify-center items-center hover:scale-110 ease-in duration-100">
                        <div>
                            <FaPlus className='text-7xl text-blue-900' />
                        </div>
                    </label>
                </div>
                <AddPropertyModal refetch={refetch} modalOpen={modalOpen} setModalOpen={setModalOpen}></AddPropertyModal>
            </div>
    );
};

export default MyProperties;