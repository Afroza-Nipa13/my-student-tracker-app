import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/navbar/Navbar';

const MainLayOut = () => {
    return (
        <>
           <div className='bg-slate-900'>
            <Navbar></Navbar>
            <Outlet></Outlet>
           

           </div>
        </>
    );
};

export default MainLayOut;