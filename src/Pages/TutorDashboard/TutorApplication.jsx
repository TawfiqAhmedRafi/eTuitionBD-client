import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { format } from "date-fns";

const TutorApplication = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tutor-applications", statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/my-applications");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const applications = data?.applications || [];

  const filteredApplications =
    statusFilter === "all"
      ? applications
      : applications.filter((app) => app.status === statusFilter);

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
  const handleCancel = async (appId) => {
    const confirm = await Swal.fire({
      title: "Cancel Application?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/applications/${appId}`);
      Swal.fire("Cancelled", "Application has been cancelled", "success");
    } catch (err) {
      console.log("application cancellation error ", err);
      Swal.fire("Error", "Failed to cancel application", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>

      {/* Status Filter */}
      <div className="flex gap-2 mb-4">
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
              <th>Subjects</th>
              <th>Class Level</th>
              <th>Days/Time</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Applied On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app, index) => (
              <tr className=" border-t border-gray-200 hover:bg-gray-50" key={app._id}>
                <th className="flex items-center gap-2">{index + 1}</th>
                <td className="font-bold">{app.subjects.join(", ")}</td>
                <td> <span  className="badge badge-primary font-semibold text-white">{app.classLevel}</span> </td>
                <td>
                 <span className="font-medium">{app.days} days </span> | <span className="text-secondary">{app.tuitionTime}</span> 
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

                <td className="font-mono">{format(new Date(app.appliedAt), "MMM dd, yyyy")}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-outline btn-info hover:text-white"
                    onClick={() => setSelectedApp(app)}
                  >
                    View
                  </button>
                  {app.status === "pending" && (
                    <button
                      className="btn  btn-sm btn-outline btn-error hover:text-white"
                      onClick={() => handleCancel(app._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedApp && (
        <dialog className="modal modal-open">
          <div className="modal-box w-11/12 max-w-lg">
            <h3 className="font-bold text-lg mb-3">Application Details</h3>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Subjects:</span>{" "}
                 <span className="font-bold">{selectedApp.subjects.join(", ")}</span>
              </p>
              <p>
                <span className="font-semibold">Class Level:</span>{" "}
                <span className="badge badge-primary font-semibold text-white">{selectedApp.classLevel}</span>
                
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {selectedApp.location}
              </p>
              <p>
                <span className="font-semibold">Days / Time:</span>{" "}
                {selectedApp.days} days | {selectedApp.tuitionTime}
              </p>
              <p>
                <span className="font-semibold">Salary:</span> 
                 <span className="font-bold text-primary">৳{selectedApp.salary}</span>
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`badge text-white font-semibold ${
                    selectedApp.status === "pending"
                      ? "badge-warning"
                      : selectedApp.status === "accepted"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {selectedApp.status.charAt(0).toUpperCase() + selectedApp.status.slice(1)}
                </span>
              </p>

              {selectedApp.coverLetter && (
                <div>
                  <p className="font-semibold">Cover Letter:</p>
                  <p className="bg-base-200 p-2 rounded text-sm">
                    {selectedApp.coverLetter}
                  </p>
                </div>
              )}
            </div>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setSelectedApp(null)}
              >
                Close
              </button>
            </div>
          </div>

          {/* click outside to close */}
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedApp(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default TutorApplication;
