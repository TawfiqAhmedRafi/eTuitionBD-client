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
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "My Tuitions", path: "/dashboard/my-tuitions", icon: BookOpen },
  { name: "Applications", path: "/dashboard/applications", icon: FileText },
  { name: "Users", path: "/dashboard/users", icon: Users },
  { name: "Tutors", path: "/dashboard/tutors", icon: GraduationCap },
  { name: "Payments", path: "/dashboard/payments", icon: CreditCard },
];

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

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
            className="text-xl font-bold text-primary tracking-tight"
          >
            eTuitionBD
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

          // Tooltip only when collapsed
          return collapsed ? (
            <div
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
