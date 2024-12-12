import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API requests
import "./ProfilePage2.css";
import pfp from "../../../../assets/images/Layouts/profile.png";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faYoutube, faWhatsapp, faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import mascotProfile from "../../../../assets/images/Layouts/mascot_profile.gif"
function ProfilePage2() {
  const [profilePic, setProfilePic] = useState(null);

  // Initial state for profile information
  const [profileInfo, setProfileInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    gender: "", // Add gender field
  });

  // State to track edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile picture URL and user data from localStorage on component mount
  useEffect(() => {
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
    setProfilePic(profileImageSrc || pfp); // Use default if not set

    // Fetch email from localStorage
    const email = localStorage.getItem("email");

    // Fetch user data based on email
    if (email) {
      axios
        .get(`http://localhost:5000/api/auth/user/${email}`)
        .then((response) => {
          setProfileInfo(response.data); // Set profile information with response data
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };

  // Function to toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false); // Save and exit edit mode

    // Prepare the data to send in the request
    const updatedProfileData = {
      name: profileInfo.name, // Assuming fullName is the name
      email: profileInfo.email,
      address: profileInfo.address,
      phoneNo: profileInfo.phoneNo,
      gender: profileInfo.gender || "", // Send empty string if gender is not provided
    };

    // Send a PATCH request to update the user data
    axios
      .patch(
        `http://localhost:5000/api/auth/updateUserProfile/${profileInfo.email}`,
        updatedProfileData
      )
      .then((response) => {
        // Optionally, you can fetch updated user data here if needed
        toast.success("Your profile is updated sucessfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="profilebody">
      <div className="container mt-5">
        <div className="row">
          {/* Left Profile Section */}
          <div className="col-md-4">
            <div className="card profilecard text-center">
              <div className="card-body">
                <img
                  src={profilePic}
                  alt="User Avatar"
                  className="rounded-circle profile-img-fluid"
                  style={{ width: "150px" }}
                />
              </div>
            </div>
            <div className="card profilecard mt-3 p-1">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Link to="/pendingbids">My Bidding History</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/balance">Add Money</Link>
                </li>

                <li className="list-group-item">
                  <Link to="/report">Report Something Suspicious</Link>
                </li>
                
                
                <li className="list-group-item">
                  <Link to="/contact">Contact Us</Link>
                </li>
                
              </ul>
            </div>

            <div className="card profilecard mt-3 p-1">
              <ul className="list-group list-group-flush">
              <li className="list-group-item insta">
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram}  style={{ fontSize: '1.5rem', marginRight: '8px' }} />
                      Instagram
                    </a>
                </li>
                <li className="list-group-item faceb">
                    <a href="https://www.facebook.com/?_rdr" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '1.5rem', marginRight: '8px' }} />
                      Facebook
                    </a>
                </li>

                <li className="list-group-item yt">
                    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faYoutube} style={{ fontSize: '1.5rem', marginRight: '8px' }} />
                      Youtube
                    </a>
                </li>

                
                <li className="list-group-item whatsapp">
                    <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '1.5rem', marginRight: '8px' }} />
                      Whatsapp
                    </a>
                </li>
                <li className="list-group-item tweeter">
                    <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faXTwitter} style={{ fontSize: '1.5rem', marginRight: '8px' }} />
                      X
                    </a>
                </li>
                <li className="list-group-item telegram">
                    <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTelegram}  style={{ fontSize: '1.5rem', marginRight: '8px' }} />
                       Telegram
                    </a>
                </li>
              </ul>
            </div>
          </div>

          

          {/* Right Profile Information Section */}
          <div className="col-md-8">
            <div className="card profilecard mb-3">
              <div className="card-body">
                <div className="d-flex">
               <b><h5 className="card-title mb-0">Profile Information</h5></b> 
                 <button
                      className="btn btn-primary btn-sm mt-3  profile-flex-button"
                      onClick={toggleEdit}
                    >
    
                     
                      <FontAwesomeIcon icon={faEdit} /> 
                    </button>
                    </div>
                {isEditing ? (
                  <form>
                    {/* Editable Inputs */}
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={profileInfo.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={profileInfo.email}
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNo"
                        value={profileInfo.phoneNo}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={profileInfo.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* Optional Gender Field */}
                    <div className="mb-3">
                    
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="gender"
      value="male"
      checked={profileInfo.gender === "male"}
      onChange={handleInputChange}
    />
    <label className="form-check-label">Male</label>
  </div>
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="gender"
      value="female"
      checked={profileInfo.gender === "female"}
      onChange={handleInputChange}
    />
    <label className="form-check-label">Female</label>
  </div>
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="gender"
      value="other"
      checked={profileInfo.gender === "other"}
      onChange={handleInputChange}
    />
    <label className="form-check-label">Other</label>
  </div>
                    </div>
                    {/* Save and Cancel Buttons */}
                    <button
                      onClick={handleSubmit}
                      className="btn btn-success btn-sm m-2"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm m-2"
                      onClick={toggleEdit}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <div>
                    {/* Display Profile Information */}
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Full Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{profileInfo.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{profileInfo.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Phone</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{profileInfo.phoneNo}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Address</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{profileInfo.address}</p>
                      </div>
                    </div>
                    <hr />
                    {/* Optional Gender Display */}
                    {profileInfo.gender && (
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Gender</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {profileInfo.gender}
                          </p>
                        </div>
                      </div>
                    )}
                    <img
                        src={mascotProfile}
                        alt="Character"
                        className="bottom-right-image"
                      />
                  </div>
                )}
              </div>
            </div>

            {/* FAQ Section - Full Width */}
            <div className="row">
              <div className="col-md-12">
                <div className="card profilecard">
                  <div className="card-body">
                    <h3>FAQs</h3>
                    <p>
                      <strong>
                        What happens when I update my email address (or mobile
                        number)?
                      </strong>
                    </p>
                    <p>
                      Your login email id (or mobile number) changes, likewise.
                      You'll receive all your account-related communication on
                      your updated email address (or mobile number).
                    </p>
                    <p>
                      <strong>
                        When will my account be updated with the new email
                        address (or mobile number)?
                      </strong>
                    </p>
                    <p>
                      It happens as soon as you confirm the verification code
                      sent to your email (or mobile) and save the changes.
                    </p>
                   
                    <p>
                      <strong>
                        Does my Seller account get affected when I update my
                        email address?
                      </strong>
                    </p>
                    <p>
                      AuctionX has a 'single sign-on' policy. Any changes will
                      reflect in your Seller account also.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage2;
