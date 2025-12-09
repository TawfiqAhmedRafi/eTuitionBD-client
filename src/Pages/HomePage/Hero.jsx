import { motion as MOTION } from "framer-motion";
import React from "react";
import GradientButton from "../../Components/GradientButton/GradientButton";
const Hero = () => {
  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <MOTION.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="sora text-4xl md:text-5xl font-bold leading-tight">
            Find Verified Tutors — Fast, Simple, Secure
          </h1>
          <p className="mt-5 text-base max-w-xl text-content">
            Post your tuition requirement in minutes and receive applications from qualified,
            verified tutors. Transparent pricing, secure payments and role-based dashboards.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <GradientButton className="btn-lg">Post a Tuition</GradientButton>
            <GradientButton className="btn-lg">Browse Tuitions</GradientButton>
           
            
          </div>

       
        </MOTION.div>

        {/* Illustration */}
        <MOTION.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="rounded-2xl overflow-hidden shadow-lg bg-base-200 p-6">
            {/* Replace with an actual illustration */}
            <img
              src="/assets/hero-illustration.png"
              alt="Tutor illustration"
              className="w-full h-auto"
            />
          </div>
        </MOTION.div>
      </div>
    </section>
  );
};

export default Hero;
