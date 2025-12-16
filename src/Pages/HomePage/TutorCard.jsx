import React from "react";
import { Link } from "react-router";
import GradientButton from "../../Components/GradientButton/GradientButton";

const TutorCard = ({ tutor }) => {
  const name = tutor?.name ?? "Tutor Name";
  const avatar = tutor.photoURL;
  const qualification =
    tutor?.qualifications ?? tutor?.qualification ?? "Qualification";
  const institution = tutor?.institution ?? "Institution";
  const experienceYears = tutor?.experienceYears;
  const experienceMonths = tutor?.experienceMonths;
  const experience =
    experienceYears || experienceMonths
      ? `${experienceYears || 0} yr${experienceYears === 1 ? "" : "s"} ${
          experienceMonths || 0
        } mo${experienceMonths === 1 ? "" : "s"}`
      : "N/A";
  const salary = tutor?.salary ? `৳${tutor.salary}` : "N/A";
  const rating = tutor?.rating ?? tutor?.avgRating ?? null;

  return (
    <article className="card bg-base-100 p-5 rounded-lg shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="flex  gap-4">
        <img
          src={avatar}
          alt={`${name} avatar`}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-base-content">{name}</h4>
            {rating !== null && (
              <div className="text-sm font-semibold sora text-accent">
                {rating.toFixed ? rating.toFixed(1) : rating}
              </div>
            )}
          </div>
          <p className="text-sm text-primary font-bold mt-1">
            {qualification}
            <span className="badge ml-4 badge-secondary text-xs ">
              {institution}
            </span>{" "}
          </p>
          <p className="text-sm text-neutral-content mt-1">
            <span className="  text-xs ">
              Expected:{" "}
              <span className="text-accent font-semibold"> {salary}</span>
            </span>
          </p>
          <p className="text-sm text-neutral-content mt-2">
            <span className="font-medium">Experience:</span> {experience}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Link to={`/tutors/${tutor._id}`}>
          <GradientButton  className="btn btn-sm btn-outline transition-colors hover:bg-primary hover:text-white">View</GradientButton>
        </Link>
      </div>
    </article>
  );
};

export default TutorCard;
