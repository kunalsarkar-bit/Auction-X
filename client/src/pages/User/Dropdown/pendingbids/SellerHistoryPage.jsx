import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./SellerHistoryPage.css"; // Import the custom CSS file

const SellerHistoryPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const email = localStorage.getItem("email"); // Get email from local storage
      if (!email) {
        console.error("No email found in local storage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/email/${email}`
        ); // Fetch listings based on email
        setListings(response.data); // Set listings state
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchListings(); // Call the fetch function
  }, []);

  const handleEdit = (id) => {
    navigate(`/pendingbids/update/${id}`);
  };

  const handleDelete = async (id) => {
    const listingToDelete = listings.find((listing) => listing._id === id); // Find the listing by id
    if (!listingToDelete) {
      console.error("Listing not found");
      return;
    }

    // Show SweetAlert2 confirmation modal
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to delete ${listingToDelete.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`); // Delete the listing
        toast.success(`${listingToDelete.name} is deleted successfully`);
        setListings((prevListings) =>
          prevListings.filter((listing) => listing._id !== id)
        ); // Update the listings state
      } catch (error) {
        console.error("Error deleting listing:", error);
      }
    }
  };

  const calculateTimeLeft = (biddingStartTime) => {
    if (!biddingStartTime) return "Date not available";

    let endTime;

    // Check if biddingStartTime is a full ISO string or just a time string
    if (biddingStartTime.includes("T")) {
      // If it's an ISO string, directly convert it to a Date
      endTime = new Date(biddingStartTime);
    } else {
      // If it's just a time (e.g., "15:00"), assume today's date and append the time
      const currentDate = new Date();
      const dateString = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}T${biddingStartTime}:00`;
      endTime = new Date(dateString);
    }

    if (isNaN(endTime.getTime())) return "Invalid Date"; // Check for invalid date

    const now = new Date();
    const timeDifference = endTime - now;

    if (timeDifference <= 0) return "Time expired";

    const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${hoursLeft} hours, ${minutesLeft} minutes`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setListings((prevListings) =>
        prevListings.map((listing) => ({
          ...listing,
          timeLeft: calculateTimeLeft(listing.biddingStartTime),
        }))
      );
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [listings]);

  if (loading) {
    return <p>Loading your listings...</p>; // Display loading message
  }

  return (
    <div className="sellhistory-container">
      <h2 className="sellhistory-title">Your Listings</h2>
      {listings.length === 0 ? (
        <p className="nolist">No listings found.</p> // Display message if no listings found
      ) : (
        listings.map((listing) => (
          <div className="sellhistory-listing-card" key={listing._id}>
            <div className="sellhistory-listing-content">
              <div className="sellhistory-listing-image">
                <img
                  src={
                    listing.images && listing.images[0]
                      ? listing.images[0].secure_url
                      : "https://via.placeholder.com/150"
                  }
                  alt={listing.title || "Listing Image"}
                />
              </div>
              <div className="sellhistory-listing-details">
                <h5 className="sellhistory-listing-title">{listing.name}</h5>
                <p>
                  <strong>Description:</strong> {listing.description}
                </p>
                <p>
                  <strong>Category:</strong> {listing.category}
                </p>
                <p>
                  <strong>Contact:</strong> {listing.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {listing.mobileNumber}
                </p>
                <p>
                  <strong>Starting Price:</strong> ₹
                  {listing.biddingStartPrice.toFixed(2)}
                </p>
                <p className="sellhistory-ending-time">
                  <strong>Time left:</strong>{" "}
                  {calculateTimeLeft(listing.biddingStartTime)}
                </p>
              </div>
              <div className="sellhistory-listing-actions">
                <button
                  className="sellhistory-btn-edit"
                  onClick={() => handleEdit(listing._id)}
                >
                  Edit
                </button>
                <button
                  className="sellhistory-btn-delete"
                  onClick={() => handleDelete(listing._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerHistoryPage;
