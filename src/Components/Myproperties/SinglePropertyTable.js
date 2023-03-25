
import React, { useState } from 'react'
import { BsFillEyeFill, BsPencilFill, BsTrash, BsUpload } from 'react-icons/bs';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Swal from 'sweetalert2';
import EdiTableModal from '../Modals/EdiTableModal';

const SinglePropertyTable = ({ current, tableData, allYears, setYear, year, refetch }) => {

  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [imgId, setImgId] = useState(null);

  // console.log(imgId);
  const handleDelete = id => {
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
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(data => {

            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your data has been deleted.", "success");
            }
          })
      }
    });
  }

  //delete receipt
  const deleteReceipt = id => {
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
          method: 'PUT',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(data => {

            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Receipt has been deleted.", "success");
            }
          })
      }
    });
  }

  const handleModal = calc => {

    // console.log(calc);
    // const singleData = tableData.find((singleD) => singleD._id === id);
    // console.log(singleData);
    setModalData(calc);
    setModalOpen(true);

  }

  //upload receipt
  const uploadPhoto = (e) => {
    setLoading(true);
    const image = e.target.files[0];
    console.log(imgId);

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
        fetch(`https://landlord-hub.vercel.app/upload_photo/${imgId}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            if (data.modifiedCount > 0) {
              refetch()
              setLoading(false)
            }
          });
      });
  };

  return (
    <section className='bg-white p-10 rounded-xl my-5'>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="flex justify-between">
            <div className="flex mb-5 gap-4 items-center justify-start">
              {allYears?.map((singleYear) => (
                <button
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
          <table className="table w-full " id="table-to-xls-singleProp">
            <thead className=''>
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
              {/* {
                                singleProperty?.calculations?.filter(prop => prop.expense).map((expenses, idx) => <ExpensesTable
                                    key={idx}
                                    expenses={expenses}
                                ></ExpensesTable>)
                            } */}

              {tableData?.map((calc) => (
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
                        //   <label
                        //     htmlFor="my-modal-3"
                        //     className="btn btn-outline w-full"
                        //   >
                        //     view receipt
                        //   </label>
                        <td>
                          <PhotoProvider>
                            <PhotoView src={calc?.receipt}>
                              <label className="flex items-center gap-2 justify-center btn btn-sm bg-blue-900 hover:bg-blue-800 border-none text-white">
                                <BsFillEyeFill /> View Receipt
                              </label>
                            </PhotoView>
                          </PhotoProvider>

                          <label onClick={() => deleteReceipt(calc?._id)} className="flex items-center gap-2 justify-center btn btn-sm bg-red-500 hover:bg-red-600 border-none mt-1 text-white">
                            <BsTrash />Delete Receipt
                          </label>
                        </td>

                      ) : (
                        <td>
                          {loading ? (
                            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin mx-auto"></div>
                          ) : (
                            <div className="">
                              <label htmlFor="file-upload" className="mb-2"></label>
                              <input
                                id="file-upload"
                                type="file"
                                className="hidden"

                                onChange={(e) => uploadPhoto(e)}
                              />
                              <label
                                htmlFor="file-upload"
                                className="flex items-center gap-2 justify-center btn btn-sm bg-red-500 border-none hover:bg-red-600 text-white"
                                onClick={() => setImgId(calc._id)}
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
                  <td className="flex gap-2">
                    {/* Edit button */}
                    <label
                      onClick={() => handleModal(calc)}
                      htmlFor="edit-table"
                      className="btn btn-sm bg-blue-900 hover:bg-blue-800 border-none text-white"
                    >
                      <BsPencilFill />
                    </label>
                    <button
                      onClick={() => handleDelete(calc?._id)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white"
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
    </section>
  );
};

export default SinglePropertyTable