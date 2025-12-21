import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import GradientButton from "../../Components/GradientButton/GradientButton";
import Swal from "sweetalert2";
import axios from "axios";

const Settings = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();


  const [uploadedPreview, setUploadedPreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

 
  useEffect(() => {
    if (!user) return;

    reset({
      name: user.displayName || "",
      phone: user.phone || "",
    });
  }, [user, reset]);

  const photoPreview = uploadedPreview || user?.photoURL || "";

  const onSubmit = async (data) => {
    try {
      let photoURL = user.photoURL || "";
      const name = data.name;
      const phone = data.phone;

    
      if (data.photo?.[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
          formData
        );

        photoURL = res.data.data.url;
      }

      if (
        name === user.displayName &&
        phone === user.phone &&
        photoURL === user.photoURL
      ) {
        return Swal.fire({
          icon: "info",
          title: "Nothing to update",
        });
      }
      await updateUserProfile({
        displayName: name,
        photoURL,
      });

      await axiosSecure.patch(`/users/${user.email}`, {
        name,
        phone,
        photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 2000,
        showConfirmButton: false,
      });

      setUploadedPreview("");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="label">Phone</label>
          <input
            type="text"
            {...register("phone")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Photo */}
        <div>
          <label className="label">Profile Photo</label>
          <input
            type="file"
            {...register("photo")}
            className="file-input file-input-secondary w-full"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setUploadedPreview(URL.createObjectURL(file));
              }
            }}
          />

          {photoPreview && (
            <img
              src={photoPreview}
              alt="preview"
              className="mt-2 w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>

        <GradientButton
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </GradientButton>
      </form>
    </div>
  );
};

export default Settings;
