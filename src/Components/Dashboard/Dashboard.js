import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import img from "../../Assets/Design stats-bro.png";
import { AuthContext } from '../../Contexts/UserContext';
import Loader from '../Loader/Loader';
import Chart from '../Myproperties/Chart';
import { RiArrowDropDownLine } from "react-icons/ri";
import { CartesianGrid,  Legend, Line, LineChart,  Tooltip, XAxis, YAxis } from 'recharts';





const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState("");
  const [property,setProperty] = useState("");
    
  //get the user specific bookings data
  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties",user?.email,year,month,property],
    queryFn: () =>
      fetch(`http://localhost:5000/dashboard?email=${user?.email}&year=${year}&month=${month}&street=${property}`).then(
        (res) => res.json()
      ),
  });

  const handleYearMonth = year =>{
    setYear(year);
    setMonth('');
  }



    if (isLoading) {
        return <Loader />;
    }

    return (
      <div className="my-44 container mx-auto">
        <div className="flex justify-evenly">
          <div className="dropdown dropdown-bottom dropdown-end">
            <div className="flex flex-col justify-center items-center">
              <label tabIndex={0} className="m-1 flex items-center">
                Select Property <RiArrowDropDownLine className="text-2xl" />
              </label>
              <button className="btn btn-outline">
                {property ? property : "All Properties"}
              </button>
            </div>
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
            <div className="flex flex-col justify-center items-center">
              <label tabIndex={0} className="m-1 flex items-center">
                Select Year <RiArrowDropDownLine className="text-2xl" />
              </label>
              <button className="btn btn-outline">{year}</button>
            </div>

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
            <div className="flex flex-col justify-center items-center">
              <label tabIndex={0} className="m-1 flex items-center">
                Select Month <RiArrowDropDownLine className="text-2xl" />
              </label>
              <button className="btn btn-outline">
                {month
                  ? new Date(Date.UTC(0, month - 1)).toLocaleString("default", {
                      month: "long",
                    })
                  : "All Months"}
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {properties?.allMonth?.map((singleYear) => (
                <li>
                  <p onClick={() => setMonth(singleYear)}>
                    {new Date(Date.UTC(0, singleYear - 1)).toLocaleString(
                      "default",
                      {
                        month: "long",
                      }
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 my-12">
          <div className="flex justify-start  rounded-md p-5">
            <Chart
              className="z-10"
              expenses={properties?.expenses}
              payments={properties?.payments}
              total={properties?.total}
              cashflow={properties?.cashflow}
            ></Chart>
          </div>

          <div className="mx-auto  rounded-md p-5">
            <LineChart
              width={550}
              height={450}
              data={properties?.cashflowData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="cashflow" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="date"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="cashflow" stroke="#82ca9d" />
            </LineChart>
            
            
          </div>
        </div>

        {/* <div className="w-full lg:w-2/3 mb-10 mx-auto flex flex-col items-center justify-center">
          
        </div> */}

        <div className="overflow-x-auto mb-10">
          {/* <h3 className="text-center font-bold text-blue-900 text-xl mb-2">
            Expenses & Payments Table of All the Properties
          </h3> */}
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

              {properties?.calculations?.map((calc) => (
                <tr
                  className={calc.expense ? "text-red-500" : "text-green-500"}
                >
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
      </div>
    );
};

export default Dashboard;