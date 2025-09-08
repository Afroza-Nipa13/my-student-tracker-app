import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';

const Register = () => {
  const { createUser, updateProfile } = useAuth()
 const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [profilePic, setProfilePic] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxios()
  const navigate=useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const handleImageUpload = async (e) => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image)

    // image upload 
    const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBB_Api_Key}`
    const res = await axios.post(imageUrl, formData)
    setProfilePic(res.data.data.url)
  }
  const onSubmit = async (data) => {
  try {
    const result = await createUser(data.email, data.password);
    const createdUser = result.user;
    console.log(createdUser)


    // saving in axiosPublic
    await axiosPublic.post("/users", {
      name: data.name,
      email: data.email,
      image: profilePic || ""
    });

    await updateProfile({
      displayName: data.name,
      photoURL: profilePic || ""
    });

    

    Swal.fire({
      title: "Registration Successful!",
      text: "Your account has been created successfully.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Go to Home"
    }).then(() => {
      reset();
      navigate("/");
    });

  } catch (err) {
    Swal.fire({
      title: "Oops!",
      text: err.message || "Something went wrong. Please try again.",
      icon: "error",
      confirmButtonColor: "#d33"
    });
  }
};

  return (
    <div className='flex justify-center items-center min-h-screen '>

      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 shadow-2xl bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <p className='text-sm text-gray-400'> </p>
          <h1 className='my-3 text-4xl text-primary font-bold'><span className='text-gray-600'> Register</span> Now!</h1>

        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                {...register('name', { required: true })}
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-300 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />

              {errors.name?.type === 'required' && <span className='text-red-600'>Your name is required..</span>}
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email
              </label>
              <input
                type='email'
                {...register('email', { required: true })}
                name='email'
                id='email'
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-300 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />

              {errors.email?.type === 'required' && <span className='text-red-600'>Email is required..</span>}
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                onChange={handleImageUpload}
                className='bg-primary text-white btn text-center cursor-pointer pt-2 w-full rounded-xl'
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />

            </div>
            <img
              className='w-[100px]'
              src={profilePic} />

            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: "Password must include uppercase and lowercase letters"
                  }
                })}
                className="input input-bordered w-full pr-10"
                placeholder="Enter your password"
              />
              {/* Eye icon */}
              <span
                onClick={togglePasswordVisibility}
                className="absolute top-10 right-3 cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
              <small className="text-xs text-gray-500">
                Must include at least 1 uppercase, 1 lowercase and 6+ characters.
              </small>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-primary w-full rounded-md py-3 text-white cursor-pointer'
            >Continue</button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div

          className='flex justify-center items-center space-x-2 m-3 p-2 cursor-pointer'
        >
          <SocialLogin></SocialLogin>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/signIn'
            className='hover:underline hover:text-[#851143] text-gray-600'
          >
            Sign In
          </Link>

        </p>
      </div>
    </div>

  );
};

export default Register;