import React from 'react';
import './Vision.css'; // Make sure to import the CSS file

const Vision = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="vision-container">
      
      {/* Left Content Area (Red Background) */}
      <div className="vision-content-left">
        <div className="vision-inner-row">
          
          {/* Column 1: Heading & Deco Line */}
          <div className="vision-heading-col">
            <div className="vision-deco-line"></div>
            <span className="vision-label">About Us</span>
            <h2 className="vision-title">
              Our <br /> Mission <br /> & Vision
            </h2>
          </div>

          {/* Column 2: Paragraph Text */}
          <div className="vision-text-col">
            <div className="vision-block">
              <h3 className="vision-subtitle">Our Vision</h3>
              <p>
                To be a world-class enterprise and a trusted household name, delivering essential services and manufacturing solutions that enhance quality of life, create sustainable value, and generate strong returns for our clients and stakeholders.
              </p>
            </div>

            <div className="vision-block">
              <h3 className="vision-subtitle">Our Mission</h3>
              <p>
                To positively touch lives by providing essential needs through high-quality services and manufacturing, while sustaining and strengthening our market leadership across branding, agribusiness, manufacturing, printing, hospitality, finance, shipping, and mining.
              </p>
            </div>

            <p className="vision-tagline">
              Driven by innovation, excellence, and customer focus, we remain proudly Inspired By You.
            </p>
          </div>

        </div>
      </div>

      {/* Right Image Area */}
      <div className="vision-image-col">
        {/* Replace src with your specific image */}
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
          alt="Team Vision" 
          className="vision-img"
        />
        
        {/* Scroll To Top Button */}
        <button className="scroll-top-btn" onClick={scrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      </div>

    </section>
  );
};

export default Vision;