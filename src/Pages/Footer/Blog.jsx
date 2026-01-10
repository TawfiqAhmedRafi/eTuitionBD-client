import React, { useState } from "react";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import { FaArrowRight, FaTimes } from "react-icons/fa";

const blogs = [
  {
    title: "Top 5 Study Tips for Students",
    excerpt:
      "Learn how to improve your focus, manage your time, and maximize your learning efficiency.",
    content: `1. Set clear goals for each study session.\n
2. Use active recall and spaced repetition.\n
3. Minimize distractions and create a study-friendly environment.\n
4. Take regular breaks to improve retention.\n
5. Review notes regularly and track your progress.`,
    date: "Jan 5, 2026",
  },
  {
    title: "How to Prepare for Exams Effectively",
    excerpt:
      "A step-by-step guide to organize your studies, practice smartly, and reduce exam stress.",
    content: `1. Start early and create a revision schedule.\n
2. Practice past papers and sample questions.\n
3. Focus on weak areas but don’t ignore strengths.\n
4. Stay healthy: eat well and sleep enough.\n
5. Use techniques like mind-maps and flashcards.`,
    date: "Jan 2, 2026",
  },
  {
    title: "The Future of Online Education in Bangladesh",
    excerpt:
      "Discover trends, tools, and opportunities in e-learning that are transforming education.",
    content: `Online education in Bangladesh is rapidly growing with tools like live classes, interactive learning platforms, and AI-based tutoring. The focus is on accessibility, flexibility, and personalized learning paths for students.`,
    date: "Dec 28, 2025",
  },
  {
    title: "Maximizing Tutor-Student Collaboration",
    excerpt:
      "Tips for effective communication, feedback, and better learning outcomes.",
    content: `Effective collaboration includes:\n
- Setting clear expectations\n
- Regular feedback\n
- Open communication\n
- Collaborative goal setting\n
- Leveraging digital tools for engagement`,
    date: "Dec 20, 2025",
  },
  {
    title: "How to Choose the Right Tutor",
    excerpt:
      "A guide for students to select a qualified tutor based on experience, ratings, and compatibility.",
    content: `Consider these points when choosing a tutor:\n
1. Subject expertise and experience\n
2. Student reviews and ratings\n
3. Teaching style and compatibility\n
4. Availability and flexibility\n
5. Price and value for money`,
    date: "Dec 15, 2025",
  },
];

const BlogCard = ({ title, excerpt, date, onReadMore }) => (
  <div className="bg-base-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-semibold text-neutral-content">{title}</h3>
      <p className="text-base-content mt-2">{excerpt}</p>
    </div>
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-neutral-content opacity-70">{date}</span>
      <button
        onClick={onReadMore}
        className="flex items-center gap-2 text-primary font-medium hover:underline"
      >
        Read More <FaArrowRight />
      </button>
    </div>
  </div>
);

const Blog = () => {
  const [activeBlog, setActiveBlog] = useState(null);

  const openModal = (blog) => setActiveBlog(blog);
  const closeModal = () => setActiveBlog(null);

  return (
    <section className="py-16 px-6 bg-base-200 rounded-2xl m-5 min-h-screen">
      <SectionHeader
        title="Our Blog"
        subtitle="Insights, tips, and updates on online learning"
      />

      <p className="text-center text-base-content max-w-3xl mx-auto mb-12">
        Explore our latest articles on education, online learning strategies, and
        tips for both students and tutors.
      </p>

      <div className="grid md:grid-cols-3  rounded-2xl gap-8 max-w-7xl mx-auto">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            {...blog}
            onReadMore={() => openModal(blog)}
          />
        ))}
      </div>

      {/* Modal */}
      {activeBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-base-100 rounded-2xl shadow-xl max-w-2xl w-full p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-2xl text-neutral-content hover:text-primary"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-neutral-content">
              {activeBlog.title}
            </h2>
            <p className="text-sm text-neutral-content opacity-70 mb-4">
              {activeBlog.date}
            </p>
            <div className="text-base-content whitespace-pre-line">
              {activeBlog.content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
