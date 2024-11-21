import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submitting

    // Validate the new password and confirm password
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsSubmitting(false); // End submitting
      return;
    }

    try {
      // Make an API call to reset the password
      const response = await axios.patch(
        "http://localhost:5000/api/auth/update-password",
        {
          email,
          newPassword,
        }
      );

      // Log the response to check for success

      // Check if the status is 200 and the message is 'Password updated successfully'
      if (
        response.status === 200 &&
        response.data.message === "Password updated successfully"
      ) {
        toast.success("Password has been successfully reset");

        // Add a slight delay to show success message, then navigate
        setTimeout(() => {
          navigate("/login");
        }, 1500); // 1.5 seconds delay before redirection
      } else {
        toast.error("Password reset failed");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(
        "An error occurred while resetting the password. Please try again."
      );
    }
  };

  return (
    <div className="ResetPassword-body">
      <div className="ResetPassword-user-profile-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="ResetPassword-form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="ResetPassword-form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="ResetPassword-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
