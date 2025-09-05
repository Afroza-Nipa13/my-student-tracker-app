import React from "react";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [user]= useAuth();
  const links = (
    <>
      <li className="px-3 py-1">
        <NavLink to="/class-schedule">Class Schedule</NavLink>
      </li>
      <li className="px-3 py-1">
        <NavLink to="/budget-plan">Budget Plan</NavLink>
      </li>
      <li className="px-3 py-1">
        <NavLink to="/notes">Notes</NavLink>
      </li>
      <li className="px-3 py-1">
        <NavLink to="/calculator">Calculator</NavLink>
      </li>
      <li className="px-3 py-1">
        <NavLink to="/todo">To-do List</NavLink>
      </li>
      <li className="px-3 py-1">
        <NavLink to="/reminder">Reminder</NavLink>
      </li>
      <li className="px-3 py-1">
        <NavLink to="/resources">Resources</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-slate-800 shadow-sm lg:px-8">
      <div className="navbar-start">
        {/* Dropdown for small screens */}
        <div className="dropdown dropdown-hover">
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
        <NavLink to="/" className="text-xl text-gray-50">
          Student <span className="text-blue-300">Toolkits </span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-gray-50 divide-x-1 px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {/* User profile dropdown */}
        <div className="dropdown dropdown-hover dropdown-end">
          <div tabIndex={0} role="button" className="btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="User" src="/src/assets/user.png" />
            </div>
          </div>
         
        </div>

        <NavLink to="/login" className="btn mx-2">
          Sign Out
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
