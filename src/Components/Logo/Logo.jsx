import React from "react";
import Lottie from "lottie-react";
import logoAnimation from "../../assets/json/logo.json";

const Logo = ({ width = 150, height = 150, scale = 1.8 }) => {
  return (
    <div
      style={{
        width,
        height,
        transform: `scale(${scale})`,
        transformOrigin: "center", // scale from center
      }}
    >
      <Lottie animationData={logoAnimation} loop autoplay />
    </div>
  );
};

export default Logo;
