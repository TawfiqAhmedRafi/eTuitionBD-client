import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "../../Components/Pagination/Pagination";
import { Link } from "react-router";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import AccentGradientButton from "../../Components/GradientButton/AccentGradientButton";

const MyTuitions = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [editingTuition, setEditingTuition] = useState(null);
  const [formData, setFormData] = useState({});
const [paying, setPaying] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myTuitions", page],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/my-tuitions", {
        params: { page, limit: 10 },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleDelete = async (tuitionId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "This tuition will be deleted permanently!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/tuitions/${tuitionId}`);
          if (res.status === 200) {
            queryClient.setQueryData(["myTuitions", page], (oldData) => {
              if (!oldData) return oldData;
              return {
                ...oldData,
                tuitions: oldData.tuitions.filter((t) => t._id !== tuitionId),
                total: oldData.total - 1,
              };
            });

            Swal.fire("Deleted!", "Tuition has been deleted.", "success");
          } else {
            Swal.fire("Error", "Failed to delete tuition.", "error");
          }
        }
      });
    } catch (err) {
      console.error("Delete failed:", err);
      Swal.fire("Error", "Failed to delete tuition.", "error");
    }
  };

  const handleCloseTuition = async (tuitionId) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This tuition will be permanently closed!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, close it!",
      });

      if (confirm.isConfirmed) {
        const res = await axiosSecure.patch(`/tuitions/${tuitionId}`, {
          status: "closed",
        });

        if (res.status === 200) {
          queryClient.setQueryData(["myTuitions", page], (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              tuitions: oldData.tuitions.map((t) =>
                t._id === tuitionId ? { ...t, status: "closed" } : t
              ),
            };
          });

          Swal.fire(
            "Closed!",
            "The tuition has been closed successfully.",
            "success"
          );
        } else {
          Swal.fire("Error", "Failed to close tuition.", "error");
        }
      }
    } catch (err) {
      console.error("Close tuition failed:", err);
      Swal.fire("Error", "Failed to close tuition.", "error");
    }
  };

  const handlePayNow = async (tuition) => {
     if (paying) return; 
  setPaying(true);
    try {
      const res = await axiosSecure.post("/payment-checkout-session", {
        tuitionId: tuition._id,
      });

      if (res.data?.url) {
        window.location.assign(res.data.url);
      }
    } catch (err) {
      console.error("Payment error:", err);
      Swal.fire("Error", "Failed to start payment", "error");
    }
  };

  const openEditModal = (tuition) => {
    setEditingTuition(tuition);
    setFormData({
      classLevel: tuition.classLevel,
      subjects: tuition.subjects.join(", "),
      days: tuition.days,
      time: tuition.time,
      duration: tuition.duration,
      minBudget: tuition.minBudget,
      maxBudget: tuition.maxBudget,
      mode: tuition.mode,
      description: tuition.description || "",
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ...formData,
        subjects: formData.subjects.split(",").map((s) => s.trim()),
      };

      const res = await axiosSecure.patch(
        `/tuitions/${editingTuition._id}`,
        updatedData
      );

      if (res.status === 200) {
        Swal.fire("Updated!", "Tuition has been updated.", "success");
        queryClient.invalidateQueries(["myTuitions", page]);
        setEditingTuition(null);
      }
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire("Error", "Failed to update tuition.", "error");
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
              <th className="py-3 px-2 md:px-4 text-left">Budget</th>
              <th className="py-3 px-2 md:px-4 text-left">Mode</th>
              <th className="py-3 px-2 md:px-4 text-left">Status</th>
              <th className="py-3 px-2 md:px-4 text-left">Payments / Close</th>
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
                  {(page - 1) * 10 + index + 1}
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
                  ৳{tuition.minBudget} - ৳{tuition.maxBudget}
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
                        : "badge-error"
                    }`}
                  >
                    {tuition.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-2 px-2 md:px-4">
                  {tuition.status === "assigned" && (
                    <button
                      onClick={() => handlePayNow(tuition)}
                      className="btn btn-xs md:btn-sm btn-success btn-outline hover:text-white"
                    >
                       {paying ? "Processing..." : "Pay Now"}
                    </button>
                  )}

                  {(tuition.status === "open" ||
                    tuition.status === "ongoing") && (
                    <button
                      onClick={() => handleCloseTuition(tuition._id)}
                      className="btn btn-sm md:btn-sm btn-warning btn-outline hover:text-white"
                    >
                      Close Tuition
                    </button>
                  )}
                </td>
                <td className="py-2 px-2 md:px-4 flex flex-col md:flex-row justify-center items-center gap-2">
                  <Link
                    to={`/tuitions/${tuition._id}`}
                    className="btn btn-xs md:btn-sm btn-primary btn-outline"
                  >
                    View
                  </Link>

                  {tuition.status === "open" && (
                    <button
                      onClick={() => openEditModal(tuition)}
                      className="btn btn-xs md:btn-sm btn-accent btn-outline"
                    >
                      <FiEdit className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  )}

                  {(tuition.status === "open" ||
                    tuition.status === "closed") && (
                    <button
                      onClick={() => handleDelete(tuition._id)}
                      className="btn btn-xs md:btn-sm btn-error btn-outline hover:text-white"
                    >
                      <FiTrash2 className="w-3 h-3 md:w-4 md:h-4" />
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

      {/* Edit Tuition Modal */}
      {editingTuition && (
        <>
          <input
            type="checkbox"
            id="edit-modal"
            className="modal-toggle"
            checked
            readOnly
          />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box relative">
              <label
                htmlFor="edit-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setEditingTuition(null)}
              >
                ✕
              </label>
              <h3 className="text-lg font-bold mb-4">Edit Tuition</h3>

              <div className="space-y-4">
                <label className="w-full">
                  <span className="label-text font-medium">Class Level</span>
                  <input
                    type="text"
                    placeholder="Class Level"
                    value={formData.classLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, classLevel: e.target.value })
                    }
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="w-full">
                  <span className="label-text font-medium">Subjects</span>
                  <input
                    type="text"
                    placeholder="Subjects (comma separated)"
                    value={formData.subjects}
                    onChange={(e) =>
                      setFormData({ ...formData, subjects: e.target.value })
                    }
                    className="input input-bordered w-full"
                  />
                </label>

                <div className="flex gap-2">
                  <label className="w-1/2">
                    <span className="label-text font-medium">Days/Week</span>
                    <input
                      type="number"
                      placeholder="Days"
                      value={formData.days}
                      onChange={(e) =>
                        setFormData({ ...formData, days: e.target.value })
                      }
                      className="input input-bordered w-full"
                    />
                  </label>

                  <label className="w-1/2">
                    <span className="label-text font-medium">Time</span>
                    <select
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="select select-bordered w-full"
                    >
                      <option value="">Select Time</option>
                      <option value="any">Any</option>
                      <option value="morning">Morning</option>
                      <option value="noon">Noon</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                    </select>
                  </label>
                </div>

                <div className="flex gap-2">
                  <label className="w-1/2">
                    <span className="label-text font-medium">Min Budget</span>
                    <input
                      type="number"
                      placeholder="Min Budget"
                      value={formData.minBudget}
                      onChange={(e) =>
                        setFormData({ ...formData, minBudget: e.target.value })
                      }
                      className="input input-bordered w-full"
                    />
                  </label>

                  <label className="w-1/2">
                    <span className="label-text font-medium">Max Budget</span>
                    <input
                      type="number"
                      placeholder="Max Budget"
                      value={formData.maxBudget}
                      onChange={(e) =>
                        setFormData({ ...formData, maxBudget: e.target.value })
                      }
                      className="input input-bordered w-full"
                    />
                  </label>
                </div>

                <label className="w-full">
                  <span className="label-text font-medium">Mode</span>
                  <select
                    value={formData.mode}
                    onChange={(e) =>
                      setFormData({ ...formData, mode: e.target.value })
                    }
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Mode</option>
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </label>

                <label className="w-full ">
                  <span className="label-text font-medium">Description</span>
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="textarea textarea-bordered w-full"
                  />
                </label>

                <AccentGradientButton
                  className="btn btn-primary w-full mt-2"
                  onClick={handleUpdate}
                >
                  Update Tuition
                </AccentGradientButton>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyTuitions;
