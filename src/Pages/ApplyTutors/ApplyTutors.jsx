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
            text: "Our moderator will review it within 7 days.",
            showConfirmButton: false,
            timer: 1800,
          });
        }
      });
    });
  };

  return (
    <div className="bg-base-200 my-16 py-6 rounded-2xl px-4">
      <div className="bg-base-100 p-10 md:p-20 rounded-2xl max-w-7xl mx-auto shadow-sm">
        {/* Header */}
        <h2 className="text-4xl py-3 font-bold text-base-content">
          Apply to Become a Tutor
        </h2>
        <p className="text-sm pb-2 text-base-content">
          Help students learn and grow with your skills. Submit your application
          with your qualifications, experience and preferred teaching details.
        </p>

        <div className="border-t border-dashed my-6"></div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Form Section */}
          <form
            onSubmit={handleSubmit(handleApplyTutor)}
            className="text-base-content flex-1 w-full"
          >
            <fieldset className="fieldset w-full">
              <h4 className="text-2xl font-bold mb-4 text-base-content">
                Basic Information
              </h4>

              {/* Name */}
              <label className="label text-base-content">Full Name</label>
              <input
                type="text"
                {...register("name")}
                className="input w-full"
                defaultValue={user?.displayName}
                readOnly
              />

              {/* Email */}
              <label className="label mt-4 text-base-content">Email</label>
              <input
                type="email"
                {...register("email")}
                className="input w-full"
                defaultValue={user?.email}
                readOnly
              />

              {/* Qualification */}
              <label className="label mt-4 text-base-content">
                Qualification
              </label>
              <select {...register("qualification")} className="select w-full">
                <option>Undergraduate (Running)</option>
                <option>Undergraduate (Completed)</option>
                <option>BSc (Engineering)</option>
                <option>BSc (Engineering Hons)</option>
                <option>BSc (Hons)</option>
                <option>BA (Hons)</option>
                <option>MBBS (Running)</option>
                <option>MBBS (Completed)</option>
                <option>BDS (Running)</option>
                <option>BDS (Completed)</option>
                <option>MSc</option>
                <option>MA</option>
                <option>BBA</option>
                <option>MBA</option>
              </select>

              {/* Institution */}
              <label className="label mt-4 text-base-content">
                Institution
              </label>
              <input
                type="text"
                {...register("institution")}
                className="input w-full"
                placeholder="e.g. University of Dhaka"
              />
              {/* ID Card Upload */}
              <label className="label mt-4 text-base-content">
                Upload Student ID Card
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("idCard")}
                className="file-input file-input-secondary w-full"
                placeholder="Your ID Card"
              />

              {/* Experience */}
              <label className="label mt-4 text-base-content">
                Teaching Experience
              </label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="number"
                    {...register("experienceYears", { valueAsNumber: true })}
                    className="input w-full"
                    placeholder="Years"
                    min={0}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    {...register("experienceMonths", { valueAsNumber: true })}
                    className="input w-full"
                    placeholder="Months"
                    min={0}
                    max={11}
                  />
                </div>
              </div>

              {/* Subjects */}
              <label className="label mt-4 text-base-content">Subjects</label>
              <div className="flex gap-2">
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

              {/* Location */}
              <label className="label mt-4 text-base-content">
                Preferred Location
              </label>
              <input
                type="text"
                {...register("location")}
                className="input w-full"
                placeholder="e.g. Dhanmondi, Mirpur, Online"
              />

              {/* Salary */}
              <label className="label mt-4 text-base-content">
                Expected Minimum Salary Range (BDT)
              </label>
              <input
                type="number"
                {...register("salary", { required: true, min: 0 })}
                className="input w-full"
                placeholder="e.g. 5000"
              />

              {/* Teaching Mode */}
              <label className="label mt-4 text-base-content">
                Teaching Mode
              </label>
              <select {...register("mode")} className="select w-full">
                <option>Online</option>
                <option>Offline</option>
                <option>Hybrid</option>
              </select>

              {/* Bio */}
              <label className="label mt-4 text-base-content">Bio</label>
              <textarea
                {...register("bio")}
                className="textarea w-full placeholder:text-base-content"
                placeholder="Tell us about your teaching style, strengths, and experience"
              ></textarea>
            </fieldset>

            {/* Submit */}
            <GradientButton type="submit" className="w-full mt-6">
              Submit Application
            </GradientButton>
          </form>

          {/* Image section */}
          <div className="flex-1 hidden md:block">
            <img src={teacherImg} alt="tutorImg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyTutor;
