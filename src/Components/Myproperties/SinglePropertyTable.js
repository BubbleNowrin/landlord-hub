
import React, { useState } from 'react'
import { BsFillEyeFill, BsPencilFill, BsTrash, BsUpload } from 'react-icons/bs';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Swal from 'sweetalert2';
import EdiTableModal from '../Modals/EdiTableModal';

const SinglePropertyTable = ({ current, tableRef, tableData, allYears, setYear, refetch }) => {

  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);




  const uploadPhoto = (id, e) => {
    setLoading(true);
    const image = e.target.files[0];
    // console.log(id);

    const img_api = "701a0d7cdce71a8410d4cf17c044dfba";

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
        fetch(`http://localhost:5000/upload_photo/${id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
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
        fetch(`http://localhost:5000/delete-calculation/${id}`, {
          method: 'DELETE'
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

  const handleModal = calc => {
    setModalData(calc);
    setModalOpen(true);
  }
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto mt-20 mb-10">
        <div className="flex justify-between">
          <div className="flex mb-10 gap-4 items-center justify-start">
            {allYears?.map((singleYear) => (
              <button
                onClick={() => setYear(singleYear)}
                className="btn btn-outline"
              >
                {singleYear}
              </button>
            ))}
          </div>
          <div>
            <button
              onClick={() => setYear(current.toString())}
              className="btn btn-outline"
            >
              Current Year
            </button>
          </div>
        </div>
        <table className="table w-full" ref={tableRef}>
          <thead>
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
                className={calc?.expense ? "text-red-500" : "text-blue-900"}
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
                            <label className="flex items-center gap-2 justify-center btn btn-sm bg-blue-900 hover:bg-blue-900 text-white">
                              <BsFillEyeFill /> View Receipt
                            </label>
                          </PhotoView>
                        </PhotoProvider>
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
                              onChange={(e) => uploadPhoto(calc?._id, e)}
                            />
                            <label
                              htmlFor="file-upload"
                              className="flex items-center gap-2 justify-center btn btn-sm btn-error text-white"
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
                  <label
                    onClick={() => handleModal(calc)}
                    htmlFor="edit-table"
                    className="btn btn-sm bg-blue-900 hover:bg-blue-900 text-white"
                  >
                    <BsPencilFill />
                  </label>
                  <button
                    onClick={() => handleDelete(calc?._id)}
                    className="btn btn-sm btn-error text-white"
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
          />
        </table>
      </div>
    </div>
  );
};

export default SinglePropertyTable