import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const ResetPassword = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, setLoading } = useAuth();

  const { email, resetToken } = location.state || {};
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      await axiosInstance.post("/auth/reset-password", {
        email,
        resetToken,
        newPassword: password,
      });

      toast.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded-lg bg-white shadow">
      <h2 className="text-3xl font-bold text-secondary mb-2">
        Reset Password
      </h2>
      <p className="text-sm mb-6">Set a new password for your account.</p>

      <form onSubmit={handleReset}>
        <label className="label font-medium mb-1">New Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full mb-3"
        />

        <label className="label font-medium mb-1">Confirm Password</label>
        <input
          type="password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="input input-bordered w-full mb-4"
        />

        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary w-full"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
