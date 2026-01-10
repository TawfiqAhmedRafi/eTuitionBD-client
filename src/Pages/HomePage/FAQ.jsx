import React from "react";

const faqs = [
  {
    question: "What is eTuition BD?",
    answer:
      "eTuition BD is a digital tuition-matching platform that connects students with verified tutors. The platform enables students to post tuition requirements and allows eligible tutors to apply based on subject expertise and location.",
  },
  {
    question: "How does the tuition posting process work for students?",
    answer:
      "Students can create a tuition post by specifying academic level, subject, district, preferred schedule, and budget. Once published, the post becomes visible to qualified tutors operating in the same district.",
  },
  {
    question: "Who can apply as a tutor?",
    answer:
      "Individuals who complete the tutor registration and verification process can apply as tutors. Verification helps ensure authenticity, quality, and reliability across the platform.",
  },
  {
    question: "How do tutors apply for tuition posts?",
    answer:
      "Verified tutors can browse available tuition posts and submit applications only to those that match their registered district and subject qualifications.",
  },
  {
    question: "Can multiple tutors apply for a single tuition post?",
    answer:
      "Yes. A tuition post may receive multiple applications. This allows students to compare tutor profiles, experience, and credentials before making a selection.",
  },
  {
    question: "How does a student select a tutor?",
    answer:
      "Students can review all received tutor applications and accept one tutor based on their preferences. Once accepted, the tuition is considered confirmed.",
  },
  {
    question: "How are payments processed?",
    answer:
      "After tutor acceptance, students can securely complete payments through Stripe. The platform ensures encrypted and reliable payment processing.",
  },
  {
    question: "Is communication supported within the platform?",
    answer:
      "Yes. Once a tutor is accepted, both parties gain access to an in-platform messaging system to coordinate schedules, lessons, and other details.",
  },
  {
    question: "Does eTuitionBD provide notifications?",
    answer:
      "The platform includes a notification system that keeps users informed about tuition applications, tutor selection, messages, and payment updates.",
  },
  {
    question: "Can students provide feedback after tuition completion?",
    answer:
      "Yes. Upon completion of a tuition, students can submit reviews and ratings for tutors. This feedback helps maintain transparency and service quality.",
  },
];


const FAQ = () => {
  return (
    <section className="bg-base-200 rounded-2xl mt-10 py-12 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-neutral mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl transform transition-transform duration-300 hover:scale-[1.01]"
            >
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium text-base-content">
                {faq.question}
              </div>
              <div className="collapse-content text-base-content">
                <p className="leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
