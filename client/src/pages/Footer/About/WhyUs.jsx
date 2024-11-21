import React from "react";
import { FaShippingFast, FaCheckCircle, FaLock } from "react-icons/fa";
import { Carousel, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./WhyShopWithUs.css";

const WhyShopWithUs = () => {
  return (
    <div className="whyus-container py-5">
      <h2 className="text-center mb-5 whyus-heading">WHY SHOP WITH US</h2>
      <div className="row justify-content-center">
        <div className="col-md-4 text-center mb-4">
          <div className="whyus-card p-4 border-0 shadow-sm h-100">
            <div className="whyus-icon-container d-flex justify-content-center align-items-center mb-3">
              <FaShippingFast size={40} className="text-primary" />
            </div>
            <h4 className="whyus-card-title">Fast Delivery</h4>
            <p className="whyus-card-text">
              Variations of passages of Lorem Ipsum available
            </p>
          </div>
        </div>
        <div className="col-md-4 text-center mb-4">
          <div className="whyus-card p-4 border-0 shadow-sm h-100">
            <div className="whyus-icon-container d-flex justify-content-center align-items-center mb-3">
              <FaCheckCircle size={40} className="text-primary" />
            </div>
            <h4 className="whyus-card-title">Free Shipping</h4>
            <p className="whyus-card-text">
              Variations of passages of Lorem Ipsum available
            </p>
          </div>
        </div>
        <div className="col-md-4 text-center mb-4">
          <div className="whyus-card p-4 border-0 shadow-sm h-100">
            <div className="whyus-icon-container d-flex justify-content-center align-items-center mb-3">
              <FaLock size={40} className="text-primary" />
            </div>
            <h4 className="whyus-card-title">Best Quality</h4>
            <p className="whyus-card-text">
              Variations of passages of Lorem Ipsum available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCarousel = () => {
  return (
    <Container className="whyus-testimonial-container">
      <h2 className="text-center my-5 whyus-testimonial-heading">
        TESTIMONIAL
      </h2>
      <Carousel
        indicators={false}
        nextIcon={
          <span className="whyus-carousel-control-next-icon" aria-hidden="true">
            <i class="fas fa-share"></i>
          </span>
        }
        prevIcon={
          <span className="whyus-carousel-control-prev-icon" aria-hidden="true">
            <i class="fas fa-reply"></i>
          </span>
        }
      >
        {/* First Testimonial */}

        <Carousel.Item>
          <div className="whyus-testimonial-box p-4">
            <div className="whyus-testimonial-header d-flex justify-content-between align-items-center">
              <div>
                <h5 className="text-danger whyus-testimonial-name">
                  Alex Smith
                </h5>
                <p className="text-muted whyus-testimonial-role">
                  Frequent Bidder, Auction X
                </p>
              </div>
              <div>
                <i className="fas fa-quote-right fa-2x whyus-testimonial-quote"></i>
              </div>
            </div>
            <p className="whyus-testimonial-text mt-3">
              "Auction X has transformed my experience in online bidding. The
              platform is user-friendly, and I love how easy it is to navigate
              through active auctions. I feel confident with the security and
              transparency Auction X offers. Highly recommended for anyone
              looking to buy or sell!"
            </p>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="whyus-testimonial-box p-4">
            <div className="whyus-testimonial-header d-flex justify-content-between align-items-center">
              <div>
                <h5 className="text-danger whyus-testimonial-name">
                  Samantha Lee
                </h5>
                <p className="text-muted whyus-testimonial-role">
                  Seller, Auction X
                </p>
              </div>
              <div>
                <i className="fas fa-quote-right fa-2x whyus-testimonial-quote"></i>
              </div>
            </div>
            <p className="whyus-testimonial-text mt-3">
              "Auction X is fantastic for sellers! Listing my items was
              seamless, and the support team was always there when I needed
              help. The bidding process is smooth and secure, which really puts
              my mind at ease. I’ve connected with a larger audience and had
              great results on every sale."
            </p>
          </div>
        </Carousel.Item>
        {/* Fifth Testimonial */}
        <Carousel.Item>
          <div className="whyus-testimonial-box p-4">
            <div className="whyus-testimonial-header d-flex justify-content-between align-items-center">
              <div>
                <h5 className="text-danger whyus-testimonial-name">
                  Michael Johnson
                </h5>
                <p className="text-muted whyus-testimonial-role">
                  New User, Auction X
                </p>
              </div>
              <div>
                <i className="fas fa-quote-right fa-2x whyus-testimonial-quote"></i>
              </div>
            </div>
            <p className="whyus-testimonial-text mt-3">
              "As a first-time user, I found Auction X incredibly easy to get
              started with. The setup was straightforward, and I quickly got the
              hang of the bidding process. It's exciting to watch live bids, and
              I even won my first item! Auction X offers a unique experience
              I’ll definitely recommend."
            </p>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

const App = () => {
  return (
    <div>
      <WhyShopWithUs />
      <TestimonialCarousel />
    </div>
  );
};

export default App;
