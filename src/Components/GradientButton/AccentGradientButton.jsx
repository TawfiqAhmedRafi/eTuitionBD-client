import React from "react";

const AccentGradientButton = ({
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

        /* Light mode: warm amber → golden yellow */
        bg-gradient-to-br from-[#f59e0b] to-[#fbbf24]
        hover:from-[#d97706] hover:to-[#fcd34d]

        /* Dark mode: deeper accented gold */
        dark:from-[#b46f0a] dark:to-[#e0a411]
        dark:hover:from-[#9a5f08] dark:hover:to-[#f5bf26]

        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default AccentGradientButton;
