import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const res = await axiosSecure.get("/tuitions");
        setTuitions(res.data.tuitions); 
      } catch (err) {
        console.error("Failed to fetch tuitions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, [axiosSecure]);

  if (loading) {
    return <div className="p-10 text-center">Loading tuitions...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Available Tuitions</h1>

      {tuitions.length === 0 && (
        <p className="text-gray-500">No tuitions available right now.</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {tuitions.map((tuition) => (
          <div
            key={tuition._id}
            className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={tuition.photoURL}
                alt={tuition.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-lg">{tuition.name}</h2>
                <p className="text-sm text-gray-500">
                  {tuition.district}, {tuition.location}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-1 text-sm">
              <p>
                <strong>Class:</strong> {tuition.classLevel}
              </p>
              <p>
                <strong>Subjects:</strong> {tuition.subjects.join(", ")}
              </p>
              <p>
                <strong>Mode:</strong> {tuition.mode}
              </p>
              <p>
                <strong>Days:</strong> {tuition.days} days/week
              </p>
              <p>
                <strong>Time:</strong> {tuition.time}
              </p>
              <p>
                <strong>Duration:</strong> {tuition.duration} hours
              </p>
              <p>
                <strong>Budget:</strong> ৳{tuition.minBudget} – ৳
                {tuition.maxBudget}
              </p>
            </div>

            {/* Description */}
            <p className="mt-3 text-sm text-gray-600">{tuition.description}</p>

            {/* Footer */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                {tuition.status}
              </span>
              <span className="text-xs text-gray-400">
                Posted: {new Date(tuition.postedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTuitions;
