import { motion as MOTION } from "framer-motion";
import React from "react";
import GradientButton from "../../Components/GradientButton/GradientButton";
import HeroImg from "../../assets/hero.png";
import AccentGradientButton from "../../Components/GradientButton/AccentGradientButton";
import { Link } from "react-router";
const Hero = () => {
  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-0  grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <MOTION.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="sora text-4xl md:text-5xl font-bold leading-tight">
            Find Verified Tutors — Fast, Simple, Secure
          </h1>
          <p className="mt-5 text-base max-w-xl text-content">
            Post your tuition requirement in minutes and receive applications
            from qualified, verified tutors. Transparent pricing, secure
            payments and role-based dashboards.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link to='/post-tuition'> <GradientButton className="btn-lg">Post a Tuition</GradientButton></Link>
           
            <AccentGradientButton className="btn-lg">
              Browse Tuitions
            </AccentGradientButton>
            <Link to='/apply-tutor'
              className="
              btn btn-outline btn-md rounded-lg font-semibold outfit
              border-primary text-primary
              transition-all duration-300
              hover:text-white 
              hover:bg-primary
              ">
              Apply to be a Tutor
            </Link>
          </div>
        </MOTION.div>

        <MOTION.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="rounded-2xl overflow-hidden  p-6">
            {/* Replace with an actual illustration */}
            <img
              src={HeroImg}
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
