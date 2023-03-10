import React from 'react';
import logo from "../../../Assets/llll.png";

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-black p-10 flex flex-col justify-center items-center">
                {/* <div>
                    <img src={logo} alt="" className='w-96' />
                    <p className='mx-auto font-bold text-yellow-100 text-md'>Providing Reliable Service Since 2023</p>
                </div> */}
                <p className='text-white'>“This product is brought to you by Ivey Solutions, LLC”</p>
            </footer>
        </div>
    );
};

export default Footer;