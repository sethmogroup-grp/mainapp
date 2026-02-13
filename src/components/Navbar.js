import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// 1. Import the image from your assets folder
import icon from '../assets/icon.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`nav-container ${isOpen ? 'open' : ''}`}>
      
      {/* 2. Replace the 'SH' text with the Image */}
      <div className="nav-logo-btn" onClick={toggleMenu}>
        <img src={icon} alt="Sethmo Icon" className="nav-icon-img" />
      </div>

      <div className="nav-menu">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/community" className="nav-link">Community</Link>
      </div>

    </nav>
  );
};

export default Navbar;