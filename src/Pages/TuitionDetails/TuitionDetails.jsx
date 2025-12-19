import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AccentGradientButton from "../../Components/GradientButton/AccentGradientButton";
import GradientButton from "../../Components/GradientButton/GradientButton";
import Swal from "sweetalert2";
import useTutor from "../../hooks/useTutor";

const TuitionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { tutor, isLoading: tutorLoading } = useTutor();
  const isTutor = !!tutor;
  const {
    data: tuition,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
     enabled: !!id,
  });
  const { data: applyInfo, isLoading: applyLoading } = useQuery({
    queryKey: ["has-applied", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/has-applied/${id}`);
      return res.data;
    },
    staleTime: 2 * 60 * 1000,
    enabled: isTutor && !!id,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [salary, setSalary] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const applyMutation = useMutation({
    mutationFn: async () => {
      const payload = { tuitionId: id, salary: Number(salary), coverLetter };
      return await axiosSecure.post("/applications", payload);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["has-applied", id]);
      const previous = queryClient.getQueryData(["has-applied", id]);
      queryClient.setQueryData(["has-applied", id], { hasApplied: true });

      return { previous };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["has-applied", id], context.previous);

      const msg =
        err.response?.data?.message || "Failed to apply. Try again later.";
      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text: msg,
      });
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Application Submitted",
        text: "Your application has been submitted successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      setModalOpen(false);
      setSalary("");
      setCoverLetter("");
      queryClient.invalidateQueries(["tuition", id]); 
    },
  });

  const handleApply = () => {
    if (!salary) {
      Swal.fire({
        icon: "warning",
        title: "Missing Salary",
        text: "Please enter a salary.",
      });
      return;
    }

    const min = tuition.minBudget;
    const max = tuition.maxBudget;
    if (Number(salary) < min || Number(salary) > max) {
      Swal.fire({
        icon: "error",
        title: "Invalid Salary",
        text: `Salary must be between ৳${min} and ৳${max}`,
      });
      return;
    }
    if (!tutor?.district) {
      Swal.fire({
        icon: "error",
        title: "Tutor Info Missing",
        text: "Your tutor profile is incomplete.",
      });
      return;
    }

    if (tutor.district !== tuition.district) {
      Swal.fire({
        icon: "error",
        title: "Invalid District",
        text: `You can only apply to tuitions in your district (${tutor.district}).`,
      });
      return;
    }

    applyMutation.mutate();
  };

  if (isLoading) { 
  return (
    <div className="p-10 text-center">
      <progress className="progress progress-primary w-full" />
    </div>
  );
}

  if (isError)
    return (
      <div className="p-10 text-center text-error">
        Failed to load tuition details
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Hero Section */}
      <div className="bg-base-200 rounded-3xl p-8 shadow-md border border-base-300 relative flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        {/* Left: Student Photo */}
        <div className="shrink-0">
          <img
            src={tuition.photoURL}
            alt={tuition.name}
            className="w-32 h-32 rounded-full object-cover border border-base-300 shadow-sm"
          />
        </div>

        {/* Middle: Student & Tuition Info */}
        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-bold text-base-content">
            {tuition.name}
          </h1>

          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              tuition.status === "open"
                ? "bg-success/20 text-success"
                : "bg-error/20 text-error"
            }`}
          >
            {tuition.status.toUpperCase()}
          </span>

          <div className="space-y-1 text-base-content">
            <p>Email: {tuition.email}</p>
            <p>Phone: {tuition.phone}</p>
          </div>

          <p className="font-medium text-base-content">
            Class Level: {tuition.classLevel}
          </p>

          <div>
            <h3 className="font-medium text-base-content mb-1">Subjects:</h3>
            <div className="flex flex-wrap gap-2">
              {tuition.subjects.map((sub, idx) => (
                <span
                  key={idx}
                  className="badge bg-primary/10 text-primary border-none"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          <p className="font-semibold text-lg text-base-content">
            Budget: ৳{tuition.minBudget} - ৳{tuition.maxBudget}
          </p>

          <p className="text-base-content">
            Location: {tuition.location}, {tuition.district}
          </p>
          <p className="text-base-content">Mode: {tuition.mode}</p>
          <p className="text-base-content">
            Days/Week: {tuition.days} | Time: {tuition.time} | Duration:{" "}
            {tuition.duration} hrs/class
          </p>
          <p className="text-sm text-neutral-content">
            Posted on: {new Date(tuition.postedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Right Bottom: Apply Button */}
        <div className="md:self-end mt-6 md:mt-0">
         {tutorLoading || applyLoading ? (
    <button className="btn btn-primary btn-lg btn-disabled w-full md:w-auto">
      Loading...
    </button>
  ) : isTutor ? (
    <AccentGradientButton
      className={`btn btn-primary btn-lg ${
        tuition.status !== "open" || applyInfo?.hasApplied
          ? "btn-disabled"
          : ""
      }`}
      onClick={() => {
        if (applyInfo?.hasApplied) {
          Swal.fire({
            icon: "info",
            title: "Already Applied",
            text: "You have already applied to this tuition.",
          });
          return;
        }
        setModalOpen(true);
      }}
    >
      {applyInfo?.hasApplied
        ? "Already Applied"
        : tuition.status === "open"
        ? "Apply Now"
        : "Tuition Closed"}
    </AccentGradientButton>
  ) : null}
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-base-200 p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold text-base-content mb-2">
          Description
        </h2>
        <p className="text-base-content text-sm">
          {tuition.description || "No description provided."}
        </p>
      </div>

      <div className="flex justify-end">
        <GradientButton onClick={() => navigate(-1)}>Go Back</GradientButton>
      </div>

      {/* ------------------- Apply Modal ------------------- */}
      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <h3 className="text-lg font-bold mb-4">Apply for Tuition</h3>
            <label className="label">
              <span className="label-text">Proposed Salary (৳)</span>
            </label>
            <input
              type="number"
              min={tuition.minBudget}
              max={tuition.maxBudget}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="input input-bordered w-full mb-4"
              placeholder={`Between ${tuition.minBudget} - ${tuition.maxBudget}`}
            />
            <label className="label">
              <span className="label-text">Cover Letter (Optional)</span>
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Write a short cover letter"
              rows={3}
            />
            <div className="modal-action flex flex-col md:flex-row gap-2">
              <AccentGradientButton
                onClick={handleApply}
                disabled={applyMutation.isPending}
                className="btn w-full md:w-auto"
              >
                {applyMutation.isPending
                  ? "Submitting..."
                  : "Submit Application"}
              </AccentGradientButton>
              <GradientButton
                onClick={() => setModalOpen(false)}
                className="btn w-full md:w-auto"
              >
                Cancel
              </GradientButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuitionDetails;
