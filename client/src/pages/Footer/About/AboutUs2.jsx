import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutUs2.css"; // Updated unique CSS file
import storyImageSrc from "../../../assets/images/FooterElements/AboutUs/our-story.png";
import fashionImageSrc from "../../../assets/images/FooterElements/AboutUs/our-story-innovation.png";

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
                Society perceives AuctionX as "stupid." But what does society
                call AuctionX? Often, it’s anything different or anything that’s
                done differently.
              </p>
              <p className="about-text-white">
                Often when people have done the right thing, without caring
                about what society thinks, they have been called AuctionX. These
                are the people who have changed the world.
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
          For us, AuctionX is the spirit of looking at things differently.
        </p>
        <p className="about-text-white">
          This was the spirit on which AuctionX was founded in 2024. With the
          belief that a business cannot be about financial gain alone.
        </p>
        <p className="fw-bold about-text-white">
          It is about making a positive impact. That's what AuctionX is about.
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
            <p className="text-muted">Fashion image not available</p>
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
          <h3 className="fw-bold about-text-white">3 months</h3>
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
