import React, { useState, useEffect, useCallback } from "react";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";
import { GiSandsOfTime } from "react-icons/gi";
import { ImPriceTags } from "react-icons/im";
import ReactDOM from "react-dom"; // Import ReactDOM for creating a portal
import ProductDetailsPopup from "../ProductDetails/ProductDetailsPopUp";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 11;
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpenPopup = (id) => {
    setSelectedProductId(id); // Open the popup with the selected product's ID
  };

  const handleClosePopup = () => {
    setSelectedProductId(null); // Close the popup
  };

  // Helper function to shuffle array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchAndRandomizeProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/");
        const data = await response.json();

        // Filter only active products
        const activeProducts = data.filter(
          (product) => product.status === "Active"
        );

        if (activeProducts.length === 0) {
          console.log("No active products found");
        }

        // Shuffle and set the active products
        const randomizedData = shuffleArray(activeProducts);
        setProducts(randomizedData);
        setDisplayedProducts(randomizedData.slice(0, productsPerPage));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAndRandomizeProducts();
  }, []);

  const loadMoreProducts = useCallback(() => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const nextIndex = currentIndex + productsPerPage;
      setDisplayedProducts((prev) => [
        ...prev,
        ...products.slice(currentIndex, nextIndex),
      ]);
      setCurrentIndex(nextIndex);
      setLoading(false);
    }, 2000);
  }, [currentIndex, loading, products]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) {
      loadMoreProducts();
    }
  };

  // Calculate time left with days, hours, minutes, and seconds
  const calculateTimeLeft = (
    biddingStartDate,
    biddingStartTime,
    biddingEndTime
  ) => {
    if (!biddingStartDate || !biddingStartTime || !biddingEndTime)
      return "Date not available";

    const startDate = new Date(biddingStartDate);
    const startTime = new Date(biddingStartTime);
    startDate.setUTCHours(
      startTime.getUTCHours(),
      startTime.getUTCMinutes(),
      0,
      0
    );

    const endDateTime = new Date(biddingEndTime);
    const now = new Date();

    let timeDifference;
    let isBiddingStarted = now >= startDate;

    if (isBiddingStarted) {
      timeDifference = endDateTime - now;
    } else {
      timeDifference = startDate - now;
    }

    if (timeDifference <= 0) return "Time expired";

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000); // Calculate remaining seconds

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const [liveCountdown, setLiveCountdown] = useState({});

  // Update countdown every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLiveCountdown((prevState) => {
        const updatedCountdown = {};
        displayedProducts.forEach((product) => {
          const timeLeft = calculateTimeLeft(
            product.biddingStartDate,
            product.biddingStartTime,
            product.biddingEndTime
          );
          updatedCountdown[product._id] = timeLeft;
        });
        return updatedCountdown;
      });
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [displayedProducts]);

  return (
    <div className="Product-body">
      <div id="result" className="Product-container" onScroll={handleScroll}>
        {displayedProducts.map((product) => (
          <div className="product-item" key={product._id}>
            <img
              src={product.images[0]?.secure_url}
              alt={product.name}
              width="100%"
            />
            <h3>{product.name}</h3>
            <h4><ImPriceTags /> ₹{product.biddingStartPrice}</h4>
            <h4>
              <GiSandsOfTime /> {liveCountdown[product._id] || "Loading..."}
            </h4>{" "}
            {/* Display live countdown */}
            <div className="product-btn-box">
              <button onClick={() => handleOpenPopup(product._id)}>
                Bid Now
              </button>
            </div>
          </div>
        ))}
        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
          </div>
        )}
        {/* Render the popup outside the normal hierarchy using React Portal */}
        {selectedProductId &&
          ReactDOM.createPortal(
            <div className="carDetails-popup">
              <ProductDetailsPopup
                productId={selectedProductId}
                onClose={handleClosePopup}
              />
            </div>,
            document.body // This will render the popup at the body level
          )}
      </div>
    </div>
  );
};

export default ProductList;
