import React, { useState } from "react";
import Swal from "sweetalert2";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";

const JobCard = ({ title, location, type, description }) => {
  const handleApply = () => {
    Swal.fire({
      icon: "info",
      title: "Feature under development",
      text: "The application system will be available soon.",
      confirmButtonColor: "#0043c1",
    });
  };

  return (
    <div className="bg-base-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      <h3 className="text-xl font-semibold text-neutral-content">{title}</h3>
      <p className="text-sm text-neutral-content mt-1">
        {location} &middot; {type}
      </p>
      <p className="text-base-content mt-3">{description}</p>
      <button
        onClick={handleApply}
        className="btn btn-primary mt-4 rounded-full"
      >
        Apply Now
      </button>
    </div>
  );
};

const Career = () => {
  const [jobs] = useState([
    {
      title: "Frontend Developer",
      location: "Remote / Dhaka, Bangladesh",
      type: "Full-time",
      description:
        "Work on our React + Tailwind platform to improve student and tutor experiences.",
    },
    {
      title: "Backend Developer",
      location: "Remote / Dhaka, Bangladesh",
      type: "Full-time",
      description:
        "Build APIs, manage databases, and ensure smooth payment & messaging systems.",
    },
    {
      title: "UI/UX Designer",
      location: "Remote / Dhaka, Bangladesh",
      type: "Contract",
      description:
        "Design user-friendly interfaces and improve the platform's visual design.",
    },
    {
      title: "Content & Curriculum Specialist",
      location: "Remote",
      type: "Part-time",
      description:
        "Create educational resources and help maintain high-quality tuition content.",
    },
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "info",
      title: "Feature under development",
      text: "The CV submission form will be available soon.",
      confirmButtonColor: "#0043c1",
    });
  };

  return (
    <section className="py-16 px-6 min-h-screen">
      <SectionHeader
        title="Join Our Team"
        subtitle="Be a part of the eTuitionBD journey and make a difference in education"
      />

      <p className="text-center text-base-content max-w-2xl mx-auto mb-12">
        We’re looking for talented, passionate individuals who want to transform
        online education in Bangladesh. Explore our open positions below.
      </p>

      <div className="grid md:grid-cols-2 gap-6 bg-base-200 p-10 rounded-2xl max-w-7xl mx-auto">
        {jobs.map((job, i) => (
          <JobCard key={i} {...job} />
        ))}
      </div>

      <section className="mt-16 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold text-center text-neutral-content mb-6">
          Didn’t find a role that fits?
        </h3>
        <p className="text-center text-base-content mb-6">
          You can still send us your CV and portfolio. We’re always looking for
          motivated talent.
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="input input-bordered w-full"
            required
          />
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            required
          />
          <textarea
            placeholder="Why do you want to join?"
            className="textarea textarea-bordered w-full"
            rows={4}
          ></textarea>
          <button type="submit" className="btn btn-primary rounded-full mt-2">
            Submit Application
          </button>
        </form>
      </section>
    </section>
  );
};

export default Career;
