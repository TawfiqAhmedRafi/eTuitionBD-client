import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "../../Components/Pagination/Pagination";
import { FaStar } from "react-icons/fa";
import { format } from "date-fns";

const TutorReviewsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tutorReviews", page],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutor-reviews", {
        params: { page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <div className="p-10 text-center text-error">Failed to load reviews</div>
    );

  const { reviews = [], totalPages = 1 } = data;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8">
        What Students Say
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center text-gray-400 py-24">No reviews yet.</div>
      ) : (
        <div className="space-y-6">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="
                bg-white/80 backdrop-blur rounded-2xl
                shadow-sm
                transition-all duration-300 ease-out
                hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]
                p-6
                "
            >
              <div className="flex flex-col md:flex-row gap-5">
                {/* LEFT */}
                <div className="flex items-center md:flex-col gap-4 md:gap-3 md:w-32 shrink-0">
                  <img
                    src={rev.studentPhoto || "/avatar.png"}
                    alt={rev.studentName}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/30"
                  />

                  <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    <FaStar className="text-yellow-400" />
                    {rev.rating}.0
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div>
                      <h4 className="text-lg font-semibold">
                        {rev.studentName || "Student"}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {format(new Date(rev.postedAt), "MMM dd, yyyy")}
                      </p>
                    </div>

                    {/* Subjects */}
                    {rev.subjects?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {rev.subjects.map((sub, idx) => (
                          <span
                            key={idx}
                            className="badge badge-sm bg-secondary/10 text-secondary border-none"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Review */}
                  <div className="mt-4 pl-4 border-l-4 border-primary/30 text-gray-700 leading-relaxed italic">
                    “{rev.review || "-"}”
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {reviews.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default TutorReviewsPage;
