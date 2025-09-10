import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../hooks/useAxios';
import useAxiosSecure from '../hooks/useAxiosSecure';

const SocialLogin = () => {
    const {signInWithGoogle}= useAuth()
    const location = useLocation()
    const axiosInstance=useAxios()
    const axiosSecure=useAxiosSecure()
    const navigate = useNavigate()
    const from = location.state?.form ||  "/"
    const handleSocialLogin=()=>{
         signInWithGoogle() .then(async (result) => {
                const user = result.user;
                console.log(result.user); 

        await axiosSecure.post('/jwt', { email: user.email });

        const userInfo = {
        displayName: user.name,
        photoURL: user.photoURL,
        email: user.email,
        role: 'user',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString()
      }; 
                const res = await axiosInstance.post('/users', userInfo);
                console.log('customer update info', res.data)
                
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