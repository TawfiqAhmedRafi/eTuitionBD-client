import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewModal = ({ tuition, onClose ,onSuccess  }) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm();

  const onSubmit = async (data) => {
    try {
      await axiosSecure.post("/reviews", {
        tuitionId: tuition._id,
        rating: data.rating,
        review: data.review,
      });

      Swal.fire("Thank you!", "Your review has been submitted.", "success");
      reset();
      onClose();
       if (onSuccess) onSuccess()
    } catch (err) {
      console.error("Review submit error:", err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to submit review",
        "error"
      );
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          Review Tutor – {tuition.tutorName}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="label font-medium">Rating</label>
            <select
              className="select select-bordered w-full"
              {...register("rating", { required: true })}
            >
              <option value="">Select rating</option>
              <option value="5">★★★★★ (5)</option>
              <option value="4">★★★★☆ (4)</option>
              <option value="3">★★★☆☆ (3)</option>
              <option value="2">★★☆☆☆ (2)</option>
              <option value="1">★☆☆☆☆ (1)</option>
            </select>
            {errors.rating && (
              <p className="text-error text-sm mt-1">Rating is required</p>
            )}
          </div>

          {/* Review */}
          <div>
            <label className="label font-medium">Review</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write your experience (optional)"
              rows={4}
              {...register("review")}
            />
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>

      {/* backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};
export default ReviewModal;
