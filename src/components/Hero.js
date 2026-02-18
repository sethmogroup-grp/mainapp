import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHeroSettings } from '../services/heroService';
import './Hero.css';

const Hero = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHeroSettings()
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="hero-loading">Loading hero...</div>;
  if (error) return <div className="hero-error">Error: {error}</div>;
  if (!settings) return null;

  const {
    mediaType,
    videoUrl,
    imageUrl,
    button1Text,
    button1Link,
    button2Text,
    button2Link
  } = settings;

  return (
    <div className="hero-container">
      {mediaType === 'video' ? (
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <img src={imageUrl} alt="Hero" className="hero-image" />
      )}

      {/* Overlay removed completely */}
      
      <div className="hero-content">
        <div className="hero-buttons">
          <Link to={button1Link} className="btn btn-primary">
            {button1Text}
          </Link>
          <Link to={button2Link} className="btn btn-secondary">
            {button2Text}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
