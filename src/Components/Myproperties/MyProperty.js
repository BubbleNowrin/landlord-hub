import React from 'react';
import { Link } from 'react-router-dom';

const MyProperty = ({ property }) => {

    // console.log(property);
    const { img, rent, address, status, bathroom, bedroom, parking, _id } = property;

    let className = 'text-gray-900';
    if (status === "Active Lease") {
        className = 'text-green-500';
    } else if (status === "Available") {
        className = 'text-yellow-500';
    } else if (status === "Under Repair") {
        className = 'text-red-500';
    }


    return (
        <div>
            <div>
                <Link to={`/properties/${_id}`} state={_id} className="block rounded-lg p-4 shadow-lg shadow-indigo-200 hover:scale-110 ease-in duration-100">
                    <img
                        alt="Home"
                        src={img}
                        className="h-56 rounded-md object-cover"
                    />

                    <div className="mt-2">
                        <dl>
                            <div>
                                <dt className="sr-only">Rent</dt>

                                <dd className="text-sm text-gray-500 font-bold">${rent}</dd>
                            </div>

                            <div>
                                <dt className="sr-only">Address</dt>

                                <dd className="font-medium">{address}</dd>
                            </div>
                            <div>
                                <dt className="sr-only">Status</dt>

                                <dd className={`${className} font-medium`}>{status}</dd>
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

                                    <p className="font-medium">{parking} {parking > 1 ? "spaces" : "space"}</p>
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

                                    <p className="font-medium">{bathroom} {bathroom > 1 ? "rooms" : "room"}</p>
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

                                    <p className="font-medium">{bedroom} {bedroom > 1 ? "rooms" : "room"}</p>
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