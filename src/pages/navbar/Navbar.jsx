import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/class-schedule">Class Schedule</NavLink>
      </li>
      <li>
        <NavLink to="/budget-plan">Budget Plan</NavLink>
      </li>
      <li>
        <NavLink to="/notes">Notes</NavLink>
      </li>
      <li>
        <NavLink to="/calculator">Calculator</NavLink>
      </li>
      <li>
        <NavLink to="/todo">To-do List</NavLink>
      </li>
      <li>
        <NavLink to="/reminder">Reminder</NavLink>
      </li>
      <li>
        <NavLink to="/resources">Resources</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm lg:px-8">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          Student Toolkit
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {/* User profile dropdown */}
        <div className="dropdown dropdown-hover dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="User" src="/src/assets/user.png" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </ul>
        </div>

        <NavLink to="/login" className="btn mx-2">
          Sign Out
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
