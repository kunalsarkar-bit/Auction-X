import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutUs2.css"; // Updated unique CSS file
import storyImageSrc from "../../../assets/images/FooterElements/AboutUs/our-story.png";
import fashionImageSrc from "../../../assets/images/FooterElements/AboutUs/our-story-innovation.jpg";

function BewakoofStory() {
  return (
    <div className="about-bewakoof-container">
      {/* Our Story Section */}
      <div className="row mb-5 justify-content-center about-story-section">
        <div className="col-md-8 my-5">
          <h2 className="text-warning about-story-title">Our Story</h2>
          <div className="row align-items-center">
            <div className="col-md-6">
              {storyImageSrc ? (
                <img
                  src={storyImageSrc}
                  alt="Story Illustration"
                  className="img-fluid about-story-image"
                />
              ) : (
                <p className="text-muted">Image not available</p>
              )}
            </div>
            <div className="col-md-6 text-center about-text-section">
              <p className="lead about-text-white">
                Our story starts with the name <strong>AuctionX</strong>.
              </p>
              <p className="about-text-white">
              Auction X was born to break the mold—a bold idea in a world afraid of difference. 
              When society dismisses something as “stupid,” it’s often because it’s unfamiliar or challenges the norm. 
              Auction X embraces this perception, standing as a beacon for those who dare to dream beyond conventions.


              </p>
              <p className="about-text-white">
              It’s not just an auction platform—it’s a movement. 
              A community built on trust, innovation, and fairness, where every bid tells a story of possibility. 
              Auction X isn’t here to fit in. It’s here to redefine the rules.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="container-fluid about-impact-section bg-dark">
        <div className="row">
          <div className="col-12 text-center ">
            <h1 className="text-white">
              Making an impact through{" "}
              <span className="fw-bold">innovation, honesty,</span> and{" "}
              <span className="fw-bold">thoughtfulness</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Mission Statement Section */}
      <div className="container mt-5 text-center about-mission-section">
        <p className="about-text-white mt-4">
        For us, Auction X is about seeing things differently. 
        </p>
        <p className="about-text-white">
        Founded in 2024, it was built on the belief that auctions can do more than generate profit—they can make an impact.
        </p>
        <p className="fw-bold about-text-white">
        Auction X connects people through competitive bidding, turning every auction into a story of opportunity and innovation. It’s not just about buying and selling; it’s about reshaping how value is created and shared.
        </p>
      </div>

      {/* Distinctive Fashion Section */}
      <div className="row my-5 about-distinctive-fashion">
        <div className="col-md-12 text-center">
          {fashionImageSrc ? (
            <img
              src={fashionImageSrc}
              alt="Fashion Illustration"
              className="img-fluid about-fashion-image"
            />
          ) : (
            <p className="text-muted">Auction X image not available</p>
          )}
          <h2 className="fw-bold about-text-white mt-4">AuctionX</h2>
          <h3 className="fw-bold about-text-muted">
            Distinctive Auction platform for the contemporary Indian
          </h3>
          <p className="about-text-white">
            With in-house capabilities in design, manufacturing, technology,
            data science, and marketing.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="row text-center about-stats-section my-5">
        <div className="col-md-3">
          <h3 className="fw-bold about-text-white">4 months</h3>
          <p className="about-text-muted">of journey so far</p>
        </div>
        <div className="col-md-3">
          <h3 className="fw-bold about-text-white">4</h3>
          <p className="about-text-muted">team-members</p>
        </div>
        <div className="col-md-3">
          <h3 className="fw-bold about-text-white">1 Crore+</h3>
          <p className="about-text-muted">products sold</p>
        </div>
        <div className="col-md-3">
          <h3 className="fw-bold about-text-white">Infinity</h3>
          <p className="about-text-muted">app downloads</p>
        </div>
      </div>
    </div>
  );
}

export default BewakoofStory;
