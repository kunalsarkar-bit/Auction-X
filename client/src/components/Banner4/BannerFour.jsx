import React from "react";
import { useNavigate } from "react-router-dom";
import TodayBids from "../../assets/images/components/Banner4/Rashmika.gif";
import TommorowBids from "../../assets/images/components/Banner4/NobodyBoy.gif";
import "./BannerFour.css";

const ProductListing = () => {
  const navigate = useNavigate();

  const handleImageClick = (route) => {
    navigate(route);
  };

  return (
    <div className="image-container">
      <div className="image-box">
        <img
          src={TodayBids} // Replace with your image URL
          alt="Product 1"
          className="product-banner-image"
          onClick={() => handleImageClick("/todaybid")} // Navigate to route1
        />
      </div>
      <div className="image-box">
        <img
          src={TommorowBids} // Replace with your image URL
          alt="Product 2"
          className="product-banner-image"
          onClick={() => handleImageClick("/tomorrowbid")} // Navigate to route2
        />
      </div>
    </div>
  );
};

export default ProductListing;
