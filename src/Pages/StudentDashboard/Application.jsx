import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Pagination from "../../Components/Pagination/Pagination";
import GradientButton from "../../Components/GradientButton/GradientButton";

const Application = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["student-applications", statusFilter, page],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/my-applications", {
        params: { page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const applications = data?.applications || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const filteredApplications =
    statusFilter === "all"
      ? applications
      : applications.filter((app) => app.status === statusFilter);

  const updateApplicationStatus = async (appId, status) => {
    const confirm = await Swal.fire({
      title:
        status === "accepted"
          ? "Accept this tutor?"
          : "Reject this application?",
      text:
        status === "accepted"
          ? "This will assign the tuition and reject all other applications."
          : "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: status === "accepted" ? "Yes, Accept" : "Yes, Reject",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/applications/${appId}`, { status });

      Swal.fire("Success", `Application ${status} successfully`, "success");

      queryClient.invalidateQueries([
        "student-applications",
        statusFilter,
        page,
      ]);
    } catch (err) {
      console.error("Update application error:", err);
      Swal.fire("Error", "Failed to update application", "error");
    }
  };
  const handleContactTutor = async (tutorId) => {
    try {
      const res = await axiosSecure.post("/conversations", { tutorId });
      const conversationId = res.data._id;

      // Navigate to the conversation page
      navigate(`/dashboard/messages/${conversationId}`);
    } catch (err) {
      console.error("Contact tutor error:", err);

      if (err.response?.status === 403) {
        Swal.fire("Forbidden", err.response.data?.message, "error");
      } else {
        Swal.fire("Error", "Failed to start conversation", "error");
      }
    }
  };
  if (isLoading)
    return (
      <div className="p-10 text-center">
        <progress className="progress progress-primary w-full" />
      </div>
    );

  if (isError)
    return (
      <div className="p-10 text-center text-error">
        Failed to load applications.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Applications Received</h1>

      {/* Status Filter */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        {["all", "pending", "accepted", "rejected"].map((s) => (
          <button
            key={s}
            className={`btn btn-sm ${
              statusFilter === s ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setStatusFilter(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-primary/40  text-primary-content">
            <tr>
              <th>#</th>
              <th>Tutor</th>
              <th>Subjects</th>
              <th>Schedule</th>
              <th> Salary</th>
              <th>Status</th>
              <th>Applied On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app, index) => (
              <tr
                key={app._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <th>{(page - 1) * limit + index + 1}</th>
                <td className="flex items-center gap-3">
                  <img
                    src={app.tutorPhoto}
                    alt={app.tutorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{app.tutorName}</p>
                    <p className="text-xs opacity-70">
                      {app.qualification}, {app.institution}
                    </p>
                  </div>
                </td>
                <td className="font-bold">{app.subjects.join(", ")}</td>
                <td>
                  <span className="font-medium">{app.days} days</span> |{" "}
                  <span className="text-secondary">{app.tuitionTime}</span>
                </td>
                <td className="text-primary font-semibold">৳{app.salary}</td>
                <td>
                  <span
                    className={`badge text-white font-semibold ${
                      app.status === "pending"
                        ? "badge-warning"
                        : app.status === "accepted"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </td>
                <td className="font-mono">
                  {format(new Date(app.appliedAt), "MMM dd, yyyy")}
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    <button
                      className="btn btn-sm btn-outline btn-info hover:text-white"
                      onClick={() => setSelectedApp(app)}
                    >
                      View
                    </button>
                    {app.status === "accepted" && (
                      <button
                        className="btn btn-sm btn-primary hover:text-white"
                        onClick={() => handleContactTutor(app.tutorId)}
                      >
                        Contact Tutor
                      </button>
                    )}
                    {app.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateApplicationStatus(app._id, "accepted")
                          }
                          className="btn btn-sm btn-success hover:text-white"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            updateApplicationStatus(app._id, "rejected")
                          }
                          className="btn btn-sm btn-error hover:text-white"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filteredApplications.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-10 opacity-70">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* View Modal */}
      {selectedApp && (
        <dialog className="modal modal-open">
          <div className="modal-box w-11/12 max-w-lg">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedApp.tutorPhoto}
                alt={selectedApp.tutorName}
                className="w-16 h-16 rounded-full object-cover border border-base-300"
              />
              <h3 className="font-bold text-lg">{selectedApp.tutorName}</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Qualification:</span>{" "}
                {selectedApp.qualification}, {selectedApp.institution}
              </p>
              <p>
                <span className="font-semibold">Experience:</span>{" "}
                {selectedApp.experienceYears}y {selectedApp.experienceMonths}m
              </p>
              <p>
                <span className="font-semibold">Subjects:</span>{" "}
                <span className="font-bold">
                  {selectedApp.subjects.join(", ")}
                </span>
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {selectedApp.location}
              </p>
              <p>
                <span className="font-semibold">Proposed Salary:</span>{" "}
                <span className="font-bold text-primary">
                  ৳{selectedApp.salary}
                </span>
              </p>
              {selectedApp.coverLetter && (
                <div>
                  <p className="font-semibold">Cover Letter:</p>
                  <p className="bg-base-200 p-2 rounded">
                    {selectedApp.coverLetter}
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-5">
              <Link to={`/tutors/${selectedApp.tutorId}`}>
                <GradientButton>Tutor Details</GradientButton>
              </Link>
              <button
                className="btn btn-outline"
                onClick={() => setSelectedApp(null)}
              >
                Close
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedApp(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Application;
