import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SafeAndSecureShopping.css"; // Import your CSS

const SafeAndSecureShopping = () => {
  return (
    <div className="safe-secure-container mt-4 text-center">
      {" "}
      {/* Center align text */}
      <h1>Safe and Secure Shopping</h1>
      <h3>Is making online payment secure on AuctionX?</h3>
      <p>Yes, making the online payment is secure on AuctionX.</p>
      <h3>Does AuctionX store my credit/debit card information?</h3>
      <p>
        No. AuctionX only stores the last 4 digits of your card number for the
        purpose of card identification.
      </p>
      <h3>What credit/debit cards are accepted on AuctionX?</h3>
      <p>
        We accept VISA, MasterCard, Maestro, Rupay, American Express, Diner's
        Club, and Discover credit/debit cards.
      </p>
      <h3>
        Do you accept payment made by credit/debit cards issued in other
        countries?
      </h3>
      <p>
        Yes! We accept VISA, MasterCard, Maestro, and American Express
        credit/debit cards issued by banks in India and in the following
        countries: Australia, Austria, Belgium, Canada, Cyprus, Denmark,
        Finland, France, Germany, Ireland, Italy, Luxembourg, the Netherlands,
        New Zealand, Norway, Portugal, Singapore, Spain, Sweden, the UK, and the
        US.
      </p>
      <p>
        Please note that we do not accept internationally issued credit/debit
        cards for eGV payments/top-ups.
      </p>
      <h3>What other payment options are available on AuctionX?</h3>
      <p>
        Apart from Credit and Debit Cards, we accept payments via Internet
        Banking (covering 44 banks), Cash on Delivery, Equated Monthly
        Installments (EMI), E-Gift Vouchers, AuctionX Pay Later, UPI, Wallet,
        and Paytm Postpaid.
      </p>
      <h3>Privacy Policy</h3>
      <p>
        AuctionX.com respects your privacy and is committed to protecting it.
        For more details, please see our Privacy Policy.
      </p>
      <h3>Contact Us</h3>
      <p>
        Couldn't find the information you need? Please{" "}
        <a href="/contact">Contact Us</a>.
      </p>
    </div>
  );
};

export default SafeAndSecureShopping;
