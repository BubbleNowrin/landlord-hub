import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Contexts/UserContext';

const AddPropertyModal = ({ refetch, modalOpen, setModalOpen }) => {

    const { user } = useContext(AuthContext);

    const { data: states } = useQuery({
        queryKey: ['states'],
        queryFn: () => fetch(`https://landlord-hub.vercel.app/states`).then(res => res.json())
    })

    // console.log(states);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        // const rent = form.rent.value;
        const street = form.street.value;
        const city = form.city.value;
        const stateFull = form.state.value;
        const state = stateFull.split(',')[1];
        // console.log(state);
        const zip = form.zip.value;
        // const status = form.status.value;
        // const bedroom = form.bedroom.value;
        // const parking = form.parking.value;
        // const bathroom = form.bedroom.value;
        // const image = form.photo.files[0];

        // console.log(rent, address, status, bedroom, parking, bathroom, image);

        // const img_api = "701a0d7cdce71a8410d4cf17c044dfba";

        // create form Data
        // const formData = new FormData();
        // formData.append("image", image);

        // const url = `https://api.imgbb.com/1/upload?key=${img_api}`;

        // post image to imgbb
        //     fetch(url, {
        //         method: "POST",
        //         body: formData,
        //     })
        //         .then((res) => res.json())
        //         .then((image) => {
        //             const img = image.data.url;
        //             console.log(img);

        // };
        const property = {
            email: user?.email,
            street,
            city,
            state,
            zip
        }
        fetch("https://landlord-hub.vercel.app/add-property", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
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

    }

    return (

        modalOpen && <div>
            <input type="checkbox" id="add-property" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="add-property" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl font-bold text-blue-900">Add New Property</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3 mt-10'>
                        {/* <input type="text" defaultValue={user?.email} className="input w-full input-bordered text-gray-500" readOnly /> */}
                        {/* <input type="text" name='rent' placeholder="Rent" className="input w-full input-bordered" /> */}
                        <input name='street' type="text" placeholder="Street" className="input w-full input-bordered" />
                        <input name='city' type="text" placeholder="City" className="input w-full input-bordered" />
                        {/* <input name='state' type="text" placeholder="State" className="input w-full input-bordered" /> */}
                        <select name='state' className="select select-bordered w-full text-gray-500">
                            {
                                states?.map(state => <option>{state?.name}, {state?.code}</option>)
                            }

                        </select>
                        <input name='zip' type="text" placeholder="ZIP" className="input w-full input-bordered" maxLength={5} />
                        {/* <select name='status' className="select select-bordered w-full text-gray-500" placeholder='Bedrooms'>
                            <option>Active Lease</option>
                            <option>Available</option>
                            <option>Under Repair</option>
                        </select> */}
                        {/* <input name="bedroom" type="text" placeholder="Bedroom" className="input w-full input-bordered" /> */}
                        {/* <input name="parking" type="text" placeholder="Parking" className="input w-full input-bordered" /> */}
                        {/* <input name="bathroom" type="text" placeholder="Bathroom" className="input w-full input-bordered" /> */}

                        {/* <input
                            type="file"
                            required
                            name="photo"
                            className="file-input file-input-bordered file-input-primary w-full mb-2 "
                        /> */}


                        <input className='w-full btn bg-blue-900' type="submit" value="Add" />
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AddPropertyModal;