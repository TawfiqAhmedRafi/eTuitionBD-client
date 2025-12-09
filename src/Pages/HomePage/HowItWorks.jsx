import React from "react";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";

const Step = ({ number, title, desc }) => (
  <div className="text-center p-6 bg-base-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary text-primary-content flex items-center justify-center font-semibold">
      {number}
    </div>
    <h4 className="font-semibold">{title}</h4>
    <p className="text-sm text-neutral-content mt-2">{desc}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="py-10 md:py-14 max-w-7xl mx-auto px-6 bg-base-200 rounded-2xl mb-10">
      <SectionHeader title="How eTuitionBD Works" subtitle="Simple 3-step process" />
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <Step number="1" title="Post Tuition" desc="Specify subject, class, schedule and budget." />
        <Step number="2" title="Review Applications" desc="Qualified tutors apply and you compare profiles." />
        <Step number="3" title="Approve & Pay" desc="Select a tutor and complete payment through Stripe." />
      </div>
    </section>
  );
};

export default HowItWorks;