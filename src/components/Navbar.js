import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import icon from '../assets/icon.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`fab-nav-container ${isOpen ? 'open' : ''}`}>
      
      {/* The Menu Content (appears above the button) */}
      <div className="fab-menu">
        <Link to="/" className="fab-link" onClick={closeMenu}>Home</Link>
        <Link to="/about" className="fab-link" onClick={closeMenu}>About</Link>
        <Link to="/services" className="fab-link" onClick={closeMenu}>Services</Link>
        <Link to="/community" className="fab-link" onClick={closeMenu}>Community</Link>
      </div>

      {/* The Actual Floating Button */}
      <button className="fab-trigger" onClick={toggleMenu} aria-label="Toggle Menu">
        <img src={icon} alt="Menu" className={`fab-icon ${isOpen ? 'rotate' : ''}`} />
      </button>

      {/* Optional: Dark backdrop to focus on menu when open */}
      {isOpen && <div className="fab-overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;