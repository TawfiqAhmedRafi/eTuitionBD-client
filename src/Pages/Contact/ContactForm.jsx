import { toast } from "react-toastify";

const ContactForm = () => {
    const handleSubmit = (e) =>{
    e.preventDefault();
    toast.success("Message sent successfully!");
    e.target.reset();
    }
  return (
    <div className="bg-base-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-secondary">
        Send us a message
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message here..."
            className="textarea textarea-bordered w-full mt-1"
          ></textarea>
        </div>

        <button className="btn btn-secondary w-full">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
