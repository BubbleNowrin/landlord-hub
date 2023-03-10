import React from 'react';
import img from "../../Assets/Group 65.svg"
import { TbReportMoney, TbReport } from "react-icons/tb"
import { IoReceipt } from "react-icons/io5"
import under from "../../Assets/Group 10.svg"
import exp from "../../Assets/Group 86.svg"
import rec from "../../Assets/Group 81.svg"
import rep from "../../Assets/Group 82.svg"
import Footer from '../Shared/Footer/Footer';


const Home = () => {
    return (
        <div>
            <section
                className="relative bg-[url(https://i.ibb.co/bXR2YjK/Rectangle-45.png)] bg-cover bg-center bg-no-repeat bg-fixed"
            >
                <div
                    className="absolute inset-0  hero-overlay bg-opacity-40"
                ></div>

                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center justify-center lg:px-8"
                >
                    <div className="max-w-full flex flex-col items-center relative">
                        <strong className="block font-extrabold text-3xl lg:text-7xl text-white mt-14 lg:mt-0">
                            Take The Stress Out
                        </strong>
                        <div className='absolute top-[88px] lg:top-[73px] left-[135px] lg:left-[325px] '>
                            <img src={under} className="w-32 lg:w-full" alt="" />
                        </div>

                        <p className="mt-4 max-w-2xl sm:text-lg sm:leading-relaxed text-white text-center ">
                            of your real estate finances with our simple, but powerful, software solution
                        </p>
                    </div>
                </div>
            </section>
            <section>
                {/* <div className="container px-6 py-12 mx-auto">
                    <div className="grid items-center gap-4 xl:grid-cols-5">
                        <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
                            <h2 className="text-4xl font-bold text-blue-900">Easy-to-use Business Tools for Small to Mid-Size Real Estate Investors</h2>
                            <p className="text-gray-500">Utilizing his exceptional experience and knowledge of the luxury waterfront markets, Roland serves an extensive and elite worldwide client base. He enjoys a reputation as a tenacious Broker.</p>
                        </div>
                        <div className="p-6 xl:col-span-3">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid content-center gap-4">

                                    <div className="p-6 rounded shadow-xl hover:shadow-slate-300">
                                        <TbReportMoney className='text-6xl font-bold text-blue-900 mb-4 p-2 bg-gray-200' />
                                        <div>
                                            <p className="text-2xl font-bold text-blue-900">Track Your Expenses With Ease</p>

                                        </div>

                                        <p className='text-gray-500 mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quaerat modi in molestias. Cum molestiae ab quae quibusdam dolore veritatis doloribus placeat dolor rerum optio officiis officia, quod delectus recusandae!</p>
                                    </div>

                                </div>
                                <div className="grid content-center gap-4">
                                    <div>

                                        <div className="p-6 rounded shadow-xl hover:shadow-slate-300">
                                            <IoReceipt className='text-6xl font-bold text-blue-900 mb-4 bg-gray-200 p-2' />
                                            <div>
                                                <p className="text-2xl font-bold text-blue-900">Log Your Receipts</p>

                                            </div>

                                            <p className='text-gray-500 mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quaerat modi in molestias. Cum molestiae ab quae quibusdam dolore veritatis doloribus placeat dolor rerum optio officiis officia, quod delectus recusandae!</p>
                                        </div>
                                    </div>
                                    <div>

                                        <div className="p-6 rounded shadow-xl hover:shadow-slate-300">
                                            <TbReport className='text-6xl font-bold text-blue-900 mb-4 bg-gray-200 p-2' />
                                            <div>
                                                <p className="text-2xl font-bold text-blue-900">Generate Income Reports</p>

                                            </div>

                                            <p className='text-gray-500 mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quaerat modi in molestias. Cum molestiae ab quae quibusdam dolore veritatis doloribus placeat dolor rerum optio officiis officia, quod delectus recusandae!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                        <div>
                            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                                Landlord Hub
                            </p>
                        </div>
                        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                            <span className="relative inline-block">
                                <svg
                                    viewBox="0 0 52 24"
                                    fill="currentColor"
                                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                                >
                                    <defs>
                                        <pattern
                                            id="d9d7687a-355f-4502-8ec4-7945db034688"
                                            x="0"
                                            y="0"
                                            width=".135"
                                            height=".30"
                                        >
                                            <circle cx="1" cy="1" r=".7" />
                                        </pattern>
                                    </defs>
                                    <rect
                                        fill="url(#d9d7687a-355f-4502-8ec4-7945db034688)"
                                        width="52"
                                        height="24"
                                    />
                                </svg>

                            </span>{' '}
                            Easy-to-use Business Tools for Small to Mid-Size Real Estate Investors
                        </h2>
                        <p className="text-base text-gray-700 md:text-lg">
                            Utilizing his exceptional experience and knowledge of the luxury waterfront markets, Roland serves an extensive and elite worldwide client base. He enjoys a reputation as a tenacious Broker.
                        </p>
                    </div>
                    <div className="grid gap-5 mb-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="p-5 duration-300 transform bg-white border rounded shadow-2xl hover:-translate-y-2">
                            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50 ">
                                <img src={exp} alt="" />
                            </div>
                            <h6 className="mb-2 font-bold leading-5">Track Your Expenses With Ease</h6>
                            <p className="text-sm text-gray-900">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quaerat modi in molestias.veritatis doloribus placeat dolor rerum optio officiis officia, quod delectus recusandae!ss
                            </p>
                        </div>
                        <div className="p-5 duration-300 transform bg-white border rounded shadow-2xl hover:-translate-y-2">
                            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
                                <img src={rec} alt="" />
                            </div>
                            <h6 className="mb-2 font-bold leading-5">Log Your Receipts</h6>
                            <p className="text-sm text-gray-900">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quaerat modi in molestias.veritatis doloribus placeat dolor rerum optio officiis officia, quod delectus recusandae!ss
                            </p>
                        </div>
                        <div className="p-5 duration-300 transform bg-white border rounded shadow-2xl hover:-translate-y-2">
                            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
                                <img src={rep} alt="" />
                            </div>
                            <h6 className="mb-2 font-bold leading-5">Generate Income Reports</h6>
                            <p className="text-sm text-gray-900">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quaerat modi in molestias.veritatis doloribus placeat dolor rerum optio officiis officia, quod delectus recusandae!ss
                            </p>
                        </div>
                    </div>

                </div>
            </section>
            <section className="p-4 lg:p-8 my-6">
                <div className="container mx-auto space-y-12">

                    <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
                        <div className="flex flex-col justify-center flex-1 p-6 ">
                            <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                                <h1 className="text-4xl font-bold leading-none">Easy-to-use Business Tools for Small to Mid-Size Real Estate Investors
                                </h1>
                                <p className='mt-4 text-sm'>Utilizing his exceptional experience and knowledge of the luxury waterfront markets, Roland serves an extensive and elite worldwide client base. He enjoys a reputation as a tenacious Broker.</p>
                            </div>
                        </div>
                        <img src={img} alt="" className="h-96 lg:object-cover aspect-video lg:pt-10 lg:px-10" />
                    </div>

                </div>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default Home;
