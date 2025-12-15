import React from "react";
import useTimeAgo from "../../hooks/useTimeAgo";
import { Link } from "react-router";

const TuitionCard = ({ tuition }) => {
  const postedText = useTimeAgo(tuition?.postedAt);
  if (!tuition) return null;

  const {
    _id,
    subjects = [],
    classLevel = "N/A",
    district = "",
    location = "",
    minBudget,
    maxBudget,

    mode,
  } = tuition;

  const subjectText =
    subjects.length > 0 ? subjects.join(", ") : "Subject not specified";

  const budgetText =
    minBudget && maxBudget
      ? `৳${minBudget} – ৳${maxBudget}`
      : minBudget
      ? `৳${minBudget}+`
      : "Negotiable";

  return (
    <Link className="card bg-base-100 shadow-md p-5 rounded-lg flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold outfit line-clamp-1">
            {subjectText}
          </h3>

          <span className="badge badge-secondary whitespace-nowrap">
            {classLevel}
          </span>
        </div>

        {postedText && (
          <div className="text-xs text-neutral-content mt-1">
            Posted {postedText}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-neutral-content">
            {district}
            {location ? `, ${location}` : ""}
          </div>

          <div className="mt-1 font-medium sora text-accent">{budgetText}</div>

          {mode && (
            <div className="mt-1 text-xs text-neutral-content">
              Mode: {mode}
            </div>
          )}
        </div>

        <Link className="btn btn-sm btn-primary" to={`/tuitions/${_id}`}>
          View
        </Link>
      </div>
    </Link>
  );
};

export default TuitionCard;
