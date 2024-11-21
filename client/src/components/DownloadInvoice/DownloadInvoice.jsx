import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

const DownloadInvoice = ({ id }) => {
  const [orderData, setOrderData] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false); // State to track downloading status

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/${id}`
        );
        setOrderData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const generateInvoice = async () => {
    if (!orderData) {
      alert("Order data is not loaded yet");
      return;
    }

    setIsDownloading(true); // Set downloading state to true
    try {
      const doc = new jsPDF();

      // Add background image (Logo)
      const logoUrl =
        "https://res.cloudinary.com/dszvpb3q5/image/upload/v1731178921/cifsfk5fzryh0iwp3fua.png";
      doc.addImage(logoUrl, "PNG", 10, 10, 190, 50); // Adjust position and size as needed

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Bidding Winning Invoice", 20, 70);

      // Draw a line under the title
      doc.setLineWidth(0.5);
      doc.line(20, 73, 190, 73);

      // Customer and Order Information
      doc.setFontSize(12);
      doc.text(`Customer Name: ${orderData.name}`, 20, 85);
      doc.text(`Order ID: ${orderData._id}`, 20, 95);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 105);

      // Bidding Information
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204); // Set text color (Blue)
      doc.text("Bidding Information:", 20, 115);
      doc.setTextColor(0, 0, 0); // Reset text color to black
      doc.text(`Highest Bid: Rs. ${orderData.highestBid}`, 20, 125);
      doc.text(`Starting Price: Rs. ${orderData.biddingStartPrice}`, 20, 135);

      // Seller Information
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);
      doc.text("Seller Information:", 20, 145);
      doc.setTextColor(0, 0, 0);
      doc.text(`Seller Email: ${orderData.sellerEmail}`, 20, 155);
      doc.text(`Product Category: ${orderData.category}`, 20, 165);

      // Address and Contact Information
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);
      doc.text("Shipping Address:", 20, 175);
      doc.setTextColor(0, 0, 0);
      doc.text(`Address: ${orderData.address}`, 20, 185);
      doc.text(`Phone: ${orderData.phoneNo}`, 20, 195);

      // Images (First image in the product)
      if (orderData.images && orderData.images.length > 0) {
        const imageUrl = orderData.images[0].secure_url; // Get the first image's secure_url
        doc.addImage(imageUrl, "JPEG", 20, 200, 50, 50); // Example image positioning
      }

      // Footer: Payment Details
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204); // Blue color for the footer
      doc.text("Thank you for your purchase!", 20, 260);
      doc.text(`Invoice Total: Rs. ${orderData.highestBid}`, 20, 270);

      // Draw a line above the footer
      doc.setLineWidth(0.5);
      doc.line(20, 265, 190, 265);

      // Save the document
      doc.save(`AuctionX_Invoice_${orderData._id}.pdf`);
    } catch (error) {
      console.error("Error generating invoice:", error);
    } finally {
      setIsDownloading(false); // Reset downloading state
    }
  };

  return (
    <div>
      {orderData ? (
        <button
          onClick={generateInvoice}
          className="btn btn-warning"
          disabled={isDownloading} // Disable button while downloading
        >
          {isDownloading ? "Downloading..." : "Download Invoice"}
        </button>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default DownloadInvoice;
