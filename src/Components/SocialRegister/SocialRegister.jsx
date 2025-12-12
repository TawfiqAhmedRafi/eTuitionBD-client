import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import AccentGradientButton from "../GradientButton/AccentGradientButton";
import useAuth from "../../hooks/useAuth";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { useLocation, useNavigate } from "react-router";

const SocialRegister = () => {
  const { googleSignIn, user } = useAuth();
  const [open, setOpen] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      setOpen(true);
    } catch (error) {
      toast.error("Google sign-in failed");
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not loaded");
      return;
    }

    const phone = e.target.phone.value;
    const role = e.target.role.value;

    const res = await axiosInstance.post("/users", {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL, // THIS NOW WORKS 100%
      phone,
      role,
    });
    console.log("Backend response:", res.data);

    toast.success("Registration completed!");
    setOpen(false);
    navigate(location?.state || "/");
  };
  return (
    <div>
      <p className="text-center my-1 text-gray-500">Or</p>

      {/* Google Button */}
      <AccentGradientButton
        type="button"
        onClick={handleGoogle}
        className="flex justify-center items-center w-full"
      >
        <FcGoogle className="mr-2" size={24} />
        <span>Sign up with Google</span>
      </AccentGradientButton>

      {/* Modal */}
      {open && (
        <dialog open className="modal">
          <div className="modal-box relative max-w-sm">
            {/* Cancel Icon */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-red-500"
            >
              <MdCancel size={24} />
            </button>

            <h3 className="text-lg font-bold">Complete Your Profile</h3>

            <form onSubmit={handleSubmit} className="space-y-3 mt-4">
              <input
                type="text"
                value={user?.displayName}
                disabled
                className="input input-bordered w-full"
              />

              <input
                type="email"
                value={user?.email}
                disabled
                className="input input-bordered w-full"
              />

              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                className="input input-bordered w-full"
                required
              />

              <div className="flex gap-4 items-center">
                <label className="flex gap-2 items-center cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    className="radio radio-primary"
                    defaultChecked
                  />
                  Student
                </label>

                <label className="flex gap-2 items-center cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="tutor"
                    className="radio radio-primary"
                  />
                  Tutor
                </label>
              </div>

              <button className="btn btn-primary w-full">Submit</button>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default SocialRegister;
