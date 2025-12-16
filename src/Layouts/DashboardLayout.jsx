import { Outlet } from "react-router";
import DashboardSidebar from "../Components/DashboardSidebar/DashboardSidebar";
import DashboardNavbar from "../Components/DashboardNavbar/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-base-200">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar />

        <main className="p-6 overflow-x-hidden">
          <div className="bg-base-100 rounded-2xl border border-base-300 p-6 min-h-[calc(100vh-6rem)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
