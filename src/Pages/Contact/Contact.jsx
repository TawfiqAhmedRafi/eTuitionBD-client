import ContactInfoCard from "./ContactInfoCard";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-primary">
          Contact Us
        </h2>
        <p className="mt-4 text-base-content/70 max-w-xl mx-auto">
          Have questions, feedback, or need help finding the right tutor?
          We're here to help — just reach out.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        <div className="space-y-6">
          <ContactInfoCard
            title="Email Us"
            description="Reach out anytime"
            value="support@etuitionbd.com"
          />

          <ContactInfoCard
            title="Call Us"
            description="Available during working hours"
            value="+880 1XXX-XXXXXX"
          />

          <ContactInfoCard
            title="Location"
            description="Serving students across Bangladesh"
            value="Online Platform · Bangladesh"
          />

          <p className="text-sm text-base-content/60">
            Our support team usually responds within 24 hours.
          </p>
        </div>

        {/* Right: Contact Form */}
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
