import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Image,
  Carousel,
  Form,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Share from "../Share/ShareMenu";
import { MdAccountBalanceWallet } from "react-icons/md";
import { RiMapPinTimeFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { ImHammer2 } from "react-icons/im";
// import TimeCountdown from "./TimeCountdown";
import "./TimeCountdown.css";
import io from "socket.io-client";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import toast from "react-hot-toast";

const CarDetailsPage = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const { id } = useParams();
  const productId = id;
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [currentBid, setCurrentBid] = useState(0);
  const [bidderName, setBidderName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [userMoney, setUserMoney] = useState(0);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [productDeleted, setProductDeleted] = useState(false);
  const [carData, setCarData] = useState({
    images: [],
    name: "",
    biddingStartPrice: 0,
    email: "",
    description: "",
  });
  const [socket, setSocket] = useState(null);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [isBiddingStarted, setIsBiddingStarted] = useState(false);
  const [isBiddingEnded, setIsBiddingEnded] = useState(false); // New state for bidding ended
  const [biddingEndTime, setBiddingEndTime] = useState(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:5000");

    setSocket(socketInstance);

    // Join a room for the specific product
    socketInstance.emit("joinProductRoom", id); // Use the product's `id` to join

    // Listen for product updates
    socketInstance.on("productData", (productData) => {
      if (productData.productId === id) {
        // Ensure it's the correct product
        setCurrentBid(productData.currentBid);
        setBidderName(productData.bidderName);
        setBiddingEndTime(new Date(productData.biddingEndTime));
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [id]); // Depend on the product `id`

  const updateTimer = (startTime, endTime) => {
    if (
      !startTime ||
      !endTime ||
      isNaN(startTime.getTime()) ||
      isNaN(endTime.getTime())
    ) {
      return; // If the startTime or endTime is invalid, return early and do nothing
    }

    const now = new Date().getTime();
    let difference = isBiddingStarted
      ? endTime.getTime() - now
      : startTime.getTime() - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    } else {
      setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      if (!isBiddingStarted) {
        setIsBiddingStarted(true); // Bidding starts
      } else {
        setIsBiddingEnded(true); // Bidding ends
      }
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${productId}`
      );

      const {
        biddingStartDate,
        biddingStartTime,
        biddingEndTime,
        tempuseremail,
        tempname,
      } = response.data;

      // Set bidder name if tempuseremail is found
      if (tempuseremail) {
        setBidderName(tempname);
      }

      if (biddingStartDate && biddingStartTime) {
        const startDate = new Date(biddingStartDate);
        const startTime = new Date(biddingStartTime);

        startDate.setUTCHours(
          startTime.getUTCHours(),
          startTime.getUTCMinutes(),
          0,
          0
        );
        const endTime = new Date(biddingEndTime);
        setBiddingEndTime(endTime);

        if (!isNaN(endTime)) {
          updateTimer(startDate, endTime);
        }
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setProductDeleted(false);
    }
  };

  useEffect(() => {
    fetchProductData();
    const interval = setInterval(() => {
      if (biddingEndTime && !isBiddingEnded) {
        updateTimer(new Date(), biddingEndTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [biddingEndTime, isBiddingStarted, isBiddingEnded]);

  useEffect(() => {
    if (isBiddingEnded) {
      handleBiddingEnd();
    }
  }, [isBiddingEnded]);

  const handleBiddingEnd = async () => {
    try {
      // Fetch product data after bidding ends
      const productResponse = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      const productData = productResponse.data;

      const {
        name: title,
        email: sellerEmail,
        category,
        images,
        tempuseremail: userEmail,
        tempamount: highestBid,
        tempname: name,
        biddingStartPrice,
      } = productData;
      if (userEmail) {
        // Fetch user data for the highest bidder
        const userResponse = await axios.get(
          `http://localhost:5000/api/auth/user/${userEmail}`
        );
        const { address, phoneNo } = userResponse.data;

        // Compile auction summary data
        const auctionSummary = {
          title,
          sellerEmail,
          category,
          images,
          userEmail,
          highestBid,
          name,
          biddingStartPrice,
          address,
          phoneNo,
        };

        function showWinningAlert(winnerName) {
          Swal.fire({
            title: `🎉 The Winner is ${winnerName}! 🎉`,
            text: "Congratulations on the victory!",
            icon: "success",
            background: "#fff3e6", // Optional: A soft, celebratory background
            color: "#ff8c00", // Optional: Gold-themed text color
            confirmButtonColor: "#fae570", // Optional: Match the theme
            customClass: {
              popup: "winning-alert",
            },
            backdrop: `
            rgba(0, 0, 0, 0.6) 
            url("https://img.clipart-library.com/2/clip-money-falling-gif/clip-money-falling-gif-8.gif") 
            center center / cover 
            no-repeat
          `,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }

        // alert(`The Winner is ${userResponse.data.name}`)
        showWinningAlert(userResponse.data.name);

        // Post auction summary data
        await axios.post("http://localhost:5000/api/orders/", auctionSummary);

        // Delete the product after the auction ends
        await axios.delete(
          `http://localhost:5000/api/products/deleteSuccessProduct/${id}`
        );
        setProductDeleted(true);
        // Show error message if product is deleted
        if (productDeleted) {
          alert("Sorry, this product is no longer available.");
          window.location.href = "/";
        }
      } else {
        // No highest bidder, update the product status to closed
        await axios.patch(
          `http://localhost:5000/api/products/statuspatch/${id}`,
          {
            status: "Closed",
          }
        );
      }
    } catch (error) {
      console.error("Error handling auction end:", error.message);
    }
  };

  // other component code here...

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setCarData(response.data);
        setCurrentBid(response.data.biddingStartPrice);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchCarData();
  }, [id]);

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      console.error("No email found in local storage");
      return;
    }
    const fetchAmount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/get-amount?email=${email}`
        );
        if (response.data && response.data.amount !== undefined) {
          setUserMoney(response.data.amount);
          // setBidderName(response.data.name);
        } else {
          console.error("Amount not found in the response");
        }
      } catch (error) {
        console.error("Error fetching amount from the server:", error);
      }
    };
    fetchAmount();
  }, [email]);

  const fetchProfilePic = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile-pic",
        {
          params: { email: carData.email },
        }
      );
      if (response.data.profilePic) {
        setProfilePicUrl(response.data.profilePic);
      } else {
        console.log("No profile picture found for this email.");
      }
      if (response.data.name) {
        setSellerName(response.data.name);
      }
    } catch (error) {
      console.log("Error fetching profile picture");
    }
  };

  useEffect(() => {
    if (carData && carData.email) {
      fetchProfilePic();
    }
  }, [carData]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleBidSubmit = async () => {
    try {
      const enteredAmount = parseFloat(bidAmount);
      const minimumAmount = currentBid + 200;

      if (isNaN(enteredAmount) || enteredAmount < minimumAmount) {
        setAlertMessage(
          `Invalid amount. Your bid must be at least ₹${minimumAmount}.`
        );
        return;
      } else if (enteredAmount > userMoney) {
        setAlertMessage("Not enough money to place the bid.");
        return;
      }
      // Step 1: Fetch product data
      const productResponse = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      const productData = productResponse.data;
      // Step 2: Get the previous bidder's email (assuming it's stored in `currentBidderEmail`)
      const previousBidderEmail = productData.tempuseremail || "";
      const name_notification = localStorage.getItem("name"); // Retrieve email from local storage
      if (previousBidderEmail != "") {
        try {
          toast.success(`${name_notification} just placed a bid !`);
          // Step 3: Use the previous bidder's email to fetch the current amount
          const amountResponse = await axios.get(
            `http://localhost:5000/api/auth/get-amount?email=${previousBidderEmail}`
          );
          const fetchedAmount = amountResponse.data.amount || 0;

          // Step 4: Calculate the new amount after refunding the previous bidder
          const newAmount = (productData.tempamount || 0) + fetchedAmount;
          // Step 5: Update the previous bidder's amount (refund them)
          await axios.patch(`http://localhost:5000/api/auth/update-amount`, {
            email: previousBidderEmail,
            amount: newAmount,
          });

          // Proceed with the rest of your logic for placing the bid
        } catch (error) {
          console.error("Error updating previous bidder amount:", error);
        }
      }
      // Step 6: Patch the updated user balance (userMoney - enteredAmount)
      const updatedUserBalance = userMoney - enteredAmount;
      await fetch(`http://localhost:5000/api/auth/update-amount`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, amount: updatedUserBalance }),
      });

      // Step 7: Patch the bid amount (enteredAmount) to the TEMPAPI using patchProduct

      const localbiddername = localStorage.getItem("name"); // Retrieve email from local storage

      await fetch(`http://localhost:5000/api/products/tempdata/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tempuseremail: email, // Use email fetched from `fetchAmount`
          tempamount: enteredAmount,
          tempname: localbiddername, // Use localbiddername instead of bidderName
          biddingStartPrice: enteredAmount, // Add biddingStartPrice to request body
        }),
      });

      const userName = localStorage.getItem("name"); // Retrieve email from local storage

      // Validate the bid amount
      if (bidAmount < currentBid + 200) {
        alert(`Your bid must be at least ₹${currentBid + 200}`);
        return;
      }

      const bidData = {
        productId: id, // Include the product ID
        currentBid: enteredAmount,
        bidderName: localStorage.getItem("name"), // Example: Fetch name from local storage
      };

      socket.emit("placeBid", bidData);
      if (!socket) {
        // Use `socket` instead of `socketRef.current`
        console.error("Socket not initialized");
        return;
      }

      // Success message
      setAlertMessage("Bid placed successfully!");
      setCurrentBid(enteredAmount); // Set current bid here for consistency
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      // Resetting bid input and closing dropdown
      setBidAmount("");
      setDropdownVisible(false);
    }
  };

  return (
    <div style={{ marginTop: "160px", marginBottom: "140px" }} className="ProductDetails">
      <Container className="mt-5">
        <Row>
          <Col md={8}>
            <Card>
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                interval={3000}
              >
                {carData.images.map((image, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      className="carousel-image d-block w-180"
                      src={image.secure_url} // Use secure_url from your API response
                      alt={`Slide ${idx + 1}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card>

            <Row className="mt-3 me-5 ms-5">
              {carData.images.map((image, idx) => (
                <Col key={idx} xs={3} className="thumbnail-col">
                  <Image
                    src={image.secure_url} // Use secure_url for thumbnails
                    thumbnail
                    onClick={() => handleSelect(idx)}
                    className="thumbnail-image"
                    style={{ cursor: "pointer" }}
                  />
                </Col>
              ))}
            </Row>

            <Col className="pt-3">
              <Card>
                <Card.Body className="description">
                  <p>
                    <h4>Description</h4> <Share />
                  </p>
                  <p>{carData.description}</p>
                </Card.Body>
              </Card>
            </Col>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <h3>{carData.name}</h3>
                <h5><ImHammer2 /> Current Bid : ₹{currentBid}</h5>
                <h5><IoPerson /> Current Bidder : {bidderName}</h5>

                <div className="timer">
                  <h2>
                    BID{" "}
                    {isBiddingStarted
                      ? isBiddingEnded
                        ? "HAS ENDED"
                        : "ENDS IN "
                      : "STARTS IN "}<RiMapPinTimeFill />
                  </h2>
                  <div className="timer__boxes">
                    <div className="timer__box">
                      <span className="timer__number">{timeLeft.days}</span>
                      <span className="timer__label">DAYS</span>
                    </div>
                    <div className="timer__box">
                      <span className="timer__number">{timeLeft.hours}</span>
                      <span className="timer__label">HOURS</span>
                    </div>
                    <div className="timer__box">
                      <span className="timer__number">{timeLeft.minutes}</span>
                      <span className="timer__label">MINUTES</span>
                    </div>
                    <div className="timer__box">
                      <span className="timer__number">{timeLeft.seconds}</span>
                      <span className="timer__label">SECONDS</span>
                    </div>
                  </div>

                  {/* Conditionally render the button */}
                  {!isBiddingStarted ? null : (
                    <Button
                      variant="danger"
                      className="w-100 mt-3"
                      onClick={toggleDropdown}
                      disabled={isBiddingEnded} // Disable if bidding has ended
                    >
                      {isBiddingEnded ? "Bidding Ended" : "Bid on this"}
                    </Button>
                  )}
                </div>

                {isDropdownVisible && (
                  <Card className="mt-3">
                    <Card.Body>
                      <Form.Group controlId="formBidAmount">
                        <Form.Label>Enter Your Bid:</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder={`Minimum: ₹${currentBid + 200}`}
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                        />
                      </Form.Group>
                      <div className="image_adjust" onClick={handleBidSubmit}>
                        <div className="ProductDetails-fa">
                          <i class="fas fa-gavel fa-5x"></i>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                )}

                {alertMessage && (
                  <Alert
                    variant={
                      alertMessage.includes("Invalid") ? "danger" : "success"
                    }
                    className="mt-3"
                  >
                    {alertMessage}
                  </Alert>
                )}
              </Card.Body>
            </Card>

            <Card className="mt-3">
              <Card.Body>
                <h5><MdAccountBalanceWallet /> Balance : ₹{userMoney}</h5>
              </Card.Body>
            </Card>

            <Card className="mt-3">
              <Card.Body>
                <h5>About Seller</h5>
                <Image
                  src={profilePicUrl}
                  alt="https://via.placeholder.com/50"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  roundedCircle
                />
                <p>{sellerName}</p> {/* Display seller name */}
                {/* <h6>Seller's Email: {carData.email}</h6> Display seller email */}
                <h6>Seller's Reputation</h6>
                <p>⭐⭐⭐⭐☆</p>
                <Button
                  onClick={() => navigate("/contact")}
                  variant="outline-secondary"
                  className="w-100"
                >
                  Contact Us
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CarDetailsPage;
