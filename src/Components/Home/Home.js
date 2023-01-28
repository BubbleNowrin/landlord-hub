import React from 'react';
import img from "../../Assets/Build your home-pana.png"
import img1 from "../../Assets/Construction costs-amico.png"

const Home = () => {
    return (
        <div>
            <section
                class="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat"
            >
                <div
                    class="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"
                ></div>

                <div
                    class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                >
                    <div class="max-w-xl text-center sm:text-left">
                        <h1 class="text-3xl font-extrabold sm:text-5xl">


                            <strong class="block font-extrabold text-7xl text-indigo-700">
                                Landlord Hub
                            </strong>
                        </h1>

                        <p class="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
                            Take the stress out of your real estate finances with our simple, but powerful, software solution

                        </p>

                        <div class="mt-8 flex flex-wrap gap-4 text-center">
                            <a
                                href="#"
                                class="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-indigo-500 sm:w-auto"
                            >
                                Get Started
                            </a>

                            <a
                                href="#"
                                class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-indigo-600 shadow hover:text-indigo-700 focus:outline-none focus:ring active:text-indigo-500 sm:w-auto"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-14">
                <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img src={img} alt="" className="object-contain  w-11/12" />
                    </div>
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-4xl font-bold leading-none"> <span className='font-bold text-indigo-700'>Easy-to-use</span> Business Tools for Small to Mid-Size <span className='font-bold text-indigo-700'> Real Estate</span> Investors
                        </h1>

                    </div>
                </div>
            </section>
            <section className="mt-10">
                <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-4xl font-bold leading-none"> <span className='font-bold text-indigo-700'>Track Your Expenses </span>  With Ease, Log Your Receipts, Generate Income Reports
                        </h1>

                    </div>
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img src={img1} alt="" className="object-contain w-9/12" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;