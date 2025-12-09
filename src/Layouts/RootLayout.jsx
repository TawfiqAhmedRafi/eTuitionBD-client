import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <header className="sticky top-0 z-10">
        <Navbar></Navbar>
      </header>
      <main className="w-11/12 mx-auto">
         <Outlet></Outlet>
      </main>
     
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
