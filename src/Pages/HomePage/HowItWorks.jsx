import React from "react";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";

const Step = ({ number, title, desc }) => (
  <div className="text-center p-6 bg-base-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary text-primary-content flex items-center justify-center font-semibold text-lg">
      {number}
    </div>
    <h4 className="font-semibold">{title}</h4>
    <p className="text-sm text-neutral-content mt-2">{desc}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="py-10 md:py-14 max-w-7xl mx-auto px-6 bg-base-200 rounded-2xl mb-10">
      <SectionHeader
        title="How eTuitionBD Works"
        subtitle="A simple journey from posting to learning"
      />

      <div className="grid md:grid-cols-5 gap-6 mt-8">
        <Step
          number="1"
          title="Post Tuition"
          desc="Students post tuition with subject, class, schedule, and budget."
        />
        <Step
          number="2"
          title="Tutor Applications"
          desc="Verified tutors apply to relevant tuition posts in their district."
        />
        <Step
          number="3"
          title="Review & Select"
          desc="Students review tutor profiles and select the best match."
        />
        <Step
          number="4"
          title="Secure Payment"
          desc="Complete payment through Stripe after accepting a tutor."
        />
        <Step
          number="5"
          title="Messaging & Feedback"
          desc="Communicate with the tutor and leave a review after tuition."
        />
      </div>
    </section>
  );
};

export default HowItWorks;
