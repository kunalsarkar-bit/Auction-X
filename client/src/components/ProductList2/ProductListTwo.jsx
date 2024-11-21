import React, { useState, useEffect, useCallback } from "react";
import "./ProductListTwo.css";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom"; // Import ReactDOM for creating a portal
import ProductDetailsPopup from "../ProductDetails/ProductDetailsPopUp";

const ProductListTwo = () => {
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

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

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

  return (
    <div className="ProductTwo-body">
      <div id="result" className="ProductTwo-container" onScroll={handleScroll}>
        {displayedProducts.map((product) => (
          <div className="ProductTwo-item" key={product._id}>
            <div className="ProductTwo-item-content">
              <img
                src={product.images[0]?.secure_url}
                alt={product.name}
                className="ProductTwo-image"
              />
              <div className="ProductTwo-info">
                <h5 className="ProductTwo-name">{product.name}</h5>

                <h6>
                  <p>Category: {product.category}</p>
                </h6>

                <h5>Price: ₹{product.biddingStartPrice}</h5>
                <p className="ProductTwo-time">
                  Ends in: {calculateTimeLeft(product.biddingStartTime)}
                </p>
                <button
                  className="ProductTwo-button"
                  onClick={() => handleOpenPopup(product._id)}
                >
                  Bid Now
                </button>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="ProductTwo-loading">
            <div className="ProductTwo-spinner"></div>
          </div>
        )}
      </div>

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
  );
};

export default ProductListTwo;
