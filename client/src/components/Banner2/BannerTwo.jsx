import React from "react";
import "./BannerTwo.css";
import AuctionXJapanese from "../../assets/images/components/Banner2/AuctionXJapanese.jpg";
import AuctionXMessi from "../../assets/images/components/Banner2/AuctionXMessi.jpg";
import AuctionXVirat from "../../assets/images/components/Banner2/AuctionXVirat.jpg";
import AuctionXRonaldo from "../../assets/images/components/Banner2/AuctionXRonaldo.jpg";
import AuctionXRock from "../../assets/images/components/Banner2/AuctionXRock.jpg";

const images = [
  "https://images.bewakoof.com/uploads/grid/app/Mad-Diwali-Sale-IK-RM-1x1-HC-Banner-deals-are-live--1--1730374454.gif",
  AuctionXJapanese,
  AuctionXMessi,
  AuctionXVirat,
  AuctionXRonaldo,
  AuctionXRock,
];

const SavingsZoneBanner = () => {
  return (
    <div className="savingzone-carousel-container">
      <div className="savingzone-carousel">
        {images.concat(images).map((src, index) => (
          <div key={index} className="savingzone-carousel-item">
            <img
              src={src}
              alt={`Promo ${index}`}
              className="savingzone-promo-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingsZoneBanner;
