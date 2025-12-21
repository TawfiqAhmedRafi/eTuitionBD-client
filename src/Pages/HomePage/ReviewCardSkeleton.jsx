const ReviewCardSkeleton = () => {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-md h-64 flex flex-col justify-between animate-pulse">
      
    
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-base-300" />
        <div className="h-4 w-32 bg-base-300 rounded" />
      </div>

      <div className="border-t border-base-300 my-2" />

      <div className="flex items-start gap-3 flex-1">
        <div className="w-10 h-10 rounded-full bg-base-300 mt-1" />

        <div className="flex-1 flex flex-col justify-between h-full">
         
          <div className="space-y-2">
            <div className="h-3 bg-base-300 rounded w-full" />
            <div className="h-3 bg-base-300 rounded w-11/12" />
            <div className="h-3 bg-base-300 rounded w-10/12" />
            <div className="h-3 bg-base-300 rounded w-8/12" />
          </div>

          
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded bg-base-300"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCardSkeleton;
