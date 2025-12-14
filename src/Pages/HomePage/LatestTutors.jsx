import React from "react";
import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import { motion as MOTION } from "framer-motion";
import TutorCard from "./TutorCard";
import useAxios from "../../hooks/useAxios";

const container = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const LatestTutors = () => {
  const axiosInstance = useAxios();

  const {
    data: tutors = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latest-tutors"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tutors?page=1&limit=6");
      return res.data.tutors || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className="py-12 md:py-16 bg-base-200 rounded-2xl my-12 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Top Tutors This Week"
          subtitle="Experienced tutors recently joined"
          right={
            <a
              className="text-sm font-medium text-primary hover:underline"
              href="/tutors"
            >
              Explore all →
            </a>
          }
        />

        {/* Loading skeleton */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl h-44 bg-base-100 flex flex-col gap-3 p-4 animate-pulse"
              >
                <div className="h-6 w-2/3 bg-base-300 rounded"></div>
                <div className="h-4 w-1/2 bg-base-300 rounded"></div>
                <div className="mt-auto flex gap-3">
                  <div className="h-10 w-10 bg-base-300 rounded-full"></div>
                  <div className="flex-1 h-10 bg-base-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center text-error py-12 text-lg">
            Failed to load tutors.
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center text-neutral-content py-12 text-lg">
            No tutors available yet.
          </div>
        ) : (
          <MOTION.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tutors.map((t) => (
              <MOTION.div
                key={t._id}
                variants={item}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <TutorCard tutor={t} />
              </MOTION.div>
            ))}
          </MOTION.div>
        )}
      </div>
    </section>
  );
};

export default LatestTutors;
