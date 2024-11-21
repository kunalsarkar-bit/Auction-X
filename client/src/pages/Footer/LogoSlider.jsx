import React from "react";
import "./LogoSlider.css";
import logo1 from "../../assets/images/FooterElements/Footer/slideLogo-1.png";
import logo2 from "../../assets/images/FooterElements/Footer/slideLogo-2.png";
import logo3 from "../../assets/images/FooterElements/Footer/slideLogo-3.png";
import logo4 from "../../assets/images/FooterElements/Footer/slideLogo-4.png";
import logo5 from "../../assets/images/FooterElements/Footer/slideLogo-5.png";
import logo6 from "../../assets/images/FooterElements/Footer/slideLogo-6.png";
import logo7 from "../../assets/images/FooterElements/Footer/slideLogo-7.png";
import logo8 from "../../assets/images/FooterElements/Footer/slideLogo-8.png";
import logo9 from "../../assets/images/FooterElements/Footer/slideLogo-9.png";

const LogoSlider = () => {
  return (
    <div className="LOGOSLIDER-body">
      <div className="LOGOSLIDER-slider">
        <div className="LOGOSLIDER-logos">
          <img src={logo1} alt="Logo 1" />
          <img src={logo2} alt="Logo 2" />
          <img src={logo3} alt="Logo 3" />
          <img src={logo4} alt="Logo 4" />
          <img src={logo5} alt="Logo 5" />
          <img src={logo6} alt="Logo 6" />
          <img src={logo7} alt="Logo 7" />
          <img src={logo8} alt="Logo 8" />
          <img src={logo9} alt="Logo 9" />

          {/* Duplicated for infinite scrolling effect */}
          <img src={logo1} alt="Logo 1 duplicate" />
          <img src={logo2} alt="Logo 2 duplicate" />
          <img src={logo3} alt="Logo 3 duplicate" />
          <img src={logo4} alt="Logo 4 duplicate" />
          <img src={logo5} alt="Logo 5 duplicate" />
          <img src={logo6} alt="Logo 6 duplicate" />
          <img src={logo7} alt="Logo 7 duplicate" />
          <img src={logo8} alt="Logo 8 duplicate" />
          <img src={logo9} alt="Logo 9 duplicate" />
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
