import React from 'react';
import './SevenPillars.css';

// Import the image from your assets folder
import pillarsBanner from '../assets/pillers-temp.png';

const SevenPillars = () => {
  return (
    <section className="pillars-container">
      <img 
        src={pillarsBanner} 
        alt="The 7 Pillars That Shape Us" 
        className="pillars-banner-img"
      />
    </section>
  );
};

export default SevenPillars;