import React, { useState } from "react";
import teacherImg from "../../assets/teacher.png";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import GradientButton from "../../Components/GradientButton/GradientButton";
import Swal from "sweetalert2";
import axios from "axios";

const ApplyTutor = () => {
  const { register, handleSubmit } = useForm();
  const axiosInstance = useAxios();
  const { user } = useAuth();

  const [subjects, setSubjects] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addSubject = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "" && !subjects.includes(inputValue.trim())) {
      setSubjects([...subjects, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeSubject = (sub) => {
    setSubjects(subjects.filter((s) => s !== sub));
  };

  const handleApplyTutor = (data) => {
    // Normalize experience
    const idCardImg = data.idCard[0];
    const formData = new FormData();
    formData.append("image", idCardImg);
    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;
    axios.post(image_API_URL, formData).then((res) => {
      const idCardURL = res.data.data.url;
      const finalData = {
        name: user?.displayName,
        email: user?.email,
        qualification: data.qualification,
        institution: data.institution || "",
        idCardURL: idCardURL,
        experienceYears: Number(data.experienceYears) || 0,
        experienceMonths: Number(data.experienceMonths) || 0,
        subjects,
        time : data.time,
        district: data.district,
        location: data.location,
        salary: Number(data.salary),
        mode: data.mode,
        bio: data.bio,
      };
      console.log(finalData);
      axiosInstance.post("/tutors", finalData).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your tutor application has been submitted!",
            text: "Our team will review it within 7 days.",
            showConfirmButton: false,
            timer: 1800,
          });
        }
      });
    });
  };

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Container */}
        <div
          className="
        bg-base-100/60 
        backdrop-blur-xl 
        rounded-3xl 
        shadow-xl 
        border border-base-300/40
        p-6 md:p-12
      "
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h2
              className=" text-4xl
        font-bold 
              bg-linear-to-r 
                from-[#0043c1] via-[#11c4dc] to-[#0297f3]
              dark:from-[#0b1b37] dark:via-[#11c4dc] dark:to-[#0297f3]
              bg-clip-text 
              text-transparent
          "
            >
              Become a Verified Tutor
            </h2>

            <p className="text-base text-base-content/80 mt-2 max-w-xl mx-auto">
              Share your skills and help thousands of students learn better.
              Submit your teaching profile to join our verified tutor community.
            </p>
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* FORM */}
            <form
              onSubmit={handleSubmit(handleApplyTutor)}
              className="space-y-6 text-base-content"
            >
              {/* Basic Card */}
              <div className="p-6 bg-base-200/50  rounded-2xl border border-base-300/40">
                <h3 className="text-xl font-semibold mb-4">
                  Basic Information
                </h3>

                <div className="space-y-3 ">
                  <div>
                    <label className="font-medium text-sm">Full Name</label>
                    <input
                      type="text"
                      {...register("name")}
                      defaultValue={user?.displayName}
                      readOnly
                      className="input input-bordered w-full mt-1"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-sm">Email</label>
                    <input
                      type="email"
                      {...register("email")}
                      defaultValue={user?.email}
                      readOnly
                      className="input input-bordered w-full mt-1"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-sm">Qualification</label>
                    <select
                      {...register("qualification")}
                      className="select select-bordered w-full mt-1"
                    >
                      <option>Undergraduate (Running)</option>
                      <option>Undergraduate (Completed)</option>
                      <option>BSc Engineering</option>
                      <option>BBA</option>
                      <option>MBA</option>
                      <option>MSc</option>
                      <option>MBBS</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-sm">Institution</label>
                    <input
                      type="text"
                      {...register("institution")}
                      placeholder="e.g. RUET, BUET, DU"
                      className="input input-bordered w-full mt-1"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-sm">
                      Upload Student ID
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      {...register("idCard")}
                      className="file-input file-input-secondary w-full mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Experience + Subjects */}
              <div className="p-6 bg-base-200/50 rounded-2xl  border border-base-300/40">
                <h3 className="text-xl font-semibold mb-4">
                  Experience & Subjects
                </h3>
                <label className="label mt-2 text-base-content  font-medium text-sm">
                  Teaching Experience
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    {...register("experienceYears")}
                    placeholder="Years"
                    className="input input-bordered w-full"
                    min={0}
                  />

                  <input
                    type="number"
                    {...register("experienceMonths")}
                    placeholder="Months"
                    className="input input-bordered w-full"
                    min={0}
                    max={11}
                  />
                </div>

                {/* Subjects */}
                <label className="label mt-4 text-base-content font-medium text-sm">
                  Subjects
                </label>
                <div className="flex mt-2 gap-2">
                  <input
                    type="text"
                    className="input flex-1 placeholder:text-base-content"
                    placeholder="Add subject"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button onClick={addSubject} className="btn btn-secondary">
                    Add
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {subjects.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full bg-secondary text-base-content flex items-center gap-2"
                    >
                      {s}
                      <button
                        className="text-xs text-base-content"
                        onClick={() => removeSubject(s)}
                        type="button"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="p-6 bg-base-200/50 rounded-2xl border border-base-300/40">
                <h3 className="text-xl font-semibold mb-4">Preferences</h3>
                <label className="label mt-2 text-base-content font-medium text-sm">
                  Location
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    {...register("district")}
                    placeholder="District"
                    className="input input-bordered w-full"
                  />

                  <input
                    type="text"
                    {...register("location")}
                    placeholder="Area"
                    className="input input-bordered w-full"
                  />
                </div>

                <label className="label mt-2 text-base-content font-medium text-sm">
                  Expected Salary
                </label>
                <input
                  type="number"
                  {...register("salary")}
                  placeholder="Expected Minimum Salary"
                  className="input input-bordered w-full mt-3"
                />
                <label className="label mt-2 text-base-content font-medium text-sm">
                  Preferred Time
                </label>

                <select
                  {...register("time", { required: true })}
                  className="select select-bordered w-full mt-3"
                  defaultValue=""
                >
                  <option disabled value="">
                    Select preferred time
                  </option>
                  <option value="morning">Morning</option>
                  <option value="noon">Noon</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
                <label className="label mt-2 text-base-content font-medium text-sm">
                  Teaching Mode
                </label>
                <select
                  {...register("mode")}
                  className="select select-bordered w-full mt-3"
                >
                  <option>Online</option>
                  <option>Offline</option>
                  <option>Hybrid</option>
                </select>

                <label className="label mt-2 text-base-content font-medium text-sm">
                  Bio
                </label>
                <textarea
                  {...register("bio")}
                  className="textarea textarea-bordered w-full mt-3"
                  rows={4}
                  placeholder="Short bio about your teaching style"
                ></textarea>
              </div>

              <GradientButton type="submit" className="w-full text-lg py-3">
                Submit Application
              </GradientButton>
            </form>

            <div className="hidden md:flex justify-center items-start">
              <img
                src={teacherImg}
                className="w-[85%] rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyTutor;
