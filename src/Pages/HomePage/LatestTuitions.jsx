import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import TuitionCard from "./TuitionCard";
import useAxios from "../../hooks/useAxios";
import { motion as MOTION } from "framer-motion";
const container = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const LatestTuitions = () => {
  const axiosInstance = useAxios();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latest-tuitions"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tuitions/latest");
     return res.data.latestTuitions || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const tuitions = data || [];

  return (
    <section className="py-10 md:py-12 bg-base-200 rounded-2xl max-w-7xl mx-auto px-6">
      <SectionHeader
        title="Latest Tuition Posts"
        subtitle="Recently posted tuition requests"
        right={<a className="text-sm link" href="/tuitions">View all</a>}
      />

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-lg bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center text-error py-8">
          Failed to load tuitions.
        </div>
      ) : tuitions.length === 0 ? (
        <div className="text-center text-neutral-content py-8">
          No tuitions available yet.
        </div>
      ) : (
         <MOTION.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
             
          {tuitions.map((t) => (
            <MOTION.div
                            key={t._id}
                            variants={item}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
            <TuitionCard key={t._id} tuition={t} />
            </MOTION.div>
          ))}
        </MOTION.div>
      )}
    </section>
  );
};

export default LatestTuitions;
