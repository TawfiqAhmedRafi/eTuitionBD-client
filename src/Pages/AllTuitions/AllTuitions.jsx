import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "../../Components/Pagination/Pagination";
import { Link } from "react-router";
import GradientButton from "../../Components/GradientButton/GradientButton";

const AllTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const [subjectInput, setSubjectInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
    subject: "",
    location: "",
    sortBy: "date",
    order: "desc",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        subject: subjectInput.trim(),
        location: locationInput.trim(),
        page: 1,
      }));
      setSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [subjectInput, locationInput]);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["tuitions", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions", {
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
      <div className="p-10 text-center text-error">Failed to load tuitions</div>
    );
  }

  const { tuitions, totalPages } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* ---------------- Page Header ---------------- */}
      <div className="mb-10">
        <h1
          className="text-3xl font-bold 
              bg-linear-to-r 
                from-[#0043c1] via-[#11c4dc] to-[#0297f3]
              dark:from-[#0e2246] dark:via-[#11c4dc] dark:to-[#0297f3]
              bg-clip-text 
              text-transparent"
        >
          Available Tuitions
        </h1>
        <p className="text-neutral-content mt-1 max-w-xl">
          Discover verified tuition opportunities tailored to your expertise
        </p>
      </div>

      {/* ---------------- Search & Sort ---------------- */}
      <div className="bg-base-200/80 backdrop-blur-md p-6 rounded-2xl mb-10 shadow-sm border border-base-300">
        <div className="grid md:grid-cols-4 gap-4">
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

          <input
            type="text"
            placeholder="Search by location"
            value={locationInput}
            onChange={(e) => {
              setLocationInput(e.target.value);
              setSearching(true);
            }}
            className="input input-bordered w-full"
          />

          <select
            className="select select-bordered w-full"
            value={`${filters.sortBy}-${filters.order}`}
            onChange={(e) => {
              const [sortBy, order] = e.target.value.split("-");
              setFilters((prev) => ({
                ...prev,
                sortBy,
                order,
                page: 1,
              }));
            }}
          >
            <option value="date-desc">Latest</option>
            <option value="date-asc">Oldest</option>
            <option value="budget-asc">Budget(Average): Low → High</option>
            <option value="budget-desc">Budget(Average): High → Low</option>
          </select>
        </div>

        {(searching || isFetching) && (
          <progress className="progress progress-primary w-full mt-4" />
        )}
      </div>

      {/* ---------------- Results Container ---------------- */}
      <div className="bg-base-200 rounded-3xl p-6 md:p-8 border border-base-300">
        {tuitions.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg font-medium text-base-content">
              No tuitions found
            </p>
            <p className="text-neutral-content mt-1">
              Try adjusting your filters or search keywords
            </p>
          </div>
        ) : (
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity ${
              isFetching ? "opacity-60" : "opacity-100"
            }`}
          >
            {tuitions.map((tuition) => (
              <div
                key={tuition._id}
                className="card bg-base-100 border border-base-300/60
                  hover:-translate-y-1 hover:shadow-lg
                  transition-all duration-300"
              >
                <div className="card-body p-5">
                  {/* Class Level */}
                  <h2 className="text-lg font-semibold text-base-content mb-2">
                    {tuition.classLevel} Student
                  </h2>

                  {/* Subjects */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tuition.subjects.map((sub, index) => (
                      <span
                        key={index}
                        className="badge bg-secondary/10 text-secondary border-none text-xs"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>

                  {/* Location */}
                  <p className="text-sm text-neutral-content flex items-center gap-1">
                    <span>📍</span>
                    {tuition.location}, {tuition.district}
                  </p>

                  {/* Details */}
                  <div className="text-sm mt-3 space-y-1 text-base-content">
                    <p>
                      <span className="font-medium">Mode:</span> {tuition.mode}
                    </p>
                    <p>
                      <span className="font-medium">Schedule:</span>{" "}
                      {tuition.days} days /{" "}
                      <span className="text-accent">{tuition.time}</span>
                    </p>
                    <p className="font-semibold text-primary text-base mt-2">
                      ৳{tuition.minBudget} – ৳{tuition.maxBudget}
                    </p>
                  </div>

                  <div className="divider my-3" />

                  
                  <div className="card-actions justify-between items-center">
                    <span className="text-xs text-neutral-content">
                      Posted {new Date(tuition.postedAt).toLocaleDateString()}
                    </span>

                    <Link to={`/tuitions/${tuition._id}`}>
                      <GradientButton className="btn btn-sm ">
                        View Details
                      </GradientButton>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- Pagination ---------------- */}
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

export default AllTuitions;
