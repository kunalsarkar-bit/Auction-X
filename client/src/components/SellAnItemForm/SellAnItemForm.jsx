import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import "./SellAnItemForm.css";

const SellAnItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: localStorage.getItem("email") || "",
    images: [],
    description: "",
    category: "",
    files: [],
    mobileNumber: "",
    biddingStartDate: "",
    biddingStartTime: "",
    biddingStartPrice: "",
    acceptTerms: false,
  });

  const [minDate, setMinDate] = useState("");
  const [minTime, setMinTime] = useState("");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const updateDateTimeRestrictions = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      setMinDate(`${year}-${month}-${day}`);

      const twoHoursLater = new Date(today.getTime() + 2 * 60 * 60 * 1000);
      const hours = String(twoHoursLater.getHours()).padStart(2, "0");
      const minutes = String(twoHoursLater.getMinutes()).padStart(2, "0");
      setMinTime(`${hours}:${minutes}`);
    };
    updateDateTimeRestrictions();
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked, files } = e.target;

    if (type === "file") {
      if (files.length + formData.files.length > 4) {
        toast.error("You can only upload a maximum of 4 images");
        return;
      }
      const fileArray = Array.from(files);
      setFormData((prevState) => ({
        ...prevState,
        files: [...prevState.files, ...fileArray],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: type === "checkbox" ? checked : value,
      }));
    }

    if (id === "biddingStartDate") {
      const today = new Date();
      const selectedDate = new Date(value);
      if (selectedDate.toDateString() === today.toDateString()) {
        const twoHoursLater = new Date(today.getTime() + 2 * 60 * 60 * 1000);
        const hours = String(twoHoursLater.getHours()).padStart(2, "0");
        const minutes = String(twoHoursLater.getMinutes()).padStart(2, "0");
        setMinTime(`${hours}:${minutes}`);
      } else {
        setMinTime("");
      }
    }
  };

  const validateMobileNumber = (number) => {
    const mobilePattern = /^\d{10}$/;
    return mobilePattern.test(number);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      toast.error("You must accept the terms and conditions");
      return;
    }

    if (formData.files.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    if (!validateMobileNumber(formData.mobileNumber)) {
      toast.error("Please enter a valid mobile number (10 digits)");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      const uploadedImages = await Promise.all(
        formData.files.map(async (file) => {
          const cloudinaryFormData = new FormData();
          cloudinaryFormData.append("file", file);
          cloudinaryFormData.append("upload_preset", "product_image");

          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dszvpb3q5/image/upload",
            cloudinaryFormData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                const percentCompleted = Math.floor((loaded * 100) / total);
                setUploadProgress((prev) => Math.max(prev, percentCompleted));
              },
            }
          );

          return {
            secure_url: response.data.secure_url,
            public_id: response.data.public_id,
          };
        })
      );

      const validImages = uploadedImages.filter((image) => image !== null);
      const storedEmail = localStorage.getItem("email");

      // Convert biddingStartTime to UTC
      const [startHours, startMinutes] = formData.biddingStartTime.split(":");
      const biddingStartTimeDate = new Date();
      biddingStartTimeDate.setHours(startHours, startMinutes, 0, 0); // Set the hours and minutes
      const biddingStartTimeUTC = biddingStartTimeDate.toISOString(); // Convert to UTC

      // Calculate bidding end time
      const biddingEndTimeDate = new Date(
        biddingStartTimeDate.getTime() + 2 * 60 * 1000
      ); // Add 2 minutes
      const biddingEndTimeUTC = biddingEndTimeDate.toISOString(); // Convert to UTC

      // Create payload for backend
      const payload = {
        name: formData.name,
        images: validImages,
        email: storedEmail,
        description: formData.description,
        category: formData.category,
        mobileNumber: formData.mobileNumber,
        biddingStartDate: formData.biddingStartDate,
        biddingStartTime: biddingStartTimeUTC, // Send UTC time
        biddingStartPrice: formData.biddingStartPrice,
        biddingEndTime: biddingEndTimeUTC, // Send UTC end time
      };

      const response = await axios.post(
        "http://localhost:5000/api/products",
        payload
      );
      toast.success("Product submitted successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Error submitting product. Check the console for details");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      images: [],
      description: "",
      category: "",
      files: [],
      mobileNumber: "",
      biddingStartDate: "",
      biddingStartTime: "",
      biddingStartPrice: "",
      acceptTerms: false,
    });
    setUploadProgress(0);
  };
  return (
    <div className="sellan-body">
      <div className="sellan-container rounded">
        <div className="card mt-5 mb-5">
          <div className="card-header bg-dark text-white p-4">
            <h4>
              <i className="fa fa-pencil-square"></i> Seller Form
            </h4>
          </div>
          <form className="p-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Item Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                maxLength={30}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                readOnly
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                maxLength={500}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Select Categories
              </label>
              <select
                className="form-select"
                id="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Categories...</option>
                <option value="Properties">Properties</option>
                <option value="Automobiles">Automobiles & Electronics</option>
                <option value="Furnitures">Furnitures</option>
                <option value="Beverages">Foods & Beverages</option>
                <option value="Currencies">Currencies</option>
                <option value="Books">Books and Paintings</option>
                <option value="Antiques">Antiques</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="biddingStartDate" className="form-label">
                Bidding Start Date
              </label>
              <input
                type="date"
                className="form-control"
                id="biddingStartDate"
                value={formData.biddingStartDate}
                onChange={handleChange}
                min={minDate}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="biddingStartTime" className="form-label">
                Bidding Start Time
              </label>
              <input
                type="time"
                className="form-control"
                id="biddingStartTime"
                value={formData.biddingStartTime}
                onChange={handleChange}
                min={formData.biddingStartDate === minDate ? minTime : ""}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="biddingStartPrice" className="form-label">
                Bidding Start Price
              </label>
              <input
                type="number"
                className="form-control"
                id="biddingStartPrice"
                value={formData.biddingStartPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <button
                type="button"
                className="btn btn-secondary mb-3"
                onClick={() => setShowImageUpload(!showImageUpload)}
              >
                {showImageUpload ? "Hide Image Upload" : "Upload Images"}
              </button>
              {showImageUpload && (
                <div>
                  <label htmlFor="file" className="form-label">
                    Choose up to 4 Images
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    multiple
                    accept="image/*" // Optional: Restrict to image files
                    onChange={handleChange}
                  />
                  <div>Uploaded {formData.files.length} / 4 images</div>

                  {/* Display chosen files with remove button and image preview */}
                  {formData.files.map((file, index) => {
                    const objectUrl = URL.createObjectURL(file); // Create object URL for the image
                    return (
                      <div
                        key={index}
                        className="d-flex justify-content-between align-items-center mb-2"
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={objectUrl}
                            alt={file.name}
                            className="img-thumbnail me-2" // Use Bootstrap thumbnail class
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }} // Small size
                          />
                          <span>{file.name}</span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => {
                            setFormData((prevState) => ({
                              ...prevState,
                              files: prevState.files.filter(
                                (_, i) => i !== index
                              ), // Remove the selected file
                            }));
                          }}
                        >
                          &times; {/* Cross icon */}
                        </button>
                      </div>
                    );
                  })}

                  {/* Progress Bar */}
                  {loading && (
                    <div className="progress mt-3">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${uploadProgress}%` }}
                        aria-valuenow={uploadProgress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {uploadProgress}%
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="acceptTerms">
                I accept the <Link to="/terms">Terms and Conditions</Link>
              </label>
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellAnItem;
