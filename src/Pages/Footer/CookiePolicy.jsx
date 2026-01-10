import React from "react";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";

const CookiePolicy = () => {
  return (
    <section className="py-16 px-6 bg-base-200 m-5 rounded-2xl min-h-screen">
      <SectionHeader
        title="Cookie Policy"
        subtitle="How eTuitionBD uses cookies"
      />

      <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl p-8 shadow-md space-y-6">
        <p className="text-base-content">
          Cookies are small files stored on your device to enhance your browsing
          experience. eTuitionBD uses cookies to make our platform more efficient.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">1. Types of Cookies</h3>
        <p className="text-base-content">
          - <strong>Essential Cookies:</strong> Required for the platform to function. <br/>
          - <strong>Performance Cookies:</strong> Track usage to improve services. <br/>
          - <strong>Functional Cookies:</strong> Remember your preferences and settings.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">2. Managing Cookies</h3>
        <p className="text-base-content">
          You can control cookies via your browser settings. Disabling some cookies may
          affect platform functionality.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">3. Third-Party Cookies</h3>
        <p className="text-base-content">
          Some cookies are set by third-party services for analytics, advertising, or
          payment processing.
        </p>

        <h3 className="text-xl font-semibold text-neutral-content">4. Updates</h3>
        <p className="text-base-content">
          We may update this policy periodically. Check this page for the latest version.
        </p>
      </div>
    </section>
  );
};

export default CookiePolicy;
