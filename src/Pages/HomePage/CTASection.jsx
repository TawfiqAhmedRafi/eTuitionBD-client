import React from "react";
import GradientButton from "../../Components/GradientButton/GradientButton";
import AccentGradientButton from "../../Components/GradientButton/AccentGradientButton";
import { Link } from "react-router";

const CTASection = () => {
  return (
    <section className="py-10 md:py-14 bg-base-200 rounded-2xl my-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="card bg-base-100 shadow-md rounded-2xl p-10 md:p-14 text-center border border-base-300/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-3xl font-bold sora">
            Find or Provide Tuition Services
          </h3>
          <p className="mt-3 text-base opacity-80 max-w-xl mx-auto">
            Whether you're a student looking for the right tutor or a tutor
            ready to start teaching — we’ve got you covered.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/post-tuition">
              <GradientButton className="btn-wide hover:shadow-lg transition-all duration-300 text-lg">
                {" "}
                Post a Tuition
              </GradientButton>
            </Link>

            <Link to="/apply-tutor">
              <AccentGradientButton className="btn-wide hover:shadow-lg transition-all duration-300 text-lg">
                {" "}
                Become a Tutor
              </AccentGradientButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
