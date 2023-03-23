import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import img from "../../Assets/Design stats-bro.png";
import { AuthContext } from '../../Contexts/UserContext';
import Loader from '../Loader/Loader';
import Chart from '../Myproperties/Chart';
import { RiArrowDropDownLine } from "react-icons/ri";
import MonthPieChart from "../Myproperties/MonthPieChart";
import { Area, AreaChart, CartesianGrid, Cell, Line, Tooltip, LineChart, PieChart, XAxis, YAxis, Pie } from 'recharts';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { VictoryPie } from 'victory';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useRef } from 'react';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';




const Dashboard = () => {

  const { user, logOut } = useContext(AuthContext);
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState("");
  const [property, setProperty] = useState("");

  //get the user specific bookings data
  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", user?.email, year, month, property],
    queryFn: () =>
      fetch(`https://landlord-hub.vercel.app/dashboard?email=${user?.email}&year=${year}&month=${month}&street=${property}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json()
      }),
  });

  const handleYearMonth = year => {
    setYear(year);
    setMonth('');
  }


  if (isLoading) {
    return <Loader />;
  }

  const data = [
    { x: "Payments", y: properties?.payments },
    { x: "Expenses", y: properties?.expenses }

  ];

  console.log(properties);

  return (

    <div className="max-w-5xl mx-auto my-5">

      {
        properties?.calculations && properties?.calculations?.length > 0 ? <div>
          <div className="flex justify-start gap-5 mx-5">
            <div className="dropdown dropdown-bottom dropdown-end">
              <label tabIndex={0} className="m-1 btn bg-white hover:bg-blue-900 hover:text-white text-black">
                Select Property <RiArrowDropDownLine className="text-2xl" />
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {properties?.allProperty?.map((prp) => (
                  <li>
                    <p onClick={() => setProperty(prp)}>{prp}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown dropdown-bottom dropdown-end">
              <label tabIndex={0} className="m-1 btn bg-white hover:bg-blue-900 hover:text-white text-black">
                Select Year <RiArrowDropDownLine className="text-2xl" />
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {properties?.allYear?.map((singleYear) => (
                  <li>
                    <p onClick={() => handleYearMonth(singleYear)}>
                      {singleYear}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown dropdown-bottom dropdown-end">
              <label tabIndex={0} className="m-1 btn bg-white hover:bg-blue-900 hover:text-white text-black">
                Select Month <RiArrowDropDownLine className="text-2xl" />
              </label>

              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                {properties?.allMonth?.map((singleMonth) => (
                  <li key={singleMonth}>
                    <p onClick={() => setMonth(singleMonth)}>
                      {new Date(0, singleMonth - 1).toLocaleString("default", {
                        month: "long",
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-center my-10">
            <p>
              {property ? property : "All Properties"}, {year} {" "}
              {month ? "," + new Date(0, month - 1).toLocaleString("default", {
                month: "long",
              }) : ""}
            </p>
          </div>

          <div className="flex items-center justify-between gap-12 my-12">
            <section className=' bg-white md:p-5  rounded-xl lg:flex justify-evenly items-center w-full'>
              <div className='pt-5'>
                <AreaChart width={350} height={250} data={properties?.cashflowData}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tickFormatter={(dateStr) => new Date(dateStr).toLocaleString("default", { month: "short" }).substring(0, 3)} />
                  <YAxis dataKey="cashflow" />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="cashflow" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
              </div>
              <div className='relative'>

                <VictoryPie
                  data={data}
                  innerRadius={80}
                  width={370}
                  colorScale={["#4CAF50", "#FF0000"]}
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                  style={{
                    data: {
                      stroke: "white",
                      strokeWidth: 10
                    },
                    labels: {
                      fill: "black",
                      fontSize: 16,
                      padding: 30
                    }
                  }}

                />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
                  <p>Cashflow</p>
                  <span className={properties?.cashflow > 0 ? "text-green-500" : "text-red-500"}>${properties?.cashflow.toFixed(2)}</span>
                </div>
              </div>

            </section>
          </div>
        </div>
          :
          <div className='h-[60vh] flex justify-center items-center'>
            <p className='text-2xl font-bold text-blue-900 text-center'>Add Expenses and Payments To Specific Properties To View Dashboard</p>
          </div>
      }


      <section className='bg-white p-10 rounded-xl my-5'>
        <div className='flex justify-end mb-2'>

          <ReactHtmlTableToExcel
            className="px-2 py-2 md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6] text-sm font-semibold bg-white text-black hover:bg-blue-900 hover:text-white"
            table="table-to-xls"
            filename="DashBoard Property Expenses"
            sheet="property"
            buttonText="Export"
          />
        </div>
        <div className="overflow-x-auto mb-10">

          <table className="table w-full" id="table-to-xls">
            <thead>
              <tr>
                <th>Property</th>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>


              {properties?.calculations?.map((calc) => (
                <tr
                  className={calc.expense ? "text-red-500" : "text-green-500"}
                >
                  <td>{calc?.street},{calc?.state}</td>
                  <td>{calc?.date}</td>
                  <td>{calc?.category}</td>
                  <td>{calc?.amount}</td>
                  {calc.description.length > 50 ? (
                    <td className="max-w-sm text-ellipsis">
                      <textarea cols="50">{calc?.description}</textarea>
                    </td>
                  ) : (
                    <td className="max-w-sm text-ellipsis">
                      {calc?.description}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;