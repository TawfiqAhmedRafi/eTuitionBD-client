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
        text-center

        /* Light mode: accent → secondary */
        bg-linear-to-br from-[#11c4dc] to-[#0297f3]
        hover:from-[#0fb4cc] hover:to-[#04a2dd]

        /* Dark mode: deeper aqua → primary */
        dark:from-[#0b1b37] dark:to-[#11c4dc]
        dark:hover:from-[#11274f] dark:hover:to-[#17d3ef]

        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default AccentGradientButton;
