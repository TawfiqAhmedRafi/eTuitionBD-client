import React, { useState } from "react";
import { motion as MOTION, AnimatePresence } from "framer-motion";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Our Story", "Our Mission", "Our Impact", "Trust & Policies"];

  const tabContents = [
    <>
      <p className="mb-4">
        eTuitionBD was created with a simple belief — every student deserves
        access to the right tutor at the right time. Traditional tutoring is
        often slow, unstructured, and difficult to trust. We wanted to change
        that.
      </p>
      <p className="mb-4">
        Starting as a small idea to bridge the gap between students and
        qualified tutors, eTuitionBD has grown into a structured, transparent
        platform that connects learners with verified tutors for personalized
        1-on-1 guidance.
      </p>
      <p className="mb-4">
        Whether it’s academic support, exam preparation, or skill development,
        our platform is designed to make finding a tutor simple, fast, and
        reliable — without unnecessary complexity.
      </p>
    </>,
    <>
      <p className="mb-4">
        Our mission is to make quality education more accessible through smart
        technology and human connection. We aim to eliminate confusion in
        tutoring by providing clear information, verified profiles, and fair
        matching.
      </p>
      <p className="mb-4">
        We focus on transparency, safety, and learning outcomes. From tutor
        verification to student-tutor matching, every feature is designed to
        support meaningful, distraction-free learning experiences.
      </p>
      <p className="mb-4">
        By continuously improving our platform and listening to real student
        feedback, we strive to build an ecosystem where learning feels guided,
        personal, and effective.
      </p>
    </>,
    <>
      <p className="mb-4">
        Thousands of students and tutors use eTuitionBD to connect, learn, and
        grow together. Our impact is measured by successful matches, improved
        academic performance, and long-term trust within our community.
      </p>
      <p className="mb-4">
        Tutors benefit from fair opportunities and structured visibility, while
        students gain confidence through personalized support. Every successful
        session represents a step toward better learning outcomes.
      </p>
      <p className="mb-4">
        As the platform grows, our focus remains on quality over quantity —
        ensuring that each connection made through eTuitionBD truly adds value.
      </p>
    </>,
    <>
      <p className="mb-4">
        Trust is central to everything we do. Our policies are designed to
        protect students, guardians, and tutors by maintaining transparency at
        every step.
      </p>
      <p className="mb-4">
        We verify tutor profiles, moderate content, and follow clear guidelines
        to ensure a safe and respectful learning environment. Privacy and data
        protection are strictly maintained.
      </p>
      <p className="mb-4">
        Detailed terms, guidelines, and platform rules are available to help
        users clearly understand how eTuitionBD works. Our goal is to provide
        confidence, clarity, and peace of mind for everyone involved.
      </p>
    </>,
  ];

  return (
    <div className="bg-base-100 rounded-2xl md:p-14 p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary">About eTuitionBD</h2>
        <p className="text-sm mt-4 text-base-content">
          A trusted platform connecting students with verified tutors for
          personalized, 1-on-1 learning — simple, transparent, and effective.
        </p>
      </div>

      <div className="border-t my-8 border-base-300"></div>

      {/* Tabs */}
      <div className="w-full max-w-4xl">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab, index) => (
            <MOTION.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === index
                  ? "text-secondary border-b-2 border-secondary"
                  : "text-base-content/70 hover:text-secondary"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </MOTION.button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6 text-base-content/80 leading-relaxed">
          <AnimatePresence mode="wait">
            <MOTION.div
              key={activeTab} // re-trigger animation on tab change
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="mt-6 text-base-content/80 leading-relaxed"
            >
              {tabContents[activeTab]}
            </MOTION.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
