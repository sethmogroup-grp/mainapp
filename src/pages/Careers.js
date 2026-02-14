import React, { useEffect } from 'react';
import { openPositions } from '../data/content';
import './Careers.css';

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <header className="page-hero careers-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Join The <span className="text-highlight">Sethmo Family</span></h1>
          <p>Innovate, grow, and build a rewarding career with a Pan-African market leader.</p>
        </div>
      </header>

      <main className="careers-content">
        <div className="intro-text">
          <h2>Open Positions</h2>
          <div className="deco-line"></div>
          <p>
            We are always looking for driven, innovative, and passionate individuals to join our 
            diverse sectors. If you are ready to be <strong>Inspired By You</strong>, explore our current openings below.
          </p>
        </div>

        <div className="jobs-list">
          {openPositions.length > 0 ? (
            openPositions.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <div className="job-tags">
                    <span className="tag dept-tag">{job.department}</span>
                    <span className="tag loc-tag">📍 {job.location}</span>
                    <span className="tag type-tag">⏱️ {job.type}</span>
                  </div>
                </div>
                <button className="apply-btn">Apply Now</button>
              </div>
            ))
          ) : (
            <div className="no-jobs">
              <h3>No open positions at the moment.</h3>
              <p>However, we are always looking for talent. Send your CV to <a href="mailto:careers@sethmogroup.com">careers@sethmogroup.com</a></p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Careers;