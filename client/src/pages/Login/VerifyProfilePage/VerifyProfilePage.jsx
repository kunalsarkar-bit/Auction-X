import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../VerifyProfilePage/VerifyProfilePage.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const VerifyProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Use URLSearchParams to get query parameters from the URL
  const params = new URLSearchParams(location.search);
  const token = params.get("token"); // Get the token from the URL
  const name = params.get("name");
  const email = params.get("email");

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState([]); // To hold the uploaded files
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if token, name, or email is missing
    if (!token || !name || !email) {
      console.error("Missing data:", { token, name, email });
      setError("Required data is missing.");
    } else {
      setError(""); // Reset error if all data is present
    }
  }, [token, name, email, location]);

  const validateMobileNumber = (mobileNumber) => {
    const regex = /^\d{10}$/; // Regex for validating 10-digit mobile number
    return regex.test(mobileNumber);
  };

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mobile number before submission
    if (!validateMobileNumber(phone)) {
      toast.error("Please enter a valid mobile number (10 digits).");
      return;
    }

    // Set loading state
    setLoading(true);
    setUploadProgress(0); // Reset upload progress

    try {
      let validImages = [];

      // Upload files with progress tracking if any files are selected
      if (files.length > 0) {
        validImages = await Promise.all(
          files.map(async (file) => {
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append("file", file);
            cloudinaryFormData.append("upload_preset", "product_image");

            // Using Axios to upload the file
            const response = await axios.post(
              "https://api.cloudinary.com/v1_1/dszvpb3q5/image/upload",
              cloudinaryFormData,
              {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                  const { loaded, total } = progressEvent;
                  const percentCompleted = Math.floor((loaded * 100) / total);
                  setUploadProgress((prev) => Math.max(prev, percentCompleted)); // Update upload progress
                },
              }
            );

            return {
              secure_url: response.data.secure_url,
              public_id: response.data.public_id,
            };
          })
        );

        // Ensure valid images are created based on properties existence
        validImages = validImages.filter(
          (image) => image && image.public_id && image.secure_url
        );
      }

      // Create payload for backend
      const payload = {
        address,
        phoneNo: phone,
        gender,
        profilePic: validImages, // Send array of objects with secure_url and public_id
        email,
      };

      // Submit profile update to backend
      const profileUpdateResponse = await axios.patch(
        "http://localhost:5000/api/auth/updateProfile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem(
        "picture",
        JSON.stringify(profileUpdateResponse.data.user.profilePic)
      );

      setSuccess("Profile updated successfully!");

      // Send OTP request before navigating
      const otpResponse = await axios.post(
        "http://localhost:5000/api/auth/send-otp",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // After OTP is sent, navigate to the OTP page with email as a query parameter
      navigate("/OTPverify", { state: { email } });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response
          ? error.response.data.message
          : "An error occurred while updating the profile or sending OTP."
      );
    } finally {
      setLoading(false); // Reset loading state
      setUploadProgress(0); // Reset upload progress after submission
    }
  };

  return (
    <div className="VerifyProfilePage-body">
      <div className="VerifyProfilePage-user-profile-container">
        <h1>Verify Your Profile</h1>
        {error && <p className="VerifyProfilePage-error-message">{error}</p>}
        {success && (
          <p className="VerifyProfilePage-success-message">{success}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="VerifyProfilePage-form-group">
            <label>UserName</label>
            <input type="text" value={name || ""} disabled />
          </div>
          <div className="VerifyProfilePage-form-group">
            <label>Email</label>
            <input type="email" value={email || ""} disabled />
          </div>
          <div className="VerifyProfilePage-form-group">
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="VerifyProfilePage-form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="VerifyProfilePage-form-group">
            <label>Gender (Optional)</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <input
            type="file"
            className="form-control"
            id="file"
            multiple
            accept="image/*" // Optional: Restrict to image files
            onChange={handleFileUpload}
          />
          <div>Upload Progress: {uploadProgress}%</div>
          <button
            className="VerifyProfilePage-Verify-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyProfilePage;
