import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400 w-4 h-4" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 w-4 h-4" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 w-4 h-4" />);
      }
    }
    return <div className="flex gap-1 mt-1">{stars}</div>;
  };

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300 h-64 flex flex-col justify-between">
      
      {/* Tutor info in a row */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={review.tutorPhoto || "/avatar.png"}
          alt={review.tutorName}
          className="w-12 h-12 rounded-full object-cover border border-base-300"
        />
        <h3 className="text-sm md:text-base font-semibold text-secondary">
          {review.tutorName}
        </h3>
      </div>

      <hr className="border-gray-300 my-2" />

      {/* Review & student info */}
      <div className="flex items-start gap-3">
        <img
          src={review.studentPhoto || "/avatar.png"}
          alt={review.studentName}
          className="w-10 h-10 rounded-full object-cover border border-base-300 mt-1"
        />
        <div className="flex-1 flex flex-col justify-between h-full">
          <p className="italic text-gray-700 line-clamp-4">
            "{review.review}"
          </p>
          {renderStars(review.rating)}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
