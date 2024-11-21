import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BidHistoryDetails.css";
import DownloadInvoice from "../../../../components/DownloadInvoice/DownloadInvoice";

const DetailedOrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  // Fetch the detailed order based on the order id
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/${id}`
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchOrderDetails();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="BidHistoryDetails-container">
      <div className="row">
        {/* Delivery Address */}
        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h5>Delivery Address</h5>
            <p>Name: {order.name}</p>
            <p>Address: {order.address}</p>
            <p>Phone number: {order.phoneNo}</p>
          </div>
        </div>

        {/* Rewards */}
        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h5 style={{ marginLeft: "105px", fontSize: "24px" }}>
              You won the Bid
            </h5>
            <div className="col-md-6  rounded" style={{ marginLeft: "105px" }}>
              <img
                src={
                  order.images && order.images[0]
                    ? order.images[0].secure_url
                    : "https://via.placeholder.com/150"
                }
                className="img-fluid"
                alt={order.title || "Order Image"} // Fallback alt text
              />
            </div>
          </div>
        </div>

        {/* More Actions */}
        <div className="col-md-4">
          <div className="card p-3 mb-3 text-center">
            <h5>More Actions</h5>

            <DownloadInvoice id={id} />
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="card p-3 mb-3">
        <h5>{order.title}</h5>
        <p>Seller: {order.sellerEmail}</p>
        <p>Price: {order.biddingStartPrice}</p>

        <div className="d-flex justify-content-between">
          <p>Highest Bid: {order.highestBid}</p>
          <p>
            Date of winning: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <p className="text-muted">
          Product has no-return policy.{" "}
          <span onClick={() => navigate("/terms")} className="text-primary">
            Know more
          </span>
        </p>
        <div className="mt-2">
          <button
            className="btn btn-primary me-2"
            onClick={() => navigate("/feedback")}
          >
            Rate & Review Product
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/contact")}
          >
            Chat with us
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedOrderPage;
