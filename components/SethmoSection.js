import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getHomeBusinessData } from '../services/contentServices';
import './SethmoSection.css';

const SethmoSection = () => {
  const [activeTab, setActiveTab] = useState('all');

  const [sectionData, setSectionData] = useState({
    sectionTitle: 'Our Businesses',
    sectionSubtitle: 'Loading...',
    businesses: [],
  });

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await getHomeBusinessData();

        if (isMounted && data) {
          setSectionData({
            sectionTitle: data.sectionTitle || 'Our Businesses',
            sectionSubtitle: data.sectionSubtitle || '',
            businesses: Array.isArray(data.businesses) ? data.businesses : [],
          });
        }
      } catch (error) {
        console.error('Failed to load businesses:', error);

        if (isMounted) {
          setSectionData({
            sectionTitle: 'Our Businesses',
            sectionSubtitle: 'Explore our sectors and business divisions.',
            businesses: [],
          });
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayedBusinesses = useMemo(() => {
    if (activeTab === 'all') {
      return sectionData.businesses;
    }

    return sectionData.businesses.filter((business) => business.id === activeTab);
  }, [activeTab, sectionData.businesses]);

  return (
    <section className="businesses-section">
      <div className="businesses-header">
        <h2 className="businesses-title">{sectionData.sectionTitle}</h2>
        <p className="businesses-subtitle">{sectionData.sectionSubtitle}</p>
      </div>

      <div className="businesses-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <span className="tab-text-all">All Sectors</span>
        </button>

        {sectionData.businesses.map((business) => (
          <button
            type="button"
            key={`tab-${business.id}`}
            className={`tab-btn ${activeTab === business.id ? 'active' : ''}`}
            onClick={() => setActiveTab(business.id)}
          >
            <img
              src={business.logo}
              alt={business.title}
              className="tab-logo"
              loading="eager"
              decoding="async"
            />
          </button>
        ))}
      </div>

      <div className="businesses-grid">
        {displayedBusinesses.map((business, index) => (
          <article key={`${business.id}-${index}`} className="business-card">
            <div className="business-card-img-wrapper">
              <img
                src={business.image}
                alt={business.title}
                className="business-card-img"
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>

            <div className="business-card-content">
              <div className="business-card-logo-wrapper">
                <img
                  src={business.logo}
                  alt={`${business.title} logo`}
                  className="business-card-logo"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3 className="business-card-title">{business.title}</h3>
            </div>
          </article>
        ))}
      </div>

      <div className="see-all-container">
        <Link to="/services" className="see-all-link-wrapper">
          <span className="see-all-btn">SEE ALL</span>
          <span className="see-all-icon">▤</span>
        </Link>
      </div>
    </section>
  );
};

export default SethmoSection;