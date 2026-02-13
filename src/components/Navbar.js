import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import icon from '../assets/icon.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`nav-container ${isOpen ? 'open' : ''}`}>
      
      {/* Bird Icon Logo / Toggle Button */}
      <div className="nav-logo-btn" onClick={toggleMenu}>
        <img src={icon} alt="Sethmo Icon" className="nav-icon-img" />
      </div>

      <div className="nav-menu">
        <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/services" className="nav-link" onClick={() => setIsOpen(false)}>Services</Link>
        <Link to="/community" className="nav-link" onClick={() => setIsOpen(false)}>Community</Link>
      </div>

    </nav>
  );
};

export default Navbar;