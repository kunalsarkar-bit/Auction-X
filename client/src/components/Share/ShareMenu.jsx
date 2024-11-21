import React from "react";
import "./ShareMenu.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ShareMenu = () => {
  return (
    <div className="SHAREDMENU-body">
      <div className="SHAREDMENU-center">
        <div className="SHAREDMENU-share-menu">
          <input type="checkbox" id="SHAREDMENU-toggle" />
          <label htmlFor="SHAREDMENU-toggle"></label>
          <div className="SHAREDMENU-menu-list">
            <div className="SHAREDMENU-item">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-square-instagram"></i>
              </a>
            </div>
            <div className="SHAREDMENU-item">
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
            </div>
            <div className="SHAREDMENU-item">
              <a
                href="https://whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-square-whatsapp"></i>
              </a>
            </div>
            <div className="SHAREDMENU-item">
              <a
                href="https://telegram.org/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <i className="fa-brands fa-telegram"></i>
              </a>
            </div>
            <div className="SHAREDMENU-item">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareMenu;
