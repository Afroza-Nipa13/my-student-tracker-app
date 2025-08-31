import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/navbar/Navbar';

const MainLayOut = () => {
    return (
        <>
           <div>
            <Navbar></Navbar>
           </div>
           <main>
            <Outlet></Outlet>
           </main>
           <div>

           </div>
        </>
    );
};

export default MainLayOut;