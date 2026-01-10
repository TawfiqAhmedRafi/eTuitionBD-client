import TuitionCardSkeleton from "./TuitionCardSkeleton";

const TuitionsSkeletonGrid = ({ count = 12 }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-3 xl:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <TuitionCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default TuitionsSkeletonGrid;
