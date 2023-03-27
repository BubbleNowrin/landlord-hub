import React from "react";

import Swal from "sweetalert2";

const MoveProperties = ({
  availableProperty,
  modalData,
  setModalOpen,
  modalOpen,
  refetch,
}) => {
  console.log(modalData);
  // modad data = property data
  // console.log(availableProperty);

  const {
    amount,
    category,
    city,
    date,
    dateString,
    description,
    payment,
    expense,
    propertyId,
    propertyOwner,
    state,
    street,
    zip,
  } = modalData;

  // console.log("updateData", updateData);

  const handleMovedDataUpdate = (property) => {
    const updateData = {
      amount,
      category,
      city,
      date,
      dateString,
      description,
      payment,
      expense,
      propertyId: property._id,
      propertyOwner,
      state,
      street,
      zip,
    };
    fetch(`https://landlord-hub.vercel.app/calculation`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          fetch(
            `https://landlord-hub.vercel.app/delete-calculation/${modalData._id}`,
            {
              method: "DELETE",
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                // setShowBtn(null);
                refetch();
                Swal.fire("Moved!", "Moved Successfully.", "success");
              }
            });
        }
      });
  };
  return (
    <>
      {modalOpen && (
        <>
          <input type="checkbox" id="modal-move" className="modal-toggle" />

          <div className="modal">
            <div className="modal-box relative">
              <div className="modal-action">
                <label
                  htmlFor="modal-move"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
              </div>
              <div className=" px-14">
                <h3 className="font-bold text-lg mt-3">Select a category</h3>
                <div className="mt-5">
                  {availableProperty.map((availPro, i) => (
                    <button
                      onClick={() => handleMovedDataUpdate(availPro)}
                      key={i}
                      className="text-xl mb-4 last:mb-0 bg-blue-900 hover:bg-blue-600 text-white px-3 py-2 rounded-xl block w-full text-left"
                    >
                      {availPro?.city} {availPro?.state} {availPro?.street}
                      {availPro?.zip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MoveProperties;
