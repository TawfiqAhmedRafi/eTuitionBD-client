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
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, setValue } = useForm();
  const watchEmail = useWatch({
    control,
    name: "email",
    defaultValue: "",
  });

  const handleLogin = async (data) => {
    setLoginError("");
     setLoading(true); 
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
    }finally {
    setLoading(false); 
  }
  };

  return (
    <div className=" p-10 ">
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
            className="input w-full"
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
              className="input w-full"
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
          <GradientButton type="submit" className="text-lg outfit mt-4" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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
      <button
        type="button"
        onClick={async () => {
          const demoEmail = "ichigo@gmail.com";
          const demoPassword = "Ichigo@1";

          // Set form values using react-hook-form
          setValue("email", demoEmail);
          setValue("password", demoPassword);

          // Call your login function directly
          await handleLogin({ email: demoEmail, password: demoPassword });
        }}
        className="btn btn-primary rounded-lg btn-outline w-full mt-2"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login as Student"}
      </button>
      <button
        type="button"
        onClick={async () => {
          const demoEmail = "urahara@gmail.com";
          const demoPassword = "Urahara@1";

          // Set form values using react-hook-form
          setValue("email", demoEmail);
          setValue("password", demoPassword);

          // Call your login function directly
          await handleLogin({ email: demoEmail, password: demoPassword });
        }}
        className="btn btn-secondary rounded-lg btn-outline w-full mt-2"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login as Tutor"}
      </button>
      <button
        type="button"
        onClick={async () => {
          const demoEmail = "gojo@gmail.com";
          const demoPassword = "Gojo@1";

          // Set form values using react-hook-form
          setValue("email", demoEmail);
          setValue("password", demoPassword);

          // Call your login function directly
          await handleLogin({ email: demoEmail, password: demoPassword });
        }}
        className="btn btn-accent rounded-lg btn-outline w-full mt-2"
        disabled={loading}
      >
      {loading ? "Logging in..." : "Login as Admin"}
      </button>
    </div>
  );
};

export default Login;
