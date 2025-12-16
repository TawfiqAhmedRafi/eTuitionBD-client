import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AccentGradientButton from "../../Components/GradientButton/AccentGradientButton";
import GradientButton from "../../Components/GradientButton/GradientButton";

const TuitionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: tuition, isLoading, isError } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="p-10 text-center">
        <progress className="progress progress-primary w-full" />
      </div>
    );

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

          {/* Status */}
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              tuition.status === "open" ? "bg-success/20 text-success" : "bg-error/20 text-error"
            }`}
          >
            {tuition.status.toUpperCase()}
          </span>

          {/* Contact Info */}
          <div className="space-y-1 text-base-content">
            <p>Email: {tuition.email}</p>
            <p>Phone: {tuition.phone}</p>
          </div>

          {/* Class Level */}
          <p className="font-medium text-base-content">Class Level: {tuition.classLevel}</p>

          {/* Subjects */}
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

          {/* Budget */}
          <p className="font-semibold text-lg text-base-content">
            Budget: ৳{tuition.minBudget} - ৳{tuition.maxBudget}
          </p>

          {/* Location & Mode */}
          <p className="text-base-content">Location: {tuition.location}, {tuition.district}</p>
          <p className="text-base-content">Mode: {tuition.mode}</p>

          {/* Schedule */}
          <p className="text-base-content">
            Days/Week: {tuition.days} | Time: {tuition.time} | Duration: {tuition.duration} hrs/class
          </p>

          {/* Posted Date */}
          <p className="text-sm text-neutral-content">
            Posted on: {new Date(tuition.postedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Right Bottom: Apply Button */}
        <div className="md:self-end mt-6 md:mt-0">
          <AccentGradientButton
            className={`btn btn-primary btn-lg w-full md:w-auto ${
              tuition.status !== "open" ? "btn-disabled" : ""
            }`}
          >
            {tuition.status === "open" ? "Apply Now" : "Tuition Closed"}
          </AccentGradientButton>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-base-200 p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold text-base-content mb-2">Description</h2>
        <p className="text-base-content text-sm">
          {tuition.description || "No description provided."}
        </p>
      </div>
      <div className="flex justify-end">
        <GradientButton onClick={()=>navigate(-1)}>
          Go Back
        </GradientButton>
      </div>
    </div>
  );
};

export default TuitionDetails;
