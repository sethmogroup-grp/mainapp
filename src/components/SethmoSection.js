import React from 'react';
import './SethmoSection.css';

// 1. Import the main Sethmo Group Logo
import sethmoLogo from '../assets/sethmogrou.png';

// --- NEW: IMPORT YOUR PATTERN IMAGE HERE ---
// Ensure this path is correct for your project structure.
// Based on previous prompts, it might be: '../assets/SETHMO BRAND PATTERNS 2 .png'
import abstractPattern from '../assets/SETHMO BRAND PATTERNS 2 .png'; // <--- REPLACE WITH YOUR ACTUAL PATTERN FILE

// 2. Import all the subsidiary logos
import surielLogo from '../assets/SURIEL MAISON APARTMENTS.png';
import skyreenLogo from '../assets/SKYREEN FINANCE LTD LOGO.png';
import sethmoGroupLogo from '../assets/SETHMO GROUP.png';
import sethmoConsolidated from '../assets/SETHMO CONSOLIDATED LTD.png';
import sethmoCargo from '../assets/SETHMO CARGO LOGISTICS.png';
import sethmoBrand from '../assets/SETHMO BRAND CONSULTANCY LTD.png';
import sethmoAgro from '../assets/SETHMO AGRO INDUSTRIES LTD.png';
import sethgoldPrint from '../assets/SETHGOLD PRINTING PRESS LTD.png';
import rielElectronics from '../assets/RIEL ELECTRONICS LTD.png';
import pressXLogo from '../assets/PRESS X EMBROIDERY ZAMBIA LTD.png';

const SethmoSection = () => {
  // Array of logos for cleaner mapping in JSX
  const logos = [
    surielLogo,
    skyreenLogo,
    sethmoGroupLogo,
    sethmoConsolidated,
    sethmoCargo,
    sethmoBrand,
    sethmoAgro,
    sethgoldPrint,
    rielElectronics,
    pressXLogo
  ];

  // We pass the imported pattern image URL to CSS as a variable
  const sectionStyle = {
    '--pattern-bg': `url(${abstractPattern})`
  };

  return (
    // Apply the style object here to give CSS access to the image
    <section className="sethmo-section" style={sectionStyle}>
      
      {/* Main Center Image */}
      <div className="sethmo-main-display">
        <img 
          src={sethmoLogo} 
          alt="Sethmo Group Main" 
          className="sethmo-logo-img"
        />
      </div>

      {/* Navigation Arrows (Optional - kept for visual consistency) */}
      <div className="sethmo-controls">
        <button className="arrow-btn" aria-label="Previous">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button className="arrow-btn active" aria-label="Next">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Bottom Logo Strip */}
      <div className="sethmo-logo-strip">
        {logos.map((logo, index) => (
          <div key={index} className="subsidiary-logo-wrapper">
            <img 
              src={logo} 
              alt={`Partner logo ${index + 1}`} 
              className="subsidiary-logo" 
            />
          </div>
        ))}
      </div>

    </section>
  );
};

export default SethmoSection;