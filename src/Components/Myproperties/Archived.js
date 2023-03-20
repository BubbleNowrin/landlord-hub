import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import Loader from '../Loader/Loader';
import MyArchived from './MyArchived';

const Archived = () => {

    const { user, logOut } = useContext(AuthContext);
    // console.log(user.email);

    //get the user specific bookings data
    const { data: archived, refetch, isLoading } = useQuery({
        queryKey: ['archived'],
        queryFn: () => fetch(`http://localhost:5000/arhived-property?email=${user?.email}`, {
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

    console.log(archived);

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        archived?.length > 0 ? <div className='grid grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto my-5 gap-4'>
            {
                archived?.map(archivedProperty => <MyArchived archivedProperty={archivedProperty} key={archivedProperty._id}></MyArchived>)
            }
            <div className='flex justify-end items-end '>
                <div>
                    <Link to='/properties' className='text-2xl mt-5 text-blue-900 font-semibold underline cursor-pointer'>Back to My Properties</Link>
                </div>
            </div>
        </div>
            :
            <div className='flex flex-col h-[80vh] w-full items-center justify-center gap-10'>
                <p className='text-xl lg:text-5xl font-medium text-blue-900 text-center'>No Archived Properties to Show</p>
                <div>
                    <Link to='/properties' className='text-2xl mt-5 text-blue-900 font-semibold underline cursor-pointer'>Back to My Properties</Link>
                </div>
            </div>
    );
};

export default Archived;