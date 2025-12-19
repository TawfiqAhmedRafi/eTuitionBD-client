import React from 'react';
import { Link } from 'react-router';

const PaymentFailure = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 p-4">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-error mb-2">
          Payment Failed
        </h2>
        <p className="text-gray-700">
          Your tuition payment could not be processed.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
        <div className="text-center text-red-500 text-5xl mb-2">✗</div>
        <p className="text-center text-gray-700">
          Please try again or contact support if the issue persists.
        </p>
        <div className="text-center mt-4">
          <Link to="/dashboard/my-tuitions" className="btn btn-error w-full text-white ">
            Back to My Tuitions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
