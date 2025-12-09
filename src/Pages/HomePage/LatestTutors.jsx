// LatestTutors.jsx - shows latest tutors with staggered animation
import React, { useEffect, useState } from "react";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import { motion as MOTION } from "framer-motion";
import TutorCard from "./TutorCard";

const API_BASE = import.meta.env.VITE_API_URL || "";

const container = {
  visible: { transition: { staggerChildren: 0.12 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

const LatestTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/tutors?sort=-createdAt&limit=6`);
        const data = await res.json();
        if (!ignore) setTutors(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch tutors", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  return (
    <section className="py-12 ">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title="Top Tutors This Week" subtitle="Experienced tutors recently joined" right={<a className="text-sm link" href="/tutors">Explore all</a>} />

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-36 bg-base-100 rounded-md animate-pulse" />)}
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center text-neutral-content py-8">No tutors yet.</div>
        ) : (
          <MOTION.div variants={container} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map(t => (
              <MOTION.div key={t._id} variants={item}>
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
