import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import AboutUs from './AboutUs'; // Make sure you create this file
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleHomeClick = () => {
    setShowLanding(true);
  };

  return (
    <div>
      {showLanding ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            <button className="get-started-btn" onClick={handleGetStarted}>Get Started</button>
          </div>
        </div>
      ) : (
        <ProductList onHomeClick={handleHomeClick} />
      )}
    </div>
  );
}

export default App;