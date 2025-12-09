// TuitionCard.jsx - single tuition card
import React from "react";

const TuitionCard = ({ tuition }) => {
  // Defensive defaults in case backend field names differ
  const subject = tuition?.subject ?? "Subject";
  const className = tuition?.class ?? tuition?.grade ?? "Class";
  const location = tuition?.location ?? "Location";
  const budget = tuition?.budget ?? tuition?.fee ?? "—";
  const description = tuition?.shortDescription ?? tuition?.description ?? "";

  return (
    <article className="card bg-base-200 shadow-md p-5 rounded-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold outfit">{subject}</h3>
          <span className="badge badge-outline">{className}</span>
        </div>

        <p className="text-sm text-neutral-content mt-2 line-clamp-3">{description}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-neutral-content">{location}</div>
          <div className="mt-1 font-medium sora text-accent">৳{budget}</div>
        </div>

        <div className="flex items-center gap-2">
          <a className="btn btn-sm btn-primary" href={`/tuitions/${tuition._id}`}>View</a>
        </div>
      </div>
    </article>
  );
};

export default TuitionCard;
