import React from "react";

import { Link } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import errorImg from "../../assets/error.png";
import GradientButton from "../../Components/GradientButton/GradientButton";

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex flex-col grow items-center justify-center my-10 md:my-20 text-center px-4">
        
        <div className="w-64 h-64 md:w-96 md:h-96 mb-6">
          <img
            src={errorImg}
            alt="Error"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Oops! Page not found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>

     
        <Link to="/">
          <GradientButton className=" px-6 py-3 text-lg hover:scale-105 transition-transform duration-300">
            {" "}
            Go Home
          </GradientButton>
        </Link>
      </main>

      
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default ErrorPage;
