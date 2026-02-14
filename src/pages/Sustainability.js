import React, { useEffect } from 'react';
import { sustainabilityFocus } from '../data/content';
import './Sustainability.css';

const Sustainability = () => {
  // Always scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <header className="page-hero sustainability-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Building a <span className="text-highlight">Better Tomorrow</span></h1>
          <p>Our commitment to the environment, our people, and the communities we serve.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="sustainability-content">
        <div className="intro-text">
          <h2>Purpose Beyond Profit</h2>
          <div className="deco-line"></div>
          <p>
            At Sethmo Group, we believe that true market leadership is measured not just by financial returns, 
            but by the positive impact we leave on the world. Our operations are deeply intertwined with 
            sustainable practices, ensuring we protect our natural resources while driving economic growth.
          </p>
        </div>

        {/* Focus Areas Grid */}
        <div className="focus-grid">
          {sustainabilityFocus.map((item) => (
            <div key={item.id} className="focus-card">
              <div className="focus-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Sustainability;