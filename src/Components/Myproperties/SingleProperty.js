import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import Chart from './Chart';
import EditPropertyModal from '../Modals/EditPropertyModal';
import NewExpenseModal from '../Modals/NewExpenseModal';
import NewPaymentModal from '../Modals/NewPaymentModal';

const SingleProperty = () => {
    return (
        <div className='max-w-2xl mx-auto flex flex-col my-32'>

            {/* back to home */}
            <div className='flex items-center mt-10'>
                <BsArrowLeft className='mr-2' />
                <div>
                    <Link to='/properties' className='mt-10 font-bold text-lg hover:underline text-blue-900'>Back to My Properties</Link>
                </div>
            </div>
            <div className='flex'>
                {/* card */}
                <div>

                    <div class="block rounded-lg max-w-xs mx-auto p-4 shadow-lg shadow-indigo-200 mt-10">
                        <div className='text-right mb-4'>
                            <label htmlFor="edit-property" className='text-xl font-bold text-indigo-700 cursor-pointer underline'>Edit</label>

                        </div>
                        <EditPropertyModal></EditPropertyModal>
                        <img
                            alt="Home"
                            src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            class="h-56 rounded-md object-cover"
                        />

                        <div class="mt-2">
                            <dl>
                                <div>
                                    <dt class="sr-only">Rent</dt>

                                    <dd class="text-sm text-gray-500 font-bold">$1200</dd>
                                </div>

                                <div>
                                    <dt class="sr-only">Address</dt>

                                    <dd class="font-medium">6 Hummingbird Ln, Somewhere, FL 32589</dd>
                                </div>
                                <div>
                                    <dt class="sr-only">Status</dt>

                                    <dd class="font-medium text-green-400">Active Lease</dd>
                                </div>
                            </dl>

                            <div class="mt-6 flex items-center gap-8 text-xs">
                                <div class="sm:inline-flex sm:shrink-0 sm:items-center">
                                    <svg
                                        class="h-4 w-4 text-indigo-700"
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

                                    <div class="mt-1.5 sm:ml-3 sm:mt-0">
                                        <p class="text-gray-500">Parking</p>

                                        <p class="font-medium">2 spaces</p>
                                    </div>
                                </div>

                                <div class="sm:inline-flex sm:shrink-0 sm:items-center">
                                    <svg
                                        class="h-4 w-4 text-indigo-700"
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

                                    <div class="mt-1.5 sm:ml-3 sm:mt-0">
                                        <p class="text-gray-500">Bathroom</p>

                                        <p class="font-medium">2 rooms</p>
                                    </div>
                                </div>

                                <div class="sm:inline-flex sm:shrink-0 sm:items-center">
                                    <svg
                                        class="h-4 w-4 text-indigo-700"
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

                                    <div class="mt-1.5 sm:ml-3 sm:mt-0">
                                        <p class="text-gray-500">Bedroom</p>

                                        <p class="font-medium">4 rooms</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* chart */}
                <Chart></Chart>


            </div>

            {/* buttons */}
            <div className='mt-20 flex justify-around'>
                <label htmlFor="add-expense" className='btn btn-outline'>Add Expense</label>
                <label htmlFor="add-payment" className='btn btn-outline'>Add Payment</label>
                <button className='btn btn-outline'>Export</button>
            </div>
            <NewExpenseModal></NewExpenseModal>
            <NewPaymentModal></NewPaymentModal>
            {/* table */}

            <div className="overflow-x-auto mt-20 mb-10">
                <table className="table table-zebra w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <th>1</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <th>2</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <th>3</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SingleProperty;