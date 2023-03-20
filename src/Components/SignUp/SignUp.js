import { axios } from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img from "../../Assets/Group 5236.svg"
import { AuthContext } from "../../Contexts/UserContext";


const SignUp = () => {
    const { googleLogin, createUser, updateUser, verifyEmail } = useContext(AuthContext);

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // email log in
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const form = event.target;
        const name = form.name.value;
        // const image = form.photo.files[0];
        const email = form.email.value;

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

        //         });
        // };
        createUser(email, password)
            .then((res) => {
                //email verification 
                verifyEmail()
                    .then(() => {
                        // update user
                        updateUser(name)
                            .then(() => {
                                const user = {
                                    name,
                                    email,
                                };

                                const jwtUser = res.user;

                                const currentUser = {
                                    email: jwtUser.email
                                }

                                //send user info to server
                                fetch("http://localhost:5000/users", {
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/json",
                                    },
                                    body: JSON.stringify(user),
                                })

                                //get jwt token

                                fetch('http://localhost:5000/jwt', {
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/json"
                                    },
                                    body: JSON.stringify(currentUser)
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        // Swal.fire(
                                        //     "Success",
                                        //     "User created successfully",
                                        //     "success"
                                        // );
                                        Swal.fire(
                                            "Email send!!",
                                            `Account Verification Email sent to : ${email}, please check your spam/junk folder`,
                                            "success"
                                        );

                                        setLoading(false);
                                        localStorage.setItem("token", data.token);
                                        navigate('/properties/dashboard');
                                    })
                            })
                            .catch((err) => {
                                setLoading(false);
                                Swal.fire("Opps", err.message, "error");
                            });
                    })
                console.log(res.user);

            })
            .catch((err) => {
                setLoading(false);
                Swal.fire("Opps", err.message, "error");
                console.log(err);
            });
    }

    // google log in
    const handleGoogle = (e) => {
        setLoading(true);
        e.preventDefault();
        googleLogin()
            .then((res) => {
                const user = {
                    name: res?.user?.displayName,
                    email: res?.user?.email,
                    img: res?.user?.photoURL,
                };

                const jwtUser = res.user;

                const currentUser = {
                    email: jwtUser.email
                }

                //send user info to server
                fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(user),
                })

                //get jwt token

                fetch('http://localhost:5000/jwt', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        Swal.fire("Success", "Google Log In", "success");
                        setLoading(false);
                        localStorage.setItem("token", data.token);
                        navigate('/properties/dashboard');
                    })
            })
            .catch((err) => {
                Swal.fire("Opps", err.message, "error");
                setLoading(false);
            });
    };

    // setPass
    const handlePassword = (e) => {
        const pass = e.target.value;
        if (!/(?=.*[A-Z].*[A-Z])/.test(pass)) {
            return setError("Please provide at least two uppercase");
        }
        if (!/(?=.*[0-9].*[0-9])/.test(pass)) {
            return setError("Password Must have at least 2 numbers");
        }
        if (!/(?=.*[!@#$&*])/.test(pass)) {
            return setError("Please provide at least one special character");
        }
        if (pass.length < 8) {
            return setError("Please provide at least 8 character");
        }

        setError("");
        setPassword(pass);
    };
    return (
        <section className="max-w-7xl mx-auto">
            <div className="flex flex-col-reverse lg:flex-row my-10 mx-auto bg-[#F3F4FC] lg:m-40 rounded-2xl">
                <div className="w-full flex justify-center items-center">
                    <div className="w-full mx-auto">
                        <div className="max-w-xl ">

                            <form
                                onSubmit={handleSubmit}
                                className="w-full lg:max-w-lg border rounded-3xl shadow-2xl mx-auto bg-white p-8"
                            >
                                <h2 className="text-black text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">
                                    Sign Up
                                </h2>
                                <p className="text-center">Please Enter Your Details</p>
                                <div className="flex flex-col gap-4 p-4 md:p-8">
                                    <div>
                                        <input
                                            name="name"
                                            required
                                            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div>

                                        <input
                                            required
                                            name="email"
                                            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div>

                                        <input
                                            onChange={handlePassword}
                                            required
                                            name="password"
                                            type="password"
                                            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                                            placeholder="Password"
                                        />
                                        {error && (
                                            <small className="text-red-400 my-2">{error}</small>
                                        )}
                                    </div>

                                    <button type="submit" class="px-7 py-3 text-md font-semibold text-center text-white transition duration-300 rounded-sm hover:from-blue-700 hover:to-blue-400 ease bg-gradient-to-br from-blue-800  to-blue-500 md:w-auto">
                                        {loading ? (
                                            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin mx-auto"></div>
                                        ) : (
                                            "Register"
                                        )}
                                    </button>

                                    <div className="flex justify-center items-center relative">
                                        <span className="h-px bg-gray-300 absolute inset-x-0"></span>
                                        <span className="bg-base-100 text-gray-400 text-sm relative px-4">
                                            Log in with social
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleGoogle}
                                        className="flex justify-center items-center bg-white hover:bg-base-100 active:bg-gray-200 border border-gray-300 focus-visible:ring ring-gray-300 text-gray-800 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 gap-2 px-8 py-3"
                                    >
                                        {loading ? (
                                            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin "></div>
                                        ) : (
                                            <>
                                                <svg
                                                    className="w-5 h-5 shrink-0"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
                                                        fill="#4285F4"
                                                    />
                                                    <path
                                                        d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
                                                        fill="#34A853"
                                                    />
                                                    <path
                                                        d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
                                                        fill="#FBBC05"
                                                    />
                                                    <path
                                                        d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
                                                        fill="#EA4335"
                                                    />
                                                </svg>
                                                Continue with Google
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="flex justify-center items-center bg-white p-4 mb-2">
                                    <p className="text-gray-500 text-sm text-center">
                                        Already have an account?{" "}
                                        <Link
                                            to="/login"
                                            className="text-blue-900 hover:text-blue-700 active:text-blue-700 transition duration-100 font-bold"
                                        >
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <aside className="w-full">
                    <img src={img} alt="" className="mx-auto p-8 mt-16" />
                </aside>
            </div>
        </section>
    );
};

export default SignUp;