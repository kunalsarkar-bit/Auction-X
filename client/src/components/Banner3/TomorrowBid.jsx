import React, { useState, useEffect, useCallback } from "react";
import "../ProductList2/ProductListTwo.css";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { GiSandsOfTime } from "react-icons/gi";
import { ImPriceTags } from "react-icons/im";
import { BiSolidCategoryAlt } from "react-icons/bi";
import ProductDetailsPopup from "../ProductDetails/ProductDetailsPopUp";

const TomorrowBid = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const productsPerPage = 11;

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

        const tomorrowStart = new Date(
          new Date().setDate(new Date().getDate() + 1)
        ).setHours(0, 0, 0, 0);
        const tomorrowEnd = new Date(
          new Date().setDate(new Date().getDate() + 1)
        ).setHours(23, 59, 59, 999);

        const activeProducts = data.filter((product) => {
          const biddingStartDate = new Date(product.biddingStartDate).getTime();
          return (
            product.status === "Active" &&
            biddingStartDate >= tomorrowStart &&
            biddingStartDate <= tomorrowEnd
          );
        });

        if (activeProducts.length === 0) {
          console.log("No active products starting tomorrow");
        }

        const randomizedData = shuffleArray(activeProducts);
        setProducts(randomizedData);
        setDisplayedProducts(randomizedData.slice(0, productsPerPage));

        // Initialize timers for products
        initializeTimers(randomizedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAndRandomizeProducts();
  }, []);

  const initializeTimers = (products) => {
    products.forEach((product) => {
      const { biddingStartDate, biddingStartTime } = product;
      const startDate = new Date(biddingStartDate);
      const startTime = new Date(biddingStartTime);

      startDate.setUTCHours(
        startTime.getUTCHours(),
        startTime.getUTCMinutes(),
        0,
        0
      );

      if (!isNaN(startDate)) {
        updateTimer(product._id, startDate);
        setInterval(() => updateTimer(product._id, startDate), 1000);
      } else {
        console.error("Invalid start time for product:", product._id);
      }
    });
  };

  const updateTimer = (productId, startTime) => {
    const now = new Date().getTime();
    let difference = startTime.getTime() - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft((prev) => ({
        ...prev,
        [productId]: {
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        },
      }));
    } else {
      setTimeLeft((prev) => ({
        ...prev,
        [productId]: {
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        },
      }));
    }
  };

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

  return (
    <div className="ProductTwo-body" style={{ paddingTop: "200px" }}>
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
                  <p>
                    <BiSolidCategoryAlt /> Category: {product.category}
                  </p>
                </h6>
                <h5>
                  <ImPriceTags /> ₹{product.biddingStartPrice}
                </h5>
                <p className="ProductTwo-time">
                  <GiSandsOfTime />
                  {timeLeft[product._id]
                    ? ` ${timeLeft[product._id].days}d ${
                        timeLeft[product._id].hours
                      }h ${timeLeft[product._id].minutes}m ${
                        timeLeft[product._id].seconds
                      }s`
                    : "Loading..."}
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
          document.body
        )}
    </div>
  );
};

export default TomorrowBid;
