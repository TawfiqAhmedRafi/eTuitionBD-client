import React from "react";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";

const PrivacyPolicy = () => {
  return (
    <section className="py-16 px-6 bg-base-200 rounded-2xl m-5 min-h-screen">
      <SectionHeader
        title="Privacy Policy"
        subtitle="How we handle your personal information"
      />

      <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl p-8 shadow-md space-y-6">
        <p className="text-base-content">
          eTuitionBD respects your privacy. This Privacy Policy explains how we collect,
          use, and protect your personal information.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">1. Information We Collect</h3>
        <p className="text-base-content">
          We collect information when you register, post tuitions, or communicate
          with tutors. This includes your name, email, location, and payment information.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">2. How We Use Information</h3>
        <p className="text-base-content">
          Information is used to connect students with tutors, process payments, 
          and improve our services. We do not sell your data to third parties.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">3. Cookies</h3>
        <p className="text-base-content">
          We use cookies to enhance your experience, remember preferences, and
          analyze website usage.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">4. Data Security</h3>
        <p className="text-base-content">
          We implement security measures to protect your data. However, no
          transmission over the Internet is 100% secure.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">5. Your Rights</h3>
        <p className="text-base-content">
          You can request access to your data, corrections, or deletion by contacting
          our support team.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
