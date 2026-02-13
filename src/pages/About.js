import React from 'react';
import { companyInfo } from '../data/content';
import PillarsGrid from '../components/PillarsGrid'; // Ensure you have created this component (Option 1)
import ExecutiveTeam from '../components/ExecutiveTeam';
import './About.css'; 

const About = () => {
  return (
    <div className="about-page">
      
      {/* 1. MAIN PAGE HERO */}
      <section className="about-hero main-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1 className="about-hero-title">About <span className="highlight-text">{companyInfo.name}</span></h1>
          <div className="hero-deco-line"></div>
          <p className="hero-motto">"{companyInfo.motto}"</p>
        </div>
      </section>

      {/* 2. EXECUTIVE SUMMARY (The Bold Red Section) */}
      <section className="exec-summary-section">
        <div className="exec-summary-container">
          <div className="exec-summary-content">
            <h2 className="exec-heading">Executive Summary</h2>
            <div className="summary-text-block">
              <p className="summary-text">
                Sethmo Group Limited is a diversified multi-sector conglomerate committed to driving sustainable growth and economic development across Africa. With a robust portfolio spanning <strong>branding, agribusiness, manufacturing, finance, logistics, and mining</strong>, we leverage innovation and operational excellence to create long-term value for our stakeholders.
              </p>
              <p className="summary-text">
                Founded on the principles of integrity and customer-centricity, our "Inspired By You" philosophy ensures that every solution we deliver is tailored to meet the evolving needs of our clients and communities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 3. MISSION & VISION SECTION */}
      {/* Section Hero 1 */}
      <div className="section-hero mission-hero">
        <div className="section-hero-overlay"></div>
        <h2 className="section-hero-title">Our Purpose</h2>
      </div>

      <section className="mission-vision-container">
        <div className="mv-grid">
          {/* Vision Card */}
          <div className="mv-card vision-card">
            <div className="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h2>Our Vision</h2>
            <p>{companyInfo.vision}</p>
          </div>

          {/* Mission Card */}
          <div className="mv-card mission-card">
            <div className="card-icon">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M22 12h-4"/><path d="M6 12H2"/><path d="M12 6V2"/><path d="M12 22v-4"/></svg>
            </div>
            <h2>Our Mission</h2>
            <p>{companyInfo.mission}</p>
          </div>
        </div>
      </section>

      {/* 4. EXECUTIVE TEAM SECTION */}
      {/* Section Hero 2 */}
      <div className="section-hero team-hero">
        <div className="section-hero-overlay"></div>
        <h2 className="section-hero-title">Our Leadership</h2>
      </div>

      <ExecutiveTeam />

      {/* 5. PILLARS SECTION */}
      {/* Section Hero 3 */}
      <div className="section-hero pillars-hero">
        <div className="section-hero-overlay"></div>
        <h2 className="section-hero-title">Strategic Pillars</h2>
      </div>

      <section className="about-pillars-section">
        <div className="pillars-intro-block">
          <p className="section-subheading">The fundamental principles that guide our operations and strategy.</p>
        </div>
        
        {/* Using the new Grid Layout for a cleaner look */}
        <PillarsGrid />
      </section>

    </div>
  );
};

export default About;