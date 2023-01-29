import React from 'react';

const EditPropertyModal = () => {
    return (
        <div>
            <input type="checkbox" id="edit-property" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="edit-property" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl font-bold text-indigo-700">Edit Property</h3>
                    <form className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" name='rent' placeholder="Rent" className="input w-full input-bordered" />
                        <input name='address' type="text" placeholder="Address" className="input w-full input-bordered" />
                        <input name="status" type="text" placeholder="Status" className="input w-full input-bordered" />
                        <input name="bedroom" type="text" placeholder="Bedroom" className="input w-full input-bordered" />
                        <input name="parking" type="text" placeholder="Parking" className="input w-full input-bordered" />
                        <input name="bathroom" type="text" placeholder="Bathroom" className="input w-full input-bordered" />


                        <input
                            type="file"
                            required
                            name="photo"
                            className="file-input file-input-bordered file-input-primary w-full mb-2 "
                        />

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

export default EditPropertyModal;