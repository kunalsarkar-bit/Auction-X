import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BidHistory.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        const userEmail = localStorage.getItem("email"); // Retrieve userEmail from local storage

        // Filter orders based on userEmail
        const filteredOrders = response.data.filter(
          (order) => order.userEmail === userEmail
        );
        setOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading your orders...</p>;
  }

  return (
    <div className="BidHistory-container">
      <h2 className="mb-2 ordercolor">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-white">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div className="card mb-3" key={order._id}>
            <div className="row g-0">
              <div className="col-md-2">
                <img
                  src={
                    order.images && order.images[0]
                      ? order.images[0].secure_url
                      : "https://via.placeholder.com/150"
                  }
                  className="img-fluid fixed-image"
                  alt={order.title || "Order Image"}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h1 >{order.title}</h1>
                  <h4>
                  <p className="card-text">
                    Price:{" "}
                    {order.biddingStartPrice
                      ? `₹${order.biddingStartPrice.toFixed(2)}`
                      : "N/A"}
                  </p>
                  <p>
                  Highest Bid:{" "}
                    {order.highestBid
                      ? `₹${order.highestBid.toFixed(2)}`
                      : "N/A"}
                  </p>
                  </h4>
                </div>
              </div>
              <div
                className="col-md-2 text-center"
                style={{ marginTop: "58px" }}
              >
                <Link
                  to={`/order/${order._id}`}
                  className="btn btn-outline-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
