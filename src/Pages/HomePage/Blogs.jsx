import React, { useState } from "react";

const blogs = [
  {
    title: "Top 5 Study Tips for Students",
    excerpt:
      "Learn how to improve your focus, manage your time, and maximize your learning efficiency.",
    content:
      "Studying effectively requires planning, consistency, and smart techniques. Break your study sessions into manageable blocks, eliminate distractions, revise regularly, and prioritize understanding over memorization.",
    date: "Jan 5, 2026",
  },
  {
    title: "How to Prepare for Exams Effectively",
    excerpt:
      "A step-by-step guide to organize your studies, practice smartly, and reduce exam stress.",
    content:
      "Start early, create a realistic study schedule, practice past questions, and maintain a healthy routine. Proper preparation reduces anxiety and improves performance.",
    date: "Jan 2, 2026",
  },
  {
    title: "The Future of Online Education in Bangladesh",
    excerpt:
      "Discover trends, tools, and opportunities in e-learning that are transforming education.",
    content:
      "Online education in Bangladesh is rapidly evolving through digital platforms, personalized learning, and wider internet access. These changes are increasing educational reach and flexibility.",
    date: "Dec 28, 2025",
  },
];

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <>
      <section className="bg-base-200 rounded-2xl mt-10 py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-neutral mb-10">
          Latest Blogs
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="card bg-base-100 border border-base-300 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="card-body">
                <h3 className="card-title text-lg font-semibold text-neutral-content">
                  {blog.title}
                </h3>

                <p className="text-base-content leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between mt-6">
                  <span className="text-sm text-neutral-content opacity-70">
                    {blog.date}
                  </span>

                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="btn btn-sm btn-primary rounded-full"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedBlog && (
        <dialog className="modal modal-open">
          <div className="modal-box bg-base-100 max-w-2xl">
            <h3 className="text-2xl font-bold text-neutral mb-2">
              {selectedBlog.title}
            </h3>

            <p className="text-sm text-neutral-content opacity-70 mb-4">
              {selectedBlog.date}
            </p>

            <p className="text-base-content leading-relaxed">
              {selectedBlog.content}
            </p>

            <div className="modal-action">
              <button
                onClick={() => setSelectedBlog(null)}
                className="btn btn-outline btn-primary"
              >
                Close
              </button>
            </div>
          </div>

          {/* backdrop */}
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={() => setSelectedBlog(null)}
          >
            <button>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default Blogs;
