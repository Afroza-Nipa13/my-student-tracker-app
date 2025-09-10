import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import logo from "../../assets/Logo.png"
const Navbar = () => {
  const { user, LogOut } = useAuth() || {}; 
  const [photoURL, setPhotoURL]=useState("/src/assets/user.png")
  
  console.log("User object",user)

  useEffect(()=>{
    if(user && user.photoURL){
      console.log("Setting photoURL to:", user.photoURL);
      setPhotoURL(user.photoURL)
    }else{
      setPhotoURL("/src/assets/user.png")
    }
  },[user])

  // SweetAlert logout confirmation
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out from your account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel',
      background: '#1f2937',
      color: '#fff',
      iconColor: '#ef4444'
    }).then((result) => {
      if (result.isConfirmed) {
        LogOut();
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          background: '#1f2937',
          color: '#fff',
          confirmButtonColor: '#3085d6',
          iconColor: '#10b981'
        });
      }
    });
  };

  const links = (
    <>
      <li className="px-3 py-1">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="px-3 py-1">
        <NavLink to="/class-schedule">Class Schedule</NavLink>
      </li>
      <li className="px-3 py-1">
        <NavLink to="/budget-plan">Budget Plan</NavLink>
      </li>
      {/* <li className="px-3 py-1">
        <NavLink to="/notes">Notes</NavLink>
      </li> */}
      <li className="px-3 py-1">
        <NavLink to="/calculator">Calculator</NavLink>
      </li>
      <li className="px-3 py-1">
        <NavLink to="/studyPlanner">Study Planner</NavLink>
      </li>
      {/* <li className="px-3 py-1">
        <NavLink to="/reminder">Reminder</NavLink>
      </li> */}
      {/* <li className="px-3 py-1">
        <NavLink to="/resources">Resources</NavLink>
      </li> */}
      <li className="px-3 py-1">
        <NavLink to='/ExamQAgenerator'>Exam QA generator</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-slate-800 shadow-sm lg:px-8">
      {/* Left Section */}
      <div className="navbar-start">
        {/* Dropdown for small screens */}
        <div className="dropdown dropdown-hover text-white">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content text-gray-50 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <NavLink 
  to="/" 
  className="text-xl text-gray-50 flex items-center gap-2"
>
  <img 
    src={logo} 
    className="w-10 h-10" 
    alt="Logo" 
  />
  <h3 className="font-semibold hidden lg:block">
    Student <span className="text-blue-300 font-extrabold">Toolkit</span>
  </h3>
</NavLink>
      </div>

      {/* Center Section */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-gray-50 divide-x-1 px-1">
          {links}
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end gap-2">
        {!user ? (
         
          <>
            <NavLink to="/signIn" className="btn btn-outline bg-sky-400 btn-sm">
              Sign In
            </NavLink>
            <NavLink to="/register" className="btn btn-info btn-sm">
              Register
            </NavLink>
          </>
        ) : (
          
          <>
            <div className="dropdown dropdown-hover dropdown-end">
              <div tabIndex={0} role="button" className="btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-slate-600">
                  <img
                    alt="User Profile"
                    src={photoURL}
                    onError={(e) => {
                      e.target.src = "/src/assets/user.png";
                    }}
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-800 rounded-box w-52 mt-2">
                <li className="px-4 py-2 text-gray-100 border-b border-slate-700">
                  <div className="font-medium">{user.displayName || 'User'}</div>
                  <div className="text-sm text-gray-300">{user.email}</div>
                </li>
                <li><NavLink to="/profile" className="text-gray-200">Profile</NavLink></li>
                {/* <li><NavLink to="/settings" className="text-gray-200">Settings</NavLink></li> */}
              </ul>
            </div>
            <button onClick={handleLogout} className="btn btn-error btn-sm text-white flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

