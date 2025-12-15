import { Bell } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import GradientButton from "../GradientButton/GradientButton";

const DashboardNavbar = () => {
  const { user, logOut } = useAuth();

  return (
    <header className="h-16 bg-base-100 border-b border-base-300 px-6 flex items-center justify-between">
      {/* Left: Page Title */}
      <h2 className="text-lg font-semibold text-base-content">
        Dashboard
      </h2>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button
          className="relative btn btn-ghost btn-circle"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-base-content" />

          
          <span className="absolute -top-1 -right-1 w-5 h-5 text-xs 
            flex items-center justify-center rounded-full 
            bg-primary text-primary-content">
            3
          </span>
        </button>

        {/* User Info */}
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-base-content">
            {user?.displayName || "User"}
          </p>
          <p className="text-xs text-neutral-content">
            {user?.email}
          </p>
        </div>

        <img
          src={user?.photoURL || "https://i.ibb.co/2kR5Fz0/user.png"}
          alt="User"
          className="w-9 h-9 rounded-full border border-base-300 object-cover"
        />

        {/* Logout */}
        <GradientButton
          onClick={logOut}
          className="btn btn-sm"
        >
          Logout
        </GradientButton>
      </div>
    </header>
  );
};

export default DashboardNavbar;
