import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "../../Components/Pagination/Pagination";
import { Link } from "react-router";
import Swal from "sweetalert2";

const TutorTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  
  const limit = 10;
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["tutor-tuitions", page],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/tutor-tuitions", {
        params: { page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });
  const handleCloseTuition = async (tuitionId) => {
    try {
      const res = await axiosSecure.patch(`/tuitions/tutor/${tuitionId}`);

      if (res.data?.success) {
        Swal.fire("Success", "Tuition closed successfully", "success");
        refetch();
      }
    } catch (err) {
      console.error("Close tuition error:", err);

      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to close tuition",
        "error"
      );
    }
  };

   

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars text-primary loading-xl"></span>
      </div>
    );

  if (isError)
    return (
      <div className="p-10 text-center text-error">
        Failed to load your tuitions
      </div>
    );

  const { tuitions, totalPages } = data;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-6">
        All my posted tuitions
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-primary/30 text-primary-content">
            <tr>
              <th className="py-3 px-2 md:px-4">#</th>
              <th className="py-3 px-2 md:px-4 text-left">Subjects</th>
              <th className="py-3 px-2 md:px-4 text-left">Salary</th>
              <th className="py-3 px-2 md:px-4 text-left">Mode</th>
              <th className="py-3 px-2 md:px-4 text-left">Status</th>
              <th className="py-3 px-2 md:px-4 text-left">Complete</th>
              <th className="py-3 px-2 md:px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tuitions.map((tuition, index) => (
              <tr
                key={tuition._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <th className="py-2 px-2 md:px-4">
                  {(page - 1) * limit + index + 1}
                </th>
                <td className="py-2 px-2 md:px-4 font-medium">
                  <div className="flex flex-wrap gap-1">
                    {tuition.subjects.map((sub, idx) => (
                      <span
                        key={idx}
                        className="badge bg-primary/10 text-primary border-none text-[10px] md:text-xs shrink-0"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="py-2 px-2 md:px-4 font-mono">
                  ৳ {tuition.salary}
                </td>

                <td className="py-2 px-2 md:px-4">
                  <span
                    className={`badge ${
                      tuition.mode === "Offline"
                        ? "badge-secondary"
                        : "badge-primary"
                    } text-[10px] md:text-xs`}
                  >
                    {tuition.mode}
                  </span>
                </td>
                <td className="py-2 px-2 md:px-4">
                  <span
                    className={`badge text-white font-semibold text-[10px] md:text-xs ${
                      tuition.status === "open"
                        ? "badge-success"
                        : tuition.status === "assigned"
                        ? "badge-warning"
                        : tuition.status === "ongoing"
                        ? "badge-accent"
                        : tuition.status === "completed"
                        ? "badge-info"
                        : "badge-error"
                    }`}
                  >
                    {tuition.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-2 px-2 md:px-4">
                  {tuition.status === "assigned" ? (
                    <>
                      <Link to={"/dashboard/applications/tutor"}  className="btn btn-sm md:btn-sm btn-primary btn-outline hover:text-white">
                        Contact Now
                      </Link>
                    </>
                  ) : tuition.status ==="closed" ||  tuition.status ==="completed" ? <>
                 --
                  </>:<>
                  {" "}
                      <button
                        onClick={() => handleCloseTuition(tuition._id)}
                        className="btn btn-sm md:btn-sm btn-success btn-outline hover:text-white"
                      >
                        Complete Tuition
                      </button></>
                  }
                </td>
                <td className="py-2 px-2 md:px-4 flex flex-col md:flex-row justify-center items-center gap-2">
                  <Link
                    to={`/tuitions/${tuition._id}`}
                    className="btn btn-xs md:btn-sm btn-primary btn-outline"
                  >
                    View
                  </Link>

                  {tuition.status === "open" && (
                    <button className="btn btn-xs md:btn-sm btn-accent btn-outline">
                      <FiEdit className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default TutorTuitions;
