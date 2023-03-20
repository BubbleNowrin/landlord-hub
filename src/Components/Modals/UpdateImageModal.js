import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Contexts/UserContext';

const UpdateImageModal = ({ modalOpen, setModalOpen, id, setSingleProperty, singleProperty }) => {

    const { user } = useContext(AuthContext);

    const handleOnSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const image = form?.photo.files[0];

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
                const img = image?.data?.url;
                console.log(img);
                const propImage = {
                    img
                }
                fetch(`https://landlord-hub.vercel.app/upload/${id}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(propImage),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        Swal.fire(
                            "Success",
                            "Image Uploaded Successfully",
                            "success"
                        );
                        fetch(`https://landlord-hub.vercel.app/property/${id}`, {
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                            .then(res => res.json())
                            .then(data => {
                                setSingleProperty(data)
                                setModalOpen(false);
                            })

                    });

            })
            .catch((err) => {
                Swal.fire("Opps", err.message, "error");
            });
    }

    return (
        modalOpen && <div>
            <input type="checkbox" id="upload-Image" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="upload-Image" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl font-bold text-blue-900">Upload Image</h3>
                    <form onSubmit={handleOnSubmit} className='grid grid-cols-1 gap-3 mt-10'>

                        <input
                            type="file"
                            name="photo"
                            className="file-input file-input-bordered file-input-blue-900 w-full mb-2"
                        />
                        <input className='w-full btn bg-blue-900' type="submit" value="Update" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateImageModal;