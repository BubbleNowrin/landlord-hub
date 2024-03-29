import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const NewExpenseModal = ({ modalOpen, setModalOpen, refetch, singleProperty }) => {

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const date = new Date();
  const today = date.toJSON().slice(0, 10);
  const handleOnSubmit = e => {

    e.preventDefault();
    const form = e.target;
    const date = form.date.value;
    const category = form.category.value;
    const amount = form.amount.value;
    const description = form.description.value;
    const image = form.photo.files[0];
    if (image) {
      const img_api = process.env.REACT_APP_imgbb_key;

      // create form Data
      const formData = new FormData();
      formData.append("image", image);

      const url = `https://api.imgbb.com/1/upload?key=${img_api}`;

      // post image to imgbb
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((image) => {
          const img = image.data.url;
          const expenses = {
            date,
            dateString: new Date(),
            propertyOwner: singleProperty?.email,
            propertyId: singleProperty?._id,
            category,
            amount,
            description,
            expense: true,
            street: singleProperty?.street,
            city: singleProperty?.city,
            state: singleProperty?.state,
            zip: singleProperty?.zip,
            receipt: img
          };
          fetch(`https://landlord-hub.vercel.app/calculation`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(expenses),
          })
            .then((res) => res.json())
            .then((data) => {
              Swal.fire(
                "Success",
                "Expenses Added Successfully",
                "success"
              );
              refetch();
              setModalOpen(false);
            });
        });
    }
    else {
      const expenses = {
        date,
        dateString: new Date(),
        propertyOwner: singleProperty?.email,
        propertyId: singleProperty?._id,
        category,
        amount,
        description,
        expense: true,
        street: singleProperty?.street,
        city: singleProperty?.city,
        state: singleProperty?.state,
        zip: singleProperty?.zip,
      };
      fetch(`https://landlord-hub.vercel.app/calculation`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(expenses),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          Swal.fire("Success", "Expenses Added Successfully", "success");
          refetch()
          setModalOpen(false)
        });
    }
  };

  // setAmount
  const handleAmount = (e) => {
    const amountNumber = e.target.value;
    if (!/^[0-9]*[.,]?[0-9]+$/.test(amountNumber)) {
      return setError("Please Provide Only Number");
    }

    setError("");
    setAmount(amountNumber);
  };

  return (
    modalOpen && <div>
      <input type="checkbox" id="add-expense" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="add-expense" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-xl font-bold text-blue-900">Add New Expense</h3>
          <form onSubmit={handleOnSubmit} className='grid grid-cols-1 gap-3 mt-10'>
            <input type="date" name='date' defaultValue={today} placeholder="Date" className="input w-full input-bordered" required />
            <input name='category' type="text" placeholder="Category" className="input w-full input-bordered" required />
            <div>
              <input onChange={handleAmount} name="amount" type="text" placeholder="Amount" className="input w-full input-bordered" required />
              {error && (
                <small className="text-red-400 my-2">{error}</small>
              )}
            </div>
            {/* {
              loading ? (
                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin mx-auto"></div>
              ) : (<label for="dropzone-file" class="w-full flex items-center px-3 py-3 mx-auto text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>

                <h2 class="mx-3 text-gray-400">Upload Receipt</h2>

                <input id="dropzone-file" type="file" class="hidden" name='photo' />
              </label>)
            } */}

            <div className=''>
              <h2 class=" text-gray-400 ml-2">Upload Receipt</h2>
              <input
                type="file"
                name="photo"
                className="file-input file-input-bordered  w-full mb-2"
              />
            </div>
            <textarea className="textarea textarea-primary" placeholder="Description" name="description" maxLength={100} required></textarea>
            {
              error ? <input className='w-full btn bg-blue-900' type="submit" value="Add" disabled /> : <input className='w-full btn bg-blue-900' type="submit" value="Add" />
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewExpenseModal;