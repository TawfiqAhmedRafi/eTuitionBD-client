import React from "react";
import { useForm } from "react-hook-form"; 
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import GradientButton from "../../Components/GradientButton/GradientButton";

const Complaint = () => {
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.post("/complaints", data);
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Complaint Submitted!",
        text: "Your complaint has been successfully submitted.",
        confirmButtonColor: "#3085d6",
      });
      reset();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    },
  });

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-linear-to-b from-base-100 to-base-200 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-neutral-content mb-6 text-center">
        Submit a Complaint
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-neutral-content font-medium mb-2">Your Complaint</label>
          <textarea
            {...register("message", { required: "Complaint message is required" })}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-all duration-200"
            rows={6}
            placeholder="Write your complaint here..."
          />
          {errors.message && (
            <p className="text-red-500 mt-2 text-sm">{errors.message.message}</p>
          )}
        </div>

        <GradientButton
          type="submit"
          className="w-full py-3 px-6  text-white font-semibold rounded-xl shadow-md transition-all duration-200 disabled:opacity-50"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Submitting..." : "Submit Complaint"}
        </GradientButton>
      </form>

      <p className="mt-4 text-center text-gray-500 text-sm">
        We value your feedback. Your complaint will be reviewed and addressed promptly.
      </p>
    </div>
  );
};

export default Complaint;
