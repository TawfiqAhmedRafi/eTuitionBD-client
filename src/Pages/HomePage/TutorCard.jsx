import React from "react";

const TutorCard = ({ tutor }) => {
  const name = tutor?.name ?? "Tutor Name";
  const avatar = tutor?.avatar ?? "/assets/avatar-placeholder.png";
  const qualification = tutor?.qualifications ?? tutor?.qualification ?? "Qualification";
  const experience = tutor?.experience ?? tutor?.years ?? "N/A";
  const rating = tutor?.rating ?? tutor?.avgRating ?? null;

  return (
    <article className="card bg-base-100 p-5 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <img src={avatar} alt={`${name} avatar`} className="w-14 h-14 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{name}</h4>
            {rating !== null && <div className="text-sm font-semibold sora text-accent">{rating.toFixed ? rating.toFixed(1) : rating}</div>}
          </div>
          <p className="text-sm text-neutral-content mt-1">{qualification} · {experience} yrs</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <a className="link" href={`/tutors/${tutor._id}`}>View Profile</a>
        <a className="btn btn-sm btn-outline" href={`/message/${tutor._id}`}>Contact</a>
      </div>
    </article>
  );
};

export default TutorCard;
