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

const StudentDashboard = () => {
  const isMobile = window.innerWidth < 640;
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axiosSecure.get("/dashboard/student");
        setDashboard(res.data);
      } catch (err) {
        console.error("Failed to fetch student dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [axiosSecure]);

  if (loading) return <LoadingPage />;

  const tuitionsSummary = dashboard?.tuitionsSummary || [];
  const totalSpent = dashboard?.paymentsSummary?.totalSpent ?? 0;
  const applicationsSummary = dashboard?.applicationsSummary || [];
  const subjectsSummary = dashboard?.subjectsSummary || [];

  const totalTuitions = tuitionsSummary.reduce((acc, t) => acc + t.count, 0);
  const pendingTuitions =
    tuitionsSummary.find((t) => t._id === "open")?.count || 0;
  const ongoingTuitions =
    tuitionsSummary.find((t) => t._id === "ongoing")?.count || 0;
  const completedTuitions =
    tuitionsSummary.find((t) => t._id === "completed")?.count || 0;
  const totalApplications = applicationsSummary.reduce(
    (acc, a) => acc + a.count,
    0
  );

  return (
    <div className="p-2 md:p-6 space-y-10">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card title="Total Tuitions" value={totalTuitions} bg="bg-blue-500" />
        <Card
          title="Open Tuitions"
          value={pendingTuitions}
          bg="bg-yellow-500"
        />
        <Card
          title="Ongoing Tuitions"
          value={ongoingTuitions}
          bg="bg-purple-500"
        />
        <Card
          title="Completed Tuitions"
          value={completedTuitions}
          bg="bg-indigo-500"
        />
        <Card
          title="Total Spending (BDT)"
          value={totalSpent}
          bg="bg-pink-500"
        />
        <Card
          title="Applications Received"
          value={totalApplications}
          bg="bg-orange-400"
        />
      </div>

      {/* PIE CHART */}
      <div className="p-2 md:p-6 rounded-xl shadow-lg bg-white text-center">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-700">
          Tuitions Status Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
          <PieChart>
            <Pie
              data={tuitionsSummary}
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
              {tuitionsSummary.map((_, i) => (
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

      {/* SUBJECTS BAR CHART */}
      <div className="p-2 md:p-6 rounded-xl shadow-lg bg-white text-center">
  <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-700">
    Tuitions Per Subject
  </h2>
  <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
    <BarChart
      data={subjectsSummary}
      margin={{
        top: 10,
        right: isMobile ? 10 : 30,
        left: 0,
        bottom: isMobile ? 50 : 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="_id"
        angle={isMobile ? -45 : 0}
        textAnchor={isMobile ? "end" : "middle"}
        interval={0}
      />
      <YAxis allowDecimals={false} />
      {!isMobile && <Tooltip />}
      <Bar
        dataKey="count"
        fill="#0494f4"
        radius={isMobile ? [3, 3, 0, 0] : [5, 5, 0, 0]}
        barSize={isMobile ? 20 : 30}
      />
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

export default StudentDashboard;
