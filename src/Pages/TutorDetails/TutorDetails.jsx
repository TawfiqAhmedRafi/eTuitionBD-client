import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiCheckCircle } from "react-icons/fi";
import GradientButton from "../../Components/GradientButton/GradientButton"; // assuming you have this
import AccentGradientButton from "../../Components/GradientButton/AccentGradientButton";
import { format } from "date-fns";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
const TutorDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [contactLoading, setContactLoading] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tutor", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutors/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars text-primary loading-xl"></span>
      </div>
    );

  if (isError)
    return (
      <div className="p-10 text-center text-error">
        Failed to load tutor details
      </div>
    );

  const tutor = data;

  const handleContactNow = async () => {
    if (contactLoading) return;

    setContactLoading(true);
    try {
      const res = await axiosSecure.post("/conversations", {
        tutorId: tutor._id,
      });

      const conversationId = res.data._id;

      navigate(`/dashboard/messages/${conversationId}`);
    } catch (err) {
      console.error("Contact error:", err);

      if (err.response?.status === 401) {
        Swal.fire("Login required", "Please login first", "warning");
      } else if (err.response?.status === 403) {
        Swal.fire("Forbidden", err.response.data?.message, "error");
      } else {
        Swal.fire("Error", "Failed to contact tutor", "error");
      }
    } finally {
      setContactLoading(false);
    }
  };

  const avgRating =
    tutor.ratingCount > 0 ? tutor.ratingSum / tutor.ratingCount : 0;

  const renderRatingStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400 w-4 h-4" />);
      } else if (rating >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-yellow-400 w-4 h-4" />
        );
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 w-4 h-4" />);
      }
    }

    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <div className="mt-10">
      {" "}
      <div className="max-w-5xl mx-auto p-6 md:p-10 bg-base-200 rounded-3xl shadow-lg border border-base-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <img
            src={tutor.photoURL}
            alt={tutor.name}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border border-base-300"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold">{tutor.name}</h1>
              {tutor.status === "approved" && (
                <FiCheckCircle
                  className="text-primary w-6 h-6"
                  title="Verified Tutor"
                />
              )}
            </div>
            <p className="text-sm text-neutral-content mt-1">
              Joined on {format(new Date(tutor.submittedAt), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>

        {/* Main Info */}
        <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base text-base-content mb-6">
          <p className="flex items-center gap-2">
            <span className="font-semibold">Qualification:</span>{" "}
            {tutor.qualification} at{" "}
            <span className="badge  badge-secondary text-xs ">
              {tutor.institution}
            </span>{" "}
          </p>
          <p>
            <span className="font-semibold">Experience:</span>{" "}
            {tutor.experienceYears} yrs {tutor.experienceMonths} mos
          </p>
          <p>
            <span className="font-semibold">Email:</span> {tutor.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {tutor.phone}
          </p>
          <p>
            <span className="font-semibold">District:</span> {tutor.district}
          </p>
          <p>
            <span className="font-semibold">Preferred Location:</span>{" "}
            {tutor.location}
          </p>
          <p>
            <span className="font-semibold">Preferred Mode:</span> {tutor.mode}
          </p>
          <p>
            <span className="font-semibold"> Minimum Honorarium:</span>{" "}
            <span className="text-primary font-bold">৳{tutor.salary}</span>
          </p>
          <p>
            <span className="font-semibold"> Preferred Time:</span> {tutor.time}
          </p>
          <div className="flex flex-col gap-3">
            <div>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`badge ${
                  tutor.status === "approved"
                    ? "badge-success"
                    : tutor.status === "pending"
                    ? "badge-warning"
                    : "badge-error"
                } text-xs text-white font-semibold`}
              >
                {tutor.status.toUpperCase()}
              </span>
            </div>

            {/* ⭐ Rating below status */}
            <div className="flex items-center gap-2">
              {renderRatingStars(avgRating)}

              <span className="text-sm font-semibold text-base-content">
                {avgRating > 0 ? avgRating.toFixed(1) : "New"}
              </span>

              {tutor.ratingCount > 0 && (
                <span className="text-xs text-neutral-content">
                  ({tutor.ratingCount})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <h2 className="font-semibold mb-2">Subjects :</h2>
            {tutor.subjects.map((sub, idx) => (
              <span
                key={idx}
                className="badge bg-secondary/10 text-secondary border-none text-xs md:text-sm"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        {tutor.bio && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Bio</h2>
            <p className="text-sm md:text-base text-base-content">
              {tutor.bio}
            </p>
          </div>
        )}

        {/* ID Card */}
        {tutor.idCardURL && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">ID Card -</h2>
            <img
              src={tutor.idCardURL}
              alt={`${tutor.name} ID`}
              className="w-64 h-auto rounded-md border border-base-300"
            />
          </div>
        )}

        {/* Contact Button */}
        <div className="flex justify-end mt-4">
          <GradientButton
            className="btn btn-primary"
            onClick={handleContactNow}
            disabled={contactLoading}
          >
            {contactLoading ? "Connecting..." : "Contact Now"}
          </GradientButton>
        </div>
      </div>
      <div className="pt-5 flex justify-end">
        <AccentGradientButton onClick={() => navigate(-1)}>
          Go Back
        </AccentGradientButton>
      </div>
    </div>
  );
};

export default TutorDetails;
