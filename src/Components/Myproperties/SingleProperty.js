import React, { useRef, useState } from "react";
import {
  Link,
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BsArrowLeft, BsPencilFill, BsThreeDotsVertical } from "react-icons/bs";
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
        navigate("/archived");
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
    data: tableData,isLoading,
    refetch,
  } = useQuery({
    queryKey: ["calculations",year,singleProperty?._id],
    queryFn: () =>
      fetch(`http://localhost:5000/calculations/${singleProperty?._id}?year=${year}`).then(
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

  const { _id,img, street, city, state, zip, bedroom, bathroom, status, rent } =
    singleProperty;
    if(isLoading){
      return <Loader/>
    }

  return (
    <div className="max-w-5xl mx-auto flex flex-col my-32">
      {/* back to home */}
      {singleProperty?.archived || (
        <div className="flex items-center mt-10">
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
        <div className="flex items-center mt-10">
          <BsArrowLeft className="mr-2" />
          <div>
            <Link
              to="/archived"
              className="mt-10 font-bold text-lg hover:underline text-blue-900"
            >
              Back to Archived Properties
            </Link>
          </div>
        </div>
      )}

      <div className="">
        {/* card */}

        <section className="">
          <div className="text-right mb-4 mr-12 mt-2">
            {/* <label onClick={() => setModalOpen(true)} htmlFor="edit-property" className='text-xl font-bold cursor-pointer btn bg-blue-900'><BsPencilFill /></label> */}
          </div>
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

          <div className="mt-6">
            <div className="flex flex-col gap-6 items-center">
              <div className="flex flex-col items-center gap-8">
                <p className="text-blue-900 font-bold text-2xl">
                  {street}, {city}, {state}, {zip}
                </p>
              </div>
            </div>
            <div className="flex space-x-2 sm:space-x-4 mt-3">
              <div className="space-y-2"></div>
            </div>
            <div className="relative flex justify-center items-center mt-5">
              <p
                className={`${className}  font-medium absolute top-5 left-5 md:left-48`}
              >
                {status}
              </p>
              <img
                src={
                  img
                    ? img
                    : "https://media.istockphoto.com/id/165979491/vector/illustration-of-a-small-brick-house-with-white-door.jpg?s=612x612&w=0&k=20&c=addCFy31yjHBBt0pEgJnwUvAkMgKgtXazRUjF3ar_OI="
                }
                alt=""
                className="rounded-lg shadow-lg aspect-video h-96"
              />
            </div>
            <div className="flex justify-around items-center mt-10">
              <div className="flex space-x-2 sm:space-x-4">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg> */}
                <div className="space-y-2">
                  <p className="text-lg font-medium leading-snug">Rent</p>
                  <p className="leading-snug text-blue-900 font-bold">
                    {rent ? "$" : ""}
                    {rent}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 sm:space-x-4">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg> */}
                <div className="space-y-2">
                  <p className="text-lg font-medium leading-snug">Bed</p>
                  <p className="leading-snug text-blue-900 font-bold">
                    {bedroom}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 sm:space-x-4">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg> */}
                <div className="space-y-2">
                  <p className="text-lg font-medium leading-snug">Bath</p>
                  <p className="leading-snug text-blue-900 font-bold">
                    {bathroom}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 sm:space-x-4">
                {singleProperty?.archived || (
                  <div>
                    <div className="dropdown  dropdown-bottom dropdown-end">
                      <label
                        tabIndex={0}
                        className="text-xl font-bold cursor-pointer btn bg-blue-900 m-1"
                      >
                        <BsPencilFill />
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
                        className="text-xl font-bold cursor-pointer btn bg-blue-900 m-1"
                      >
                        <BsThreeDotsVertical />
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
                    className="btn bg-blue-900"
                  >
                    Reactivate
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* buttons */}
      {singleProperty?.archived || (
        <div className="mt-20 flex justify-around">
          <label
            onClick={() => setModalOpen(true)}
            htmlFor="add-expense"
            className="btn btn-outline"
          >
            Add Expense
          </label>
          <label
            onClick={() => setModalOpen(true)}
            htmlFor="add-payment"
            className="btn btn-outline"
          >
            Add Payment
          </label>
          <DownloadTableExcel
            filename="users table"
            sheet="users"
            currentTableRef={tableRef.current}
          >
            <button className="btn btn-outline">Export</button>
          </DownloadTableExcel>
        </div>
      )}

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
