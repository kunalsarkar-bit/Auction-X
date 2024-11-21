import React, { useRef } from "react";
import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UserOutlined,
  MenuOutlined, // Importing the burger icon
  ContainerOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { post } from "../../../services/ApiEndpoint";
import { useDispatch } from "react-redux";
import { Logout } from "../../../redux/AuthSlice";
import "./SideMenu.css";

const SideMenu = () => {
  const navigate = useNavigate();
  const sideMenuRef = useRef(null);
  const [position, setPosition] = React.useState(140); // Initial top position
  const [isMenuVisible, setIsMenuVisible] = React.useState(false); // State for menu visibility

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const request = await post("http://localhost:5000/api/auth/logout");
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

  const handleMenuClick = (e) => {
    navigate(e.key);
    // Close the menu after selection if on mobile
    if (window.innerWidth < 768) {
      setIsMenuVisible(false);
    }
  };

  const handleMouseDown = (e) => {
    const startY = e.clientY;

    const handleMouseMove = (e) => {
      const newY = e.clientY;
      const diffY = newY - startY;

      setPosition((prev) => Math.max(0, prev + diffY)); // Prevent going off-screen
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <div>
      {/* Show the side menu only on larger devices */}
      {window.innerWidth >= 768 ? (
        <div
          ref={sideMenuRef}
          className="sidemenu"
          style={{ top: `${position}px` }} // Dynamically set top position
          onMouseDown={handleMouseDown} // Attach mouse down event for dragging
        >
          <Menu
            mode="vertical"
            className="menuvertical"
            onClick={handleMenuClick}
            defaultSelectedKeys={["/admin"]}
            items={[
              {
                icon: <AppstoreOutlined />,
                key: "/admin",
                label: "DashBoard",
              },
              {
                icon: <ShopOutlined />,
                key: "/admin/inventory",
                label: "Inventory",
              },
              {
                icon: <ShoppingOutlined />,
                key: "/admin/orders",
                label: "Orders",
              },
              {
                icon: <UserOutlined />,
                key: "/admin/customers",
                label: "Customers",
              },
              {
                icon: <ContainerOutlined />,
                key: "/admin/feedback",
                label: "Feedback",
              },
            ]}
          />
        </div>
      ) : (
        // Burger Icon for small devices
        <>
          <button className="menu-toggle" onClick={toggleMenu}>
            <MenuOutlined style={{ color: "#FFD700", fontSize: "24px" }} />
          </button>
          {isMenuVisible && (
            <div
              ref={sideMenuRef}
              className="sidemenu"
              style={{ top: `${position}px` }} // Dynamically set top position
              onMouseDown={handleMouseDown} // Attach mouse down event for dragging
            >
              <Menu
                mode="vertical"
                className="menuvertical"
                onClick={handleMenuClick}
                defaultSelectedKeys={["/admin"]}
                items={[
                  {
                    icon: <AppstoreOutlined />,
                    key: "/admin",
                    label: "DashBoard",
                  },
                  {
                    icon: <ShopOutlined />,
                    key: "/admin/inventory",
                    label: "Inventory",
                  },
                  {
                    icon: <ShoppingOutlined />,
                    key: "/admin/orders",
                    label: "Orders",
                  },
                  {
                    icon: <UserOutlined />,
                    key: "/admin/customers",
                    label: "Customers",
                  },
                  {
                    icon: <ContainerOutlined />,
                    key: "/admin/feedback",
                    label: "Feedback",
                  },
                ]}
              />
            </div>
          )}
        </>
      )}
      <div>
        <i
          className="fa fa-sign-out sidemenu-logout"
          style={{
            fontSize: "28px",
            color: "white",
            cursor: "pointer",
            marginLeft: "10px",
            marginTop: "10px",
          }}
          onClick={handleLogout}
        ></i>
      </div>
    </div>
  );
};

export default SideMenu;
