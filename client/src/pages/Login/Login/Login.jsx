import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../../services/ApiEndpoint";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SetUser } from "../../../redux/AuthSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./LoginPage.css";
import axios from "axios"; // Make sure this line is included at the top of your Login.jsx file

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setSuccess("");
    setFormData({ name: "", email: "", password: "" }); // Clear form data on toggle
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submitting
    try {
      let response;

      // Check if user is signing up or signing in
      if (isSignUp) {
        const { name, email, password } = formData;
        response = await post("http://localhost:5000/api/auth/register", {
          name,
          email,
          password,
        });

        if (response.status === 200 || response.status === 201) {
          // Store the token, username, and email in local storage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.newUser.name);
          localStorage.setItem("email", response.data.newUser.email);
          localStorage.setItem("role", response.data.newUser.role);

          // Navigate to the VerifyProfile page with query parameters
          navigate(
            `/verifyprofile?token=${response.data.token}&name=${response.data.newUser.name}&email=${response.data.newUser.email}`
          );
        }
      } else {
        const { email, password } = formData;
        response = await post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });

        if (response.status === 200 || response.status === 201) {
          // Log the response to check the structure

          // Check if the user is verified or not
          if (!response.data.user.verified) {
            // If not verified, redirect to verification page with token, name, and email
            navigate(
              `/verifyprofile?token=${response.data.token}&name=${response.data.user.name}&email=${response.data.user.email}`
            );
            return; // Exit the function to prevent further execution
          }

          // Store user data in localStorage
          localStorage.setItem("email", response.data.user.email);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.user.name);
          localStorage.setItem("role", response.data.user.role);
          localStorage.setItem(
            "picture",
            JSON.stringify(response.data.user.profilePic)
          );

          // Show success toast and dispatch to Redux store
          toast.success(response.data.message);
          dispatch(SetUser(response.data.user)); // Dispatch user to Redux store

          // Redirect based on user role (admin or normal user)
          navigate(response.data.user.role === "admin" ? "/admin" : "/");
        } else {
          setError("Invalid credentials");
          toast.error("Invalid credentials");
        }
      }
    } catch (error) {
      setIsSubmitting(false); // Stop submitting
      const errorMessage = error.response?.data?.message || "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      setSuccess("");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google"; // Redirect to Google OAuth
  };

  useEffect(() => {
    const handleGoogleCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const name = urlParams.get("name");
      const email = urlParams.get("email");
      const profilePic = JSON.parse(urlParams.get("profilePic"));
      const isNewUser = urlParams.get("isNewUser") === "true";
      const role = urlParams.get("role");
      const Gverified = urlParams.get("Gverified");

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("isNewUser", isNewUser);
        localStorage.setItem("role", role);
        localStorage.setItem("picture", JSON.stringify(profilePic));

        if (isNewUser || Gverified === "false") {
          navigate("/verifyGprofile", {
            state: { token, name, email },
          });
        } else if (role === "admin") {
          navigate(`/admin`);
        } else {
          navigate(`/`);
        }
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  return (
    <div className="LOGIN-body">
      <div className="Background-goldandblack">
        <div
          className={`LOGIN-container ${isSignUp ? "active" : ""}`}
          id="LOGIN-container"
        >
          <div className={`form-container ${isSignUp ? "sign-up" : "sign-in"}`}>
            <form onSubmit={handleSubmit}>
              <h1>{isSignUp ? "Create Account" : "Sign In"}</h1>
              <div className="LOGIN-social-icons">
                <a
                  className="icon"
                  onClick={handleGoogleLogin}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
              </div>
              <span>
                {isSignUp
                  ? "or use your email for registration"
                  : "or use your email and password"}
              </span>
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              {!isSignUp && (
                <Link to="/forgetpassword">Forget Your Password?</Link>
              )}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? isSignUp
                    ? "Signing up..."
                    : "Signing in..."
                  : isSignUp
                  ? "Sign Up"
                  : "Sign In"}
              </button>

              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
            </form>
          </div>
          <div className="LOGIN-toggle-container">
            <div className="LOGIN-toggle">
              <div className="LOGIN-toggle-panel LOGIN-toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button className="LOGIN-hidden" onClick={handleToggle}>
                  Sign In
                </button>
              </div>
              <div className="LOGIN-toggle-panel LOGIN-toggle-right">
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <button className="LOGIN-hidden" onClick={handleToggle}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
