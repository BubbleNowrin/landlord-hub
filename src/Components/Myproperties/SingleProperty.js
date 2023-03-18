import React, { useRef, useState } from "react";
import {
  Link,
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BsArrowLeft, BsPencilFill, BsTag, BsThreeDotsVertical } from "react-icons/bs";
import Chart from "./Chart";
import EditPropertyModal from "../Modals/EditPropertyModal";
import NewExpenseModal from "../Modals/NewExpenseModal";
import NewPaymentModal from "../Modals/NewPaymentModal";
import { useQuery } from "@tanstack/react-query";
import ExpensesTable from "./ExpensesTable";
import PaymentsTable from "./PaymentsTable";
import Swal from "sweetalert2";
import UpdateImageModal from "../Modals/UpdateImageModal";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { PhotoProvider, PhotoView } from "react-photo-view";
import SinglePropertyTable from "./SinglePropertyTable";
import Loader from "../Loader/Loader";
import { MdOutlineBathtub } from "react-icons/md";
import { RiHotelBedLine } from "react-icons/ri";
import location from "../../Assets/Vector (1).svg"

const SingleProperty = () => {
  const tableRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear.toString());
  // const [tableData, setTableData] = useState([]);
  const single = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [singleProperty, setSingleProperty] = useState(single);
  // console.log(typeof (year));


  const navigate = useNavigate();

  const handleDelete = (id) => {
    fetch(`https://landlord-hub.vercel.app/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/properties");
        Swal.fire("Success", "Property Deleted Successfully", "success");
      });
  };

  const handleArchive = (id) => {
    fetch(`https://landlord-hub.vercel.app/archived/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Success", "Property Archived Successfully", "success");
        navigate("/properties/archived");
      });
  };

  const handleReactivate = (id) => {
    fetch(`https://landlord-hub.vercel.app/reactivate/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Success", "Property Reactivated Successfully", "success");
        navigate("/properties");
      });
  };



  const {
    data: tableData, isLoading,
    refetch,
  } = useQuery({
    queryKey: ["calculations", year, singleProperty?._id],
    queryFn: () =>
      fetch(`https://landlord-hub.vercel.app/calculations/${singleProperty?._id}?year=${year}`).then(
        (res) => res.json()
      ),
  });


  let className = "text-gray-900";
  if (singleProperty?.status === "Active Lease") {
    className =
      "text-white font-bold  px-4 py-1 rounded-md bg-green-500 border-none hover:bg-green-500";
  } else if (singleProperty?.status === "Available") {
    className =
      "text-white font-bold px-4 py-1 rounded-md bg-yellow-500 border-none hover:bg-yellow-500 ";
  } else if (singleProperty?.status === "Under Repair") {
    className =
      "text-white font-bold px-4 py-1 rounded-md bg-red-500 border-none hover:bg-red-500";
  }

  const { _id, img, street, city, state, zip, bedroom, bathroom, status, rent } =
    singleProperty;
  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="w-11/12 mx-auto flex flex-col my-5">
      <div className="">
        {/* card */}

        <section className="bg-white p-10 rounded-xl">
          {/* back to home */}
          {singleProperty?.archived || (
            <div className="flex items-center">
              <BsArrowLeft className="mr-2" />
              <div>
                <Link
                  to="/properties"
                  className="mt-10 font-bold text-lg hover:underline text-blue-900"
                >
                  Back to My Properties
                </Link>
              </div>
            </div>
          )}
          {singleProperty?.archived && (
            <div className="flex items-center">
              <BsArrowLeft className="mr-2" />
              <div>
                <Link
                  to="/properties/archived"
                  className="mt-10 font-bold text-lg hover:underline text-blue-900"
                >
                  Back to Archived Properties
                </Link>
              </div>
            </div>
          )}

          <EditPropertyModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            id={singleProperty?._id}
            setSingleProperty={setSingleProperty}
            singleProperty={singleProperty}
          ></EditPropertyModal>

          <UpdateImageModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            id={singleProperty?._id}
            setSingleProperty={setSingleProperty}
            singleProperty={singleProperty}
          ></UpdateImageModal>

          <div className="w-full">
            <div className="block rounded-lg p-4 shadow-lg shadow-indigo-200 bg-white w-full lg:w-96 mx-auto">
              <div className='relative'>
                <p className={`${className} font-medium absolute top-2 left-1`}>{status}</p>
                <img
                  alt="Home"
                  src={img ? img : "https://media.istockphoto.com/id/165979491/vector/illustration-of-a-small-brick-house-with-white-door.jpg?s=612x612&w=0&k=20&c=addCFy31yjHBBt0pEgJnwUvAkMgKgtXazRUjF3ar_OI="}
                  className="h-56 rounded-md object-cover w-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-end mt-2">
                  <div className="flex">
                    {singleProperty?.archived || (
                      <div className="flex gap-1">
                        <div className="dropdown dropdown-bottom dropdown-end">
                          <label
                            tabIndex={0}
                            className="text-xl font-bold cursor-pointer"
                          >
                            <BsPencilFill className="p-2 text-3xl rounded-md bg-gray-200 text-blue-900" />
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <label
                                onClick={() => setModalOpen(true)}
                                htmlFor="edit-property"
                              >
                                Add Info
                              </label>
                            </li>
                            <li>
                              <label
                                onClick={() => setModalOpen(true)}
                                htmlFor="upload-Image"
                              >
                                Upload Image
                              </label>
                            </li>
                          </ul>
                        </div>
                        <div className="dropdown dropdown-bottom dropdown-end">
                          <label
                            tabIndex={0}
                            className="text-xl font-bold cursor-pointer"
                          >
                            <BsThreeDotsVertical className="p-2 text-3xl rounded-md bg-gray-200 text-blue-900" />
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <button onClick={() => handleDelete(single._id)}>
                                Delete
                              </button>
                            </li>
                            <li>
                              <button onClick={() => handleArchive(single._id)}>
                                Archive
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {singleProperty?.archived && (
                      <button
                        onClick={() => handleReactivate(single._id)}
                        className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 text-blue-900"
                      >

                        Reactivate
                      </button>
                    )}
                  </div>
                </div>
                <div className='flex items-start gap-1'>
                  <img src={location} alt="" className='h-4 w-4 mt-1' />
                  <p className="font-medium">{street}, {city}, {state}, {zip}</p>
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
            </div>
            {/* buttons */}
            <div className="w-full lg:w-96 mx-auto">
              {singleProperty?.archived || (
                <div className="flex gap-1 md:gap-5 mt-5">
                  <label
                    onClick={() => setModalOpen(true)}
                    htmlFor="add-expense"
                    className="px-2 py-2 md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6] text-sm  font-semibold bg-white text-black hover:bg-blue-900 hover:text-white"
                  >
                    Add Expense
                  </label>
                  <label
                    onClick={() => setModalOpen(true)}
                    htmlFor="add-payment"
                    className="px-2 py-2 md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6] text-sm font-semibold bg-white text-black hover:bg-blue-900 hover:text-white"
                  >
                    Add Payment
                  </label>
                  <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                  >
                    <button className="px-2 py-2 md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6] text-sm font-semibold bg-white text-black hover:bg-blue-900 hover:text-white">Export</button>
                  </DownloadTableExcel>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <NewExpenseModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        id={singleProperty?._id}
        refetch={refetch}
        singleProperty={singleProperty}
        year={year}
      ></NewExpenseModal>
      <NewPaymentModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        id={singleProperty?._id}
        refetch={refetch}
        singleProperty={singleProperty}
        year={year}
      ></NewPaymentModal>

      {/* table */}

      <SinglePropertyTable
        id={_id}
        tableRef={tableRef}
        tableData={tableData?.calculations}
        allYears={tableData?.allYear}
        setYear={setYear}
        refetch={refetch}
        current={currentYear}
      />
    </div>
  );
};

export default SingleProperty;
