import React from 'react';

const NewExpenseModal = () => {
    return (
        <div>
            <input type="checkbox" id="add-expense" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="add-expense" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl font-bold text-indigo-700">Add New Expense</h3>
                    <form className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="date" name='date' placeholder="Date" className="input w-full input-bordered" />
                        <input name='category' type="text" placeholder="Category" className="input w-full input-bordered" />
                        <input name="amount" type="text" placeholder="Amount" className="input w-full input-bordered" />
                        <textarea className="textarea textarea-primary" placeholder="Description" name="description"></textarea>

                        {/* <select name='bedroom' className="select select-bordered w-full max-w-xs text-gray-900" placeholder='Bedrooms'>
                            <option value="1"></option>
                            <option value="2"></option>
                            <option value="3"></option>
                            <option value="4"></option>
                            <option value="5"></option>
                        </select> */}
                        <input className='w-full btn btn-primary' type="submit" value="Add" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewExpenseModal;