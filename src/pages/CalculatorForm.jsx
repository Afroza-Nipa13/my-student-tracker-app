import React, { useState } from 'react';

const CalculatorForm = () => {
    const [result, setResult]= useState("")

    const appendValue = (value)=>{
        setResult(prev=> prev + value)
    }

    const clearDisplay=()=>{
        setResult("")
    }
  const calculate=()=>{
    try{
        setResult(eval(result.toString()))
    }catch{
        setResult("")
    }
  }
    

    return (
        <div className="flex justify-center items-center shadow-2xl">
      <div className="bg-slate-500 p-6 rounded-2xl shadow-xl grid grid-cols-4 gap-3 w-[300px]">
        {/* Display */}
        <input
          type="text"
          value={result}
          disabled
          className="col-span-4 h-14 text-right text-xl p-3 bg-white border border-gray-300 rounded-lg"
        />

        {/* Buttons */}
        <button onClick={clearDisplay} className="col-span-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600">C</button>
        <button onClick={() => appendValue("/")} className="bg-gray-200 py-3 rounded-lg">÷</button>
        <button onClick={() => appendValue("*")} className="bg-gray-200 py-3 rounded-lg">×</button>

        {[7, 8, 9].map((num) => (
          <button key={num} onClick={() => appendValue(num)} className="bg-gray-100 py-3 rounded-lg hover:bg-gray-200">{num}</button>
        ))}
        <button onClick={() => appendValue("-")} className="bg-gray-200 py-3 rounded-lg">-</button>

        {[4, 5, 6].map((num) => (
          <button key={num} onClick={() => appendValue(num)} className="bg-gray-100 py-3 rounded-lg hover:bg-gray-200">{num}</button>
        ))}
        <button onClick={() => appendValue("+")} className="bg-gray-200 py-3 rounded-lg">+</button>

        {[1, 2, 3].map((num) => (
          <button key={num} onClick={() => appendValue(num)} className="bg-gray-100 py-3 rounded-lg hover:bg-gray-200">{num}</button>
        ))}
        <button
          onClick={calculate}
          className="col-span-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
        >
          =
        </button>

        <button onClick={() => appendValue("0")} className="bg-gray-100 py-3 rounded-lg hover:bg-gray-200">0</button>
        <button onClick={() => appendValue(".")} className="bg-gray-100 py-3 rounded-lg hover:bg-gray-200">.</button>
      </div>
    </div>
    );
};

export default CalculatorForm;