// ProductDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-detail">
      {product ? (
        <>
          <h2>{product.name}</h2>
          <img
            src={
              product.images && product.images.length > 0
                ? product.images[0].secure_url
                : "fallback_image_url.jpg"
            }
            alt={product.name}
          />
          <p>Price: ₹{product.biddingStartPrice}</p>
          <p>Phone: {product.mobileNumber}</p>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
          <p>Email: {product.email}</p>
        </>
      ) : (
        <p>No product details available.</p>
      )}
    </div>
  );
};

export default ProductDetail;
