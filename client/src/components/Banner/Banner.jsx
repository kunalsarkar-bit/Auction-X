import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Banner.css";

// Importing images from the local folder
import image1 from "../../assets/images/components/Banner/auction 1.png";
import image2 from "../../assets/images/components/Banner/auction 2.png";
import image3 from "../../assets/images/components/Banner/auction 3.jpg";
import image4 from "../../assets/images/components/Banner/auction 4.png";
import image5 from "../../assets/images/components/Banner/auction 5.png";
import image6 from "../../assets/images/components/Banner/auction 6.png";
import image7 from "../../assets/images/components/Banner/auction 7.png";

// Add more imports as needed

const WideCard = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Static list of images with placeholders for id and author (or any other required details)
  const products = [
    { id: 1, url: image1, author: "Author 1", category: "Currencies" },
    { id: 2, url: image2, author: "Author 2", category: "Antiques" },
    { id: 3, url: image3, author: "Author 3", category: "Automobiles"  },
    { id: 4, url: image4, author: "Author 4", category: "Automobiles" },
    { id: 5, url: image5, author: "Author 5", category: "Books" },
    { id: 6, url: image6, author: "Author 6", category: "Furnitures" },
    { id: 7, url: image7, author: "Author 7", category: "Properties" },
    // Add more images as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [products.length]);

  // Handle click event to navigate to the category page
  const handleClick = (category) => {
    navigate(`/category/${category}`); // Navigate to the selected category page
  };

  return (
    <div className="wide-card">
      {products.length > 0 ? (
        products.map((product, index) => (
          <div
            key={product.id}
            className={`wide-card-item ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleClick(product.category)} // Add onClick to navigate
          >
            <img src={product.url} alt={product.author} />{" "}
            {/* Using local image source */}
          </div>
        ))
      ) : (
        <p>No products available</p> // Fallback UI if products is empty
      )}
      <div className="BANNERnavigation">
        {products.length > 0 &&
          products.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default WideCard;
