import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import LoadingPage from "../LoadingPage/LoadingPage";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Star } from "lucide-react";

const COLORS = ["#2596be", "#0494f4", "#0b3b6b", "#3cdaa7", "#f4b400"];

const TutorDashboard = () => {
  const isMobile = window.innerWidth < 640;
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axiosSecure.get("/dashboard/tutor");
        setDashboard(res.data);
      } catch (err) {
        console.error("Failed to fetch tutor dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [axiosSecure]);
  console.log(dashboard);
  if (loading) return <LoadingPage />;

  const cards = dashboard?.cards || {};

  const applicationsSummary = dashboard?.applicationsSummary || [];
  const reviewsSummary = dashboard?.reviewsSummary || [];
  const sortedReviews = [...reviewsSummary].sort((a, b) => a._id - b._id);
  return (
    <div className="p-2 md:p-6 space-y-10">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card
          title="Total Tuitions"
          value={cards.totalTuitions}
          bg="bg-blue-500"
        />
        <Card
          title="Ongoing Tuitions"
          value={cards.ongoingTuitions}
          bg="bg-purple-500"
        />
        <Card
          title="Total Applications"
          value={cards.totalApplications}
          bg="bg-orange-400"
        />
        <Card
          title="Accepted Applications"
          value={cards.acceptedApplications}
          bg="bg-green-500"
        />
        <Card
          title="Total Income (BDT)"
          value={cards.totalIncome}
          bg="bg-pink-500"
        />
        <Card
          title="Average Ratings"
          value={
            <div className="flex items-center gap-1">
              <span>{cards.averageRating}</span>
              <Star className="w-4 h-4 fill-white text-white" />
            </div>
          }
          bg="bg-yellow-500"
        />
      </div>

      {/* PIE CHART: APPLICATION STATUS */}
      <div className="p-2 md:p-6 rounded-xl shadow-lg bg-white text-center">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-700">
          Applications Status Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
          <PieChart>
            <Pie
              data={applicationsSummary}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={isMobile ? 60 : 100}
              innerRadius={isMobile ? 35 : 60}
              label={
                isMobile
                  ? false
                  : ({ _id, percent }) =>
                      `${formatStatus(_id)}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {applicationsSummary.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [value, formatStatus(name)]}
              contentStyle={{
                fontSize: "14px",
                borderRadius: "8px",
              }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              formatter={(value) => formatStatus(value)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART: REVIEWS */}
      <div className="p-2 md:p-6 rounded-xl shadow-lg bg-white text-center">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-700">
          Reviews Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
          <BarChart
            data={reviewsSummary}
            margin={{
              top: 10,
              right: isMobile ? 10 : 30,
              left: 0,
              bottom: isMobile ? 25 : 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id"
              type="category"
              label={{
                value: "Rating",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis
              type="number"
              allowDecimals={false}
              tickFormatter={(val) => (val >= 1000 ? `${val / 1000}k` : val)}
            />

            <Tooltip
              formatter={(value, name, props) => {
                const total = reviewsSummary.reduce(
                  (acc, r) => acc + r.count,
                  0
                );
                const percent = ((value / total) * 100).toFixed(1);
                return [
                  `${value} (${percent}%)`,
                  `Rating ${props.payload._id}`,
                ];
              }}
            />
            <Bar dataKey="count" radius={[5, 5, 0, 0]} fill="#0494f4">
              {sortedReviews.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#0494f4" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// CARD COMPONENT
const Card = ({ title, value, bg }) => (
  <div
    className={`p-5 shadow-md rounded-xl text-white flex flex-col justify-center items-center ${bg}`}
  >
    <p className="text-[12px] md:text-base">{title}</p>
    <h2 className="text-2xl md:text-3xl font-bold mt-2">{value}</h2>
  </div>
);

// FORMAT STATUS LABELS
const formatStatus = (status) => {
  if (!status) return "Unknown";
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default TutorDashboard;
