import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OTPInput.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const OtpInput = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));  // State to track OTP input
  const [isResendDisabled, setIsResendDisabled] = useState(true);  // Disable resend button initially
  const [timer, setTimer] = useState(30);  // Timer for OTP validity
  const [originalOtp, setOriginalOtp] = useState("");  // OTP fetched from backend
  const [errorMessage, setErrorMessage] = useState("");  // Error message for UI
  const [isSubmitting, setIsSubmitting] = useState(false);  // To track submission state
  const [loading, setLoading] = useState(true);  // To track OTP fetching state
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};  // Email from previous page

  // Fetch OTP when component is mounted or when email changes
  useEffect(() => {
    const fetchOtp = async () => {
      if (!email) {
        setErrorMessage("Email is missing. Please try again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/auth/get-otp/${email}`);
        if (response.data && response.data.otp) {
          setOriginalOtp(response.data.otp.toString());  // Ensure OTP is a string
        } else {
          setErrorMessage("OTP not found.");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch OTP. Please try again.");
        console.error("Error fetching OTP:", error);
      }
      setLoading(false);  // End loading when OTP fetch is complete
    };

    fetchOtp();  // Fetch OTP when email is available
  }, [email]);

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
  
const handleVerifyOtp = () => {
  setIsSubmitting(true);

  // Check if OTP has been initialized
  if (!originalOtp || typeof originalOtp !== 'string' || !originalOtp.trim()) {
    toast.error("OTP not initialized. Please wait for the OTP to be fetched.");
    setIsSubmitting(false);
    return;  // Stop execution if OTP is not available or not a string
  }

  const enteredOtp = otp.join('');
  if (enteredOtp === originalOtp) {
    setIsSubmitting(true);
    toast.success("Verification Successful");
    navigate('/resetpassword', { state: { email } });
  } else {
    setIsSubmitting(false);  // Stop submitting on failure
    toast.error("Invalid OTP, please try again");
  }
};



  // Handle OTP verification
const handleResendOtp = async () => {
  setOtp(new Array(4).fill(""));  // Reset OTP input fields
  setTimer(30);  // Reset timer
  setIsResendDisabled(true);  // Disable the resend button
  setErrorMessage("");  // Clear any error messages

  try {
    // Make an API call to resend OTP
    const response = await axios.post(`http://localhost:5000/api/auth/resend-otp`, { email });
    if (response.data && response.data.otp) {
      setOriginalOtp(response.data.otp.toString());  // Update original OTP with new one
    } else {
      setErrorMessage("Failed to resend OTP. Please try again.");
    }
  } catch (error) {
    console.error("Error resending OTP:", error);
    setErrorMessage("Failed to resend OTP. Please try again.");  // Display error message if resend fails
  }
};



  // Timer for OTP validity
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
          {loading && <p>Loading OTP...</p>}  {/* Show loading message if OTP is being fetched */}
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
                disabled={loading || isSubmitting}
              />
            ))}
          </div>

          <button
            onClick={handleVerifyOtp}
            className="otp-verify-button"
            disabled={isSubmitting || loading}
          >
            {isSubmitting ? "Verifying..." : "VERIFY OTP"}
          </button>

          <button
            onClick={handleResendOtp}
            disabled={isResendDisabled || loading}
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

export default OtpInput;
