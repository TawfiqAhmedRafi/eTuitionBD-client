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

        /* Light mode: primary → secondary */
        bg-linear-to-br from-[#0059ed] to-[#0297f3]
        hover:from-[#004ed5] hover:to-[#02a3e2]

        /* Dark mode: deep navy → primary */
        dark:from-[#0b1b37] dark:to-[#0059ed]
        dark:hover:from-[#0f234a] dark:hover:to-[#0276ff]

        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default GradientButton;
