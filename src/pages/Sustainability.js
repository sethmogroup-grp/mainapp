import React, { useState, useEffect } from 'react';
import { getSustainability } from '../services/contentServices'; // Ensure this service exists
import './Sustainability.css';

const Sustainability = () => {
  const [focusAreas, setFocusAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchContent = async () => {
      try {
        const data = await getSustainability();
        // The backend returns an object with focusAreas array
        setFocusAreas(data.focusAreas || []);
      } catch (err) {
        console.error('Error fetching sustainability data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) return <div className="loading-state">Loading...</div>;

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

        {/* Dynamic Focus Areas Grid */}
        <div className="focus-grid">
          {focusAreas.map((item) => (
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