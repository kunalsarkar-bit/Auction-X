import React, { useState, useEffect } from "react";
import "../Navbar/Navbar.css"; // Import the CSS specific to the header
import brandLogo from "../../assets/images/Layouts/AutionX.png"; // Adjust the path to your image
import profileImage from "../../assets/images/Layouts/profile.png"; // Your profile image
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { post } from "../../services/ApiEndpoint";
import { Logout } from "../../redux/AuthSlice";
import nav_mascot from "../../assets/images/Layouts/mascot_navbar.png"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State for dropdown handling
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar handling

  const isLoggedIn = localStorage.getItem("email"); // Assuming 'email' is stored in localStorage after login

  // Function to toggle the sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect admin users to the admin dashboard
  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      const request = await post("/api/auth/logout");
      const response = request.data;
      if (request.status === 200) {
        localStorage.clear(); // Clear local storage on logout
        dispatch(Logout());
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Retrieve the profile image from local storage
  const profileData = JSON.parse(localStorage.getItem("picture"));

  // Check if profileData is valid and has at least one element with 'secure_url'
  const profileImageSrc =
    profileData &&
    Array.isArray(profileData) &&
    profileData.length > 0 &&
    profileData[0].secure_url
      ? profileData[0].secure_url
      : ""; // Fallback to empty string if no valid image data is found

  return (
    <header>
      {/* Brand Logo */}
      <div className="logo">
        <Link to="/">
          <img src={brandLogo} alt="Brand Logo" />
        </Link>
      </div>
      <div className="character-sitting">
    <img
      src={nav_mascot}
      alt="Sitting Character"
      className="character-image"
    />
  </div>

      {/* Navigation Menu */}
      <nav>
        <ul>
          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
          <li className="categories-dropdown">
            <button
              aria-haspopup="true"
              aria-expanded={isOpen ? "true" : "false"}
              onClick={() => setIsOpen(!isOpen)}
            >
              Categories ▼
            </button>
            {isOpen && (
              <ul className="dropdown-menu">
                <li>
                  <button onClick={() => navigate("/category/Properties")}>
                    Properties
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Automobiles")}>
                   Technology
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Furnitures")}>
                  Homeappliances
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Beverages")}>
                  Foodbeverage
                  </button>
                </li>
                
                <li>
                  <button onClick={() => navigate("/category/Books")}>
                  Stationery
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Antiques")}>
                    Antiques
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Currencies")}>
                    Others
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/sell">
              <button>Sell an Item</button>
            </Link>
          </li>
          <li>
            <Link to="/bid">
              <button>Bid an Item</button>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Search Bar added here for desktop */}
      <div className="search-bar desktop-search-bar">
        <SearchBar />
      </div>

      {/* Profile Button with Dropdown */}
      <div className="profile-btn">
        <button>
          <img
            src={profileImageSrc || profileImage} // Fallback to default profile image if not available
            alt="Profile Icon"
            className="profile-image"
          />
        </button>
        <ul className="dropdown-menu profile-dropdown">
          <li>
            <button onClick={() => navigate("/myprofile")}>My Profile</button>{" "}
            {/* Use navigate for routing */}
          </li>
          <li>
            <button onClick={() => navigate("/balance")}>Add Money</button>
          </li>
          <li>
            <button onClick={() => navigate("/orders")}>My Bids</button>
          </li>
          <li>
            <button onClick={() => navigate("/pendingbids")}>
              Pending Bids
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/feedback")}>
              Help & Feedback
            </button>
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login">
                <button>Login</button>
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Hamburger Icon for Sidebar */}
      <div className="hamburger" onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          ✖
        </button>
        <ul className="ListOption">
          <li className="categories-dropdown">
            <button
              aria-haspopup="true"
              aria-expanded={isOpen ? "true" : "false"}
              onClick={() => setIsOpen(!isOpen)}
            >
              Categories ▼
            </button>
            {isOpen && (
              <ul className="dropdown-menu">
                <li>
                  <button onClick={() => navigate("/category/Properties")}>
                    Properties
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Automobiles")}>
                    Automobiles & Electronics
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Furnitures")}>
                    Furniture
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Beverages")}>
                    Foods & Beverages
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Currencies")}>
                    Currency
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Books")}>
                    Books & Painting
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Antiques")}>
                    Antiques
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link to="/sell">
              <button>Sell an Item</button>
            </Link>
          </li>
          <li>
            <Link to="/bid">
              <button>Bid an Item</button>
            </Link>
          </li>
        </ul>
        {/* Search Bar inside Sidebar */}
        <div className="sidebar-search">
          <SearchBar />
        </div>

        <div className="logo slidebarLogo">
          <Link to="/">
            <img src={brandLogo} alt="Brand Logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
