// components/Loader.js
import React from "react";
import "./loader.css"; // Import your CSS for the loader

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader"></div>
      <div className="mt-4">Loading...</div>
    </div>
  );
};

export default Loader;
