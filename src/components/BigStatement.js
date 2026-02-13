import React from 'react';
import './BigStatement.css';
import bgImage from '../assets/the.png';

const BigStatement = () => {
  return (
    <section className="big-statement">
      <div className="bg-layer" style={{ backgroundImage: `url(${bgImage})` }} />
      
      {/* Note: I left the overlay here, but if it makes the text in your image too dark to read, you may want to delete this div! */}
      <div className="overlay" />

      <div className="accent-line" />
    </section>
  );
};

export default BigStatement;