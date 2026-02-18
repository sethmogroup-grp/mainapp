import React, { useState, useEffect } from 'react';
import { getPillars } from '../services/contentServices';
import './SevenPillarsDetails.css';

const SevenPillarsDetails = () => {
  const [pillars, setPillars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPillars = async () => {
      try {
        const data = await getPillars();
        // Accessing the pillars array from the returned object
        setPillars(data.pillars || []);
      } catch (err) {
        console.error('Error fetching pillars:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPillars();
  }, []);

  if (loading) return <div className="loading-state">Loading Strategic Pillars...</div>;

  return (
    <section className="pillars-details-section">
      <div className="pillars-details-container">
        
        {/* LEFT COLUMN: Sticky Content */}
        <div className="pillars-sidebar">
          <div className="pillars-sidebar-content">
            <h2 className="pillars-main-heading">
              The <span className="text-highlight">7 Pillars</span> <br />
              That Shape Us
            </h2>
            <div className="pillars-deco-line"></div>
            
            <p className="pillars-intro-text">
              Our journey is guided by a commitment to excellence and a Pan-African outlook, 
              focusing on sustainable value creation for all stakeholders.
            </p>
            
            <p className="pillars-outro-text">
              <strong>Sethmo Group is Inspired By You.</strong>
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Dynamic List */}
        <div className="pillars-list">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="pillar-card">
              <div className="pillar-image-container">
                <img 
                  src={pillar.image || 'https://via.placeholder.com/600x400?text=Sethmo+Group'} 
                  alt={pillar.title} 
                  className="pillar-img" 
                />
                <div className="pillar-number">{pillar.id}</div>
              </div>
              
              <div className="pillar-text-content">
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-body">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SevenPillarsDetails;