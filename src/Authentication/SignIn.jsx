import React, { useState } from 'react';
import SocialLogin from './SocialLogin';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
 import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const SignIn = () => {
  const { signInUser, user } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from?.pathname || '/'
  if (user) return <Navigate to={from} replace={true} />

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }




const onSubmit = async (data) => {
  // Show loading alert
  Swal.fire({
    title: 'Logging in...',
    text: 'Please wait while we authenticate your account.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
    background: '#1f2937',
    color: '#fff'
  });

  try {
    const result = await signInUser(data.email, data.password);
    console.log(result);
    
    // Close loading alert
    Swal.close();
    
    // Show success alert
    Swal.fire({
      title: 'Welcome Back!',
      text: 'You have been logged in successfully.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Continue',
      background: '#1f2937',
      color: '#fff',
      iconColor: '#10b981',
      timer: 2000,
      timerProgressBar: true
    }).then(() => {
      // Save user data in database (if needed)
      navigate(from, { replace: true });
    });

  } catch (error) {
    console.log(error.message);
    
    // Close loading alert
    Swal.close();
    
    // Show error alert based on error type
    let errorTitle = 'Login Failed';
    let errorMessage = error.message;
    
    // Customize error messages for better UX
    if (error.message.includes('user-not-found')) {
      errorTitle = 'Account Not Found';
      errorMessage = 'No account found with this email address. Would you like to create one?';
    } else if (error.message.includes('wrong-password')) {
      errorTitle = 'Incorrect Password';
      errorMessage = 'The password you entered is incorrect. Please try again.';
    } else if (error.message.includes('too-many-requests')) {
      errorTitle = 'Account Temporarily Locked';
      errorMessage = 'Too many failed attempts. Please try again in a few minutes.';
    } else if (error.message.includes('network-request-failed')) {
      errorTitle = 'Network Error';
      errorMessage = 'Unable to connect to the server. Please check your internet connection.';
    }
    
    Swal.fire({
      title: errorTitle,
      text: errorMessage,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Try Again',
      background: '#1f2937',
      color: '#fff',
      iconColor: '#ef4444'
    });
  }

  }
  return (
    <div className='flex justify-center items-center min-h-screen '>

      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 shadow-2xl bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <p className='text-sm text-gray-400'> </p>
          <h1 className='my-3 text-4xl text-primary font-bold'><span className='text-gray-600'> Login</span> Now!</h1>

        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>

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
          New to this site?{' '}
          <Link
            to='/register'
            className='hover:underline hover:text-[#851143] text-gray-600'
          >
            Register
          </Link>

        </p>
      </div>
    </div>

  );
};

export default SignIn;