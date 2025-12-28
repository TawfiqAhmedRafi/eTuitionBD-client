import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Payment verification failed.");
          setLoading(false);
        });
    }
  }, [sessionId, axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-primary loading-xl"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 text-center">
        <h2 className="text-2xl font-bold text-error">Payment Failed</h2>
        <p className="text-gray-600">{error}</p>
        <Link to="/my-tuitions" className="btn btn-error btn-outline">
          Back to My Tuitions
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 p-4">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-success mb-2">
          Payment Successful!
        </h2>
        <p className="text-neutral-content">
          Your tuition payment has been processed successfully.
        </p>
      </div>

      <div className="bg-base-200 shadow-md rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
        <div>
          <span className="font-semibold">Tuition ID:</span>{" "}
          <span className="text-neutral-content break-all sm:break-normal">
            {paymentInfo.tuitionId}
          </span>
        </div>
        <div>
          <span className="font-semibold">Transaction ID:</span>{" "}
          <span className="text-neutral-content break-all sm:break-normal">
            {paymentInfo.transactionId}
          </span>
        </div>
        <div className="text-center mt-4">
          <Link to="/dashboard/my-tuitions" className="btn btn-primary w-full">
            Go to My Tuitions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
