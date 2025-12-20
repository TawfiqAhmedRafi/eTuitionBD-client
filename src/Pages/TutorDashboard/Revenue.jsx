import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "../../Components/Pagination/Pagination";
import { format } from "date-fns";

const Revenue = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showPolicy, setShowPolicy] = useState(true);
  const limit = 10;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tutorRevenue", page],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments", {
        params: { page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-xl text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <div className="p-10 text-center text-error">
        Failed to load your revenue
      </div>
    );

  const { payments, pagination } = data;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-6">
        Revenue
      </h2>
      {showPolicy && (
        <div className="alert alert-info text-white  mb-6 flex justify-between items-start">
          <span>
            <strong>Platform Fee Policy:</strong>
            For the first month, <strong>60%</strong> of tutor salary is charged
            as platform fee.
          </span>
          <button
            className="btn btn-xs btn-ghost"
            onClick={() => setShowPolicy(false)}
          >
            ✕
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-primary/30 text-primary-content">
            <tr>
              <th className="py-3 px-3">#</th>
              <th className="py-3 px-3 text-left">Student</th>
              <th className="py-3 px-3 text-left">Amount</th>
              <th className="py-3 px-3 text-left">Status</th>
              <th className="py-3 px-3 text-left">Paid At</th>
              <th className="py-3 px-3 text-left">View</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, index) => (
              <tr
                key={p._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <th className="py-2 px-3">{(page - 1) * limit + index + 1}</th>

                <td className="py-2 px-3 font-medium">{p.studentEmail}</td>
                <td className="py-2 px-3 font-semibold text-accent">
                  ৳{p.salary.toLocaleString()}
                </td>
                <td className="py-2 px-3">
                  <span
                    className={`badge text-white ${
                      p.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {p.paymentStatus.toUpperCase()}
                  </span>
                </td>
                <td className="py-2 px-3 text-sm">
                  {format(new Date(p.paidAt), "dd MMM, yy")}
                </td>
                <td className="py-2 px-3 text-sm">
                  <button
                    onClick={() => setSelected(p)}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />

      {/* Payment Details Modal */}
      {selected && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">Payment Details</h3>
              <span
                className={`badge badge-sm text-white font-semibold ${
                  selected.paymentStatus === "paid"
                    ? "badge-success"
                    : "badge-warning"
                }`}
              >
                {selected.paymentStatus.toUpperCase()}
              </span>
            </div>

            {/* Amount Details */}
            <div className="mb-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-content">Total Paid</span>
                <span className="font-bold text-2xl">
                  ৳{selected.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tutor Earnings</span>
                <span className="font-semibold text-accent">
                  ৳{selected.salary.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="font-semibold text-success">
                  ৳{(selected.amount - selected.salary).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="divider my-3" />

            {/* Payment & Student Info */}
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">Student:</span>{" "}
                {selected.studentEmail}
              </p>
              <p>
                <span className="font-medium">Tutor:</span>{" "}
                {selected.tutorEmail}
              </p>
              <p>
                <span className="font-medium">Paid At:</span>{" "}
                {format(
                  new Date(selected.paidAt),
                  "MMMM dd, yyyy 'at' hh:mm a"
                )}
              </p>

              <p>
                <span className="font-medium">Tuition ID:</span>{" "}
                <span className="font-mono">{selected.tuitionId}</span>
              </p>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelected(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Revenue;
