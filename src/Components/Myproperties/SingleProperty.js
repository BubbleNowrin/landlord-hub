import React, { useState } from 'react';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { BsArrowLeft, BsPencilFill } from 'react-icons/bs';
import Chart from './Chart';
import EditPropertyModal from '../Modals/EditPropertyModal';
import NewExpenseModal from '../Modals/NewExpenseModal';
import NewPaymentModal from '../Modals/NewPaymentModal';
import { useQuery } from '@tanstack/react-query';
import ExpensesTable from './ExpensesTable';
import PaymentsTable from './PaymentsTable';

const SingleProperty = () => {

    let allYear = [];
    const single = useLoaderData();
    const [modalOpen, setModalOpen] = useState(false);
    const [singleProperty, setSingleProperty] = useState(single);
    const [year, setYear] = useState("")
    const years = singleProperty?.calculations?.map(yrs => {

        const yr = yrs.date.slice(0, 4);

        if (!allYear.includes(yr)) {

            allYear.push(yr);
        }
        return allYear;
    })


    console.log(allYear);



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

    const { img, street, city, state, zip, bedroom, bathroom, status, rent } = singleProperty;

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
                        {/* <label onClick={() => setModalOpen(true)} htmlFor="edit-property" className='text-xl font-bold cursor-pointer btn bg-blue-900'><BsPencilFill /></label> */}
                    </div>
                    <EditPropertyModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={singleProperty?._id} setSingleProperty={setSingleProperty}></EditPropertyModal>

                    <div className='mt-6'>
                        <div className='flex flex-col gap-6 items-center justify-center'>
                            <div className='flex items-center gap-8'>
                                <p className='text-blue-900 font-bold text-2xl'>{street}, {city}, {state}, {zip}</p>
                                <span> <label onClick={() => setModalOpen(true)} htmlFor="edit-property" className='text-xl font-bold cursor-pointer btn bg-blue-900'><BsPencilFill /></label></span>
                            </div>
                            <img src={img ? img : "https://media.istockphoto.com/id/165979491/vector/illustration-of-a-small-brick-house-with-white-door.jpg?s=612x612&w=0&k=20&c=addCFy31yjHBBt0pEgJnwUvAkMgKgtXazRUjF3ar_OI="} alt="" className="rounded-lg shadow-lg aspect-video h-96" />
                        </div>
                        <div className='flex justify-around items-center mt-10'>
                            <div className="flex space-x-2 sm:space-x-4">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg> */}
                                <div className="space-y-2">
                                    <p className="text-lg font-medium leading-snug">Rent</p>
                                    <p className="leading-snug text-blue-900 font-bold">${rent}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2 sm:space-x-4">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg> */}
                                <div className="space-y-2">
                                    <p className="text-lg font-medium leading-snug">Status</p>
                                    <p className={`${className} font-medium`}>{status}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2 sm:space-x-4">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg> */}
                                <div className="space-y-2">
                                    <p className="text-lg font-medium leading-snug">Bedroom</p>
                                    <p className="leading-snug text-blue-900 font-bold">{bedroom} {bedroom > 1 ? "rooms" : "room"}</p>
                                </div>
                            </div>

                            <div className="flex space-x-2 sm:space-x-4">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg> */}
                                <div className="space-y-2">
                                    <p className="text-lg font-medium leading-snug">Bathroom</p>
                                    <p className="leading-snug text-blue-900 font-bold">{bathroom} {bathroom > 1 ? "rooms" : "room"}</p>
                                </div>
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
                    <h3 className='text-center font-bold text-blue-900 text-xl mb-2'>Expenses & Payments Table</h3>
                    <div className='flex mb-10 items-center justify-center'>
                        {/* <button onClick={() => setYear("2021")} className='btn btn-outline'>2021</button> */}
                        {
                            allYear?.map(singleYear => <button onClick={() => setYear(singleYear)} className='btn btn-outline'>{singleYear}</button>)
                        }

                    </div>
                    <table className="table table-zebra w-full -z-10">

                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                singleProperty?.calculations?.filter(prop => prop.expense).map((expenses, idx) => <ExpensesTable
                                    key={idx}
                                    expenses={expenses}
                                ></ExpensesTable>)
                            } */}
                            {
                                singleProperty?.calculations?.filter(prp => prp.date.slice(0, 4) === year).map(calc =>
                                    <tr className={calc.expense ? "text-red-500" : "text-green-500"}>
                                        <td>{calc?.date}</td>
                                        <td>{calc?.category}</td>
                                        <td>{calc?.description}</td>
                                        <td>{calc?.amount}</td>
                                        <td>{calc?.expense ? "Expense" : "Payment"}</td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SingleProperty;