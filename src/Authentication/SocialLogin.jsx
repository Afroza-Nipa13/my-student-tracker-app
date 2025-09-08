import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const SocialLogin = () => {
    const {signInWithGoogle}= useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.form ||  "/"
    const handleSocialLogin=()=>{
         signInWithGoogle() .then(async (result) => {
                const user = result.user;
                console.log(result.user); 
                
                navigate(from);
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div className='text-center'>
           <button onClick={handleSocialLogin} className='btn bg-white text-black border-[#e5e5e5] w-full px-2 py-5'>Login with Google <FaGoogle></FaGoogle></button> 
        </div>
    );
};

export default SocialLogin;