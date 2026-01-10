const TutorCardSkeleton = () => {
  return (
    <div className="card bg-base-100 border border-base-300/60 animate-pulse">
      <div className="card-body p-4">
        {/* Avatar & Name */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-12 h-12 rounded-full bg-base-300" />
          <div className="space-y-1">
            <div className="h-4 w-32 bg-base-300 rounded" />
            <div className="h-3 w-20 bg-base-200 rounded" />
          </div>
        </div>

        {/* Qualification */}
        <div className="h-3 w-48 bg-base-200 rounded mb-2" />

        {/* Experience */}
        <div className="h-3 w-36 bg-base-200 rounded mb-2" />

        {/* Subjects */}
        <div className="flex gap-1 mb-3">
          <div className="h-5 w-12 bg-base-300 rounded-full" />
          <div className="h-5 w-16 bg-base-300 rounded-full" />
          <div className="h-5 w-10 bg-base-300 rounded-full" />
        </div>

        {/* Salary / Mode / Status */}
        <div className="space-y-1 mb-3">
          <div className="h-3 w-32 bg-base-200 rounded" />
          <div className="h-3 w-24 bg-base-200 rounded" />
          <div className="h-4 w-20 bg-base-300 rounded-full" />
        </div>

        <div className="divider my-2" />

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="h-3 w-28 bg-base-200 rounded" />
          <div className="h-8 w-24 bg-base-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default TutorCardSkeleton;
