import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "../../Components/Pagination/Pagination";
import { Link } from "react-router";
import GradientButton from "../../Components/GradientButton/GradientButton";
import { FiCheckCircle } from "react-icons/fi";
import { format } from "date-fns";
import TutorsSkeletonGrid from "../../Components/Skeleton/TutorsSkeletonGrid";

const AllTutors = () => {
  const axiosSecure = useAxiosSecure();
  const [subjectInput, setSubjectInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [searching, setSearching] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    status: "approved",
    subject: "",
    location: "",
  });

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["tutors", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors", {
        params: filters,
      });
      return res.data;
    },
    keepPreviousData: true,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        subject: subjectInput.trim(),
        district: locationInput.trim(),
        page: 1,
      }));
      setSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [subjectInput, locationInput]);

  if (isLoading) {
    return (
      <div className="px-4 py-12">
        {/* Page Header Skeleton */}
        <div className="mb-10 space-y-2">
          <div className="h-8 w-56 bg-base-300 rounded animate-pulse" />
          <div className="h-4 w-72 bg-base-200 rounded animate-pulse" />
        </div>

        {/* Filter Skeleton */}
        <div className="bg-base-200/80 p-6 rounded-2xl mb-10 border border-base-300">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-12 bg-base-300 rounded animate-pulse" />
            <div className="h-12 bg-base-300 rounded animate-pulse" />
          </div>
        </div>

        {/* Tutors Skeleton Grid */}
        <div className="bg-base-200 rounded-3xl p-6 md:p-8 border border-base-300">
          <TutorsSkeletonGrid count={12} />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-center text-error">Failed to load tutors</div>
    );
  }

  const { tutors, totalPages } = data;

  return (
    <div className=" px-4 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <h1
          className="text-3xl font-bold 
            bg-linear-to-r 
            from-[#0043c1] via-[#11c4dc] to-[#0297f3]
            dark:from-[#0e2246] dark:via-[#11c4dc] dark:to-[#0297f3]
            bg-clip-text 
            text-transparent"
        >
          Available Tutors
        </h1>
        <p className="text-neutral-content mt-1 max-w-xl">
          Discover available tutors with verified profiles
        </p>
      </div>
      <div className="bg-base-200/80 backdrop-blur-md p-6 rounded-2xl mb-10 shadow-sm border border-base-300">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Subject */}
          <input
            type="text"
            placeholder="Search by subject"
            value={subjectInput}
            onChange={(e) => {
              setSubjectInput(e.target.value);
              setSearching(true);
            }}
            className="input input-bordered w-full"
          />

          {/* Location */}
          <input
            type="text"
            placeholder="Search by district"
            value={locationInput}
            onChange={(e) => {
              setLocationInput(e.target.value);
              setSearching(true);
            }}
            className="input input-bordered w-full"
          />
        </div>

        {(searching || isFetching) && (
          <progress className="progress progress-primary w-full mt-4" />
        )}
      </div>
      {/* Tutors Grid */}
      <div className="relative bg-base-200 rounded-3xl p-6 md:p-8 border border-base-300">
        {tutors.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg font-medium text-base-content">
              No tutors found
            </p>
          </div>
        ) : (
          <>
            {isFetching && (
              <div className="absolute inset-0 z-10 bg-base-200/70 backdrop-blur-sm rounded-3xl p-6 md:p-8">
                <TutorsSkeletonGrid count={filters.limit} />
              </div>
            )}

            <div
              className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-3 xl:gap-6 transition-opacity `}
            >
              {tutors.map((tutor) => (
                <div
                  key={tutor._id}
                  className="card bg-base-100 border border-base-300/60
                    hover:-translate-y-1 hover:shadow-lg
                    transition-all duration-300"
                >
                  <div className="card-body p-4">
                    {/* Photo & Name */}
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src={tutor.photoURL}
                        alt={tutor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex items-center gap-1">
                        <h2 className="text-lg font-semibold text-base-content">
                          {tutor.name}
                        </h2>
                        {tutor.status === "approved" && (
                          <FiCheckCircle
                            className="text-primary w-5 h-5"
                            title="Verified"
                          />
                        )}
                      </div>
                    </div>

                    {/* Qualification & Institution */}
                    <p className="text-sm text-neutral-content mb-1 flex items-center gap-1">
                      {tutor.qualification} at{" "}
                      <span className="badge  badge-secondary text-xs ">
                        {tutor.institution}
                      </span>{" "}
                    </p>

                    {/* Experience */}
                    <p className="text-sm text-neutral-content mb-1">
                      {tutor.experienceYears} yrs {tutor.experienceMonths} mos
                      of experience
                    </p>

                    {/* Subjects */}
                    <div className="flex flex-wrap gap-1 mb-1">
                      {tutor.subjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className="badge bg-secondary/10 text-secondary border-none text-xs"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>

                    {/* Salary & Mode & Status */}
                    <div className="text-sm mt-1 text-base-content space-y-0.5">
                      <p className="font-semibold text-primary">
                        <span className="font-semibold text-neutral-content">
                          Expected Salary :
                        </span>{" "}
                        ৳{tutor.salary}
                      </p>
                      <p>
                        <span className="font-medium">Mode:</span> {tutor.mode}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span
                          className={`badge ${
                            tutor.status === "approved"
                              ? "badge-success"
                              : tutor.status === "pending"
                              ? "badge-warning"
                              : "badge-error"
                          } text-xs text-white  font-semibold`}
                        >
                          {tutor.status.toUpperCase()}
                        </span>
                      </p>
                    </div>

                    <div className="divider my-2" />

                    {/* Actions */}
                    <div className="card-actions justify-between items-center">
                      <span className="text-xs text-neutral-content">
                        Tutor Joined on{" "}
                        {format(new Date(tutor.submittedAt), "dd MMM, yy")}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <Link to={`/tutors/${tutor._id}`}>
                        <GradientButton className="btn btn-sm">
                          View Details
                        </GradientButton>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-10">
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      </div>
    </div>
  );
};

export default AllTutors;
