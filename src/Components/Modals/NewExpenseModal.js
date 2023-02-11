import React from 'react';
import Swal from 'sweetalert2';

const NewExpenseModal = ({ modalOpen, setModalOpen, id, setSingleProperty, singleProperty }) => {

    const handleOnSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const date = form.date.value;
        const category = form.category.value;
        const amount = form.amount.value;
        const description = form.description.value;


        console.log(date, category, amount, description);

        const expenses = {
            date,
            category,
            amount,
            description,
            expense: true,
            street: singleProperty?.street,
            city: singleProperty?.city,
            state: singleProperty?.state,
            zip: singleProperty?.zip,
        }
        fetch(`https://landlord-hub.vercel.app/calculation/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(expenses)
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire(
                    "Success",
                    "Expenses Added Successfully",
                    "success"
                );
                fetch(`https://landlord-hub.vercel.app/property/${id}`)
                    .then(res => res.json())
                    .then(data => {
                        setSingleProperty(data)
                        setModalOpen(false);
                    })

            })
    }
    return (
        modalOpen && <div>
            <input type="checkbox" id="add-expense" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="add-expense" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl font-bold text-blue-900">Add New Expense</h3>
                    <form onSubmit={handleOnSubmit} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="date" name='date' placeholder="Date" className="input w-full input-bordered" required />
                        <input name='category' type="text" placeholder="Category" className="input w-full input-bordered" required />
                        <input name="amount" type="text" placeholder="Amount" className="input w-full input-bordered" required />
                        <textarea className="textarea textarea-primary" placeholder="Description" name="description" required></textarea>
                        <input className='w-full btn bg-blue-900' type="submit" value="Add" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewExpenseModal;