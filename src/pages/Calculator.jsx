import React from 'react';
import printedBg from '../assets/calculator.jpg'

const Calculator = () => {
    return (
       <div className='bg-slate-900 pb-2'>
         <div 
        style={{
                            backgroundImage: `url(${printedBg})`,
                            backgroundRepeat: 'repeat', 
                            backgroundPosition: 'center', 
                            height: '500px', 
                            width: '100%',
                            
                        }}
                        className='lg:flex justify-between w-[100vw] mx-auto my-10  shadow-2xl border-6 border-gray-600'>
            <h1>Hello</h1>
        </div>
       </div>
    );
};

export default Calculator;