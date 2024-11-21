import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./PrivacyNotice.css"; // Make sure to create this CSS file

const PrivacyNotice = () => {
  return (
    <Container className="privacy-container  mt-5">
      <Row>
        <Col>
          <h1 className="text-center privacy-heading">
            AuctionX.in Privacy Notice
          </h1>
          <h3 className="text-center mt-4 privacy-disclaimer">
            Disclaimer: In the event of any discrepancy or conflict, the English
            version will prevail over the translation.
          </h3>
          <p className="text-center privacy-muted">
            Last updated: April 25, 2024. To see prior version, click here
          </p>

          <p className="privacy-text">
            We know that you care how information about you is used and shared,
            and we appreciate your trust that we will do so carefully and
            sensibly. This Privacy Notice describes how AuctionX Seller Services
            Private Limited and its affiliates including AuctionX.com, Inc.
            (collectively "AuctionX") collect and process your personal
            information through AuctionX websites, devices, products, services,
            online marketplace and applications that reference this Privacy
            Notice (together "AuctionX Services").
          </p>
          <p className="privacy-text">
            By using AuctionX Services you agree to our use of your personal
            information (including sensitive personal information) in accordance
            with this Privacy Notice, as may be amended from time to time by us
            at our discretion. You also agree and consent to us collecting,
            storing, processing, transferring, and sharing your personal
            information (including sensitive personal information) with third
            parties or service providers for the purposes set out in this
            Privacy Notice.
          </p>

          <h3 className="text-center mt-5 privacy-subheading">
            What Personal Information About Customers Does AuctionX Collect?
          </h3>
          <p className="privacy-text">
            We collect your personal information in order to provide and
            continually improve our products and services.
          </p>
          <p className="privacy-text">
            Here are the types of personal information we collect:
          </p>

          <h3 className="privacy-subheading">Information You Give Us</h3>
          <p className="privacy-text">
            We receive and store any information you provide in relation to
            AuctionX Services. You can choose not to provide certain
            information, but then you might not be able to take advantage of
            many of our AuctionX Services.
          </p>

          <h3 className="privacy-subheading">Automatic Information</h3>
          <p className="privacy-text">
            We automatically collect and store certain types of information
            about your use of AuctionX Services, including information about
            your interaction with content and services available through
            AuctionX Services.
          </p>

          <h3 className="privacy-subheading">Information from Other Sources</h3>
          <p className="privacy-text">
            We might receive information about you from other sources, such as
            updated delivery and address information from our carriers, which we
            use to correct our records and deliver your next purchase more
            easily.
          </p>

          <h3 className="text-center mt-5 privacy-subheading">
            For What Purposes Does AuctionX Use Your Personal Information?
          </h3>
          <p className="privacy-text">
            We use your personal information to operate, provide, develop, and
            improve the products and services that we offer our customers.
          </p>

          <ul className="privacy-list">
            <li className="privacy-list-item">
              Purchase and delivery of products and services.
            </li>
            <li className="privacy-list-item">
              Provide, troubleshoot, and improve AuctionX Services.
            </li>
            <li className="privacy-list-item">
              Recommendations and personalization.
            </li>
            <li className="privacy-list-item">
              Provide voice, image, and camera services.
            </li>
            <li className="privacy-list-item">
              Comply with legal obligations.
            </li>
            <li className="privacy-list-item">Communicate with you.</li>
            <li className="privacy-list-item">Advertising.</li>
            <li className="privacy-list-item">
              Fraud Prevention and Credit Risks.
            </li>
          </ul>

          <h3 className="text-center mt-5 privacy-subheading">
            What About Cookies and Other Identifiers?
          </h3>
          <p className="privacy-text">
            To enable our systems to recognize your browser or device and to
            provide and improve AuctionX Services, we use cookies and other
            identifiers. For more information about cookies and how we use them,
            please read our Cookies Notice.
          </p>

          <h3 className="text-center mt-5 privacy-subheading">
            Does AuctionX Share Your Personal Information?
          </h3>
          <p className="privacy-text">
            Information about our customers is an important part of our business
            and we are not in the business of selling our customers’ personal
            information to others. We share customers’ personal information only
            as described below and with AuctionX.com, Inc. and subsidiaries that
            AuctionX.com, Inc. controls that either are subject to this Privacy
            Notice or follow practices at least as protective as those described
            in this Privacy Notice.
          </p>

          <ul className="privacy-list">
            <li className="privacy-list-item">
              Transactions involving Third Parties
            </li>
            <li className="privacy-list-item">Third-Party Service Providers</li>
            <li className="privacy-list-item">Business Transfers</li>
            <li className="privacy-list-item">
              Protection of AuctionX and Others
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyNotice;
