import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom"; // Import Outlet from react-router-dom
import "./UserLayout.css";

const UserLayout = ({ showNavbarAndFooter = true }) => {
  return (
    <div>
      {showNavbarAndFooter && <Navbar />} {/* Conditionally render Navbar */}
      <div className="main-content">
        <main>
          <Outlet /> {/* Renders the matching child route */}
        </main>
      </div>
      {showNavbarAndFooter && <Footer />} {/* Conditionally render Footer */}
    </div>
  );
};

export default UserLayout;
