import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";


const VerifyOtp = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, setLoading } = useAuth();

  const email = location.state?.email;
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/verify-otp", {
        email,
        otp,
      });

      toast.success("OTP verified successfully");

      navigate("/reset-password", {
        state: {
          email,
          resetToken: res.data.resetToken,
        },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded-lg bg-white shadow">
      <h2 className="text-3xl font-bold text-secondary mb-2">Verify OTP</h2>
      <p className="text-sm mb-6">
        Enter the 6-digit OTP sent to your email.
      </p>

      <form onSubmit={handleVerify}>
        <label className="label font-medium mb-1">OTP Code</label>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="input input-bordered w-full mb-4 text-center tracking-widest text-lg"
          required
        />

        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary w-full"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
