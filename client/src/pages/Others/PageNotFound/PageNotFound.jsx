// src/pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="display-1 text-danger">404</h1>
      <h3 className="text-muted">Page Not Found</h3>
      <p className="text-center">
        Sorry, the page you are looking for does not exist. It might have been
        removed or the URL may have been mistyped.
      </p>
      <Link to="/" className="btn btn-primary mt-3">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
