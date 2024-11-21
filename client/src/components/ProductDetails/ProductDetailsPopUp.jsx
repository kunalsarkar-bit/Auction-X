import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductDetailsPopUp.css";
import "./TimeCountdown.css";

const ProductDetailsPopup = ({ productId, onClose }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [isBiddingStarted, setIsBiddingStarted] = useState(false);
  const [isBiddingEnded, setIsBiddingEnded] = useState(false); // New state for bidding ended
  const [biddingEndTime, setBiddingEndTime] = useState(null);

  useEffect(() => {
    let interval;

    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );

        const { biddingStartDate, biddingStartTime, biddingEndTime } =
          response.data;

        if (biddingStartDate && biddingStartTime) {
          const startDate = new Date(biddingStartDate);
          const startTime = new Date(biddingStartTime);

          startDate.setUTCHours(
            startTime.getUTCHours(),
            startTime.getUTCMinutes(),
            0,
            0
          );

          const endTime = new Date(biddingEndTime);
          setBiddingEndTime(endTime);

          if (!isNaN(endTime)) {
            interval = setInterval(() => updateTimer(startDate, endTime), 1000);
          } else {
            console.error("Invalid end time:", endTime);
          }
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const updateTimer = (startTime, endTime) => {
      const now = new Date().getTime();
      let difference = isBiddingStarted
        ? endTime.getTime() - now
        : startTime.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      } else {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        clearInterval(interval);
        if (!isBiddingStarted) {
          setIsBiddingStarted(true); // Bidding starts
        } else {
          setIsBiddingEnded(true); // Bidding ends
        }
      }
    };

    fetchProductData();

    return () => clearInterval(interval);
  }, [productId, isBiddingStarted]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (!product) return null;

  return (
    <div className="carDetails-popup" onClick={onClose}>
      <button className="carDetails-close-btn" onClick={onClose}>
        X
      </button>
      <div
        className="carDetails-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="carDetails-popup-content-left">
          <h2>{product.name}</h2>
          <p>Price: ₹{product.biddingStartPrice}</p>
          <p>Description: {product.description}</p>
          <div className="timer">
            <h2>
              BID{" "}
              {isBiddingStarted
                ? isBiddingEnded
                  ? "HAS ENDED"
                  : "ENDS IN:"
                : "STARTS IN:"}
            </h2>
            <div className="timer__boxes">
              <div className="timer__box">
                <span className="timer__number">{timeLeft.days}</span>
                <span className="timer__label">DAYS</span>
              </div>
              <div className="timer__box">
                <span className="timer__number">{timeLeft.hours}</span>
                <span className="timer__label">HOURS</span>
              </div>
              <div className="timer__box">
                <span className="timer__number">{timeLeft.minutes}</span>
                <span className="timer__label">MINUTES</span>
              </div>
              <div className="timer__box">
                <span className="timer__number">{timeLeft.seconds}</span>
                <span className="timer__label">SECONDS</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="carDetails-btn w-100 mt-3"
              >
                view Item
              </button>
            </div>
          </div>
        </div>
        <div className="carDetails-popup-content-right">
          <img
            src={product.images[0].secure_url}
            alt="Product"
            className="carDetails-carousel-img"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPopup;
