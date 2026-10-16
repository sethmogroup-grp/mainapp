import React from 'react';
import { pillars } from '../data/content';

const PillarsList = () => {
  return (
    <div className="pillars-section">
      <h2>The 7 Pillars That Shape Us</h2>
      <div className="pillars-grid">
        {pillars.map((pillar) => (
          <div key={pillar.id} className="pillar-card">
            <h3>{pillar.id}. {pillar.title}</h3>
            <p>{pillar.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PillarsList;