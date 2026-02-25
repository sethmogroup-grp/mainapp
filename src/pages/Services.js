import React, { useState, useEffect } from 'react';
import './Services.css';

const Services = () => {
  // 1. Create state to hold the live database data
  const [pageData, setPageData] = useState({ 
    sectionTitle: 'Our Expertise', 
    sectionSubtitle: 'Delivering excellence across key sectors.', 
    items: [] 
  });
  const [loading, setLoading] = useState(true);

  // 2. Fetch the data from your backend when the page loads
  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const response = await fetch('https://sethmoserver.onrender.com/api/expertise');
        const data = await response.json();
        
        if (data) {
          setPageData({
            sectionTitle: data.sectionTitle || 'Our Expertise',
            sectionSubtitle: data.sectionSubtitle || 'Delivering excellence across key sectors.',
            items: data.items || []
          });
        }
      } catch (error) {
        console.error("Failed to load expertise data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpertise();
  }, []);

  if (loading) {
    return <div style={{ padding: '100px 20px', textAlign: 'center' }}>Loading Sectors...</div>;
  }

  return (
    <div className="services-page">
      
      {/* 1. HERO HEADER (Now fully Dynamic!) */}
      <section className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="services-hero-content">
          {/* We split the title by spaces to highlight the last word, just like your original design */}
          <h1 className="services-hero-title">
            {pageData.sectionTitle.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="highlight-text">{pageData.sectionTitle.split(' ').slice(-1)}</span>
          </h1>
          <div className="hero-deco-line"></div>
          <p className="services-hero-subtitle">
            {pageData.sectionSubtitle}
          </p>
        </div>
      </section>

      {/* 2. Intro Statement */}
      <section className="services-intro">
        <div className="intro-container">
          <p>
            We operate as a <strong>diversified multi-sector powerhouse</strong>. 
            By integrating strength across these industries, we reduce risk and 
            maximize value—ensuring that whatever your need, Sethmo has the 
            capability to deliver.
          </p>
        </div>
      </section>

      {/* 3. Services Grid (Now looping through database items!) */}
      <section className="services-grid-section">
        <div className="services-grid">
          {pageData.items.length > 0 ? (
            pageData.items.map((sector, index) => (
              <div key={index} className="service-card">
                
                {/* Image Area with Overlay */}
                <div className="service-img-wrapper">
                  {/* Fallback to a grey box if no image is uploaded yet */}
                  {sector.image ? (
                    <img src={sector.image} alt={sector.title} className="service-img" />
                  ) : (
                    <div className="service-img" style={{ background: '#e2e8f0', height: '100%', width: '100%' }}></div>
                  )}
                  <div className="service-overlay">
                    <span className="overlay-icon">➜</span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="service-content">
                  <div className="service-icon-box">
                    {/* Decorative number generated automatically based on list order */}
                    <span className="service-number">0{index + 1}</span>
                  </div>
                  <h3 className="service-title">{sector.title}</h3>
                  <p className="service-desc">{sector.description}</p>
                  
                  <button className="service-btn">Learn More</button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ width: '100%', textAlign: 'center', padding: '50px', color: '#718096' }}>
              No sectors added yet. Please add them from the Admin Panel.
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Services;