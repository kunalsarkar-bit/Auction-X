import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Payment.css"; // For the CSS styling
import gpay from "../../../../assets/images/components/Payment/Gpay.png";
import phonepay from "../../../../assets/images/components/Payment/PhonePe.png";
import debit from "../../../../assets/images/components/Payment/debit.png";
import credit from "../../../../assets/images/components/Payment/credit.png";
import netbank from "../../../../assets/images/components/Payment/net-banking-icon.png";
import { toast } from "react-hot-toast";
import axios from "axios";

const PaymentPage = () => {
  const [amount, setAmount] = useState(0); // Initial available amount set to 0
  const [customAmount, setCustomAmount] = useState(""); // Empty string by default
  const [errorMessage, setErrorMessage] = useState("");

  const handleAmountChange = (change) => {
    const newAmount = change;
    setCustomAmount(newAmount.toString());
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*$/.test(value)) {
      setCustomAmount(value);
    }
  };

  const email = localStorage.getItem("email"); // Get email from localStorage outside useEffect

  useEffect(() => {
    if (!email) {
      console.error("No email found in local storage");
      setErrorMessage("Please log in to make a payment.");
      return;
    }

    const fetchAmount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/get-amount?email=${email}`
        );
        if (response.data && response.data.amount !== undefined) {
          setAmount(response.data.amount);
        } else {
          console.error("Amount not found in the response");
        }
      } catch (error) {
        console.error("Error fetching amount from the server:", error);
      }
    };

    fetchAmount();
  }, [email]);

  const donateNow = () => {
    const email = localStorage.getItem("email"); // Get email from localStorage
    if (!email) {
      console.error("No email found in local storage");
      setErrorMessage("Please log in to make a payment.");
      return;
    }

    const amountToPay = parseInt(customAmount, 10) || 199;

    var options = {
      key: "rzp_test_ND81BEh4gRO77Q", // Enter the Key ID generated from the Dashboard
      amount: amountToPay * 100, // Convert to paise
      currency: "INR",
      name: "Payment Practice",
      description: "Payment Example for MERN26",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpGiRQnCqN-fU3aDmBJAKUqN5ZYhjT92tM8Q&s",
      handler: function (response) {
        // After Razorpay payment is done, verify on the server
        fetch("/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              // Payment verified successfully, update the amount
              // setAmount((prevAmount) => prevAmount + amountToPay); // Update amount only on successful verification
              setErrorMessage(""); // Clear any errors
              // alert('Payment verified successfully!');
            } else {
              // Payment verification failed, don't update the amount
              setErrorMessage("Payment verification failed. Please try again.");
            }
          })
          .catch((err) => {
            // Handle any errors during verification
            const totalamount = amount + amountToPay;
            setAmount(() => amount + amountToPay);
            // Send the updated amount to the server
            axios
              .patch("http://localhost:5000/api/auth/update-amount", {
                email,
                amount: totalamount,
              })
              .then((response) => {
                toast.success("Payment successful");
              })
              .catch((error) => {
                console.error("Error updating amount in the database:", error);
                setErrorMessage(
                  "Payment verified, but failed to update amount."
                );
              });
            console.error("Error:", err);
            // setErrorMessage('Something went wrong during payment verification.');
          });
      },
      modal: {
        ondismiss: function () {
          // Refresh the page when Razorpay modal is dismissed
          window.location.reload();
        },
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  return (
    <div className="payment-page-body">
      <div className="PAYMENT-container mt-5 mb-5 payment-page">
        {/* Available Money Section */}
        <div className="available-money">Available Money: ₹{amount}</div>

        {/* Title Section */}
        <div className="row justify-content-between">
          <div className="col">
            <h2>Funds</h2>
          </div>
        </div>

        {/* Enter Amount Section */}
        <div className="text-center mt-4">
          <h3>Enter Amount</h3>
          <div className="input-group w-25 mx-auto">
            <span className="input-group-text">₹</span>
            <input
              type="text"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="form-control"
              placeholder="Enter amount"
            />
          </div>
          <div className="mt-3">
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => handleAmountChange(500)}
            >
              +500
            </button>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => handleAmountChange(1000)}
            >
              +1000
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => handleAmountChange(1500)}
            >
              +1500
            </button>
          </div>
        </div>

        {/* Add Money Button */}
        <div className="text-center mt-4">
          <button
            className={`btn ${
              customAmount < 500
                ? "PAYMENT-btn-secondary"
                : "PAYMENT-btn-success"
            } btn-lg`}
            disabled={customAmount < 500} // Disable button if amount is less than 500
            onClick={donateNow}
          >
            Add Money
          </button>
          {customAmount < 500 && (
            <div className="text-danger mt-3">
              <h4>Amount must be at least ₹500</h4>
            </div>
          )}
          {errorMessage && (
            <div className="text-danger mt-3">
              <h4>{errorMessage}</h4>
            </div>
          )}
        </div>

        {/* Payment Options Section */}
        <div className="payment-options-section mt-5">
          <h5>Payment Options</h5>
          <div className="list-group mt-3" onClick={donateNow}>
            <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex align-items-center">
                <img src={phonepay} alt="PhonePe" className="me-3" width="40" />
                <span>PhonePe</span>
              </div>
              <span>Pay via Auction X Bank</span>
            </button>
          </div>
          <div className="list-group mt-3" onClick={donateNow}>
            <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src={gpay} alt="GPay" className="me-3" width="40" />
                <span>GPay</span>
              </div>
              <span>Pay via PUNJAB 2188</span>
            </button>
          </div>
          <div className="list-group mt-3" onClick={donateNow}>
            <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img
                  src={credit}
                  alt="Credit Card"
                  className="me-3"
                  width="40"
                />
                <span>Credit Card</span>
              </div>
              <span>Pay via Auction X Bank</span>
            </button>
          </div>
          <div className="list-group mt-3" onClick={donateNow}>
            <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src={debit} alt="Debit Card" className="me-3" width="40" />
                <span>Debit Card</span>
              </div>
              <span>Pay via Auction X Bank</span>
            </button>
          </div>
          <div className="list-group mt-3" onClick={donateNow}>
            <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img
                  src={netbank}
                  alt="Net Banking"
                  className="me-3"
                  width="40"
                />
                <span>Net Banking</span>
              </div>
              <span>Pay via Auction X Bank</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
