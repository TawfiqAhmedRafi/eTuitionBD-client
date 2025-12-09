import React from "react";

const GradientButton = ({
  children,
  className = "",
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-5 py-2 rounded-lg outfit font-semibold text-white 
        transition-all duration-300 shadow-md hover:shadow-xl active:scale-95
        border-none

        /* Light mode gradient */
        bg-linear-to-br from-[#1e40af] to-[#0ea5e9]
        hover:from-[#1e3a8a] hover:to-[#38bdf8]

        /* Dark mode gradient */
        dark:from-[#3154ca] dark:to-[#22c7e5]
        dark:hover:from-[#2a4dba] dark:hover:to-[#35d3f6]

        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default GradientButton;
