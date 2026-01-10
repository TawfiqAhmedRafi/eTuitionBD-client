import React from "react";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import { FaDollarSign, FaWallet, FaUsers, FaPercentage } from "react-icons/fa";

const PricingCard = ({ icon: Icon, title, description }) => (
  <div className="bg-base-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start gap-4">
    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary text-primary-content text-xl">
      <Icon />
    </div>
    <h3 className="text-xl font-semibold text-neutral-content">{title}</h3>
    <p className="text-base-content">{description}</p>
  </div>
);

const Pricing = () => {
  return (
    <section className="py-16 px-6  min-h-screen">
      <SectionHeader
        title="Pricing & Tutor Payments"
        subtitle="Transparent fees for students and tutors"
      />

      <p className="text-center text-base-content max-w-2xl mx-auto mb-12">
        At eTuitionBD, we ensure fair payments and transparency for both students
        and tutors. Here's how it works:
      </p>

      <div className="grid md:grid-cols-3 bg-base-200 p-10 rounded-2xl gap-6 max-w-7xl mx-auto mb-16">
        <PricingCard
          icon={FaDollarSign}
          title="Student Payments"
          description="Students pay tuition fees securely through Stripe after accepting a tutor."
        />
        <PricingCard
          icon={FaPercentage}
          title="Platform Fee"
          description="60% of a tutor's first month salary is deducted as a platform fee for connecting students and managing transactions."
        />
        <PricingCard
          icon={FaWallet}
          title="Subsequent Payments"
          description="After the first month, tutors can receive payments directly from students hand-to-hand for all additional tuition sessions."
        />
      </div>

      <div className="bg-base-200 p-8 rounded-2xl shadow-md max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-semibold text-neutral-content mb-4">
          Summary
        </h3>
        <p className="text-base-content mb-2">
          ✅ Students pay online via Stripe for secure transactions.
        </p>
        <p className="text-base-content mb-2">
          ✅ Tutors pay a 60% platform fee on their first month.
        </p>
        <p className="text-base-content mb-2">
          ✅ Remaining months are paid directly by students to tutors.
        </p>
        <p className="text-sm text-neutral-content opacity-70 mt-4">
          Transparent, secure, and fair for everyone.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
