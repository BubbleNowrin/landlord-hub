import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import Loader from '../Loader/Loader';
import MyArchived from './MyArchived';

const Archived = () => {

    const { user } = useContext(AuthContext);
    // console.log(user.email);

    //get the user specific bookings data
    const { data: archived, refetch, isLoading } = useQuery({
        queryKey: ['archived'],
        queryFn: () => fetch(`https://landlord-hub.vercel.app/arhived-property?email=${user?.email}`).then(res => res.json())
    })

    console.log(archived);

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        archived?.length > 0 ? <div className='grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto my-32 gap-10'>
            {
                archived?.map(archivedProperty => <MyArchived archivedProperty={archivedProperty} key={archivedProperty._id}></MyArchived>)
            }
        </div>
            :
            <div className='flex flex-col h-[80vh] w-full items-center justify-center gap-10'>
                <p className='text-xl lg:text-5xl font-medium text-blue-900 text-center'>No Archived Properties to Show</p>
            </div>
    );
};

export default Archived;