import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "../../Components/Pagination/Pagination";
import { format } from "date-fns";

const MyPayments = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myPayments", page],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments", {
        params: { page, limit: 10 },
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
        Failed to load your payments
      </div>
    );

  const payments = data?.payments || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1 };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-6">
        My Payments
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-primary/30 text-primary-content">
            <tr>
              <th className="py-3 px-3">#</th>
              <th className="py-3 px-3 text-left">Tutor</th>
              <th className="py-3 px-3 text-left">Amount Paid</th>
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
                <th className="py-2 px-3">{(page - 1) * 10 + index + 1}</th>
                <td className="py-2 px-3 font-medium">{p.tutorEmail}</td>
                <td className="py-2 px-3 font-semibold text-accent">
                  ৳{p.amount.toLocaleString()}
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
                  {format(new Date(p.paidAt), "dd MMM, yyyy")}
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

            <div className="mb-4">
              <p className="text-sm text-neutral-content">Amount Paid</p>
              <p className="text-2xl font-bold">
                ৳{selected.amount.toLocaleString()}
              </p>
            </div>

            <div className="divider my-3" />

            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">Tutor Email:</span> {selected.tutorEmail}
              </p>
              <p>
                <span className="font-medium">Paid At:</span>{" "}
                {format(new Date(selected.paidAt), "MMMM dd, yyyy 'at' hh:mm a")}
              </p>
              <p>
                <span className="font-medium">Tuition ID:</span>{" "}
                <span className="font-mono">{selected.tuitionId}</span>
              </p>
              <p>
                <span className="font-medium">Transaction ID:</span>{" "}
                <span className="font-mono">{selected.transactionId}</span>
              </p>
              <p>
                <span className="font-medium">Application Id :</span>{" "}
                <span className="font-mono"> {selected.applicationId}</span>
               
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

          <form method="dialog" className="modal-backdrop ">
            <button className="" onClick={() => setSelected(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyPayments;
