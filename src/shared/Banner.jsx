import React from 'react';
import bannerImg from "../assets/toolkit.jpg"
import printedBg from '../assets/leaf-bg.jpg'

const Banner = () => {
    return (
        <div className='bg-slate-900'>
            <div
                style={{
                    backgroundImage: `url(${printedBg})`,
                    backgroundRepeat: 'repeat', // Optional: adjust as needed
                    backgroundPosition: 'center', // Optional: adjust as needed
                    height: '500px', // Example height
                    width: '100%', // Example width
                }}
                className='lg:flex justify-between w-[100vw] mx-auto mt-6  shadow-2xl border-6 border-gray-600'>
                <div className='bg-[#92a8d1] text-gray-100 mt-30 text-center h-1/2 w-1/2 py-10 space-y-3 justify-center'>
                    <h3 className='text-4xl font-bold pt-4'>My Student Toolkit</h3>
                    <div className='flex justify-center gap-3 mt-12'>

                        <button className='btn bg-slate-400 text-white'>Explore More</button>
                        <button className='btn bg-slate-400 text-white'>Class List</button>
                        <button className='btn bg-slate-400 text-white'>Budget Plan</button>
                    </div>
                </div>
                <div className='w-1/2 h-full'>
                    <img
                        className='w-full h-full object-cover'
                        src={bannerImg} alt="student toolkit " />
                </div>

            </div>
        </div>
    );
};

export default Banner;