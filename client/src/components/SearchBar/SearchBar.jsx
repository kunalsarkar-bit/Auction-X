import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { toast } from "react-hot-toast";

const SearchAndPostDetail = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/");

        // Filter products by 'Active' status before setting them in the state
        const activeProducts = response.data.products
          ? response.data.products.filter(
              (product) => product.status === "Active"
            )
          : response.data.filter((product) => product.status === "Active");

        // Ensure only active products are set
        setAllProducts(activeProducts);
      } catch (error) {
        console.error("Error fetching all products:", error);
        toast.error("Failed to fetch products. Please try again later.");
      }
    };

    fetchAllProducts();
  }, []);

  const fetchSuggestions = async (searchText) => {
    if (!searchText) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = allProducts
      .filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      )
      .slice(0, 5);

    setSuggestions(filteredSuggestions);
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    [allProducts]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setActiveSuggestionIndex(-1);
    debouncedFetchSuggestions(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : 0
      );
    } else if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(""); // Clear search bar text
    setSuggestions([]); // Clear suggestion bar
    navigate(`/posts/${suggestion._id}`);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();

    const selectedSuggestion = suggestions[activeSuggestionIndex];
    if (selectedSuggestion) {
      setQuery(""); // Clear search bar text
      setSuggestions([]); // Clear suggestion bar
      navigate(`/posts/${selectedSuggestion._id}`);
    } else {
      const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );

      if (filteredProducts.length > 0) {
        setQuery(""); // Clear search bar text
        setSuggestions([]); // Clear suggestion bar
        navigate(`/posts/${filteredProducts[0]._id}`);
      } else {
        toast.error("No matching product found.");
      }
    }
  };

  return (
    <div className="search-and-post-detail">
      <div className="search-bar-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
          />
          <button type="submit" className="search-button">
            <i className="fa-solid fa-search"></i>
          </button>
        </form>

        {suggestions.length > 0 && (
          <div className="suggestions-container">
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion._id || index} // Use suggestion.id; fallback to index if undefined
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`suggestion-item ${
                    index === activeSuggestionIndex ? "active" : ""
                  }`}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndPostDetail;
