import React from 'react';
import { Link } from 'react-router-dom';
import { BsTag } from "react-icons/bs";
import { MdOutlineBathtub } from "react-icons/md";
import { RiHotelBedLine } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
import location from "../../Assets/Vector (1).svg"

const MyProperty = ({ property }) => {

    // console.log(property);
    const { img, rent, street, city, state, zip, status, bathroom, bedroom, parking, _id } = property;

    let className = 'text-gray-900';
    if (status === "Active Lease") {
        className = 'text-white font-bold px-4 py-1 rounded-md bg-green-500 hover:bg-green-500 border-none';
    } else if (status === "Available") {
        className = 'text-white font-bold px-4 py-1 rounded-md bg-yellow-500 hover:bg-yellow-500 border-none';
    } else if (status === "Under Repair") {
        className = 'text-white font-bold px-4 py-1 rounded-md bg-red-500 hover:bg-red-500 border-none';
    }


    return (
        <div>
            <div className=''>
                <Link to={`/properties/${_id}`} state={_id} className="block rounded-lg p-4 shadow-lg shadow-indigo-200 bg-white hover:scale-90 ease-in duration-100">
                    <div className='relative'>
                        <p className={`${className} font-medium absolute top-2 left-1`}>{status}</p>
                        <img
                            alt="Home"
                            src={img ? img : "https://media.istockphoto.com/id/165979491/vector/illustration-of-a-small-brick-house-with-white-door.jpg?s=612x612&w=0&k=20&c=addCFy31yjHBBt0pEgJnwUvAkMgKgtXazRUjF3ar_OI="}
                            className="h-56 rounded-md object-cover"
                        />
                    </div>

                    <div className="mt-2 h-28 flex flex-col justify-evenly">
                        <div className=''>
                            <div className='flex items-start gap-1'>
                                {/* <HiLocationMarker size={20} /> */}
                                <img src={location} alt="" className='h-4 w-4 mt-1' />
                                <p className="font-medium">{street}, {city}, {state}, {zip}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between gap-8 text-xs">
                            {/* <div className="sm:inline-flex sm:shrink-0 sm:items-center">
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

                                    <p className="font-medium">{parking} {parking > 1 ? "spaces" : "space"}</p>
                                </div>
                            </div> */}

                            <div className="sm:inline-flex sm:shrink-0 sm:items-center">
                                {/* <svg
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
                                </svg> */}
                                <div className='bg-gray-200 rounded-full p-1'>
                                    <BsTag className="h-4 w-4 text-indigo-700" />
                                </div>

                                <div className="mt-1.5 sm:ml-3 sm:mt-0">
                                    <p className="text-gray-500 text-md text-semibold">Rent</p>

                                    <p className="font-medium"> {rent ? "$" : ""}{rent}</p>
                                </div>
                            </div>
                            <div className="sm:inline-flex sm:shrink-0 sm:items-center">
                                {/* <svg
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
                                </svg> */}

                                <div className='bg-gray-200 rounded-full p-1'>
                                    <MdOutlineBathtub className="h-4 w-4 text-indigo-700" />
                                </div>

                                <div className="mt-1.5 sm:ml-3 sm:mt-0">
                                    <p className="text-gray-500 text-md text-semibold">Bath</p>

                                    <p className="font-medium">{bathroom}</p>
                                </div>
                            </div>

                            <div className="sm:inline-flex sm:shrink-0 sm:items-center">
                                {/* <svg
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
                                </svg> */}

                                <div className='bg-gray-200 rounded-full p-1'>
                                    <RiHotelBedLine className="h-4 w-4 text-indigo-700" />
                                </div>

                                <div className="mt-1.5 sm:ml-3 sm:mt-0">
                                    <p className="text-gray-500 text-md text-semibold">Bed</p>

                                    <p className="font-medium">{bedroom}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default MyProperty;