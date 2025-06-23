import React, { useState, useEffect, useCallback, useRef } from "react";
import "../ProductList2/ProductListTwo.css";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import ProductDetailsPopup from "../ProductDetails/ProductDetailsPopUp";

const TodayBid = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const productsPerPage = 11;
  const intervalsRef = useRef({});

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const getDayName = (dateString) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    return days[date.getDay()] || "Unknown";
  };

  useEffect(() => {
    const fetchAndRandomizeProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/");
        const data = await response.json();

        const today = new Date().toISOString().split("T")[0];

        const activeProducts = data.filter(
          (product) =>
            product.status === "Active" &&
            product.biddingStartDate &&
            new Date(product.biddingStartDate).toISOString().split("T")[0] ===
              today
        );

        if (activeProducts.length === 0) {
          console.log("No active products found for today's date");
        }

        const randomizedData = shuffleArray(activeProducts);
        setProducts(randomizedData);
        setDisplayedProducts(randomizedData.slice(0, productsPerPage));

        initializeTimers(randomizedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAndRandomizeProducts();

    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
      intervalsRef.current = {};
    };
  }, []);

  const initializeTimers = (products) => {
    products.forEach((product) => {
      const { biddingEndTime } = product;
      const endTime = new Date(biddingEndTime);

      if (!isNaN(endTime)) {
        updateTimer(product._id, endTime);

        intervalsRef.current[product._id] = setInterval(
          () => updateTimer(product._id, endTime),
          1000
        );
      } else {
        console.error("Invalid end time for product:", product._id);
      }
    });
  };

  const updateTimer = (productId, endTime) => {
    const now = new Date().getTime();
    const difference = endTime.getTime() - now;

    if (difference > 0) {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft((prev) => ({
        ...prev,
        [productId]: {
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        },
      }));
    } else {
      clearInterval(intervalsRef.current[productId]);
      delete intervalsRef.current[productId];

      setTimeLeft((prev) => ({
        ...prev,
        [productId]: {
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

  const calculateTimeLeft = (productId) => {
    if (timeLeft[productId]) {
      const { hours, minutes, seconds } = timeLeft[productId];
      return `${hours}:${minutes}:${seconds}`;
    }
    return "00:00:00";
  };

  const handleOpenPopup = (id) => {
    setSelectedProductId(id);
  };

  const handleClosePopup = () => {
    setSelectedProductId(null);
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
                  <p>Category: {product.category}</p>
                </h6>
                <h5>Price: ₹{product.biddingStartPrice}</h5>
                <p>Bidding Day: {getDayName(product.biddingStartDate)}</p>{" "}
                {/* Added the day */}
                <p className="ProductTwo-time">
                  Starts in: {calculateTimeLeft(product._id)}
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

export default TodayBid;
