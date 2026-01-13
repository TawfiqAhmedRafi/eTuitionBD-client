import React, { useEffect, useState } from "react";
import { motion as MOTION } from "framer-motion";
import useAxios from "../../hooks/useAxios";

const StatCard = ({ value, label }) => (
  <div className="card bg-base-200 shadow-md rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 border border-base-300/40 hover:-translate-y-1 hover:shadow-xl hover:backdrop-blur-sm hover:bg-base-100/80">
    <div className="text-3xl md:text-4xl font-bold text-primary sora">
      {value}
    </div>
    <div className="text-sm opacity-70 mt-1">{label}</div>
  </div>
);

// Skeleton version with Framer Motion
const StatCardSkeleton = ({ i }) => (
  <MOTION.div
    className="card bg-base-100 border border-base-300/60 rounded-2xl p-6 flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: i * 0.15,
      repeat: Infinity,
      repeatType: "mirror",
      duration: 0.8,
    }}
  >
    <div className="h-10 md:h-12 w-3/4 bg-base-300 rounded mb-3"></div>
    <div className="h-4 w-1/2 bg-base-300 rounded"></div>
  </MOTION.div>
);

const StatsStrip = () => {
  const axiosInstance = useAxios();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load stats", err);
        setLoading(false);
      });
  }, [axiosInstance]);

  return (
    <section className="py-10 w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} i={i} />)
          : (
            <>
              <StatCard
                value={`${stats?.verifiedTutors ?? 0}+`}
                label="Verified Tutors"
              />
              <StatCard
                value={`${stats?.activeTuitions ?? 0}+`}
                label="Active Tuitions"
              />
              <StatCard
                value={`${stats?.successRate ?? 0}%`}
                label="Success Rate"
              />
            </>
          )}
      </div>
    </section>
  );
};

export default StatsStrip;
