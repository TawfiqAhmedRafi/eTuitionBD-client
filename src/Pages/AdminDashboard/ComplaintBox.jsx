import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "../../Components/Pagination/Pagination";
import { format } from "date-fns";
import Swal from "sweetalert2";

const ComplaintBox = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(""); // State for filtering: "" (All), "pending", or "resolved"
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const limit = 10;

  // Fetch complaints - Added 'status' to the queryKey dependency array
  const { data, isLoading, isError } = useQuery({
    queryKey: ["complaints", page, status],
    queryFn: async () => {
      const res = await axiosSecure.get("/complaints", {
        params: { page, limit, status }, // Passing status to the backend
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  // Handle filter change
  const handleFilterChange = (e) => {
    setStatus(e.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const resolveMutation = useMutation({
    mutationFn: async (complaintId) => {
      const res = await axiosSecure.patch(`/complaints/${complaintId}/resolve`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Resolved!",
        text: "The complaint has been marked as resolved.",
        confirmButtonColor: "#3085d6",
      });
      setSelectedComplaint(null);
      queryClient.invalidateQueries(["complaints", page, status]);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error?.response?.data?.message || "Could not resolve complaint.",
        confirmButtonColor: "#d33",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (complaintId) => {
      const res = await axiosSecure.delete(`/complaints/${complaintId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The complaint has been deleted.",
        confirmButtonColor: "#3085d6",
      });
      queryClient.invalidateQueries(["complaints", page, status]);
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (isError)
    return <div className="p-10 text-center text-error">Failed to load complaints</div>;

  const { complaints = [], totalPages = 1 } = data;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* HEADER & FILTER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary">
          User Complaints
        </h2>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-neutral">Filter:</span>
          <select
            className="select select-bordered w-full max-w-xs bg-white/80 backdrop-blur focus:ring-2 focus:ring-primary/50"
            value={status}
            onChange={handleFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {complaints.length === 0 ? (
        <div className="text-center text-gray-400 py-24 bg-white/50 rounded-2xl border-2 border-dashed border-gray-200">
          No {status} complaints found.
        </div>
      ) : (
        <div className="space-y-6">
          {complaints.map((c) => (
            <div
              key={c._id}
              className="bg-white/80 backdrop-blur rounded-2xl shadow-sm transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] p-6"
            >
              <div className="flex flex-col md:flex-row gap-5">
                {/* LEFT: User Photo */}
                <div className="flex items-center md:flex-col gap-4 md:gap-3 md:w-32 shrink-0">
                  <img
                    src={c.photo || "/avatar.png"}
                    alt={c.email}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/30"
                  />
                </div>

                {/* RIGHT: Complaint Details */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div>
                      <h4 className="text-lg font-semibold">{c.name}</h4>
                      <p className="text-xs text-gray-400">
                        {format(new Date(c.createdAt), "MMM dd, yyyy HH:mm")}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                        c.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : c.status === "resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {c.status || "pending"}
                    </div>
                  </div>

                  {/* Message Preview */}
                  <div
                    className="mt-4 pl-4 border-l-4 border-primary/30 text-gray-700 leading-relaxed italic line-clamp-1 cursor-pointer"
                    onClick={() => setSelectedComplaint(c)}
                  >
                    {c.message}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-4 rounded-lg text-sm transition-colors"
                      onClick={() => handleDelete(c._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {complaints.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* MODAL */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setSelectedComplaint(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-4 text-center">
              <img
                src={selectedComplaint.photo || "/avatar.png"}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/10"
                alt="user"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedComplaint.name}</h3>
                <p className="text-sm text-primary font-medium">{selectedComplaint.email}</p>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 rounded-xl p-4 text-gray-700 border border-gray-100">
              <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Complaint Message</h4>
              <p className="whitespace-pre-wrap">{selectedComplaint.message}</p>
            </div>

            {selectedComplaint.status !== "resolved" && (
              <div className="mt-8 flex justify-end">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95"
                  onClick={() => resolveMutation.mutate(selectedComplaint._id)}
                  disabled={resolveMutation.isLoading}
                >
                  {resolveMutation.isLoading ? "Processing..." : "Mark as Resolved"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintBox;