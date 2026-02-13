import React from 'react';
import { sectors } from '../data/content';
import './Services.css';

const Services = () => {
  return (
    <div className="services-page">
      
      {/* 1. HERO HEADER (New Design) */}
      <section className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="services-hero-content">
          <h1 className="services-hero-title">Our <span className="highlight-text">Expertise</span></h1>
          <div className="hero-deco-line"></div>
          <p className="services-hero-subtitle">
            Delivering excellence across eight key sectors. <br />
            Sethmo Group is dedicated to innovation, quality, and your success.
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

      {/* 3. Services Grid */}
      <section className="services-grid-section">
        <div className="services-grid">
          {sectors.map((sector) => (
            <div key={sector.id} className="service-card">
              
              {/* Image Area with Overlay */}
              <div className="service-img-wrapper">
                <img src={sector.image} alt={sector.title} className="service-img" />
                <div className="service-overlay">
                  <span className="overlay-icon">➜</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="service-content">
                <div className="service-icon-box">
                  {/* Decorative number for style */}
                  <span className="service-number">0{sector.id}</span>
                </div>
                <h3 className="service-title">{sector.title}</h3>
                <p className="service-desc">{sector.description}</p>
                
                <button className="service-btn">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Services;