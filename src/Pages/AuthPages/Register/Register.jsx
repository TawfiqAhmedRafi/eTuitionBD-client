import React, { useState } from "react";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, useWatch } from "react-hook-form";
import { useLocation, useNavigate, Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import GradientButton from "../../../Components/GradientButton/GradientButton";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";
import SocialRegister from "../../../Components/SocialRegister/SocialRegister";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const password = useWatch({
    control,
    name: "password",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();

  const handleRegistration = (data, e) => {
    e.preventDefault();
    setLoading(true);
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        // store the image and get photoURL
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          // update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              axiosInstance
                .post("/users", {
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  role: data.role,
                  phone: data.phone,
                  photoURL: photoURL,
                })
                .then(() => {
                  navigate(location.state || "/");
                })
                .catch((err) => {
                  console.error("Backend error:", err);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="my-20 p-5">
      <h2
        className="
    text-2xl sm:text-3xl md:text-4xl 
    font-bold
    bg-linear-to-r 
    from-[#0043c1] via-[#11c4dc] to-[#0297f3]
    dark:from-[#0b1b37] dark:via-[#11c4dc] dark:to-[#0297f3]
    bg-clip-text text-transparent
  "
      >
        Create an Account
      </h2>

      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label text-sm sm:text-base">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            placeholder="Your name"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Name is Required</p>
          )}
          {/* photo */}
          <label className="label text-sm sm:text-base">Photo</label>

          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input file-input-secondary w-full"
            placeholder="Your Photo"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Photo is Required</p>
          )}
          {/* Role Selection */}
          <label className="label text-sm sm:text-base">Register As</label>
          <div className="flex gap-4 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="student"
                {...register("role", { required: true })}
                className="radio radio-primary"
              />
              <span>Student</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="tutor"
                {...register("role", { required: true })}
                className="radio radio-primary"
              />
              <span>Tutor</span>
            </label>
          </div>

          {errors.role && <p className="text-red-500">Please select a role</p>}
          {/* email */}
          <label className="label text-sm sm:text-base">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is Required</p>
          )}
          {/* phone */}
          <label className="label text-sm sm:text-base">Phone Number </label>
          <input
            type="text"
            {...register("phone", { required: true })}
            className="input w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            placeholder="Phone Number"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is Required</p>
          )}
          {/* password */}
          <label className="label text-sm sm:text-base">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
              })}
              className="input w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base"
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
          {/*  */}

          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is Required</p>
          )}

          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              password must have atleast 1 uppercase , 1 lowercase , 1 number
              and 1 special character{" "}
            </p>
          )}
          {/* confirm password */}
          <label className="label text-sm sm:text-base">Confirm Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="input w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base"
              placeholder="Confirm Password"
            />
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
          <GradientButton type="submit" className="btn btn-primary mt-4" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </GradientButton>
        </fieldset>
        <p>
          Already have an account?
          <Link
            state={location.state}
            to="/login"
            className="text-primary hover:underline"
          >
            Login
          </Link>{" "}
        </p>
      </form>
      <SocialRegister></SocialRegister>
    </div>
  );
};

export default Register;
