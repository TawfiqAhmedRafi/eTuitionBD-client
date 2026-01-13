import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";
import Pagination from "../../Components/Pagination/Pagination";

const MyComplaint = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["my-complaints", user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/my-complaints", {
        params: { email: user?.email, page, limit },
      });
      return res.data; // Expected format: { complaints: [...], totalPages: X }
    },
    keepPreviousData: true,
  });

  if (isLoading) {
  return (
    <div className="flex justify-center items-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}


  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading complaints: {error.message}
      </div>
    );
  }

  const { complaints = [], totalPages = 1 } = data;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-neutral-content">My Complaints</h2>

      {complaints.length === 0 ? (
        <div className="bg-blue-50 p-6 rounded-lg text-center text-blue-700">
          You haven't posted any complaints yet.
        </div>
      ) : (
        <div className="grid gap-6">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-base-200 shadow-md rounded-lg p-6 border-l-4 border-red-500"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-neutral-content">
                  {complaint.subject || "Complaint"}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    complaint.status === "resolved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {complaint.status || "Pending"}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">{complaint.message}</p>

              <div className="flex justify-between text-sm text-gray-400">
                <span>
                  Posted on: {format(new Date(complaint.createdAt), "MMM dd, yyyy")}
                </span>
                <span>Ticket ID: {complaint._id.slice(-6).toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {complaints.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
};

export default MyComplaint;
