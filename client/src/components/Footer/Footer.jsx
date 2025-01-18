import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Import the CSS specific to the footer
import companylogo from "../../assets/images/Layouts/AutionX.png";
import facebooklogo from "../../assets/images/Layouts/facebook.png";
import instagramlogo from "../../assets/images/Layouts/instagram.png";
import xlogo from "../../assets/images/Layouts/twitter.png";
import linkedinlogo from "../../assets/images/Layouts/linkedin.png";
import githublogo from "../../assets/images/Layouts/github-logo.png";
import LogoSlider from "../../pages/Footer/LogoSlider";

const Footer = () => {
   const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const isMobileView = window.innerWidth <= 768; // Example breakpoint for phone mode
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <LogoSlider />
        </div>
        <div className="footer-logo-slogan">
          <Link to="/">
            <img src={companylogo} alt="Company Logo" className="footer-logo" />
          </Link>
          <span className="slogan">Place your first bid now!!</span>
        </div>
        <div className="footer-columns">
          {/* About Section */}
          <div className="footer-column">
            <h3
              className={`footer-title ${
                activeSection === "about" ? "active" : ""
              }`}
              onClick={() => isMobileView && toggleSection("about")}
            >
              <span>About</span>
            </h3>
            <nav
              className={`footer-nav ${
                activeSection === "about" || !isMobileView ? "show" : ""
              }`}
            >
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <Link to="/contact" className="footer-nav-link">
                    Contact Us
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/about" className="footer-nav-link">
                    About Us
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/whyus" className="footer-nav-link">
                    Why Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Consumer Policy Section */}
          <div className="footer-column">
            <h3
              className={`footer-title ${
                activeSection === "consumer" ? "active" : ""
              }`}
              onClick={() => isMobileView && toggleSection("consumer")}
            >
              <span>Consumer Policy</span>
            </h3>
            <nav
              className={`footer-nav ${
                activeSection === "consumer" || !isMobileView ? "show" : ""
              }`}
            >
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <Link to="/terms" className="footer-nav-link">
                    Terms & Conditions
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/security" className="footer-nav-link">
                    Security
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/privacy" className="footer-nav-link">
                    Privacy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* HELP Section */}
          <div className="footer-column">
            <h3
              className={`footer-title ${
                activeSection === "help" ? "active" : ""
              }`}
              onClick={() => isMobileView && toggleSection("help")}
            >
              <span>HELP</span>
            </h3>
            <nav
              className={`footer-nav ${
                activeSection === "help" || !isMobileView ? "show" : ""
              }`}
            >
              <ul className="footer-nav-list footer-help">
                <li className="footer-nav-item">
                  <Link to="/payment" className="footer-nav-link">
                    Payment
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/shipping" className="footer-nav-link">
                    Shipping
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/report" className="footer-nav-link">
                    Reports
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/faq" className="footer-nav-link">
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="footer-copyrights">
        <div className="footer__image-links">
          <a
            href="https://linktr.ee/auctionx_official"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__icon github"
          >
            <img
              src={githublogo}
              alt="GitHub Image"
              className="footer__logo-image"
            />
          </a>
          <a
            href="https://linktr.ee/AuctionX"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__icon linkedin"
          >
            <img
              src={linkedinlogo}
              alt="Linkedin Image"
              className="footer__logo-image"
            />
          </a>
          <a
            href="https://www.facebook.com/share/15nxmDHcJ6/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__icon facebook"
          >
            <img
              src={facebooklogo}
              alt="Facebook Image"
              className="footer__logo-image"
            />
          </a>
          <a
            href="https://www.instagram.com/auctionx_official/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__icon instagram"
          >
            <img
              src={instagramlogo}
              alt="Instagram Image"
              className="footer__logo-image"
            />
          </a>
          <a
            href="https://x.com/Auction__X"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__icon x"
          >
            <img src={xlogo} alt="X Image" className="footer__logo-image" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
