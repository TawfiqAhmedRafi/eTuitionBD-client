import React from "react";
import forbiddenImg from "../../assets/forbidden.png";
import GradientButton from "../GradientButton/GradientButton";
import { Link } from "react-router";
import AccentGradientButton from "../GradientButton/AccentGradientButton";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4 text-center space-y-6 md:space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-primary">
        Access Denied
      </h1>
      <img
        src={forbiddenImg}
        alt="Forbidden"
        className="w-56 md:w-72 lg:w-80 object-contain"
      />
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
        <Link to="/">
          <GradientButton>Go Home</GradientButton>
        </Link>
        <Link to="/dashboard">
          <AccentGradientButton>Go Dashboard</AccentGradientButton>
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
