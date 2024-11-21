import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./FAQ.css"; // Import the CSS file

export default function FAQ() {
  return (
    <MDBContainer className="faq-container">
      <section>
        <MDBTypography tag="h3" className="text-center mb-4 pb-2 faq-heading">
          FAQ
        </MDBTypography>
        <p className="text-center mb-5">
          Find the answers for the most frequently asked questions below
        </p>

        <MDBRow>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h6" className="mb-3 faq-question">
              <MDBIcon far icon="paper-plane text-primary pe-2" /> A simple
              question?
            </MDBTypography>
            <p>
              <strong>
                <u>Absolutely!</u>
              </strong>{" "}
              We work with top payment companies which guarantees your safety
              and security. All billing information is stored on our payment
              processing partner.
            </p>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h6" className="mb-3 faq-question">
              <MDBIcon fas icon="pen-alt text-primary pe-2" /> A question that
              is longer than the previous one?
            </MDBTypography>
            <p>
              <strong>
                <u>Yes, it is possible!</u>
              </strong>{" "}
              You can cancel your subscription anytime in your account. Once the
              subscription is cancelled, you will not be charged next month.
            </p>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h6" className="mb-3 faq-question">
              <MDBIcon fas icon="user text-primary pe-2" /> A simple question?
            </MDBTypography>
            <p>
              Currently, we only offer monthly subscription. You can upgrade or
              cancel your monthly account at any time with no further
              obligation.
            </p>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h6" className="mb-3 faq-question">
              <MDBIcon fas icon="rocket text-primary pe-2" /> A simple question?
            </MDBTypography>
            <p>
              Yes. Go to the billing section of your dashboard and update your
              payment information.
            </p>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h6" className="mb-3 faq-question">
              <MDBIcon fas icon="home text-primary pe-2" /> A simple question?
            </MDBTypography>
            <p>
              <strong>
                <u>Unfortunately no</u>.
              </strong>{" "}
              We do not issue full or partial refunds for any reason.
            </p>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h6" className="mb-3 faq-question">
              <MDBIcon fas icon="book-open text-primary pe-2" /> Another
              question that is longer than usual
            </MDBTypography>
            <p>
              Of course! We’re happy to offer a free plan to anyone who wants to
              try our service.
            </p>
          </MDBCol>
        </MDBRow>
      </section>
    </MDBContainer>
  );
}
