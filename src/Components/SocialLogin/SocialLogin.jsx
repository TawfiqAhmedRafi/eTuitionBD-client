import React from "react";
import { FcGoogle } from "react-icons/fc";
import AccentGradientButton from "../GradientButton/AccentGradientButton";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
const SocialLogin = () => {
  const { googleSignIn } = useAuth();
    const navigate = useNavigate();
  const location = useLocation();
  const handleGoogle = () => {
    return googleSignIn()
      .then(() => {
        toast.success("Google sign-in successful!");
      
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(`Google sign-in failed: ${error.message}`);
      });
  };
  return (
    <div>
      <p className="text-center my-1 text-gray-500">Or</p>
      <AccentGradientButton
        type="button"
        onClick={handleGoogle}
        className="flex justify-center items-center w-full"
      >
        <FcGoogle className="mr-2 text-center" size={24} /> <span className="text-center">Sign in with Google</span> 
      </AccentGradientButton>
    </div>
  );
};

export default SocialLogin;
