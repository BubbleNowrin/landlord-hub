import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import img from "../../Assets/Design stats-bro.png";
import { AuthContext } from '../../Contexts/UserContext';
import Loader from '../Loader/Loader';
import Chart from '../Myproperties/Chart';
import { RiArrowDropDownLine } from "react-icons/ri";
import MonthPieChart from "../Myproperties/MonthPieChart";
import CashFlowChart from '../Myproperties/CashFlowChart';


const Dashboard = () => {

    // const [monthName, setmonthName] = useState("");
    // const [monthNum, setmonthNum] = useState("");

    // if (monthNum === "01") {
    //     setmonthName('Jan');
    // }
    // else if (monthNum === "02") {
    //     setmonthName('Feb');
    // }
    // else if (monthNum === "03") {
    //     setmonthName('Mar');
    // }
    // else if (monthNum === "04") {
    //     setmonthName('Apr');
    // }
    // else if (monthNum === "05") {
    //     setmonthName('May');
    // }
    // else if (monthNum === "06") {
    //     setmonthName('Jun');
    // }
    // else if (monthNum === "07") {
    //     setmonthName('Jul');
    // }
    // else if (monthNum === "08") {
    //     setmonthName('Aug');
    // }
    // else if (monthNum === "09") {
    //     setmonthName('Sep');
    // }
    // else if (monthNum === "10") {
    //     setmonthName('Oct');
    // }
    // else if (monthNum === "11") {
    //     setmonthName('Nov');
    // }
    // else if (monthNum === "12") {
    //     setmonthName('Dec');
    // }

    // const monthNumber = 2; // January (0-indexed)
    // const monthName = new Date(Date.UTC(0, monthNumber)).toLocaleString('default', { month: 'long' });
    // console.log(monthName); // Output: January


    let allYear = [];

    const currentYear = new Date().getFullYear();

    const [year, setYear] = useState(currentYear.toString());

    let allMonth = [];
    const currentMonth = new Date();
    let MyDateString;
    currentMonth.setDate(currentMonth.getDate() + 20);
    MyDateString = ('0' + (currentMonth.getMonth())).slice(-2);
    const [month, setMonth] = useState(MyDateString);


    const { user } = useContext(AuthContext);
    //get the user specific bookings data
    const { data: properties, isLoading } = useQuery({
        queryKey: ['properties'],
        queryFn: () => fetch(`https://landlord-hub.vercel.app/property?email=${user?.email}`).then(res => res.json())

    })

    if (isLoading) {
        return <Loader></Loader>
    }

    // console.log(currentMonth);

    // console.log(allMonth);

    const years = properties?.map(prop => prop?.calculations?.map(yrs => {

        const yr = yrs.date.slice(0, 4);

        if (!allYear.includes(yr)) {

            allYear.push(yr);
        }
        return allYear;
    }))

    let expenses = 0;
    let payments = 0;
    let total = 0;

    const expense = properties?.map(prop => prop?.calculations?.filter(prp => prp.date.slice(0, 4) === year)?.map(calc => {
        total = total + parseFloat(calc?.amount);

        if (calc?.expense) {
            expenses = expenses + parseFloat(calc?.amount)
        }
        else {
            payments = payments + parseFloat(calc?.amount)
        }

    }
    ));

    const months = properties?.map(props => props?.calculations?.filter(prps => prps.date.slice(0, 4) === year)?.map(mnths => {

        const mnth = mnths.date.slice(5, 7);
        // console.log(mnth);

        if (!allMonth.includes(mnth)) {

            allMonth.push(mnth);
        }
        return allMonth;
    }))

    // console.log(allMonth);

    let monthExpenses = 0;
    let monthPayments = 0;
    let monthTotal = 0;

    const monthExpense = properties?.map(prop => prop?.calculations?.filter(prp => prp.date.slice(5, 7) === month)?.map(calc => {
        monthTotal = monthTotal + parseFloat(calc?.amount);

        if (calc?.expense) {
            monthExpenses = monthExpenses + parseFloat(calc?.amount)
        }
        else {
            monthPayments = monthPayments + parseFloat(calc?.amount)
        }
    }
    ));

    return (

        <div className='my-44 container mx-auto'>
            <div className='mb-10 flex justify-between align-center'>
                <div>
                    <p className='font-semibold lg:text-lg text-red-500'><span>Expenses in Red</span></p>
                    <p className='font-semibold lg:text-lg text-green-500'>Payments in Green</p>
                </div>

                <div>
                    <p className='font-semibold lg:text-lg text-black'><span>CashFlow:</span> {total}</p>
                    <p className='font-semibold lg:text-lg text-red-500'><span>Total Expenses:</span> {expenses}</p>
                    <p className='font-semibold lg:text-lg text-green-500'>Total Payments: {payments}</p>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div className=''>
                    <Chart className="z-10" expenses={expenses} payments={payments} total={total}></Chart>
                    <div className='flex mb-10 items-center justify-center'>
                        <div className="dropdown dropdown-bottom dropdown-end">

                            <label tabIndex={0} className="m-1 btn btn-outline">Select Year <RiArrowDropDownLine className='text-2xl' /></label>

                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                {
                                    allYear?.map(singleYear => <li><p onClick={() => setYear(singleYear)}>{singleYear}</p></li>)
                                }

                            </ul>
                        </div>
                    </div>
                </div>
                {/* <div className=''>
                    <MonthChart></MonthChart>
                </div> */}
                <div className='w-full lg:w-2/3 mb-10 mx-auto flex flex-col items-center justify-center'>
                    <MonthPieChart className="z-10" expenses={monthExpenses} payments={monthPayments} total={monthTotal}></MonthPieChart>
                    <div className="dropdown dropdown-bottom dropdown-end">

                        <label tabIndex={0} className="m-1 btn btn-outline">Select Month <RiArrowDropDownLine className='text-2xl' /></label>

                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                allMonth?.map(singleMonth => <li><p onClick={() => setMonth(singleMonth)}>{new Date(Date.UTC(0, singleMonth - 1)).toLocaleString('default', { month: 'long' })}</p></li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className='w-full lg:w-2/3 mb-10 mx-auto flex flex-col items-center justify-center'>

                <CashFlowChart className="z-10" expenses={monthExpenses} payments={monthPayments} allMonth={allMonth} calculations={properties?.map(prop => prop?.calculations)} properties={properties}></CashFlowChart>
            </div>

            <div className="overflow-x-auto mb-10">
                <h3 className='text-center font-bold text-blue-900 text-xl mb-2'>Expenses & Payments Table of All the Properties</h3>
                <table className="table w-full -z-10">

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                        property?.calculations?.map(calc => <DashboardExpense calc={calc}></DashboardExpense>)
                    } */}

                        {
                            properties?.map(prop => prop?.calculations?.filter(prp => prp.date.slice(0, 4) === year)?.map(calc => <tr className={calc.expense ? "text-red-500" : "text-green-500"}>
                                <td>{calc?.date}</td>
                                <td>{calc?.category}</td>
                                <td>{calc?.amount}</td>
                                {calc.description.length > 50 ? <td className='max-w-sm text-ellipsis'><textarea cols="50">{calc?.description}</textarea></td> : <td className='max-w-sm text-ellipsis'>{calc?.description}</td>}
                            </tr>)
                            )
                        }

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Dashboard;