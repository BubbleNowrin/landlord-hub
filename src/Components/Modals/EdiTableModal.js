import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const EdiTableModal = ({ modalData, refetch, modalOpen, setModalOpen }) => {
  const { _id, expense, date, category, street, amount, description } = modalData;
  const handleUpdate = e => {
    e.preventDefault();
    const form = e.target;
    const date = form.date.value;
    const amount = form.amount.value;
    const description = form.description.value;
    const category = form.category.value;
    fetch(`https://landlord-hub.vercel.app/update-calculation/${_id}`, {
      method: 'PUT',
      headers: {
        'content-type': "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ date, amount, description, category })
    }).then(res => res.json()).then(data => {
      if (data.modifiedCount > 0) {
        refetch();
        Swal.fire("Success", "data updated successfully", 'success')
        setModalOpen(false);
      }
    })
  }
  return (
    modalOpen && (
      <div>
        <input type="checkbox" id="edit-table" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="edit-table"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-xl font-bold text-blue-900">
              Edit {expense ? "expense" : "payment"} for {street}
            </h3>
            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 gap-3 mt-10"
            >
              {/* <input type="text" defaultValue={user?.email} className="input w-full input-bordered text-gray-500" readOnly /> */}

              {/* <input name='address' type="text" placeholder="Address" className="input w-full input-bordered" /> */}
              <input
                type="date"
                name="date"
                placeholder="Amount"
                className="input w-full input-bordered"
                defaultValue={date}
              />
              <input
                type="text"
                name="amount"
                placeholder="Date"
                className="input w-full input-bordered"
                defaultValue={amount}
              />
              <input
                type="category"
                name="category"
                placeholder="Date"
                className="input w-full input-bordered"
                defaultValue={category}
              />
              <textarea
                name="description"
                type="text"
                placeholder="Bedroom"
                className="textarea w-full textarea-bordered"
                defaultValue={description}
              />

              <input
                className="w-full btn bg-blue-900"
                type="submit"
                value="Update"
              />
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default EdiTableModal;