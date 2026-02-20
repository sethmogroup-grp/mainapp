import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Added for navigation
import './SethmoSection.css';

// Import all subsidiary logos
import surielLogo from '../assets/SURIEL MAISON APARTMENTS.png';
import skyreenLogo from '../assets/SKYREEN FINANCE LTD LOGO.png';
import sethmoGroupLogo from '../assets/SETHMO GROUP.png';
import sethmoConsolidated from '../assets/SETHMO CONSOLIDATED LTD.png';
import sethmoCargo from '../assets/SETHMO CARGO LOGISTICS.png';
import sethmoBrand from '../assets/SETHMO BRAND CONSULTANCY LTD.png';
import sethmoAgro from '../assets/SETHMO AGRO INDUSTRIES LTD.png';
import sethgoldPrint from '../assets/SETHGOLD PRINTING PRESS LTD.png';

const SethmoSection = () => {
  // Active Tab State ('all' by default)
  const [activeTab, setActiveTab] = useState('all');

  // Business Data (Descriptions and individual links removed for cleaner tiles)
  const businesses = [
    {
      id: 'branding',
      title: 'Branding & Design',
      logo: sethmoBrand,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'agro',
      title: 'Agribusiness',
      logo: sethmoAgro,
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      logo: sethmoConsolidated,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'printing',
      title: 'Commercial Printing',
      logo: sethgoldPrint, 
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'hospitality',
      title: 'Hospitality',
      logo: surielLogo,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'finance',
      title: 'Finance & Capital',
      logo: skyreenLogo,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'logistics',
      title: 'Shipping & Logistics',
      logo: sethmoCargo,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8ed74512c0?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'mining',
      title: 'Mining',
      logo: sethmoGroupLogo, 
      image: 'https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?q=80&w=800&auto=format&fit=crop'
    }
  ];

  const displayedBusinesses = activeTab === 'all' 
    ? businesses 
    : businesses.filter(b => b.id === activeTab);

  return (
    <section className="businesses-section">
      
      {/* Header Area */}
      <div className="businesses-header">
        <h2 className="businesses-title">Our Businesses</h2>
        <p className="businesses-subtitle">
          As a diversified conglomerate, our interest in multiple industries indicates our determination to cater to our vision of providing basic needs.
        </p>
      </div>

      {/* Logos as Tabs (Top Filter) */}
      <div className="businesses-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <span className="tab-text-all">All Sectors</span>
        </button>
        
        {businesses.map((business) => (
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
        {/* Update the 'to' prop to point to your actual businesses/services route */}
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