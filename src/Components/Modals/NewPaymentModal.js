import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const NewPaymentModal = ({ modalOpen, setModalOpen, singleProperty, refetch }) => {

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

    console.log(date, category, amount, description);

    const payments = {
      date,
      dateString: new Date(),
      propertyOwner: singleProperty?.email,
      propertyId: singleProperty?._id,
      category,
      amount,
      description,
      payment: true,
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
      body: JSON.stringify(payments),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        Swal.fire("Success", "Payment Added Successfully", "success");
        setModalOpen(false)
        refetch()

      });
  }
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
    modalOpen && (
      <div>
        <input type="checkbox" id="add-payment" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="add-payment"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-xl font-bold text-blue-900">
              Add New Payment
            </h3>
            <form
              onSubmit={handleOnSubmit}
              className="grid grid-cols-1 gap-3 mt-10"
            >
              <input
                type="date"
                name="date"
                defaultValue={today}
                placeholder="Date"
                className="input w-full input-bordered"
                required
              />
              <input
                name="category"
                type="text"
                placeholder="Category"
                className="input w-full input-bordered"
                required
              />
              <div>
                <input
                  onChange={handleAmount}
                  name="amount"
                  type="text"
                  placeholder="Amount"
                  className="input w-full input-bordered"
                  required
                />
                {error && (
                  <small className="text-red-400 my-2">{error}</small>
                )}
              </div>
              <textarea
                className="textarea textarea-primary"
                placeholder="Description"
                name="description"
                maxLength={100}
                required
              ></textarea>

              {
                error ? <input className='w-full btn bg-blue-900' type="submit" value="Add" disabled /> : <input className='w-full btn bg-blue-900' type="submit" value="Add" />
              }
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default NewPaymentModal;