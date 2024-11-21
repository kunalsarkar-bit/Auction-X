import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../VerifyGProfilePage/VerifyGProfilePage.css";
import axios from "axios";

const VerifyProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure values from location.state
  const { token, name, email } = location.state || {};

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token || !name || !email) {
      console.error("Missing data:", { token, name, email });
      setError("Required data is missing.");
    }
  }, [token, name, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data object to send to backend
    const formData = {
      address,
      phoneNo: phone,
      gender,
    };

    try {
      const response = await axios.patch(
        "http://localhost:5000/api/auth/updateGProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
            "Content-Type": "application/json",
          },
        }
      );
      // Patch request to update the isvarified field
      await axios.patch("http://localhost:5000/api/auth/verify-user", {
        email: email,
      });
      setSuccess("Profile updated successfully!");
      navigate("/"); // Redirect after successful update
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="VerifyGProfilePage-body">
      <div className="VerifyGProfilePage-user-profile-container">
        <h1>Verify Your Profile</h1>
        {error && <p className="VerifyGProfilePage-error-message">{error}</p>}
        {success && (
          <p className="VerifyGProfilePage-success-message">{success}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="VerifyGProfilePage-form-group">
            <label>UserName</label>
            <input type="text" value={name} disabled />
          </div>
          <div className="VerifyGProfilePage-form-group">
            <label>Email</label>
            <input type="email" value={email} disabled />
          </div>
          <div className="VerifyGProfilePage-form-group">
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="VerifyGProfilePage-form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="VerifyGProfilePage-form-group">
            <label>Gender (Optional)</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button className="VerifyGProfilePage-Verify-button" type="submit">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyProfilePage;
