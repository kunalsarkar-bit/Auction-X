import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import './OTPVerify.css'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const OTPverify = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(30);
    const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalOtp, setOriginalOtp] = useState("");  
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object
  const { email } = location.state || {}; // Retrieve email from the previous page

  useEffect(() => {
    const fetchOtp = async () => {
      if (!email) {
        setErrorMessage("Email is missing. Please try again.");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/get-otp/${email}`); // Use the email as a parameter
        setOriginalOtp(response.data.otp);
      } catch (error) {
        console.error("Error fetching OTP:", error);
        setErrorMessage("Failed to fetch OTP. Please try again.");
      }
    };
    fetchOtp(); 
  }, [email]); // Add email as a dependency to useEffect

  const handleChange = (element, index) => {
    let newOtp = [...otp];
    const totalFilled = newOtp.filter(val => val !== "").length;
    if (totalFilled >= 4 && element.value !== "") return;
    if (isNaN(element.value)) return;
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    let newOtp = [...otp];
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          newOtp[index - 1] = "";
          setOtp(newOtp);
          document.getElementById(`otp-${index - 1}`).focus();
        }
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };
  const handleVerifyOtp = async () => {
    setIsSubmitting(true); // Start submitting
    const enteredOtp = otp.join('');
    
    // Check if OTP has all fields filled
    if (otp.includes("")) {
      toast.error("Please enter a complete OTP.");
      setIsSubmitting(false); // End submitting
      return;
    }
  
    if (enteredOtp.trim() === originalOtp.toString().trim()) {
      toast.success("Verification Successful");
  
      try {
        // Patch request to update the isVerified field
        const response = await axios.patch('http://localhost:5000/api/auth/verify-user', {
          email: email,
        });
  
        // Navigate to the reset password page or another target page
        navigate('/', { state: { email } });
      } catch (error) {
        console.error("Error verifying user:", error);
        toast.error("Failed to update user verification status.");
      }
    } else {
      setIsSubmitting(false); // End submitting
      toast.error("Invalid OTP, please try again");
    }
  };
  

  

  const handleResendOtp = async () => {
    setOtp(new Array(4).fill(""));  // Reset OTP input fields
    setTimer(30);  // Reset timer
    setIsResendDisabled(true);  // Disable the resend button
    setErrorMessage("");  // Clear any error messages
  
    try {
      // Make an API call to resend OTP
      const response = await axios.post(`http://localhost:5000/api/auth/resend-otp`, { email });
      setOriginalOtp(response.data.otp);  // Update the original OTP with the new one from response
    } catch (error) {
      console.error("Error resending OTP:", error);
      setErrorMessage("Failed to resend OTP. Please try again.");  // Display error message if resend fails
    }
  };
  

  useEffect(() => {
    let interval = null;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, timer]);

  return (
    <div className='otp-body-container'>
      <div className="otp-outer-container otp-reset">
        <div className="otp-inner-container otp-container">
          <h3 className="otp-header">Enter OTP</h3>
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error messages */}
          <div className="otp-input-container">
            {otp.map((data, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="number"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                className="otp-input-box"
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()} 
              />
            ))}
          </div>
           <button
        onClick={handleVerifyOtp}
        className="otp-verify-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Verifying..." : "VERIFY OTP"}
      </button>
          <button
            onClick={handleResendOtp}
            disabled={isResendDisabled}
            className={`otp-resend-button ${isResendDisabled ? 'otp-disabled' : 'otp-enabled'}`}
          >
            RESEND OTP
          </button>
          <p className="otp-timer-text">You can resend OTP after {timer} seconds</p>
        </div>
      </div>
    </div>
  );
};

export default OTPverify;
