import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHeroSettings } from "../services/heroService";
import "./Hero.css";

const Hero = () => {
  // HERO MEDIA STATE
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // PILLARS (small rotating words)
  const words = [
    "Diversified Strength",
    "Inspired By You",
    "Empowering SMEs",
    "Driving Innovation",
    "Quality & Leadership",
    "Community Impact",
    "Sustainable Growth",
  ];
  const [index, setIndex] = useState(0);
  const [animateWord, setAnimateWord] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateWord(false);
      setTimeout(() => {
        setIndex((p) => (p === words.length - 1 ? 0 : p + 1));
        setAnimateWord(true);
      }, 220);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  // LOAD HERO MEDIA
  useEffect(() => {
    getHeroSettings()
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load hero settings");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="hero-loading">Loading...</div>;
  if (error) return <div className="hero-error">Error: {error}</div>;
  if (!settings) return null;

  const {
    mediaType,
    videoUrl,
    imageUrl,
    button1Text = "Partner With Us",
    button1Link = "/partner",
    button2Text = "Explore",
    button2Link = "/explore",
  } = settings;

  return (
    <section className="hero-container">
      {/* Background media with Ken Burns effect */}
      {mediaType === "video" ? (
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <img src={imageUrl} alt="Hero background" className="hero-image" />
      )}

      <div className="hero-overlay" />

      {/* Content (centered) */}
      <div className="hero-content">
        {/* Left-style small info tile (matches screenshots) */}
        <div className="info-tile" role="region" aria-label="Improving lives">
          <div className="info-tile-inner">
            <div className="info-left-line" />
            <div className="info-text">
              <div className="info-sm">inspired by</div>
              <div className="info-large">YOU</div>
              <div className="info-sub">SETHMO GROUP</div>
              <div className="info-highlight">5+ Specialized Brands</div>
            </div>
          </div>
        </div>

        {/* Small rotating pillar with smooth crossfade */}
        <div className="mini-word-row">
          <div className="mini-word-tile">
            <span
              key={index}
              className={`mini-word-text ${animateWord ? "enter" : "exit"}`}
            >
              {words[index]}
            </span>
          </div>
        </div>

        {/* Compact CTAs — tile/pill style */}
        <div className="hero-buttons small">
          <Link to={button1Link} className="btn btn-small btn-primary" aria-label={button1Text}>
            {button1Text}
          </Link>

          <Link to={button2Link} className="btn btn-small btn-outline" aria-label={button2Text}>
            {button2Text}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;