import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

// Import the video
import heroVideo from '../assets/hero/1.mp4';

const Hero = () => {
  return (
    <div className="hero-container">
      
      {/* 1. The Video Background */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* 2. Dark Overlay (Kept lighter to see video better) */}
      <div className="hero-overlay"></div>
      
      {/* 3. The Content (Just Buttons now) */}
      <div className="hero-content">
        <div className="hero-buttons">
          <Link to="/services" className="btn btn-primary">
            Explore Our Sectors
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Partner With Us
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Hero;