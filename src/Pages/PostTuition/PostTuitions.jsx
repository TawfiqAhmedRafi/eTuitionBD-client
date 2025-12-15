import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
;
import GradientButton from "../../Components/GradientButton/GradientButton";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { v4 as uuidv4 } from "uuid";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PostTuition = () => {
  const { register, handleSubmit, reset } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [subjects, setSubjects] = useState([]);
  const [subjectInput, setSubjectInput] = useState("");

  const addSubject = (e) => {
    e.preventDefault();
    const value = subjectInput.trim();
    if (value && !subjects.includes(value)) {
      setSubjects([...subjects, value]);
      setSubjectInput("");
    }
  };

  const removeSubject = (sub) => {
    setSubjects(subjects.filter((s) => s !== sub));
  };

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post("/tuitions", payload);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Tuition Posted",
        text: "Your tuition has been posted . Tutors will apply and you can contact them soon.",
        timer: 1800,
        showConfirmButton: false,
      });
      reset();
      setSubjects([]);
    },
  });

  const onSubmit = (data) => {
    if (!subjects.length) {
      return Swal.fire(
        "Subjects required",
        "Add at least one subject",
        "warning"
      );
    }

    const payload = {
      email: user?.email,
      subjects,
      classLevel: data.classLevel,  
      district: data.city,
      location: data.area,
      days: data.days,
      time: data.time,
      duration: data.duration,
      minBudget: Number(data.minBudget),
      maxBudget: Number(data.maxBudget),
      description: data.description,
      mode: data.mode,
      idempotencyKey: uuidv4(),
    };
    console.log("Submitting tuition:", payload);
    mutation.mutate(payload);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="bg-base-100/70 backdrop-blur-xl border border-base-300/40 rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Post a Tuition</h2>
        <p className="text-center text-base-content/70 mb-10">
          Fill in the details below to find the right tutor for you
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Subjects */}
          <div className="bg-base-200/50 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Subjects & Class</h3>

            <label className="text-sm font-medium">Subjects</label>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                placeholder="Add subject"
                className="input input-bordered flex-1"
              />
              <button onClick={addSubject} className="btn btn-secondary">
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {subjects.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 bg-secondary rounded-full flex items-center gap-2"
                >
                  {s}
                  <button type="button" onClick={() => removeSubject(s)}>
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <label className="text-sm font-medium mt-4 block">
              Class Level
            </label>
            <input
              {...register("classLevel", { required: true })}
              placeholder="Class 9 / SSC / HSC"
              className="input input-bordered w-full mt-2"
            />
          </div>

          {/* Location */}
          <div className="bg-base-200/50 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("city", { required: true })}
                placeholder="City"
                className="input input-bordered"
              />
              <input
                {...register("area", { required: true })}
                placeholder="Area"
                className="input input-bordered"
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-base-200/50 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Schedule</h3>

            <input
              type="number"
              min={1}
              max={7}
              {...register("days", { required: true, valueAsNumber: true })}
              placeholder="Days per week"
              className="input input-bordered w-full"
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <select
                {...register("time", { required: true })}
                className="select select-bordered"
                defaultValue=""
              >
                <option disabled value="">
                  Select preferred time
                </option>
                <option value="any">Any</option>
                <option value="morning">Morning</option>
                <option value="noon">Noon</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
              <input
                {...register("duration")}
                placeholder="Duration (hrs)"
                className="input input-bordered"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="bg-base-200/50 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Budget</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                {...register("minBudget", { required: true })}
                placeholder="Minimum"
                className="input input-bordered"
              />
              <input
                type="number"
                {...register("maxBudget", { required: true })}
                placeholder="Maximum"
                className="input input-bordered"
              />
            </div>
          </div>

          {/* Meta */}
          <div className="bg-base-200/50 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Additional Info</h3>

            <select
              {...register("mode", { required: true })}
              className="select select-bordered w-full"
            >
              <option>Offline</option>
              <option>Online</option>
              <option>Hybrid</option>
            </select>

            <textarea
              {...register("description")}
              rows={4}
              placeholder="Describe your tuition requirements"
              className="textarea textarea-bordered w-full mt-4"
            />
          </div>

          <GradientButton type="submit" className="w-full py-3 text-lg">
            {mutation.isLoading ? "Posting..." : "Post Tuition"}
          </GradientButton>
        </form>
      </div>
    </div>
  );
};

export default PostTuition;
