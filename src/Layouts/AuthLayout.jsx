import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
         <div className="max-w-7xl mx-auto h-screen">
      
      <div className="flex  h-full">
        
        
        <div className="flex-1 ">
         
          

          
          <div className="h-full flex justify-center items-center  ">
            <Outlet />
          </div>
        </div>

        
        <div className="flex-1 hidden md:flex justify-center items-center  ">
         <Logo width={400} height={400} scale={2} />
        </div>
      </div>
    </div>
    );
};

export default AuthLayout;