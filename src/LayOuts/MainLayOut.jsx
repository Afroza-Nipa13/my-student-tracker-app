import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/navbar/Navbar';


const MainLayOut = () => {
    return (
        <>
            <div className=''>
                     {/* Background overlay with blur */}
      
                <div className=''>
                    <Navbar></Navbar>
                    <Outlet></Outlet>
                </div>


            </div>
        </>
    );
};

export default MainLayOut;