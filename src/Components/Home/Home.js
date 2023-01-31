import React from 'react';
import img from "../../Assets/Build your home-pana.png"
import img1 from "../../Assets/Construction costs-amico.png"
import { TbReportMoney, TbReport } from "react-icons/tb"
import { IoReceipt } from "react-icons/io5"


const Home = () => {
    return (
        <div>
            <section
                class="relative bg-[url(https://media.istockphoto.com/id/1341378132/photo/side-view-of-open-plan-kitchen-with-living-room-and-garden-view-from-the-window.jpg?b=1&s=170667a&w=0&k=20&c=AkaeqhpogPOjVwB2JzMl6hLKVTb8HvOu93pnC_HC3Nk=)] bg-cover bg-center bg-no-repeat bg-fixed"
            >
                <div
                    class="absolute inset-0  hero-overlay bg-opacity-40"
                ></div>

                <div
                    class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center justify-center lg:px-8"
                >
                    <div class="max-w-full flex flex-col items-center">
                        <h1 class="text-3xl font-extrabold sm:text-5xl">
                            <strong class="block font-extrabold lg:text-8xl text-white">
                                Take The <span className='text-blue-900'>Stress</span> Out
                            </strong>
                        </h1>

                        <p class="mt-4 max-w-2xl sm:text-3xl sm:leading-relaxed text-white text-center font-semibold">
                            of your real estate finances with our simple, but powerful, software solution
                        </p>
                    </div>
                </div>
            </section>
            <section>
                <div className="container px-6 py-12 mx-auto">
                    <div className="grid items-center gap-4 xl:grid-cols-5">
                        <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
                            <h2 className="text-4xl font-bold text-blue-900">We Help Our Clients Sell, Buy or Rent Properties Hassle Free</h2>
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
                </div>
            </section>
            <section className="p-4 lg:p-8 my-6 bg-gray-200">
                <div className="container mx-auto space-y-12">

                    <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
                        <img src={img} alt="" className="h-96 object-cover aspect-video p-10" />
                        <div className="flex flex-col justify-center flex-1 p-6 ">
                            <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                                <h1 className="text-4xl font-bold leading-none"> <span className='font-bold text-blue-900'>Easy-to-use</span> Business Tools for Small to Mid-Size <span className='font-bold text-blue-900'> Real Estate</span> Investors
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
