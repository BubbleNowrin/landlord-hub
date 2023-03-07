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
            <Link to={`/properties/${_id}`} state={_id} className="block rounded-lg p-4 shadow-lg shadow-indigo-200 bg-white hover:scale-90 ease-in duration-100">
                <div className='relative'>
                    <p className={`${className} font-medium absolute top-2 left-1`}>{status}</p>
                    <img
                        alt="Home"
                        src={img ? img : "https://media.istockphoto.com/id/165979491/vector/illustration-of-a-small-brick-house-with-white-door.jpg?s=612x612&w=0&k=20&c=addCFy31yjHBBt0pEgJnwUvAkMgKgtXazRUjF3ar_OI="}
                        className="h-56 rounded-md object-cover w-full"
                    />
                </div>

                <div className="mt-2 h-40 md:h-32 flex flex-col justify-evenly">
                    <div className=''>
                        <div className='flex items-start gap-1'>
                            {/* <HiLocationMarker size={20} /> */}
                            <img src={location} alt="" className='h-4 w-4 mt-1' />
                            <p className="font-medium">{street}, {city}, {state}, {zip}</p>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between gap-8 text-xs">

                        <div className="md:inline-flex md:shrink-0 md:items-center flex items-center gap-2 md:gap-0">

                            <div className='bg-gray-200 rounded-full p-1'>
                                <BsTag className="h-4 w-4 text-indigo-700" />
                            </div>

                            <div className="mt-1.5 sm:ml-3 sm:mt-0">
                                <p className="text-gray-500 text-md text-semibold">Rent</p>
                                <p className="font-medium"> {rent ? "$" : ""}{rent}</p>
                            </div>
                        </div>
                        <div className="md:inline-flex md:shrink-0 md:items-center flex items-center gap-2 md:gap-0">

                            <div className='bg-gray-200 rounded-full p-1'>
                                <MdOutlineBathtub className="h-4 w-4 text-indigo-700" />
                            </div>

                            <div className="mt-1.5 sm:ml-3 sm:mt-0">
                                <p className="text-gray-500 text-md text-semibold">Bath</p>

                                <p className="font-medium">{bathroom}</p>
                            </div>
                        </div>

                        <div className="md:inline-flex md:shrink-0 md:items-center flex items-center gap-2 md:gap-0">

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

    );
};

export default MyProperty;