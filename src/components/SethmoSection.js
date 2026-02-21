import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHomeBusinessData } from '../services/contentServices'; // Ensure this is imported
import './SethmoSection.css';

const SethmoSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [sectionData, setSectionData] = useState({
    sectionTitle: 'Our Businesses',
    sectionSubtitle: 'Loading...',
    businesses: []
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getHomeBusinessData();
        if (data) setSectionData(data);
      } catch (error) {
        console.error("Failed to load businesses:", error);
      }
    };
    loadData();
  }, []);

  const displayedBusinesses = activeTab === 'all' 
    ? sectionData.businesses 
    : sectionData.businesses.filter(b => b.id === activeTab);

  return (
    <section className="businesses-section">
      
      {/* Header Area */}
      <div className="businesses-header">
        <h2 className="businesses-title">{sectionData.sectionTitle}</h2>
        <p className="businesses-subtitle">{sectionData.sectionSubtitle}</p>
      </div>

      {/* Logos as Tabs (Top Filter) */}
      <div className="businesses-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <span className="tab-text-all">All Sectors</span>
        </button>
        
        {sectionData.businesses.map((business) => (
          <button 
            key={`tab-${business.id}`}
            className={`tab-btn ${activeTab === business.id ? 'active' : ''}`}
            onClick={() => setActiveTab(business.id)}
          >
            <img src={business.logo} alt={business.title} className="tab-logo" />
          </button>
        ))}
      </div>

      {/* Grid Area (The Tiles) */}
      <div className="businesses-grid">
        {displayedBusinesses.map((business, index) => (
          <div key={index} className="business-card">
            <div className="business-card-img-wrapper">
              <img src={business.image} alt={business.title} className="business-card-img" />
            </div>
            
            <div className="business-card-content">
              {/* Logo inside the tile */}
              <div className="business-card-logo-wrapper">
                 <img src={business.logo} alt={`${business.title} logo`} className="business-card-logo" />
              </div>
              
              <h3 className="business-card-title">{business.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Global Navigation Button */}
      <div className="see-all-container">
        <Link to="/services" className="see-all-link-wrapper">
          <button className="see-all-btn">
            SEE ALL
          </button>
          <div className="see-all-icon">
            <span>▤</span> 
          </div>
        </Link>
      </div>

    </section>
  );
};

export default SethmoSection;