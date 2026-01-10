import React, { useState } from "react";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import Swal from "sweetalert2";

const Support = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show SweetAlert placeholder
    Swal.fire({
      icon: "info",
      title: "Feature under development",
      text: "Our support system will be available soon. Thank you for your patience!",
      confirmButtonColor: "#0043c1",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-16 px-6 bg-base-200 rounded-2xl m-5 min-h-screen">
      <SectionHeader
        title="Support & Contact"
        subtitle="Need help? Reach out to our support team"
      />

      <p className="text-center text-base-content max-w-3xl mx-auto mb-12">
        Our support team is here to assist students and tutors. Fill out the
        form below or check our FAQs for quick answers.
      </p>

      <div className="max-w-3xl mx-auto bg-base-100 rounded-2xl p-8 shadow-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary rounded-full mt-2"
          >
            Send Message
          </button>
        </form>
      </div>

      <section className="mt-16 max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-semibold text-neutral-content mb-6">
          FAQs & Quick Help
        </h3>
        <p className="text-base-content mb-4">
          Check our <a href="/faq" className="text-primary hover:underline">FAQ page</a> for common questions.
        </p>
        <p className="text-base-content mb-2">📌 Platform issues</p>
        <p className="text-base-content mb-2">📌 Tutor verification</p>
        <p className="text-base-content mb-2">📌 Payments & refunds</p>
      </section>
    </section>
  );
};

export default Support;
