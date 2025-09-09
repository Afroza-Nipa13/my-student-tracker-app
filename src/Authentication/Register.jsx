import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaUpload } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Register = () => {
  const { createUser, UpdateProfile } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [profilePic, setProfilePic] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Image upload 
      const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBB_Api_Key}`;
      const res = await axios.post(imageUrl, formData);
      setProfilePic(res.data.data.display_url || res.data.data.url);
      Swal.fire({
        title: "Success!",
        text: "Image uploaded successfully",
        icon: "success",
        timer: 1500
      });
    } catch (error) {
      console.error("Image upload error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to upload image. Please try again.",
        icon: "error"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    // Check if image is uploaded
    if (!profilePic) {
      Swal.fire({
        title: "Image Required",
        text: "Please upload a profile image before registering",
        icon: "warning"
      });
      return;
    }

    try {
      const result = await createUser(data.email, data.password);
      const createdUser = result.user;
      console.log(createdUser);
   
      await axiosSecure.post('/jwt', { email: createdUser.email });

      const userProfile = {
        displayName: data.name,
        photoURL: profilePic 
      };
   
      // Firebase profile update
      await UpdateProfile(userProfile);

      const userInfo = {
        displayName: data.name,
        photoURL: profilePic,
        email: data.email,
        role: 'user',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString()
      }; 
      
      // Saving in database
      await axiosPublic.post("/users", userInfo);

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
      console.error("Registration error:", err);
      Swal.fire({
        title: "Oops!",
        text: err.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33"
      });
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50 py-8'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 shadow-2xl bg-white text-gray-900 w-full mx-4'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl text-primary font-bold'>
            <span className='text-gray-600'>Register</span> Now!
          </h1>
          <p className='text-sm text-gray-500'>Create your account to get started</p>
        </div>
        
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          className='space-y-6'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='block mb-2 text-sm font-medium'>
                Full Name
              </label>
              <input
                type='text'
                {...register('name', { required: true })}
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-300 bg-gray-50 text-gray-900'
              />
              {errors.name?.type === 'required' && (
                <span className='text-red-600 text-sm'>Your name is required</span>
              )}
            </div>
            
            <div>
              <label htmlFor='email' className='block mb-2 text-sm font-medium'>
                Email Address
              </label>
              <input
                type='email'
                {...register('email', { 
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                name='email'
                id='email'
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-300 bg-gray-50 text-gray-900'
              />
              {errors.email?.type === 'required' && (
                <span className='text-red-600 text-sm'>Email is required</span>
              )}
              {errors.email?.type === 'pattern' && (
                <span className='text-red-600 text-sm'>{errors.email.message}</span>
              )}
            </div>
            
            <div>
              <label htmlFor='image' className='block mb-2 text-sm font-medium'>
                Profile Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                    {profilePic ? (
                      <img 
                        src={profilePic} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs text-center">No image</span>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <label 
                    htmlFor="image" 
                    className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer
                      ${isUploading ? 'bg-gray-400 text-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    <FaUpload className="mr-2" />
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                  </label>
                  <input
                    onChange={handleImageUpload}
                    className="hidden"
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    disabled={isUploading}
                  />
                  <p className="text-xs text-gray-500 mt-1">JPEG, PNG or GIF (max 5MB)</p>
                </div>
              </div>
            </div>

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
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-300 bg-gray-50 text-gray-900 pr-10"
                placeholder="Enter your password"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute top-9 right-3 cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
              <small className="text-xs text-gray-500 mt-1 block">
                Must include at least 1 uppercase, 1 lowercase and 6+ characters.
              </small>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-blue-600 w-full rounded-md py-3 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
              disabled={isUploading}
            >
              Create Account
            </button>
          </div>
        </form>
        
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px bg-gray-300'></div>
          <p className='px-3 text-sm text-gray-500'>
            Or sign up with
          </p>
          <div className='flex-1 h-px bg-gray-300'></div>
        </div>
        
        <div className='flex justify-center items-center mt-4'>
          <SocialLogin />
        </div>
        
        <p className='px-2 text-sm text-center text-gray-500 mt-6'>
          Already have an account?{' '}
          <Link
            to='/signIn'
            className='font-medium text-blue-600 hover:text-blue-500'
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;