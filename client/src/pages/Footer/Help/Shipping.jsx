import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Shipping.css"; // Importing the CSS module

const Shipping = () => {
  return (
    <div className="shipping-page">
      <div className="container mt-4 shipping-container">
        <h3>What are the delivery charges?</h3>
        <p>Delivery charge varies with each Seller.</p>
        <p>
          Sellers incur relatively higher shipping costs on low-value items. In
          such cases, charging a nominal delivery charge helps them offset
          logistics costs. Please check your order summary to understand the
          delivery charges for individual products.
        </p>
        <p>
          For Products listed as AuctionX Plus, a Rs 40 charge for delivery per
          item may be applied if the order value is less than Rs 500. While,
          orders of Rs 500 or above are delivered free.
        </p>

        <h3>
          Why does the delivery date not correspond to the delivery timeline of
          X-Y business days?
        </h3>
        <p>
          It is possible that the Seller or our courier partners have a holiday
          between the day you placed your order and the date of delivery, which
          is based on the timelines shown on the product page. In this case, we
          add a day to the estimated date. Some courier partners and Sellers do
          not work on Sundays and this is factored into the delivery dates.
        </p>

        <h3>What is the estimated delivery time?</h3>
        <p>
          Sellers generally procure and ship the items within the time specified
          on the product page. Business days exclude public holidays and
          Sundays. Estimated delivery time depends on the following factors:
        </p>
        <ul>
          <li>The Seller offering the product</li>
          <li>Product's availability with the Seller</li>
          <li>
            The destination to which you want the order shipped to and the
            location of the Seller
          </li>
        </ul>

        <h3>
          Are there any hidden costs (sales tax, octroi etc.) on items sold by
          Sellers on AuctionX?
        </h3>
        <p>
          There are NO hidden charges when you make a purchase on AuctionX. List
          prices are final and all-inclusive. The price you see on the product
          page is exactly what you would pay.
        </p>
        <p>
          Delivery charges are not hidden charges and are charged (if at all)
          extra depending on the Seller's shipping policy.
        </p>

        <h3>Why does the estimated delivery time vary for each seller?</h3>
        <p>
          Delivery times are influenced by product availability, geographic
          location of the Seller, your shipping destination, and the courier
          partner's time-to-deliver in your location.
        </p>
        <p>
          Please enter your default pin code on the product page to know more
          accurate delivery times.
        </p>

        <h3>Seller does not/cannot ship to my area. Why?</h3>
        <p>
          Please enter your pin code on the product page to know whether the
          product can be delivered to your location. Serviceability depends on
          several factors including Seller preferences, legal restrictions, and
          availability of reliable courier partners.
        </p>

        <h3>Why is the CoD option not offered in my location?</h3>
        <p>
          Availability of CoD depends on the ability of our courier partner
          servicing your location to accept cash as payment at the time of
          delivery. Check by entering your pin code on the product page to
          confirm availability.
        </p>

        <h3>I need to return an item, how do I arrange for a pick-up?</h3>
        <p>
          Returns are easy. Contact us to initiate a return, and we will guide
          you through the process.
        </p>

        <h3>
          I did not receive my order but got a delivery confirmation SMS/Email.
        </h3>
        <p>
          If the product was not delivered but you received a confirmation,
          report the issue within 7 days for investigation.
        </p>

        <h3>What do the different tags like "In Stock", "Available" mean?</h3>
        <p>
          Tags like 'In Stock', 'Available', 'Preorder', and others indicate the
          product's current status with the Seller, and delivery time may vary
          based on your location and the tag status.
        </p>

        <h3>Does AuctionX deliver internationally?</h3>
        <p>As of now, AuctionX doesn't deliver items internationally.</p>
      </div>
    </div>
  );
};

export default Shipping;
