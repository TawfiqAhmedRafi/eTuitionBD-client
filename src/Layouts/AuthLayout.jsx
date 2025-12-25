import React from "react";
import Logo from "../Components/Logo/Logo";
import { Link, Outlet } from "react-router";
import logoImg from "../assets/logo.png";

const AuthLayout = () => {
  return (
   <div className="w-fill min-h-screen">
  <div className="flex h-full">
    <div className="flex-1 relative min-h-screen">

      <div className="absolute mt-6 ml-6 top-6 left-6">
        <Link to="/"><Logo width={120} height={120} scale={1.5} /></Link>
      </div>

      <div className="min-h-screen flex justify-center items-center">
        <Outlet />
      </div>

    </div>

    <div className="flex-1 hidden md:flex justify-center items-center bg-(--color-base-400)">
      <div className="flex flex-col items-center space-y-4">
        <img src={logoImg} alt="Logo" className="w-40 h-40 object-contain drop-shadow-md" />
        <p className="text-3xl font-semibold bg-linear-to-r 
                      from-[#0043c1] via-[#11c4dc] to-[#0297f3]
                      dark:from-[#0b1b37] dark:via-[#11c4dc] dark:to-[#0297f3]
                      bg-clip-text text-transparent outfit">
          ETUITIONBD
        </p>
      </div>
    </div>
  </div>
</div>
  );
};

export default AuthLayout;
