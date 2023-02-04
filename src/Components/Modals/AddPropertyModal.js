import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Contexts/UserContext';

const AddPropertyModal = ({ refetch, modalOpen, setModalOpen }) => {

    const { user } = useContext(AuthContext);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const rent = form.rent.value;
        const address = form.address.value;
        const status = form.status.value;
        const bedroom = form.bedroom.value;
        const parking = form.parking.value;
        const bathroom = form.bedroom.value;
        const image = form.photo.files[0];

        console.log(rent, address, status, bedroom, parking, bathroom, image);

        const img_api = "701a0d7cdce71a8410d4cf17c044dfba";

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
                console.log(img);
                const property = {
                    email: user?.email,
                    rent,
                    address,
                    status,
                    bedroom,
                    parking,
                    bathroom,
                    img
                }
                fetch("https://landlord-hub.vercel.app/add-property", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(property),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        Swal.fire(
                            "Success",
                            "Property Added Successfully",
                            "success"
                        );
                        refetch();
                        setModalOpen(false);
                    });

            })
            .catch((err) => {
                Swal.fire("Opps", err.message, "error");
            });
    };

    return (

        modalOpen && <div>
            <input type="checkbox" id="add-property" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="add-property" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl font-bold text-indigo-700">Add New Property</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" defaultValue={user?.email} className="input w-full input-bordered text-gray-500" readOnly />
                        <input type="text" name='rent' placeholder="Rent" className="input w-full input-bordered" />
                        <input name='address' type="text" placeholder="Address" className="input w-full input-bordered" />
                        <select name='status' className="select select-bordered w-full text-gray-500" placeholder='Bedrooms'>
                            <option>Active Lease</option>
                            <option>Available</option>
                            <option>Under Repair</option>
                        </select>
                        <input name="bedroom" type="text" placeholder="Bedroom" className="input w-full input-bordered" />
                        <input name="parking" type="text" placeholder="Parking" className="input w-full input-bordered" />
                        <input name="bathroom" type="text" placeholder="Bathroom" className="input w-full input-bordered" />

                        <input
                            type="file"
                            required
                            name="photo"
                            className="file-input file-input-bordered file-input-primary w-full mb-2 "
                        />


                        <input className='w-full btn btn-primary' type="submit" value="Add" />
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AddPropertyModal;