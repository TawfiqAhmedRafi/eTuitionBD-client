import React from "react";

const SkeletonCard = ({ type = "generic" }) => {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md animate-pulse">
      {type === "review" && (
        <>
          {/* Tutor info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-300" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
          <hr className="border-gray-300 my-3" />
          {/* Student review */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 mt-1" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              {/* Rating */}
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-300 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {type === "tutor" && (
        <>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-300" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
          <div className="mt-4 h-3 bg-gray-300 rounded w-3/4"></div>
          <div className="mt-2 h-3 bg-gray-300 rounded w-1/2"></div>
        </>
      )}

      {type === "tuition" && (
        <>
          <div className="h-32 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </>
      )}
    </div>
  );
};

export const SectionSkeleton = ({ type = "generic", count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(count)].map((_, idx) => (
        <SkeletonCard key={idx} type={type} />
      ))}
    </div>
  );
};
