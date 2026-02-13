import React from 'react';
import './BigStatement.css';

// Import both images
import desktopImg from '../assets/the.png';
import mobileImg from '../assets/twomobile.png';

const BigStatement = () => {
  return (
    <section className="big-statement">
      <picture>
        {/* Tells the browser to use the mobile image on screens 768px or smaller */}
        <source media="(max-width: 768px)" srcSet={mobileImg} />
        {/* Default image for desktop (and fallback for older browsers) */}
        <img 
          src={desktopImg} 
          alt="Sethmo Group continues to expand its markets" 
          className="responsive-bg" 
        />
      </picture>

      {/* Decorative accent line (optional, you can remove if it overlaps the image text) */}
      <div className="accent-line" />
    </section>
  );
};

export default BigStatement;