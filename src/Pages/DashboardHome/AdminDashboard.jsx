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

const COLORS = ["#2596be", "#0494f4", "#0b3b6b", "#3cdaa7", "#f4b400"];

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axiosSecure.get("/dashboard/admin");
        setDashboard(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch admin dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [axiosSecure]);
console.log(dashboard)
  if (loading) return <LoadingPage />;

  const cards = dashboard?.cards || {};
  const pieChart = dashboard?.pieChart || [];
  const barChart = dashboard?.barChart || [];
  const formattedBarChart = barChart.map(item => ({
  ...item,
  monthLabel: `${item._id.month}-${item._id.year}`
}));

  return (
    <div className="p-6 space-y-10">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card title="Total Tuitions" value={cards.totalTuitions} bg="bg-blue-500" />
        <Card title="Ongoing Tuitions" value={cards.ongoingTuitions} bg="bg-purple-500" />
        <Card title="Pending Tuitions" value={cards.pendingTuitions} bg="bg-yellow-500" />
        <Card title="Total Tutors" value={cards.totalTutors} bg="bg-green-500" />
        <Card title="Total Students" value={cards.totalStudents} bg="bg-orange-400" />
        <Card title="Total Revenue (BDT)" value={cards.totalRevenue} bg="bg-pink-500" />
      </div>

      {/* PIE CHART: Tuitions Status */}
      <div className="p-6 rounded-xl shadow-lg bg-white text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Tuitions Status Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChart}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              label={({ _id, percent }) =>
                `${formatStatus(_id)}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieChart.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [value, formatStatus(name)]} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              formatter={(value) => formatStatus(value)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART: Monthly Revenue */}
      <div className="p-6 rounded-xl shadow-lg bg-white text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Monthly Revenue (Last 6 Months)
        </h2>
       <ResponsiveContainer width="100%" height={300}>
  <BarChart data={formattedBarChart} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="monthLabel" label={{ value: "Month", position: "insideBottomRight", offset: -5 }} />
    <YAxis allowDecimals={false} />
    <Tooltip />
    <Bar dataKey="revenue" fill="#0494f4" radius={[5, 5, 0, 0]} />
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

export default AdminDashboard;
