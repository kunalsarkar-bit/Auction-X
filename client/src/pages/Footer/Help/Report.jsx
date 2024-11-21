import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ReportSomethingSuspicious.css"; // Ensure you import the updated CSS

const ReportSomethingSuspicious = () => {
  return (
    <div className="report-container mt-4">
      <h1>Report Something Suspicious</h1>
      <p>
        We take phishing and spoofing attempts seriously. If you receive
        correspondence you think may not be from AuctionX, please report it
        immediately. To view the below information in your preferred regional
        language, click the link:
        <a href="/"> English</a>, <a href="/">हिन्दी (Hindi)</a>,{" "}
        <a href="/">தமிழ் (Tamil)</a>, <a href="/">తెలుగు (Telugu)</a>,{" "}
        <a href="/">ಕನ್ನಡ (Kannada)</a>, <a href="/">മലയാളം (Malayalam)</a>,{" "}
        <a href="/">मराठी (Marathi)</a>, <a href="/">বাংলা (Bengali)</a>.
      </p>

      <h3>Report suspicious phone call, email or SMS/text message</h3>
      <p>
        Select an option below based on how you have responded to the suspicious
        communication:
      </p>
      <ul>
        <li>I have not shared any information</li>
        <li>I have shared AuctionX account information</li>
        <li>I have shared Banking information</li>
        <li>I have given remote access to my computer/devices</li>
        <li>I have shared other information</li>
      </ul>

      <h4>If you don't have an AuctionX account</h4>
      <p>
        You can still report suspicious communication to us at{" "}
        <a href="mailto:reportascam@auctionx.com">reportascam@auctionx.com</a>.
        Sending the suspicious communication as an attachment is the best way
        for us to track it.
      </p>

      <h3>Report unsolicited packages received</h3>
      <ul>
        <li>Unsolicited package received</li>
      </ul>

      <h3>Report Gift Card Fraud/Abuse</h3>
      <ul>
        <li>Common Gift Card Scams</li>
      </ul>

      <p>
        If you're concerned about your account security, go to{" "}
        <a href="/">Protect Your System</a> for tips and recommendations.
      </p>

      <h4>
        To know more about safe online shopping, please refer to the following
        pages:
      </h4>
      <ul>
        <li>
          <a href="/">
            Identifying whether a phone call, email, text message or webpage is
            from AuctionX
          </a>
        </li>
        <li>
          <a href="/">Stay Safe with AuctionX Pay</a>
        </li>
      </ul>

      <p>
        If you received suspicious communications pretending to be from AuctionX
        – and you don’t have an account with us – please report it to us at{" "}
        <a href="mailto:reportascam@auctionx.com">reportascam@auctionx.com</a>.
      </p>

      <h3>Suspicious Mail Attachment</h3>
      <p>
        Note: Sending the suspicious email as an attachment is the best way for
        us to track it. If you can't send the suspicious email to us as an
        attachment, you can forward it to{" "}
        <a href="mailto:reportascam@auctionx.com">reportascam@auctionx.com</a>.
      </p>

      <h4>Forward Suspicious Email</h4>
      <p>
        Note: AuctionX can't respond to you personally when you write to{" "}
        <a href="mailto:reportascam@auctionx.com">reportascam@auctionx.com</a>,
        but you may receive an automatic confirmation email.
      </p>

      <p>
        If you have security concerns about your account, review the{" "}
        <a href="/">Protect Your System</a> help page.
      </p>
    </div>
  );
};

export default ReportSomethingSuspicious;
