import React, { useEffect, useRef, useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import { ImPriceTags } from "react-icons/im";
import ProductDetailsPopup from "../ProductDetails/ProductDetailsPopUp";
import ReactDOM from "react-dom"; // Import ReactDOM for creating a portal
import "./List.css";

const ProductListing = () => {
  const productListRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(7);
  const [category, setCategory] = useState(""); // Category state, can be set dynamically
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpenPopup = (id) => {
    setSelectedProductId(id); // Open the popup with the selected product's ID
  };

  const handleClosePopup = () => {
    setSelectedProductId(null); // Close the popup
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/");

      // Filter by Active status
      const activeProducts = response.data.filter(
        (product) => product.status === "Active"
      );

      // If a category is specified, filter by that category as well
      const filteredProducts = category
        ? activeProducts.filter((product) => product.category === category)
        : activeProducts;

      // Shuffle the filtered products
      const shuffledProducts = shuffleArray(filteredProducts);

      // Set the first 20 shuffled products
      setProducts(shuffledProducts.slice(0, 20));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    fetchProducts();
  }, [category]); // Re-fetch when category changes

  const scroll = (direction) => {
    const { current } = productListRef;
    if (current) {
      const scrollAmount =
        direction === "left" ? -current.clientWidth : current.clientWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const loadMoreProducts = () => {
    setDisplayCount((prevCount) => Math.min(prevCount + 7, products.length));
  };

  return (
    <div className="list-product-carousel">
      <button
        className="list-scroll-btn left list-button"
        onClick={() => scroll("left")}
      >
        ❮
      </button>
      <div className="list-product-list" ref={productListRef}>
        {products.length === 0 ? (
          <p className="no-products-message">No products yet.</p>
        ) : (
          products.slice(0, displayCount).map((product) => (
            <div key={product._id} className="list-product-card">
              <img
                src={product.images[0]?.secure_url}
                alt={product.name}
                className="list-product-image"
              />
              <p className="list-product-name">{product.name}</p>
              <p className="list-product-price"><ImPriceTags /> ₹{product.biddingStartPrice}</p>
              <button
                className="list-button2"
                onClick={() => handleOpenPopup(product._id)}
              >
                Bid Now
              </button>
            </div>
          ))
        )}
      </div>
      <button
        className="list-scroll-btn right list-button"
        onClick={() => {
          scroll("right");
          loadMoreProducts();
        }}
      >
        ❯
      </button>

      {/* Render the popup outside the normal hierarchy using React Portal */}
      {selectedProductId &&
        ReactDOM.createPortal(
          <div className="carDetails-popup">
            <ProductDetailsPopup
              productId={selectedProductId}
              onClose={handleClosePopup}
            />
          </div>,
          document.body // This will render the popup at the body level
        )}
    </div>
  );
};

export default ProductListing;
