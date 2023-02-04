import React from 'react';
import gif from "../../Assets/87714-spinner.gif"

const Loader = () => {
    return (
        <div className='flex items-center justify-center h-[80vh]'>
            <img src={gif} alt="" className='w-36 h-36 rounded-full' />
        </div>
    );
};

export default Loader;