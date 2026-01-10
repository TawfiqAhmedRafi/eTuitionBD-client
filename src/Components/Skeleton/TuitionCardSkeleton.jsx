const TuitionCardSkeleton = () => {
  return (
    <div className="card bg-base-100 border border-base-300/60 animate-pulse">
      <div className="card-body p-5">
        {/* Title */}
        <div className="h-5 w-40 bg-base-300 rounded mb-3" />

        {/* Subjects */}
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-14 bg-base-200 rounded-full" />
          <div className="h-5 w-18 bg-base-200 rounded-full" />
          <div className="h-5 w-12 bg-base-200 rounded-full" />
        </div>

        {/* Location */}
        <div className="h-4 w-48 bg-base-200 rounded mb-3" />

        {/* Details */}
        <div className="space-y-2 mb-3">
          <div className="h-4 w-28 bg-base-200 rounded" />
          <div className="h-4 w-36 bg-base-200 rounded" />
        </div>

        {/* Budget */}
        <div className="h-5 w-32 bg-base-300 rounded mb-4" />

        <div className="divider my-3" />

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="h-3 w-28 bg-base-200 rounded" />
          <div className="h-8 w-24 bg-base-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default TuitionCardSkeleton;
