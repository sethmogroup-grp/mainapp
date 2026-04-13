import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import './Footer.css';
import icon from '../assets/icon.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // ✅ Load DMCA script safely
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://images.dmca.com/Badges/DMCABadgeHelper.min.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <footer className="main-footer">
      
      {/* Top Section */}
      <div className="footer-content">
        
        {/* Brand */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <img src={icon} alt="Sethmo Logo" className="footer-logo-img" />
            <span className="footer-logo-text">
              Sethmo<span className="text-highlight">Group</span>
            </span>
          </div>

          <p className="footer-desc">
            A diversified multi-sector powerhouse committed to sustainable growth,
            innovation, and community impact. Driven by excellence, we remain
            proudly <strong>Inspired By You</strong>.
          </p>

          {/* Social Links */}
          <div className="social-links">
            <a href="https://www.facebook.com/share/1DJHvBsWiu/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Facebook size={18} />
            </a>
            <a href="https://x.com/SethmoGroup" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Twitter size={18} />
            </a>
            <a href="https://www.instagram.com/sethmogroup?igsh=dmUxcHZ1Z200dXIy" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Instagram size={18} />
            </a>
            <a href="https://www.youtube.com/@SethmoGroup" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Sectors */}
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

        {/* Quick Links */}
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

        {/* Contact */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Contact Us</h4>
          <div className="contact-row">
            <span className="contact-icon">📍</span>
            <p>Room No., Great North Road Next to Shoprite,<br />Lusaka, Zambia</p>
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

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          
          <p>&copy; {currentYear} Sethmo Group Limited. All rights reserved.</p>

          <div className="legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="separator">|</span>
            <Link to="/terms">Terms of Service</Link>
            <span className="separator">|</span>

            {/* ✅ DMCA Badge */}
            <div className="dmca-badge-wrapper">
              <a
                href="//www.dmca.com/Protection/Status.aspx?ID=a9472487-f9e5-4c63-ae11-33046f504d4a"
                title="DMCA.com Protection Status"
                className="dmca-badge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://images.dmca.com/Badges/dmca-badge-w100-5x1-01.png?ID=a9472487-f9e5-4c63-ae11-33046f504d4a"
                  alt="DMCA.com Protection Status"
                />
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;