import React, { useState } from 'react';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import Chart from './Chart';
import EditPropertyModal from '../Modals/EditPropertyModal';
import NewExpenseModal from '../Modals/NewExpenseModal';
import NewPaymentModal from '../Modals/NewPaymentModal';
import { useQuery } from '@tanstack/react-query';
import ExpensesTable from './ExpensesTable';
import PaymentsTable from './PaymentsTable';

const SingleProperty = () => {

    const single = useLoaderData();
    const [modalOpen, setModalOpen] = useState(false);
    const [singleProperty, setSingleProperty] = useState(single);



    // const { data: singleProperty, refetch } = useQuery({
    //     queryKey: ['properties'],
    //     queryFn: () => fetch(`https://landlord-hub.vercel.app/property/${location?.state}`).then(res => res.json())
    // })


    let className = 'text-gray-900';
    if (singleProperty?.status === "Active Lease") {
        className = 'text-green-500';
    } else if (singleProperty?.status === "Available") {
        className = 'text-yellow-500';
    } else if (singleProperty?.status === "Under Repair") {
        className = 'text-red-500';
    }

    const { img, address, bedroom, bathroom, parking, status, rent } = singleProperty;

    return (
        <div className='max-w-5xl mx-auto flex flex-col my-32'>

            {/* back to home */}
            <div className='flex items-center mt-10'>
                <BsArrowLeft className='mr-2' />
                <div>
                    <Link to='/properties' className='mt-10 font-bold text-lg hover:underline text-blue-900'>Back to My Properties</Link>
                </div>
            </div>
            <div className=''>
                {/* card */}
                {/* <div>
                    <div className="block rounded-lg max-w-xs mx-auto p-4 shadow-lg shadow-indigo-200 mt-10">
                        <div className='text-right mb-4'>
                            <label onClick={() => setModalOpen(true)} htmlFor="edit-property" className='text-xl font-bold text-indigo-700 cursor-pointer underline'>Edit</label>
                        </div>
                        <EditPropertyModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={singleProperty?._id} setSingleProperty={setSingleProperty}></EditPropertyModal>
                        <img
                            alt="Home"
                            src={singleProperty?.img}
                            className="h-56 rounded-md object-cover"
                        />

                        <div className="mt-2">
                            <dl>
                                <div>
                                    <dt className="sr-only">Rent</dt>

                                    <dd className="text-sm text-gray-500 font-bold">${singleProperty?.rent}</dd>
                                </div>

                                <div>
                                    <dt className="sr-only">Address</dt>

                                    <dd className="font-medium">{singleProperty?.address}</dd>
                                </div>
                                <div>
                                    <dt className="sr-only">Status</dt>

                                    <dd className={`${className} font-medium`}>{singleProperty?.status}</dd>
                                </div>
                            </dl>

                            <div className="mt-6 flex items-center gap-8 text-xs">
                                <div className="sm:inline-flex sm:shrink-0 sm:items-center">
                                    <svg
                                        className="h-4 w-4 text-indigo-700"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                        />
                                    </svg>

                                    <div className="mt-1.5 sm:ml-3 sm:mt-0">
                                        <p className="text-gray-500">Parking</p>

                                        <p className="font-medium">{singleProperty?.parking} {singleProperty?.parking > 1 ? "spaces" : "space"}</p>
                                    </div>
                                </div>

                                <div className="sm:inline-flex sm:shrink-0 sm:items-center">
                                    <svg
                                        className="h-4 w-4 text-indigo-700"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                        />
                                    </svg>

                                    <div className="mt-1.5 sm:ml-3 sm:mt-0">
                                        <p className="text-gray-500">Bathroom</p>

                                        <p className="font-medium">{singleProperty?.bathroom} {singleProperty?.bathroom > 1 ? "rooms" : "room"}</p>
                                    </div>
                                </div>

                                <div className="sm:inline-flex sm:shrink-0 sm:items-center">
                                    <svg
                                        className="h-4 w-4 text-indigo-700"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                        />
                                    </svg>

                                    <div className="mt-1.5 sm:ml-3 sm:mt-0">
                                        <p className="text-gray-500">Bedroom</p>

                                        <p className="font-medium">{singleProperty?.bedroom} {singleProperty?.bedroom > 1 ? "rooms" : "room"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <section className="">
                    <div className='text-right mb-4 mr-12 mt-2'>
                        <label onClick={() => setModalOpen(true)} htmlFor="edit-property" className='text-xl font-bold cursor-pointer btn bg-blue-900'>Edit</label>
                    </div>
                    <EditPropertyModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={singleProperty?._id} setSingleProperty={setSingleProperty}></EditPropertyModal>
                    <div className="container flex flex-col-reverse mx-auto lg:flex-row">
                        <div className="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5 ">
                            <div className="flex space-x-2 sm:space-x-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg>
                                <div className="space-y-2">
                                    <p className="text-lg font-medium leading-snug">Rent</p>
                                    <p className="leading-snug text-blue-900 font-bold">${rent}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2 sm:space-x-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg>
                                <div className="space-y-2">
                                    <p className="text-lg font-medium leading-snug">Address</p>
                                    <p className="leading-snug text-blue-900 font-bold">{address}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2 sm:space-x-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg>
                                <div className="space-y-2">
                                    <p className="text-lg font-medium leading-snug">Status</p>
                                    <p className={`${className} font-medium`}>{status}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2 sm:space-x-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg>
                                <div className="space-y-2">
                                    <p className="text-lg font-medium leading-snug">Bedroom</p>
                                    <p className="leading-snug text-blue-900 font-bold">{bedroom} {bedroom > 1 ? "rooms" : "room"}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2 sm:space-x-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg>
                                <div className="space-y-2">
                                    <p className="text-lg font-medium leading-snug">Bathroom</p>
                                    <p className="leading-snug text-blue-900 font-bold">{bathroom} {bathroom > 1 ? "rooms" : "room"}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2 sm:space-x-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg>
                                <div className="space-y-2">
                                    <p className="text-lg font-medium leading-snug">Parking</p>
                                    <p className="leading-snug text-blue-900 font-bold">{parking} {parking > 1 ? "spaces" : "space"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 xl:w-3/5 ">
                            <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
                                <img src={img} alt="" className="rounded-lg shadow-lg  aspect-video h-96" />
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* buttons */}
            <div className='mt-20 flex justify-around'>
                <label onClick={() => setModalOpen(true)} htmlFor="add-expense" className='btn btn-outline'>Add Expense</label>
                <label onClick={() => setModalOpen(true)} htmlFor="add-payment" className='btn btn-outline'>Add Payment</label>
                <button className='btn btn-outline'>Export</button>
            </div>
            <NewExpenseModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={singleProperty?._id} setSingleProperty={setSingleProperty} singleProperty={singleProperty}></NewExpenseModal>
            <NewPaymentModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={singleProperty?._id} setSingleProperty={setSingleProperty} singleProperty={singleProperty}></NewPaymentModal>

            {/* table */}

            <div className='flex flex-col'>
                <div className="overflow-x-auto mt-20 mb-10">
                    <h3 className='text-center font-bold text-blue-900 text-xl mb-2'>Expenses Table</h3>
                    <table className="table table-zebra w-full -z-10">

                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                singleProperty?.calculations?.filter(prop => prop.expense).map((expenses, idx) => <ExpensesTable
                                    key={idx}
                                    expenses={expenses}
                                ></ExpensesTable>)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-auto mt-20 mb-10">
                    <h3 className='text-center font-bold text-blue-900 text-xl mb-2'>Payments Table</h3>
                    <table className="table table-zebra w-full -z-10">

                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                singleProperty?.calculations?.filter(prop => prop.payment).map((payments, idx) => <PaymentsTable
                                    key={idx}
                                    payments={payments}
                                ></PaymentsTable>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SingleProperty;