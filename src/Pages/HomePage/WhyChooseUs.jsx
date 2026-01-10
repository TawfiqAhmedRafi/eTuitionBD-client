import React from "react";
import { 
  FaClipboard, 
  FaUsers, 
  FaCreditCard, 
  FaComments, 
  FaBell, 
  FaStar, 
  FaTools, 
 
  FaClock, 
  FaReceipt 
} from "react-icons/fa";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";

const FeatureCard = ({ icon: IconComponent, title, desc }) => (
  <div className="p-5 bg-base-100 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-secondary text-secondary-content text-xl">
      <IconComponent />
    </div>
    <h4 className="font-semibold">{title}</h4>
    <p className="text-sm text-neutral-content mt-1">{desc}</p>
  </div>
);

const features = [
  { icon: FaClipboard, title: "Post & Find Tuition", desc: "Students can post tuition requirements and tutors can apply seamlessly." },
  { icon: FaUsers, title: "Verified Tutors", desc: "Only verified tutors can apply, ensuring trust and safety on our platform." },
  { icon: FaCreditCard, title: "Secure Payments", desc: "Stripe-powered payments make tuition transactions fast, secure, and reliable." },
  { icon: FaComments, title: "Messaging System", desc: "Built-in chat between students and tutors for seamless communication." },
  { icon: FaBell, title: "Notifications", desc: "Receive real-time updates for applications, acceptances, and messages." },
  { icon: FaStar, title: "Reviews & Ratings", desc: "Students can leave ratings and reviews after tuition completion." },
  { icon: FaTools, title: "Admin Moderation", desc: "Admins review posts and maintain platform quality." },
  { icon: FaClock, title: "Real-time Applications", desc: "Receive tutor applications quickly after posting tuition." },
  { icon: FaReceipt, title: "Reports & Analytics", desc: "Users can track earnings, reports, and analytics easily." },
  
];

const WhyChooseUs = () => {
  return (
    <section className="py-10 md:py-14 bg-base-200 rounded-2xl max-w-7xl mx-auto px-6">
      <SectionHeader
        title="Why Choose eTuitionBD"
        subtitle="Everything you need for a seamless tutoring experience"
      />

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {features.map((f, i) => (
          <FeatureCard 
            key={i} 
            icon={f.icon} 
            title={f.title} 
            desc={f.desc} 
          />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
