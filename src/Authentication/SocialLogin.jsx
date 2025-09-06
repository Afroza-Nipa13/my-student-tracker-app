import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {
    return (
        <div className='flex flex-col'>
           <button className='btn btn-wide'>Login with Google <FaGoogle></FaGoogle></button> 
        </div>
    );
};

export default SocialLogin;