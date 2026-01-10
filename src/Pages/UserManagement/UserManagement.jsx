import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "../../Components/Pagination/Pagination";
import { FiAlertTriangle, FiTrash2, FiUserCheck, FiUserX } from "react-icons/fi";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user: USER1 } = useAuth();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    email: "",
  });

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["users", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", { params: filters });
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleMakeAdmin = async (user) => {
    const result = await Swal.fire({
      title: "Make Admin?",
      text: `${user.name} will get full admin access.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make admin",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${user._id}/role`, {
        role: "admin",
      });

      Swal.fire({
        title: "Success!",
        text: `${user.name} is now an admin.`,
        icon: "success",
      });

      queryClient.invalidateQueries(["users"]);
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: "Could not update user role.",
        icon: "error",
      });
      console.error(error);
    }
  };
  const handleRemoveAdmin = async (user) => {
    const result = await Swal.fire({
      title: "Remove Admin?",
      text: `${user.name} will lose admin privileges.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${user._id}/role`, {
        role: "student",
      });

      Swal.fire("Updated!", "Admin role removed.", "success");
      queryClient.invalidateQueries(["users"]);
    } catch (error) {
      console.error("Remove admin failed", error);
      Swal.fire("Error", "Failed to remove admin role.", "error");
    }
  };

  const handleTempBan = async (user) => {
    const result = await Swal.fire({
      title: "Temporarily ban user?",
      text: `${user.name} will be restricted from actions.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, ban",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${user._id}/role`, {
        isBanned: true,
      });

      Swal.fire({
        title: "Banned!",
        text: `${user.name} has been temporarily banned.`,
        icon: "success",
      });

      queryClient.invalidateQueries(["users"]);
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: "Failed to ban user.",
        icon: "error",
      });
      console.error(error);
    }
  };
  const handleUnban = async (user) => {
    const result = await Swal.fire({
      title: "Remove Ban?",
      text: `${user.name} will regain full access.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, unban",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${user._id}/role`, {
        isBanned: false,
      });

      Swal.fire("Unbanned!", "User access restored.", "success");
      queryClient.invalidateQueries(["users"]);
    } catch (error) {
      console.error("Unban failed", error);
      Swal.fire("Error", "Failed to unban user.", "error");
    }
  };

  const handleDeleteUser = async (user) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: `This will permanently delete ${user.name}.`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/users/${user._id}`);

      Swal.fire({
        title: "Deleted!",
        text: "User has been deleted.",
        icon: "success",
      });

      queryClient.invalidateQueries(["users"]);
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: "Failed to delete user.",
        icon: "error",
      });
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars text-primary loading-xl"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-center text-error">Failed to load users</div>
    );
  }

  const { users, totalPages } = data;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary mb-2">
          User Management
        </h1>
        <p className="text-neutral-content">
          Manage users, roles, and actions.
        </p>
      </div>

      {/* Email filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Filter by email"
          className="input input-bordered w-full md:w-64"
          value={filters.email}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, email: e.target.value, page: 1 }))
          }
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-200 rounded-2xl border border-base-300">
        {isFetching && (
          <progress className="progress progress-primary w-full mb-4" />
        )}

        <table className="table table-zebra w-full align-middle">
          <thead className="bg-primary/40 text-primary-content">
            <tr>
              <th className="ml-2">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td className="ml-2">
                  {(filters.page - 1) * filters.limit + idx + 1}
                </td>
                {/* Name + Photo */}
                <td>
                  <div className="flex items-center gap-2">
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <span className="font-semibold">{user.name}</span>
                  </div>
                </td>

                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge badge-sm capitalize font-semibold
                    ${
                      user.role === "student"
                        ? "badge-primary"
                        : user.role === "tutor"
                        ? "badge-accent"
                        : user.role === "admin"
                        ? "badge-error text-white"
                        : "badge-neutral"
                    }
                    `}
                  >
                    {user.role || "user"}
                  </span>
                </td>

                {/* Admin Action */}
                <td>
                  {user.role !== "admin" ? (
                    <button
                      className="btn btn-xs btn-success btn-outline flex items-center gap-1 hover:text-white flex-nowrap"
                      onClick={() => handleMakeAdmin(user)}
                    >
                      <FiUserCheck />
                      <span>Make</span>
                      <span>Admin</span>
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-error btn-outline flex items-center gap-1 hover:text-white flex-nowrap"
                      onClick={() => handleRemoveAdmin(user)}
                    >
                      <FiUserX />
                      <span>Remove</span>
                      <span>Admin</span>
                    </button>
                  )}
                </td>

                {/* Other Actions */}
                <td>
                  <div className="flex items-center gap-2">
                    {USER1.email === "rafi70722@gmail.com" ? (
                      <button
                        className="btn btn-xs btn-error btn-outline flex items-center hover:text-white gap-1"
                        onClick={() => handleDeleteUser(user)}
                      >
                        <FiTrash2 /> Delete
                      </button>
                    ) : (
                      <span className="badge badge-sm badge-error text-white font-semibold">
                        Protected
                      </span>
                    )}

                    {user.isBanned ? (
                      <button
                        className="btn btn-xs btn-success btn-outline hover:text-white flex items-center gap-1"
                        onClick={() => handleUnban(user)}
                      >
                        <FiUserCheck /> Unban
                      </button>
                    ) : (
                      <button
                        className="btn btn-xs btn-warning btn-outline hover:text-white flex items-center gap-1"
                        onClick={() => handleTempBan(user)}
                      >
                        <FiUserX /> Ban
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 mb-2 flex items-center justify-center gap-2 text-sm text-warning font-semibold">
  <FiAlertTriangle className="w-5 h-5" />
  <span>Delete user is protected for security purposes.</span>
</div>
      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      </div>
    </div>
  );
};

export default UserManagement;
