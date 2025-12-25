import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";


const ForgotPassword = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, setLoading } = useAuth();

  const [email, setEmail] = useState(location.state?.email || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      toast.success("OTP sent to your email");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded-lg bg-white shadow">
      <h2 className="text-3xl font-bold text-secondary mb-2">
        Forgot Password
      </h2>
      <p className="text-sm mb-6">
        Enter your email address and we’ll send you an OTP to reset your password.
      </p>

      <form onSubmit={handleSubmit}>
        <label className="label font-medium mb-1">Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="input input-bordered w-full mb-4"
        />

        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary w-full"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
