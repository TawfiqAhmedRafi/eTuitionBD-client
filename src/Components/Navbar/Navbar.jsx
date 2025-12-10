import React from "react";
import { Link, NavLink } from "react-router";
import logoImg from "../../assets/logo.png";
import GradientButton from "../GradientButton/GradientButton";
import AccentGradientButton from "../GradientButton/AccentGradientButton";

const Navbar = () => {
  const getLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-3xl font-medium  ${
      isActive
        ? "bg-primary text-white"
        : "text-base-content transition-transform duration-200 hover:-translate-y-1 hover:scale-105"
    }`;
  const links = (
    <>
      <NavLink to="/" className={getLinkClass}>
        Home
      </NavLink>
      <NavLink to="/tuitions" className={getLinkClass}>
        Tuitions
      </NavLink>
      <NavLink to="/tutors" className={getLinkClass}>
        Tutors
      </NavLink>
      <NavLink to="/aboutUs" className={getLinkClass}>
        About
      </NavLink>
      <NavLink to="/contact" className={getLinkClass}>
        Contact
      </NavLink>
    </>
  );
  return (
    <div className="navbar  shadow-sm px-1 md:px-6 bg-base-200/30 backdrop-blur-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className=" text-xl">
          <div className="flex  justify-center items-center">
            <img src={logoImg} alt="Logo" className="w-12 h-12" />
            <p
              className="
              font-bold 
              bg-linear-to-r 
                from-[#0043c1] via-[#11c4dc] to-[#0297f3]
              dark:from-[#0b1b37] dark:via-[#11c4dc] dark:to-[#0297f3]
              bg-clip-text 
              text-transparent
  "
            >
              ETUITIONBD
            </p>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end hidden md:flex gap-5">
        <Link to="/login">
          <GradientButton className="transition-transform duration-200 hover:-translate-y-1 ">
            Login
          </GradientButton>
        </Link>
        <Link to="/register">
          <AccentGradientButton className="transition-transform duration-200 hover:-translate-y-1 ">
            Register
          </AccentGradientButton>
        </Link>
      </div>
      <div className="navbar-end dropdown dropdown-end relative md:hidden">
        <label tabIndex={0} className="outline-0 shadow-none">
          <GradientButton>Menu</GradientButton>
        </label>

        <ul
          tabIndex={0}
          className="
            dropdown-content
            absolute
            top-full
            right-0
            mt-2
            menu
            p-2
            shadow
            bg-base-100
            rounded-box
            "
        >
          <div className="flex flex-col justify-center gap-3 w-full px-2">
            <Link to="/login">
              {" "}
              <GradientButton className="transition-transform duration-200 hover:-translate-y-1 ">
                Login
              </GradientButton>
            </Link>
            <Link to="/register">
              {" "}
              <AccentGradientButton className="transition-transform duration-200 hover:-translate-y-1 ">
                Register
              </AccentGradientButton>
            </Link>
          </div>
        </ul>
      </div>

      {/* theme dark/light */}

      <label className="swap swap-rotate cursor-pointer ml-2">
        {/* hidden checkbox controls the state */}
        <input
          type="checkbox"
          onChange={(e) => {
            const newTheme = e.target.checked
              ? "etuitionbd_dark"
              : "etuitionbd_light";
            document.documentElement.setAttribute("data-theme", newTheme);
          }}
        />

        {/* sun icon (light mode) */}
        <svg
          className="swap-off h-10 w-10 fill-current text-secondary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        {/* moon icon (dark mode) */}
        <svg
          className="swap-on h-10 w-10 fill-current text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
    </div>
  );
};

export default Navbar;
