import React from 'react';
import { pillars } from '../data/content';
import './PillarsGrid.css';

const PillarsGrid = () => {
  // Helper to get icon based on ID (You can swap these SVGs)
  const getIcon = (id) => {
    switch(id) {
      case "01": return <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/>; // Layers/Diversity
      case "02": return <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>; // People
      case "03": return <><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></>; // Growth/Chart
      case "04": return <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>; // Heart
      case "05": return <><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" /><path d="M9 21h6" /></>; // Lightbulb
      case "06": return <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>; // Shield/Quality
      case "07": return <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>; // Drop/Sustainability
      default: return <circle cx="12" cy="12" r="10"/>;
    }
  };

  return (
    <div className="pillars-grid-container">
      {pillars.map((pillar) => (
        <div key={pillar.id} className="pg-card">
          <div className="pg-icon-wrapper">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               {getIcon(pillar.id)}
             </svg>
          </div>
          <span className="pg-number">{pillar.id}</span>
          <h3 className="pg-title">{pillar.title}</h3>
          <p className="pg-desc">{pillar.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default PillarsGrid;