// LatestTuitions.jsx - fetches & renders tuitions
import React, { useEffect, useState } from "react";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import TuitionCard from "./TuitionCard";

const API_BASE = import.meta.env.VITE_API_URL || ""; // set in .env

const LatestTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/tuitions?status=approved&limit=6`);
        if (!ignore) {
          const data = await res.json();
          setTuitions(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to fetch tuitions", err);
        setTuitions([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  return (
    <section className="py-10 md:py-12 bg-base-200 rounded-2xl max-w-7xl mx-auto px-6">
      <SectionHeader title="Latest Tuition Posts" subtitle="Recently posted and approved tuitions" right={<a className="text-sm link" href="/tuitions">View all</a>} />

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-lg bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : tuitions.length === 0 ? (
        <div className="text-center text-neutral-content py-8">
          No tuitions available yet. <a href="/post" className="link">Post a tuition</a>.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tuitions.map((t) => (
            <TuitionCard key={t._id} tuition={t} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestTuitions;
