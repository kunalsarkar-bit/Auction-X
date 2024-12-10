import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./SellAnItemForm.css";
import { toast } from "react-hot-toast";

const UpdateSeller = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form is submitted
  const { id, email } = useParams();
  const [productId, setProductId] = useState(id);
  const [formData, setFormData] = useState({
    name: "",
    email: email || "", // Set the email from the params
    images: [],
    description: "",
    category: "",
    mobileNumber: "",
    biddingStartDate: "",
    biddingStartTime: "",
    biddingStartPrice: "",
    acceptTerms: false,
    files: [],
  });
  const [minDate, setMinDate] = useState("");
  const [minTime, setMinTime] = useState("");
  const [productFetched, setProductFetched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // For submit button disable
  const [uploadProgress, setUploadProgress] = useState(0); // For file upload

  // Fetch product data when productId is entered
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${productId}`
      );
      const product = response.data;

      setFormData({
        name: product.name,
        email: product.email,
        images: product.images || [],
        description: product.description,
        category: product.category,
        mobileNumber: product.mobileNumber,
        biddingStartDate: product.biddingStartDate.split("T")[0],
        biddingStartTime: product.biddingStartTime,
        biddingStartPrice: product.biddingStartPrice,
        acceptTerms: false,
        files: [],
      });
      setProductFetched(true);
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error("Error fetching product data");
    }
  };

  useEffect(() => {
    if (productId) {
      // Check if productId is available before fetching
      fetchProduct();
    }
  }, [productId]); // Run this effect when productId changes

  // Date and time restrictions
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setMinDate(`${year}-${month}-${day}`);

    const twoHoursLater = new Date(today.getTime() + 2 * 60 * 60 * 1000);
    const hours = String(twoHoursLater.getHours()).padStart(2, "0");
    const minutes = String(twoHoursLater.getMinutes()).padStart(2, "0");
    setMinTime(`${hours}:${minutes}`);
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked, files } = e.target;
    if (type === "file") {
      const fileArray = Array.from(files);
      if (fileArray.length + formData.images.length > 4) {
        toast.error("You can only upload a maximum of 4 images");
      } else {
        setFormData((prevState) => ({
          ...prevState,
          files: [...prevState.files, ...fileArray],
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleFileUpload = async (file) => {
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", "product_image");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dszvpb3q5/image/upload",
        cloudinaryFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            setUploadProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        }
      );
      return {
        secure_url: response.data.secure_url,
        public_id: response.data.public_id,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
      return null;
    }
  };

  const validateMobileNumber = (number) => {
    const regex = /^[0-9]{10}$/; // Only 10 digits allowed
    return regex.test(number);
  };

  // // Validate mobile number
  // if (!validateMobileNumber(formData.mobileNumber)) {
  //   toast.error('Invalid mobile number. Please enter a 10-digit number');
  //   return;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      toast.error("You must accept the terms and conditions");
      return;
    }

    setIsSubmitted(true); // Set submitted state

    // Validate mobile number
    if (!validateMobileNumber(formData.mobileNumber)) {
      toast.error("Invalid mobile number. Please enter a 10-digit number");
      return;
    }

       // Check if there is at least one image
       if (formData.images.length === 0 && formData.files.length === 0) {
        toast.error("You must add at least one image.");
        return;
      }

    try {
      const uploadedImages = formData.files
        ? await Promise.all(
            formData.files.map((file) => handleFileUpload(file))
          )
        : [];

      const validImages = uploadedImages.filter((image) => image !== null);

      const payload = {
        name: formData.name,
        email: formData.email,
        description: formData.description,
        category: formData.category,
        mobileNumber: formData.mobileNumber,
        biddingStartPrice: formData.biddingStartPrice,
        images: [...formData.images, ...validImages],
      };

      const response = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        payload
      );
      toast.success("Updated successfully");
      window.location.href = "/pendingbids";
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(
        "Error updating product: " + (error.response?.data.message || "")
      );
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      images: [],
      description: "",
      category: "",
      mobileNumber: "",
      biddingStartDate: "",
      biddingStartTime: "",
      biddingStartPrice: "",
      acceptTerms: false,
      files: [],
    });
    setProductId("");
    setProductFetched(false);
    setUploadProgress(0);
    document.getElementById("file").value = ""; // Clear file input
  };

  const handleRemoveImage = (index) => {
    const removedImage = formData.images[index]; // Get the image to be removed

    // Update the images array in formData
    setFormData((prevState) => {
      const updatedImages = prevState.images.filter(
        (_, imgIndex) => imgIndex !== index
      );
      return {
        ...prevState,
        images: updatedImages,
      };
    });

    // Optionally, track removed images to delete from Cloudinary when submitting
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="sellan-container rounded">
        <div className="card mt-5 mb-5">
          <div className="card-header bg-dark text-white p-4">
            <h4>
              <i className="fa fa-pencil-square"></i> Update Seller Form
            </h4>
          </div>
          <form className="p-3" onSubmit={handleSubmit}>
            <>
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
                  onChange={handleChange}
                  disabled
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
                  <option value="Furnitures">Homeappliances</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Books">Books and Paintings</option>
                  <option value="Antiques">Antiques</option>
                  <option value="Currencies">Others</option>
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

              {/* File Upload and Preview */}
              <div className="mb-3">
                <label htmlFor="file" className="form-label">
                  Add Images (Max 4)
                </label>
                {formData.images.length + formData.files.length >= 4 ? (
                  <p>
                    Maximum image limit reached. Remove existing images to add
                    more.
                  </p>
                ) : (
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    multiple
                    onChange={handleChange}
                    accept="image/*"
                    disabled={
                      formData.images.length + formData.files.length >= 4
                    }
                  />
                )}
              </div>

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
                          files: prevState.files.filter((_, i) => i !== index), // Remove the selected file
                        }));
                      }}
                    >
                      &times; {/* Cross icon */}
                    </button>
                  </div>
                );
              })}

              {/* Progress bar for image upload */}
              {uploadProgress > 0 && (
                <div className="mb-3">
                  <label className="form-label">Upload Progress</label>
                  <div className="progress">
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
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Preview Images</label>
                <div className="d-flex flex-wrap">
                  {formData.images.map((image, index) => (
                    <div key={index} className="position-relative me-2">
                      <img
                        src={image.secure_url}
                        alt="Product Preview"
                        className="img-thumbnail"
                        style={{ width: "100px", height: "100px" }}
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                        onClick={() => handleRemoveImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
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

              {/* Read-Only Date/Time Fields */}
              <div className="mb-3">
                <label htmlFor="biddingStartDate" className="form-label">
                  Bidding Start Date (Non-editable){" "}
                  <i
                    className="fa fa-info-circle"
                    title="Bidding start date cannot be changed"
                  ></i>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="biddingStartDate"
                  value={formData.biddingStartDate}
                  onChange={handleChange}
                  min={minDate}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label htmlFor="biddingStartTime" className="form-label">
                  Bidding Start Time (Non-editable){" "}
                  <i
                    className="fa fa-info-circle"
                    title="Bidding start time cannot be changed"
                  ></i>
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="biddingStartTime"
                  value={formData.biddingStartTime}
                  onChange={handleChange}
                  min={minTime}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="acceptTerms" className="form-check-label">
                  I accept the <Link to="/terms">Terms and Conditions</Link>
                </label>
              </div>

              {/* Submit and Reset Buttons */}
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Product"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={handleReset}
                >
                  Reset Form
                </button>
              </div>
            </>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSeller;
