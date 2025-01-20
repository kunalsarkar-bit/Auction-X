import React, { useState, useEffect, useCallback } from "react";
import "./CategoryList.css";
import { GiSandsOfTime } from "react-icons/gi";
import { ImPriceTags } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";

const ProductListTwo = () => {
  const { category } = useParams(); // Get category from URL
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});
  const productsPerPage = 11;

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const fetchAndRandomizeProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/");
        const data = await response.json();

        // Filter products by status 'Active'
        const activeProducts = data.filter(
          (product) => product.status === "Active"
        );

        // If a category is specified, further filter by category
        const filteredData = category
          ? activeProducts.filter((product) => product.category === category)
          : activeProducts;

        // Shuffle the filtered data
        const randomizedData = shuffleArray(filteredData);

        // Set products and displayed products for pagination
        setProducts(randomizedData);
        setDisplayedProducts(randomizedData.slice(0, productsPerPage));

        // Initialize timers for the products
        initializeTimers(randomizedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAndRandomizeProducts();
  }, [category]); // Dependency on category to re-fetch when it changes

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

  const initializeTimers = (products) => {
    products.forEach((product) => {
      const { biddingStartDate, biddingStartTime, biddingEndTime } = product;
      const startDate = new Date(biddingStartDate);
      const startTime = new Date(biddingStartTime);

      startDate.setUTCHours(
        startTime.getUTCHours(),
        startTime.getUTCMinutes(),
        0,
        0
      );

      const endTime = new Date(biddingEndTime);

      if (!isNaN(endTime)) {
        updateTimer(product._id, startDate, endTime);
      } else {
        console.error("Invalid end time for product:", product._id);
      }
    });

    const timerInterval = setInterval(() => {
      products.forEach((product) => {
        const { biddingStartDate, biddingStartTime, biddingEndTime } = product;
        const startDate = new Date(biddingStartDate);
        const startTime = new Date(biddingStartTime);

        startDate.setUTCHours(
          startTime.getUTCHours(),
          startTime.getUTCMinutes(),
          0,
          0
        );

        const endTime = new Date(biddingEndTime);

        if (!isNaN(endTime)) {
          updateTimer(product._id, startDate, endTime);
        }
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerInterval);
  };

  const updateTimer = (productId, startTime, endTime) => {
    const now = new Date().getTime();
    let difference =
      now < startTime.getTime()
        ? startTime.getTime() - now
        : endTime.getTime() - now;

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
            <div className="product-btn-box">
              <button onClick={() => navigate(`/product/${product._id}`)}>
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
      </div>
    </div>
  );
};

export default ProductListTwo;
