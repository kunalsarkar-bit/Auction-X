import React, { useEffect } from "react";
import "./AboutUs.css"; // Ensure you import your CSS file
import Team from "./AboutUs1";
import { useNavigate } from "react-router-dom";

const StackedCards = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cards = document.querySelectorAll(".stacked-cards-card");
    const stackArea = document.querySelector(".stacked-cards-stack-area");

    const rotateCards = () => {
      let angle = 0;
      cards.forEach((card) => {
        if (card.classList.contains("active")) {
          card.style.transform = `translate(-50%, -120vh) rotate(-48deg)`;
        } else {
          card.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
          angle = angle - 10;
        }
      });
    };

    rotateCards();

    const handleScroll = () => {
      let proportion =
        stackArea.getBoundingClientRect().top / window.innerHeight;
      if (proportion <= 0) {
        let n = cards.length;
        let index = Math.ceil((proportion * n) / 2);
        index = Math.abs(index) - 1;
        for (let i = 0; i < n; i++) {
          if (i <= index) {
            cards[i].classList.add("active");
          } else {
            cards[i].classList.remove("active");
          }
        }
        rotateCards();
      }
    };

    window.addEventListener("scroll", handleScroll);

    const adjust = () => {
      const windowWidth = window.innerWidth;
      const left = document.querySelector(".stacked-cards-left");
      left.remove();
      if (windowWidth < 800) {
        stackArea.insertAdjacentElement("beforebegin", left);
      } else {
        stackArea.insertAdjacentElement("afterbegin", left);
      }
    };

    adjust();
    window.addEventListener("resize", adjust);

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", adjust);
    };
  }, []);

  return (
    <div className="stacked-cards-body">
      <div className="stacked-cards-center">
        <div className="stacked-cards-top">
          <b>Auction X</b>
        </div>
        <div className="stacked-cards-stack-area">
          <div className="stacked-cards-left">
            <div className="stacked-cards-title">About Us</div>
            <div className="stacked-cards-sub-title">
              For us, AuctionX is the spirit of looking at things differently.
              This was the spirit on which AuctionX was founded in 2024. With
              the belief that a business cannot be about financial gain alone.
              It is about making a positive impact. That's what AuctionX is
              about.
              <br />
              <button onClick={() => navigate("/about2")}>
                See More Details
              </button>
            </div>
          </div>
          <div className="stacked-cards-right">
            <div className="stacked-cards-cards">
              <div className="stacked-cards-card">
                <div className="stacked-cards-sub">Simplified</div>
                <div className="stacked-cards-content">
                  Auction are now simple
                </div>
              </div>
              <div className="stacked-cards-card">
                <div className="stacked-cards-sub">Effortless Auction</div>
                <div className="stacked-cards-content">
                  Seamless Auction Experience
                </div>
              </div>
              <div className="stacked-cards-card">
                <div className="stacked-cards-sub">Real-Time Bid</div>
                <div className="stacked-cards-content">
                  Real-Time Bidding Updates
                </div>
              </div>
              <div className="stacked-cards-card">
                <div className="stacked-cards-sub">Support</div>
                <div className="stacked-cards-content">
                  Now it's 24/7 support
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="stacked-cards-bottom">IMPORT US HERE</div> */}
        <div className="stacked-cards-bottom">
          <Team />
        </div>
      </div>
    </div>
  );
};

export default StackedCards;
