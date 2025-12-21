import React, { useState } from "react";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";
import { useForm, useWatch } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate, Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import GradientButton from "../../../Components/GradientButton/GradientButton";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const location = useLocation();
  const { register, handleSubmit, control } = useForm();
  const watchEmail = useWatch({
    control,
    name: "email",
    defaultValue: "",
  });

  const handleLogin = async (data) => {
    
    setLoginError("");

    try {
      await signInUser(data.email, data.password);
     

      navigate(location?.state || "/");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/user-not-found") {
        setLoginError("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setLoginError("Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        setLoginError("Invalid email address.");
      } else {
        setLoginError(error.message);
      }
    }
  };

  return (
    <div className=" ">
      <h2
        className="text-4xl font-bold bg-linear-to-r 
                from-[#0043c1] via-[#11c4dc] to-[#0297f3]
              dark:from-[#0b1b37] dark:via-[#11c4dc] dark:to-[#0297f3]
              bg-clip-text 
              text-transparent"
      >
        Welcome Back
      </h2>
      <p className="text-sm">Login with eTuitionBD</p>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", {
              required: true,
            })}
            className="input"
            placeholder="Email"
          />
          {/* password */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
              })}
              className="input"
              placeholder="Password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary focus:outline-none"
            >
              {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </button>
          </div>
          {loginError && (
            <p className="text-error text-sm mt-1">{loginError}</p>
          )}
          <div>
            <Link
              state={{ email: watchEmail }}
              to="/forgot-password"
              className="link link-hover hover:font-bold text-secondary"
            >
              Forgot password?
            </Link>
          </div>
          <GradientButton type="submit" className="text-lg outfit mt-4">
            Login
          </GradientButton>
          <p>
            New to eTuitionBD?
            <Link
              state={location.state}
              to="/register"
              className="text-primary hover:underline"
            >
              Register
            </Link>{" "}
          </p>
        </fieldset>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
