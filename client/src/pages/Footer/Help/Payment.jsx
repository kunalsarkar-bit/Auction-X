import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PaymentOptions.css"; // Import custom CSS

const PaymentOptions = () => {
  return (
    <div className="container payment-options-container">
      <h1>Payment Options</h1>

      <p>
        To pay using your credit card at checkout, you will need your card
        number, expiry date, and three-digit CVV number (found on the backside
        of your card). After entering these details, you will be redirected to
        the bank's page for entering the online 3D Secure password.
      </p>

      <p>
        We accept payments made using Visa, MasterCard, and Maestro debit cards.
      </p>
      <p>
        To pay using your debit card at checkout, you will need your card
        number, expiry date (optional for Maestro cards), and three-digit CVV
        number (optional for Maestro cards). You will then be redirected to your
        bank's secure page for entering your online password (issued by your
        bank) to complete the payment.
      </p>
      <p>
        Internationally issued credit/debit cards cannot be used for Flyte,
        Wallet, and eGV payments/top-ups.
      </p>

      <h3>Is it safe to use my credit/debit card on AuctionX?</h3>
      <p>
        Your online transaction on AuctionX is secure with the highest levels of
        transaction security currently available on the Internet. AuctionX uses
        256-bit encryption technology to protect your card information while
        securely transmitting it to the respective banks for payment processing.
      </p>
      <p>
        All credit card and debit card payments on AuctionX are processed
        through secure and trusted payment gateways managed by leading banks.
        Banks now use the 3D Secure password service for online transactions,
        providing an additional layer of security through identity verification.
      </p>

      <h3>What steps does AuctionX take to prevent card fraud?</h3>
      <p>
        AuctionX realizes the importance of a strong fraud detection and
        resolution capability. We and our online payments partners monitor
        transactions continuously for suspicious activity and flag potentially
        fraudulent transactions for manual verification by our team.
      </p>
      <p>
        In rare cases, when our team is unable to rule out the possibility of
        fraud categorically, the transaction is kept on hold, and the customer
        is requested to provide identity documents. The ID documents help us
        ensure that the purchases were indeed made by a genuine cardholder. We
        apologize for any inconvenience caused and request customers to bear
        with us in the interest of ensuring a safe and secure environment for
        online transactions.
      </p>

      <h3>What is a 3D Secure password?</h3>
      <p>
        The 3D Secure password is implemented by VISA and MasterCard in
        partnership with card-issuing banks under the "Verified by VISA" and
        "Mastercard SecureCode" services, respectively.
      </p>
      <p>
        The 3D Secure password adds an additional layer of security through
        identity verification for your online credit/debit card transactions.
        This password, which is created by you, is known only to you. This
        ensures that only you can use your card for online purchases.
      </p>

      <h3>How can I get the 3D Secure password for my credit/debit card?</h3>
      <p>
        You can register for the 3D Secure password for your credit/debit card
        by visiting your bank's website.
      </p>

      <h3>Can I use my bank's Internet Banking feature to make a payment?</h3>
      <p>
        Yes. AuctionX offers you the convenience of using your bank's Internet
        Banking service to make a payment towards your order. With this, you can
        directly transfer funds from your bank account, while conducting a
        highly secure transaction.
      </p>

      <h3>
        Can I make a credit/debit card or Internet Banking payment on AuctionX
        through my mobile?
      </h3>
      <p>
        Yes, you can make credit card payments through the AuctionX mobile site
        and application. AuctionX uses 256-bit encryption technology to protect
        your card information while securely transmitting it to the secure and
        trusted payment gateways managed by leading banks.
      </p>

      <h3>How does 'Instant Cashback' work?</h3>
      <p>
        The 'Cashback' offer is instant and exclusive to AuctionX.com. You only
        pay the final price you see in your shopping cart.
      </p>

      <h3>How do I place a Cash on Delivery (C-o-D) order?</h3>
      <p>
        All items that have the "Cash on Delivery Available" icon are valid for
        order by Cash on Delivery.
      </p>
      <p>
        Add the item(s) to your cart and proceed to checkout. When prompted to
        choose a payment option, select "Pay By Cash on Delivery". Enter the
        CAPTCHA text as shown, for validation.
      </p>
      <p>
        Once verified and confirmed, your order will be processed for shipment
        in the time specified, from the date of confirmation. You will be
        required to make a cash-only payment to our courier partner at the time
        of delivery of your order to complete the payment.
      </p>

      <h3>Terms & Conditions:</h3>
      <ul>
        <li>The maximum order value for C-o-D is ₹50,000</li>
        <li>Gift Cards or Store Credit cannot be used for C-o-D orders</li>
        <li>Cash-only payment at the time of delivery.</li>
      </ul>

      <p>
        With AuctionX's credit card EMI option, you can choose to pay in easy
        installments of 3, 6, 9, 12, 18*, or 24 months* with credit cards from
        select banks.
      </p>

      <h3>Example and Calculations:</h3>
      <p>
        The table below shows a representative rendering of EMI plans for a Rs
        20,000 purchase on AuctionX paid using the EMI payment plan:
      </p>
      <table className="table payment-options-table">
        <thead>
          <tr>
            <th>Tenure (months)</th>
            <th>Loan amount</th>
            <th>Monthly installment</th>
            <th>Bank interest rate</th>
            <th>Total effective price</th>
            <th>Interest paid to Bank</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3</td>
            <td>Rs 20,000</td>
            <td>Rs 6,800.44</td>
            <td>12.00%</td>
            <td>Rs 20,401.33</td>
            <td>Rs 401.33</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Rs 20,000</td>
            <td>Rs 3,450.97</td>
            <td>12.00%</td>
            <td>Rs 20,705.80</td>
            <td>Rs 705.80</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Rs 20,000</td>
            <td>Rs 2,344.32</td>
            <td>13.00%</td>
            <td>Rs 21,098.89</td>
            <td>Rs 1,098.89</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentOptions;
