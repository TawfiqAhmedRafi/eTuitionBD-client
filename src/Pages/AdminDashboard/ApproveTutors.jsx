import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { FiTrash2, FiEye } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "../../Components/Pagination/Pagination";
import { FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ApproveTutors = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    status: "",
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["tutors", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors", { params: filters });
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/tutors/${id}`, { status });

      if (res.data.success) {
        queryClient.invalidateQueries(["tutors"]);
        Swal.fire("Updated!", `Tutor ${status}.`, "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update tutor", "error");
    }
  };

  const handleDeleteTutor = async (id) => {
    const result = await Swal.fire({
      title: "Delete tutor?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/tutors/${id}`);

      if (res.data.success) {
        queryClient.invalidateQueries(["tutors"]);
        Swal.fire("Deleted!", "Tutor removed.", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete tutor", "error");
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars text-primary loading-xl"></span>
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* ---------- Header ---------- */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary">Approve Tutors</h1>
        <p className="text-neutral-content mt-1">
          Review, approve or reject tutor registrations
        </p>
      </div>

      {/* ---------- Filters ---------- */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <select
          className="select select-bordered w-44"
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              status: e.target.value,
              page: 1,
            }))
          }
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        {isFetching && (
          <span className="loading loading-dots loading-sm text-primary"></span>
        )}
      </div>

      {/* ---------- Table ---------- */}
      <div className="overflow-x-auto bg-base-200 rounded-2xl border border-base-300">
        <table className="table table-zebra w-full min-w-[900px]">
          <thead className="bg-primary/40 text-primary-content">
            <tr>
              <th>#</th>
              <th>Tutor</th>
              <th className="hidden md:table-cell">Qualification</th>
              <th className="hidden md:table-cell">Institution</th>
              <th>Area</th>
              <th>Status</th>
              <th className="text-center">Approve / Reject</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tutors.map((tutor, index) => (
              <tr
                key={tutor._id}
                className="transition-colors duration-200 hover:bg-base-300/40"
              >
                <td className="font-bold ml-2">{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <img
                      src={tutor.photoURL}
                      className="w-9 h-9 rounded-full"
                    />
                    <span className="font-medium">{tutor.name}</span>
                  </div>
                </td>

                <td className="hidden md:table-cell">{tutor.qualification}</td>

                <td className="hidden md:table-cell">
                  <span className="badge  badge-secondary text-xs ">
                    {tutor.institution}
                  </span>
                </td>

                <td>{tutor.district}</td>

                <td>
                  <span
                    className={`badge badge-sm font-bold capitalize text-white ${
                      tutor.status === "approved"
                        ? "badge-success"
                        : tutor.status === "pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {tutor.status}
                  </span>
                </td>

                <td className="text-center whitespace-nowrap">
                  {tutor.status === "pending" ? (
                    <div className="flex justify-center gap-2">
                      <button
                        className="btn btn-xs btn-success btn-outline hover:text-white"
                        onClick={() =>
                          handleStatusUpdate(tutor._id, "approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-xs btn-error btn-outline hover:text-white"
                        onClick={() =>
                          handleStatusUpdate(tutor._id, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  ) : tutor.status === "approved" ? (
                    <button
                      className="btn btn-xs btn-error btn-outline hover:text-white"
                      onClick={() => handleStatusUpdate(tutor._id, "rejected")}
                    >
                      Reject
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-success btn-outline hover:text-white"
                      onClick={() => handleStatusUpdate(tutor._id, "approved")}
                    >
                      Approve
                    </button>
                  )}
                </td>

                <td className="text-center whitespace-nowrap">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleDeleteTutor(tutor._id)}
                      className="btn btn-xs btn-error btn-outline hover:text-white"
                    >
                      <FaTrash></FaTrash>
                    </button>
                    <Link to={`/tutors/${tutor._id}`}>
                      <button className="btn btn-xs btn-primary btn-outline hover:text-white">
                        <FaEye></FaEye>
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Pagination ---------- */}
      <div className="mt-6">
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      </div>
    </div>
  );
};

export default ApproveTutors;
