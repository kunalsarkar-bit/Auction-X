import React from "react";
import SideMenu from "./SideMenu/SideMenu"; // Import your SideMenu
import { Outlet, useLocation } from "react-router-dom"; // Import Outlet and useLocation from react-router-dom
import "./AdminLayout.css"; // Optional: Add styling for layout

// Custom hook to get the current path
const useCurrentPath = () => {
  const location = useLocation();
  return location.pathname;
};

const AdminLayout = () => {
  const currentPath = useCurrentPath();

  const isLoginPage = currentPath === "/admin/login"; // Adjust this based on your login path

  return (
    <div className="admin-layout">
      {/* {!isLoginPage && <AdminNavbar />}  */}
      <div className="layout-body">
        <SideMenu /> {/* Sidebar */}
        <main className="page-content">
          <Outlet /> {/* Renders the matching child route */}
        </main>
      </div>
      {/* {!isLoginPage && <AdminFooter />}  */}
    </div>
  );
};

export default AdminLayout;
