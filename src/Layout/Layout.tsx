import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar hidden on mobile (sm and below), visible md+ */}
      <aside className="hidden md:block fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
        <Sidebar />
      </aside>

      {/* Main content area with left margin on md+ to avoid sidebar overlap */}
      <main className="flex-1 p-6 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
