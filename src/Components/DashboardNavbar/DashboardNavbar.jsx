import { useState } from "react";
import { Bell, X } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import GradientButton from "../GradientButton/GradientButton";
import { formatDistanceToNow } from "date-fns";
import Swal from "sweetalert2";

const DashboardNavbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch notifications with react-query
  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/notifications");
      // ensure it's an array
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!user?.email, // only fetch if user exists
    refetchInterval: 10000,
  });

  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n) => !n.isRead).length
    : 0;

  const markAsRead = async (id) => {
    try {
      await axiosSecure.patch(`/notifications/${id}/read`);
      queryClient.setQueryData(["notifications"], (prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axiosSecure.patch("/notifications/read-all");
      queryClient.setQueryData(["notifications"], (prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (err) {
      console.error(err);
    }
  };
  const deleteNotification = async (id) => {
    try {
      await axiosSecure.delete(`/notifications/${id}`);
      queryClient.setQueryData(["notifications"], (prev) =>
        prev.filter((n) => n._id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAllNotifications = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "All notifications will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete all",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await axiosSecure.delete("/notifications");

    queryClient.setQueryData(["notifications"], []);

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "All notifications have been deleted.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Could not delete notifications.",
    });
  }
};

  return (
    <header className="h-16 bg-base-100 border-b border-base-300 px-6 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-base-content">Dashboard</h2>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          className="relative btn btn-ghost btn-circle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-base-content" />
          {unreadCount > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 text-xs 
              flex items-center justify-center rounded-full 
              bg-primary text-primary-content"
            >
              {unreadCount}
            </span>
          )}
        </button>

        {/* Sidebar */}
        {sidebarOpen && (
          <div className="fixed top-0 right-0 h-full w-80 bg-base-200 backdrop-blur-md shadow-xl z-50 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-base-300">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {notifications.length === 0 ? (
                <p className="text-sm text-neutral-content text-center mt-4">
                  No notifications
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n._id}
                    className={`relative p-3 rounded-lg transition 
                    ${!n.isRead ? "bg-base-300" : "hover:bg-base-200"}`}
                  >
                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // ⛔ stop navigation
                        deleteNotification(n._id);
                      }}
                      className="absolute top-2 right-2 text-neutral-content hover:text-error"
                      aria-label="Delete notification"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Clickable content */}
                    <div
                      onClick={() => {
                        markAsRead(n._id);
                        if (n.link) window.location.href = n.link;
                      }}
                      className="cursor-pointer"
                    >
                      <p className="font-semibold">{n.title}</p>
                      <p className="text-sm text-neutral-content truncate">
                        {n.message}
                      </p>
                      <span className="text-xs text-neutral-content">
                        {formatDistanceToNow(new Date(n.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 border-t border-base-300 flex gap-2">
                <button className="btn btn-sm flex-1" onClick={markAllAsRead}>
                  Mark All Read
                </button>

                <button
                  className="btn btn-sm btn-error flex-1 text-white"
                  onClick={deleteAllNotifications}
                >
                  Delete All
                </button>
              </div>
            )}
          </div>
        )}

        {/* User Info */}
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-base-content">
            {user?.displayName || "User"}
          </p>
          <p className="text-xs text-neutral-content">{user?.email}</p>
        </div>

        <img
          src={user?.photoURL || "https://i.ibb.co/2kR5Fz0/user.png"}
          alt="User"
          className="w-9 h-9 rounded-full border border-base-300 object-cover"
        />

        {/* Logout */}
        <GradientButton onClick={logOut} className="btn btn-sm">
          Logout
        </GradientButton>
      </div>
    </header>
  );
};

export default DashboardNavbar;
