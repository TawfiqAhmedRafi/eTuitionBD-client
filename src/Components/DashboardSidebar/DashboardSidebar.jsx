import { Link, NavLink } from "react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Users,
  GraduationCap,
  CreditCard,
  ChevronLeft,
  Settings,
  Star,
} from "lucide-react";
import useUserRole from "../../hooks/useUserRole";
import { FiSend } from "react-icons/fi";
import { FaMoneyBill } from "react-icons/fa";

const allMenuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "tutor", "student"],
  },
  {
    name: "My Tuitions",
    path: "/dashboard/my-tuitions",
    icon: BookOpen,
    roles: ["student"],
  },
  {
    name: "Post Tuitions",
    path: "/post-tuition",
    icon: FiSend,
    roles: ["student"],
  },
  {
    name: "Received Applications",
    path: "/dashboard/applications",
    icon: FileText,
    roles: ["student"],
  },
  {
    name: "Payments",
    path: "/dashboard/payments",
    icon: CreditCard,
    roles: ["student"],
  },
  {
    name: "My Tuitions",
    path: "/dashboard/my-tuitions/tutor",
    icon: BookOpen,
    roles: ["tutor"],
  },
  {
    name: "Income",
    path: "/dashboard/revenue",
    icon: FaMoneyBill,
    roles: ["tutor"],
  },
  {
    name: "Reviews",
    path: "/dashboard/review",
    icon: Star,
    roles: ["tutor"],
  },

  {
    name: "My Applications",
    path: "/dashboard/applications/tutor",
    icon: FileText,
    roles: ["tutor"],
  },
  {
    name: "Users Management",
    path: "/dashboard/users",
    icon: Users,
    roles: ["admin"],
  },
  {
    name: "Approve Tutors",
    path: "/dashboard/tutors",
    icon: GraduationCap,
    roles: ["admin"],
  },
  {
    name: "Payments",
    path: "/dashboard/payments/all",
    icon: CreditCard,
    roles: ["admin"],
  },

  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
    roles: ["admin", "tutor", "student"],
  },
];

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { role } = useUserRole();
  

  // Filter menu items based on role
  const menuItems = allMenuItems.filter((item) => item.roles.includes(role));
  
  return (
    <aside
      className={`h-screen sticky top-0 flex flex-col
      transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}
      bg-base-100 border-r border-base-300`}
    >
      {/* Brand */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-base-300">
        {!collapsed && (
          <Link
            to="/"
            className="text-xl font-bold bg-linear-to-r from-[#0043c1] via-[#11c4dc] to-[#0297f3] dark:from-[#0b1b37] dark:via-[#11c4dc] dark:to-[#0297f3] bg-clip-text text-transparent"
          >
            ETUITIONBD
          </Link>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="btn btn-ghost btn-sm"
        >
          <ChevronLeft
            className={`w-5 h-5 transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const link = (
            <NavLink
              to={item.path}
              end
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5
                text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-primary text-primary-content shadow-sm"
                    : "text-base-content hover:bg-base-200"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
          return collapsed ? (
            <div
              key={item.path}
              className="tooltip tooltip-right tooltip-primary"
              data-tip={item.name}
            >
              {link}
            </div>
          ) : (
            <div key={item.path}>{link}</div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-base-300 text-xs text-neutral-content text-center">
        {!collapsed && "© eTuitionBD"}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
