import React from "react";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";

const TermsAndConditions = () => {
  return (
    <section className="py-16 px-6 m-5 bg-base-200 rounded-2xl min-h-screen">
      <SectionHeader
        title="Terms & Conditions"
        subtitle="Rules and guidelines for using eTuitionBD"
      />

      <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl p-8 shadow-md space-y-6">
        <p className="text-base-content">
          Welcome to eTuitionBD! By accessing or using our platform, you agree
          to be bound by these Terms and Conditions. Please read them carefully.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">1. User Accounts</h3>
        <p className="text-base-content">
          Users must provide accurate information during registration. Students
          and tutors are responsible for maintaining the confidentiality of their accounts.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">2. Services</h3>
        <p className="text-base-content">
          eTuitionBD provides a platform for students to post tuition requests
          and tutors to apply. We are not a direct education provider; tutors are independent.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">3. Payments</h3>
        <p className="text-base-content">
          Platform fees apply as described. Payments are facilitated through
          Stripe for security. eTuitionBD is not responsible for hand-to-hand
          payments beyond the first month.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">4. Content & Conduct</h3>
        <p className="text-base-content">
          Users must not post offensive or illegal content. Any violation may
          result in account suspension.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">5. Modifications</h3>
        <p className="text-base-content">
          eTuitionBD reserves the right to modify these terms at any time. Users
          will be notified of major changes.
        </p>

        <p className="text-base-content italic">
          By using our platform, you acknowledge that you have read and agree to these terms.
        </p>
      </div>
    </section>
  );
};

export default TermsAndConditions;
