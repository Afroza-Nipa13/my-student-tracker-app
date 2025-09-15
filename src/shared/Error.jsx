import React from "react";
import { useRouteError, Link, useNavigate } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../assets/error-animation.json";

const Error = () => {
    const error = useRouteError();
  const navigate = useNavigate();
  
  console.error("Routing error:", error);

  let errorMessage = "An unexpected error occurred";
  let errorCode = "Error";

  if (error.status === 404) {
    errorMessage = "The page you're looking for doesn't exist.";
    errorCode = "404";
  } else if (error.status === 500) {
    errorMessage = "Internal server error. Please try again later.";
    errorCode = "500";
  } else if (error.status) {
    errorMessage = error.statusText || errorMessage;
    errorCode = error.status;
  }
    return (
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center">
            <div className="mx-auto w-72 h-72">
              <Lottie animationData={errorAnimation} loop={true} />
            </div>
            <div className="text-6xl font-bold text-yellow-600 mb-2">{errorCode}</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              Go Back
            </button>
            <Link
              to="/"
              className="px-5 py-3 bg-white text-slate-600 border border-slate-600 rounded-lg hover:bg-slate-50 transition-colors font-medium text-center"
            >
              Go Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Reload Page
            </button>
          </div>
          
         
        </div>
      </div>
    </div>
    );
};

export default Error;