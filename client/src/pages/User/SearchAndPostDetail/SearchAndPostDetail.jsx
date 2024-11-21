// ProductDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./SearchAndPostDetail.css";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
          <img
            src={
              product.images && product.images.length > 0
                ? product.images[0].secure_url
                : "fallback_image_url.jpg"
            }
            alt={product.name}
          />
          <div className="product-detail-content">
            <h2>{product.name}</h2>
            <p>
              <span>Price:</span> ${product.biddingStartPrice}
            </p>
            <p>
              <span>Description:</span> {product.description}
            </p>
            <p>
              <span>Category:</span> {product.category}
            </p>
            <button onClick={() => navigate(`/product/${id}`)}>Bid Now</button>
          </div>
        </>
      ) : (
        <p>No product details available.</p>
      )}
    </div>
  );
};

export default ProductDetail;
