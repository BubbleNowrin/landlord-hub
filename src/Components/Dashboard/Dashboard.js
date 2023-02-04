import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import img from "../../Assets/Design stats-bro.png";
import { AuthContext } from '../../Contexts/UserContext';
import Chart from '../Myproperties/Chart';



const Dashboard = () => {

    const [data, setData] = useState({});

    const { user } = useContext(AuthContext);
    //get the user specific bookings data
    const { data: properties, refetch, isLoading } = useQuery({
        queryKey: ['properties'],
        queryFn: () => fetch(`https://landlord-hub.vercel.app/property?email=${user?.email}`).then(res => res.json())

    })


    return (

        <div className='my-44'>
            <div className='w-80 mb-24'>
                <Chart></Chart>
            </div>
            <div className="overflow-x-auto mb-10">
                <h3 className='text-center font-bold text-blue-900 text-xl mb-2'>Expenses & Payments Table of All the Properties</h3>
                <table className="table table-zebra w-full -z-10">

                    <thead>
                        <tr>
                            <th>Property Address</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                        property?.calculations?.map(calc => <DashboardExpense calc={calc}></DashboardExpense>)
                    } */}
                        {
                            properties?.map(prop => prop?.calculations?.map(calc =>
                                <tr className={calc.expense ? "text-red-500" : "text-green-500"}>
                                    <td>{calc?.address}</td>
                                    <td>{calc?.date}</td>
                                    <td>{calc?.category}</td>
                                    <td>{calc?.amount}</td>
                                    <td>{calc?.description}</td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Dashboard;