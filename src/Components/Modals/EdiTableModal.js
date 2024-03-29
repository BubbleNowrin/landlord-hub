import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const EdiTableModal = ({ modalData, modalOpen, setModalOpen, year, refetch }) => {

  const [balance, setBalance] = useState("");
  const [error, setError] = useState("");

  // const single = useLoaderData();
  // const [singleProperty, setSingleProperty] = useState(single);

  const { _id, expense, date, category, street, amount, description } = modalData;
  // const { _id } = modalData;

  // console.log(modalData);

  // const {
  //   data: editData, isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["calculations", year, singleProperty?._id],
  //   queryFn: () =>
  //     fetch(`https://landlord-hub.vercel.app/calculations-edit/${singleProperty?._id}?year=${year}&calcId=${_id}`, {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     }).then(
  //       (res) => res.json()).then(data => console.log(data))
  // });

  // useEffect(() => {
  //   fetch(`https://landlord-hub.vercel.app/calculations-edit/${singleProperty?._id}?year=${year}&calcId=${modalData._id}`, {
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }, [singleProperty?._id, year, _id])

  const handleUpdate = (e) => {
    console.log(_id);
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

  // setBalance
  const handleAmount = (e) => {
    const amountNumber = e.target.value;
    if (!/^[0-9]*[.,]?[0-9]+$/.test(amountNumber)) {
      return setError("Please Provide Only Number");
    }

    setError("");
    setBalance(amountNumber);
  };
  return (
    modalOpen && (
      <div>
        <input type="checkbox" id="edit-table" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              onClick={() => setModalOpen(false)}

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
                placeholder="Date"
                className="input w-full input-bordered"
                defaultValue={date}
              />
              <input
                type="category"
                name="category"
                placeholder="Category"
                className="input w-full input-bordered"
                defaultValue={category}
              />
              <div>
                <input
                  onChange={handleAmount}
                  type="text"
                  name="amount"
                  placeholder="Amount"
                  className="input w-full input-bordered"
                  defaultValue={amount}
                />
                {error && (
                  <small className="text-red-400 my-2">{error}</small>
                )}
              </div>
              <textarea
                name="description"
                type="text"
                placeholder="Description"
                className="textarea w-full textarea-bordered"
                defaultValue={description}
              />
              {
                error ? <input className='w-full btn bg-blue-900' type="submit" value="Add" disabled /> : <input className='w-full btn bg-blue-900' type="submit" value="Update" />
              }
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default EdiTableModal;