import React from 'react';
import './BigStatement.css';

// Import all images
import desktopImg from '../assets/the.png';
import mobileImg from '../assets/twomobile.png';
import patternImg from '../assets/SETHMO BRAND PATTERNS 2 .png'; // <--- IMPORTED PATTERN

const BigStatement = () => {
  // Pass the pattern URL to CSS for the left column
  const leftSideStyle = {
    '--pattern-bg': `url("${patternImg}")`
  };

  return (
    <section className="statement-container">
      
      {/* LEFT SIDE: Image Area (Pattern applied here) */}
      <div className="statement-image-col" style={leftSideStyle}>
        <picture>
          <source media="(max-width: 768px)" srcSet={mobileImg} />
          <img 
            src={desktopImg} 
            alt="Sethmo Group continues to expand its markets" 
            className="statement-img" 
          />
        </picture>
      </div>

      {/* RIGHT SIDE: Content Area (Solid Red Background - No Pattern) */}
      <div className="statement-content-right">
        <div className="statement-inner-row">
          
          <div className="statement-heading-col">
            <div className="statement-deco-line"></div>
            <span className="statement-label">Our Footprint</span>
            <h2 className="statement-title">
              Inspired <br /> By You
            </h2>
          </div>

          <div className="statement-text-col">
            <div className="statement-block">
              <p className="statement-paragraph">
                Sethmo Group continues to expand its markets, services, and operations across leading business sectors. We are inspired by our clients, whose expectations drive us to continuously improve and deliver excellence in Africa and beyond.
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default BigStatement;