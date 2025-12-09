import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/json/loading.json"; 

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-32 h-32 md:w-70 md:h-70">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
};

export default LoadingPage;