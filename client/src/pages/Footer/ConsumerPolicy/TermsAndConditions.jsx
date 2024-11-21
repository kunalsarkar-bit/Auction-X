import React, { useState } from "react";
import "./TermsAndConditions.css"; // Import the CSS file

const TermsAndConditions = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="term-container">
      <h1 className="term-heading ps-2">Terms and Conditions</h1>
      <div className="pt-4 ps-4 pe-4 description">
        <p className="term-paragraph">
          The website www.AuctionX.in ("AuctionX.in") is operated by AuctionX
          Seller Services Private Limited ("AuctionX" or "us" or "we" or "our"),
          having its registered office located at 8th Floor, Brigade Gateway
          26/1 Dr. Rajkumar Road Bangalore - 560055, Karnataka, India. Please
          read the Conditions of Use document carefully before using the
          AuctionX.in website. By using the AuctionX.in website, you signify
          your agreement to be bound by Amazon's Conditions of Use.
        </p>

        {showMore && (
          <>
            <p className="term-paragraph">
              In addition, when you use any current or future AuctionX.in
              service (e.g. Wish List or Marketplace) ("AuctionX Service"), you
              will also be subject to the terms, guidelines, and conditions
              applicable to that AuctionX Service ("Terms"). If these Conditions
              of Use are inconsistent with such Terms, the Terms will control.
            </p>
            <p className="term-paragraph">
              AuctionX Europe Core SARL, AuctionX EU SARL, AuctionX Services
              Europe SARL, and AuctionX Media EU SARL, all four at 38 avenue
              John F. Kennedy, L-1855, Luxembourg and AuctionX Digital UK
              Limited of 1 Principal Place, Worship Street, London, EC2A 2FA, UK
              (together "AuctionX Europe") are data controllers of personal
              information collected and processed through AuctionX Services.
            </p>
            <p className="term-paragraph">
              The personal information / data provided to us by you during the
              course of usage of AuctionX.in will be treated as strictly
              confidential and in accordance with the Privacy Notice and
              applicable laws and regulations.
            </p>
          </>
        )}

        {!showMore && (
          <p className="term-paragraph">
            Click "Show more" to read the full terms and conditions...
          </p>
        )}
      </div>

      <button className="term-button ms-3" onClick={handleToggle}>
        {showMore ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default TermsAndConditions;
