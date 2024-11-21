import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgetPassword.css";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submitting
    setError(""); // Clear previous error messages

    try {
      // Step 1: Check if the user exists
      const response = await axios.post(
        "http://localhost:5000/api/auth/check-user",
        { email }
      );

      if (response.status === 200 && response.data.user) {
        // Step 2: If user exists, send OTP
        toast.success("User found, sending OTP...");
        await axios.post("http://localhost:5000/api/auth/send-otp", { email });

        // Step 3: Redirect to OTP page with email as state
        navigate("/OTP", { state: { email } });
      }
    } catch (error) {
      // Handle errors, such as user not found or other issues
      setIsSubmitting(false); // End submitting
      console.error("Error during user check:", error); // Debug log
      if (error.response) {
        if (error.response.status === 404) {
          setError("User not found. Please check your email.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="FORGET-body">
      <div className="FORGET-user-profile-container">
        <h1>Forget Password</h1>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error messages */}
        <form onSubmit={handleSubmit}>
          <div className="FORGET-form-group">
            <label>Email</label>
            <input
              type="email" // Change to email input type for better validation
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // Ensure input is not empty
            />
          </div>
          <button
            type="submit"
            className="FORGET-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending OTP..." : "Forget Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
