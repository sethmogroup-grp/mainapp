/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import icon from '../assets/icon.png'; // Using your icon

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      
      {/* Top Section: Multi-Column Content */}
      <div className="footer-content">
        
        {/* Col 1: Brand & Intro */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <img src={icon} alt="Sethmo Logo" className="footer-logo-img" />
            <span className="footer-logo-text">Sethmo<span className="text-highlight">Group</span></span>
          </div>
          <p className="footer-desc">
            A diversified multi-sector powerhouse committed to sustainable growth, 
            innovation, and community impact. Driven by excellence, we remain 
            proudly <strong>Inspired By You</strong>.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook" className="social-icon">FB</a>
            <a href="#" aria-label="Twitter" className="social-icon">TW</a>
            <a href="#" aria-label="LinkedIn" className="social-icon">LI</a>
            <a href="#" aria-label="Instagram" className="social-icon">IG</a>
          </div>
        </div>

        {/* Col 2: Our Sectors */}
        <div className="footer-col">
          <h4 className="footer-heading">Our Sectors</h4>
          <ul className="footer-links-list">
            <li><Link to="/services/mining">Mining & Resources</Link></li>
            <li><Link to="/services/agriculture">Agribusiness</Link></li>
            <li><Link to="/services/finance">Finance & Capital</Link></li>
            <li><Link to="/services/logistics">Logistics & Shipping</Link></li>
            <li><Link to="/services/manufacturing">Manufacturing</Link></li>
            <li><Link to="/services/hospitality">Hospitality</Link></li>
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/sustainability">Sustainability</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/news">News & Media</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact Info */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Contact Us</h4>
          <div className="contact-row">
            <span className="contact-icon">📍</span>
            <p>Room No., Great North Road Next to Shoprite,<br/>Lusaka, Zambia</p>
          </div>
          <div className="contact-row">
            <span className="contact-icon">📞</span>
            <p>+260 976252655</p>
          </div>
          <div className="contact-row">
            <span className="contact-icon">✉️</span>
            <p>info@sethmogroup.com</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>&copy; {currentYear} Sethmo Group Limited. All rights reserved.</p>
          <div className="legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="separator">|</span>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;