import { Outlet } from "react-router";
import DashboardSidebar from "../Components/DashboardSidebar/DashboardSidebar";
import DashboardNavbar from "../Components/DashboardNavbar/DashboardNavbar";


const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-base-200">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Right Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <DashboardNavbar />

        {/* Page Content */}
        <main className="p-6">
          <div className="bg-base-100 rounded-2xl border border-base-300 p-6 min-h-[calc(100vh-6rem)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
