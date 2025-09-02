import React from 'react';
import printedBg from '../assets/calculator.jpg'
import CalculatorForm from './CalculatorForm';

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
                        className='lg:flex justify-center gap-6 w-[100vw] mx-auto my-10  shadow-2xl border-6 border-gray-600'>
            <CalculatorForm></CalculatorForm>
            <h1 className='text-5xl font-bold text-slate-700 mt-20 text-start uppercase border-0 pl-4 mb-20 border-l-10 border-red-700'>Calculate <br /> your <br />budget</h1>
            
        </div>
       </div>
    );
};

export default Calculator;