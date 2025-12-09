import React from "react";
import { FaUserCheck, FaLock, FaChartBar, FaTools, FaClock, FaReceipt } from "react-icons/fa";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";

const Feature = ({ icon:IconComponent , title, desc }) => (
  <div className="p-5 bg-base-100 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-secondary text-secondary-content text-xl">
      <IconComponent />
    </div>
    <h4 className="font-semibold">{title}</h4>
    <p className="text-sm text-neutral-content mt-1">{desc}</p>
  </div>
);

const WhyChooseUs = () => {
  const features = [
    { icon: FaUserCheck, title: "Verified Tutors", desc: "Every tutor is verified by admin before approval." },
    { icon: FaLock, title: "Secure Payments", desc: "Stripe-backed payments for reliability & refunds." },
    { icon: FaChartBar, title: "Transparent Pricing", desc: "See expected salary and fees before paying." },
    { icon: FaTools, title: "Admin Moderation", desc: "Admins review posts and maintain quality." },
    { icon: FaClock, title: "Real-time Applications", desc: "Receive tutor applications quickly." },
    { icon: FaReceipt, title: "Reports & Analytics", desc: "Admin dashboard for earnings & reports." }
  ];

  return (
    <section className="py-10 md:py-14 bg-base-200 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Why Choose eTuitionBD"
          subtitle="Designed for students, tutors and admins"
        />
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {features.map((f, i) => (
            <Feature key={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;