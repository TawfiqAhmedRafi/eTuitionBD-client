import React from "react";


const StatCard = ({ value, label }) => (
  <div className="card bg-base-100 shadow-md rounded-2xl p-6 flex items-center text-center transition-all duration-300 border border-base-300/40 hover:-translate-y-1 hover:shadow-xl hover:backdrop-blur-sm hover:bg-base-100/80">
    <div className="text-3xl md:text-4xl font-bold text-primary sora">{value}</div>
    <div className="text-sm opacity-70 mt-1">{label}</div>
  </div>
);

const StatsStrip = () => {
  return (
    <section className="py-10  w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard value="1.2K+" label="Verified Tutors" />
        <StatCard value="850+" label="Active Tuitions" />
        <StatCard value="92%" label="Success Rate" />
      </div>
    </section>
  );
};

export default StatsStrip;
