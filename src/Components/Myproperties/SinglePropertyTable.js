import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";

import { BsFillEyeFill, BsPencilFill, BsTrash, BsUpload } from "react-icons/bs";
import { TbReplace } from "react-icons/tb";

import { PhotoProvider, PhotoView } from "react-photo-view";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/UserContext";
import Loader from "../Loader/Loader";
import EdiTableModal from "../Modals/EdiTableModal";
import MoveProperties from "../Modals/MoveProperties";

const SinglePropertyTable = ({
  current,
  tableData,
  allYears,
  setYear,
  year,
  refetch,
}) => {
  const { user, logOut } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const [availableProperty, setAvailableProperty] = useState([]);

  const uploadPhoto = (id, e) => {
    setLoading(true);
    const image = e.target.files[0];

    const img_api = process.env.REACT_APP_imgbb_key;

    // create form Data
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${img_api}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((image) => {
        const img = image.data.url;
        const data = { img };
        fetch(`https://landlord-hub.vercel.app/upload_photo/${id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.modifiedCount > 0) {
              refetch();
              setLoading(false);
            }
          });
      });
  };

  //get the user specific bookings data
  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: () =>
      fetch(`https://landlord-hub.vercel.app/property?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      }),
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://landlord-hub.vercel.app/delete-calculation/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setShowBtn(null);
              refetch();
              Swal.fire("Deleted!", "Your data has been deleted.", "success");
            }
          });
      }
    });
  };

  //delete receipt
  const deleteReceipt = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://landlord-hub.vercel.app/delete-receipt/${id}`, {
          method: "PUT",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Receipt has been deleted.", "success");
            }
          });
      }
    });
  };

  const handleModal = (calc) => {
    setModalData(calc);
    setModalOpen(true);
  };

  // handle Move property
  const handleMove = (calc) => {
    const filteredProperties = properties.filter(
      (property) => property?._id !== calc.propertyId
    );
    setAvailableProperty(filteredProperties);
    setModalData(calc);
    setModalOpen(true);
  };

  //  this handle show and hide item
  const handleShowBtn = (i) => {
    i === showBtn ? setShowBtn(null) : setShowBtn(i);
  };

  return (
    <section className="bg-white p-10 rounded-xl my-5">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="flex justify-between">
            <div className="flex mb-5 gap-4 items-center justify-start">
              {allYears?.map((singleYear, i) => (
                <button
                  key={i}
                  onClick={() => setYear(singleYear)}
                  className="px-2 py-2 md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6] text-sm  font-semibold bg-white text-black hover:bg-blue-900 hover:text-white"
                >
                  {singleYear}
                </button>
              ))}
            </div>
            <div>
              <button
                onClick={() => setYear(current.toString())}
                className="px-2 py-2 md:px-4 md:py-2 rounded-md border-[1px] border-[#A6A6A6] text-sm  font-semibold bg-white text-black hover:bg-blue-900 hover:text-white mb-2"
              >
                Current Year
              </button>
            </div>
          </div>
          <table className="table w-full" id="table-to-xls-singleProp">
            <thead className="">
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Description</th>
                <th>Receipt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((calc, i) => (
                <tr
                  key={calc?._id}
                  className={calc?.expense ? "text-red-500" : "text-green-500"}
                >
                  <td>{calc?.date}</td>
                  <td>{calc?.category}</td>
                  <td>{calc?.amount}</td>
                  <td>{calc?.expense ? "Expense" : "Payment"}</td>
                  {calc.description.length > 50 ? (
                    <td className="max-w-sm text-ellipsis">
                      <textarea cols="50">{calc?.description}</textarea>
                    </td>
                  ) : (
                    <td className="max-w-sm text-ellipsis">
                      {calc?.description}
                    </td>
                  )}

                  {calc?.expense ? (
                    <>
                      {calc?.receipt ? (
                        <td>
                          <PhotoProvider>
                            <PhotoView src={calc?.receipt}>
                              <label className="flex items-center gap-2 justify-center btn btn-sm bg-blue-900 hover:bg-blue-800 border-none text-white">
                                <BsFillEyeFill /> View Receipt
                              </label>
                            </PhotoView>
                          </PhotoProvider>

                          <label
                            onClick={() => deleteReceipt(calc?._id)}
                            className="flex items-center gap-2 justify-center btn btn-sm bg-red-500 hover:bg-red-600 border-none mt-1 text-white"
                          >
                            <BsTrash />
                            Delete Receipt
                          </label>
                        </td>
                      ) : (
                        <td>
                          {loading ? (
                            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin mx-auto"></div>
                          ) : (
                            <div className="">
                              <label
                                htmlFor="file-upload"
                                className="mb-2"
                              ></label>
                              <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                onChange={(e) => uploadPhoto(calc?._id, e)}
                              />
                              <label
                                htmlFor="file-upload"
                                className="flex items-center gap-2 justify-center btn btn-sm bg-red-500 border-none hover:bg-red-600 text-white"
                              >
                                <BsUpload /> Add receipt
                              </label>
                            </div>
                          )}
                        </td>
                      )}
                    </>
                  ) : (
                    <td></td>
                  )}
                  <td className="flex gap-2 items-center">
                    {/* Edit button */}

                    {/* animated button */}
                    <button
                      onClick={() => handleShowBtn(i)}
                      className={` ${
                        showBtn === i ? undefined : "animate-pulse"
                      } flex items-center justify-center space-x-1.5 ml-2.5 mr-2 `}
                    >
                      <span className="w-1.5 h-1.5 bg-blue-900 rounded-full del"></span>
                      <span className="w-1.5 h-1.5 bg-blue-800 rounded-full"></span>
                      <span className="w-1.5 h-1.5 bg-blue-700 rounded-full"></span>
                    </button>

                    {/* Edit Button */}
                    <label
                      onClick={() => handleModal(calc)}
                      title="Edit"
                      htmlFor="edit-table"
                      className={`${
                        showBtn === i
                          ? "visible opacity-100 delay-[100ms] translate-y-0 "
                          : "invisible delay-[300ms] opacity-0 translate-y-1  "
                      } transition-all duration-150  btn btn-sm bg-blue-900 hover:bg-blue-800 border-none text-white`}
                    >
                      <BsPencilFill />
                    </label>

                    {/* Move Button */}
                    <label
                      htmlFor="modal-move"
                      onClick={() => handleMove(calc)}
                      title="Move"
                      className={` ${
                        showBtn === i
                          ? "visible delay-[200ms] opacity-100 translate-y-0 "
                          : "invisible delay-[200ms] opacity-0 translate-y-2 "
                      } transition-all duration-150  btn btn-sm bg-blue-600 hover:bg-blue-800 border-none text-white`}
                    >
                      <TbReplace />
                    </label>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(calc?._id)}
                      title="Delete"
                      className={` ${
                        showBtn === i
                          ? "visible delay-[300ms] opacity-100  translate-y-0"
                          : "invisible delay-[100ms] opacity-0 translate-y-3  "
                      } transition-all duration-150  btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white`}
                    >
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <EdiTableModal
              modalData={modalData}
              refetch={refetch}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              year={year}
            />
          </table>
        </div>
      </div>

      {/* move property modal */}
      <MoveProperties
        modalData={modalData}
        refetch={refetch}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        availableProperty={availableProperty}
      />
    </section>
  );
};

export default SinglePropertyTable;
