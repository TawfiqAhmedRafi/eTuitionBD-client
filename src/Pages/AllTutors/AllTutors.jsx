import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "../../Components/Pagination/Pagination";
import { Link } from "react-router";
import GradientButton from "../../Components/GradientButton/GradientButton";
import { FiCheckCircle } from "react-icons/fi";
import { format } from "date-fns";

const AllTutors = () => {
  const axiosSecure = useAxiosSecure();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
    //status : 'approved'
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

  if (isLoading) {
    return (
      <div className="p-10 text-center">
        <progress className="progress progress-primary w-full" />
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
    <div className="max-w-7xl mx-auto px-4 py-12">
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

      {/* Tutors Grid */}
      <div className="bg-base-200 rounded-3xl p-6 md:p-8 border border-base-300">
        {tutors.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg font-medium text-base-content">
              No tutors found
            </p>
          </div>
        ) : (
          <>
            {isFetching && (
              <progress className="progress progress-primary w-full mb-4" />
            )}

            <div
              className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity ${
                isFetching ? "opacity-60" : "opacity-100"
              }`}
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
                        Posted on {" "}
                       {format(new Date(tutor.submittedAt),"dd MMM, yy")}
                      </span>

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
