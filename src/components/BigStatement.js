import React from 'react';
import './BigStatement.css';
import bgImage from '../assets/the.png';

const BigStatement = () => {
  return (
    <section className="big-statement">
      <div className="bg-layer" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="overlay" />

      <div className="content-wrapper">
        <div className="statement-content">
          <span className="eyebrow">Driving growth across Africa</span>
          <h2 className="statement-title">
            Sethmo Group continues to <span className="gold">expand</span>
          </h2>
          <p className="statement-text">
            its markets, services, and operations across leading business sectors.
            We are <span className="gold">inspired</span> by our clients whose
            expectations drive us to continuously improve and deliver
            <span className="orange"> excellence in Africa and beyond.</span>
          </p>
        </div>
      </div>

      <div className="accent-line" />
    </section>
  );
};

export default BigStatement;