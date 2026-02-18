import React, { useState, useEffect } from 'react';
import { getNews, getCommunitySettings } from '../services/contentServices';
import './Community.css'; 

// Import your local logos
import goodnessLogo from '../assets/the goodness program.png';
import thapeloLogo from '../assets/THAPELO FOUNDATION LOGO.png';

const Community = () => {
  const [, setArticles] = useState([]);
  const [settings, setSettings] = useState({
    heroTitle: "Community & Insights",
    heroSubtext: "Making a difference through the Thapelo Foundation and sharing our journey.",
    impactHeading: "The Thapelo Foundation",
    impactBody1: "Beyond business, Sethmo Group is committed to positively touching lives...",
    impactBody2: "From educational scholarships to healthcare initiatives...",
    projectsLink: "/projects",
    impactImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000"
  });
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-empty-pattern
  const [] = useState(false);

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const [newsData, settingsData] = await Promise.all([
          getNews(),
          getCommunitySettings()
        ]);
        setArticles(newsData.articles || []);
        if (settingsData) setSettings(settingsData);
      } catch (err) {
        console.error("Error loading community data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPageData();
  }, []);


  if (loading) return <div className="loading">Syncing Community...</div>;

  return (
    <div className="community-page">
      {/* 1. HERO SECTION */}
      <header className="community-hero">
        <div className="community-hero-content">
          <h1 className="hero-big-text">
            {settings.heroTitle.split('&')[0]} <br />
            <span className="hero-highlight">& {settings.heroTitle.split('&')[1]}</span>
          </h1>
          <p className="hero-subtext">{settings.heroSubtext}</p>
        </div>
        <div className="hero-graphic">
           <div className="graphic-circle-wrapper">
             <img src={goodnessLogo} alt="The Goodness Program" className="goodness-logo" />
           </div>
        </div>
      </header>

      {/* 2. IMPACT SECTION */}
      <section className="impact-section">
        <div className="impact-container">
          <div className="impact-text-content">
            <h4 className="section-label">Our Social Responsibility</h4>
            <img src={thapeloLogo} alt="Thapelo Foundation" className="thapelo-logo" />
            <h2 className="impact-heading">{settings.impactHeading}</h2>
            <div className="impact-body">
              <p>{settings.impactBody1}</p>
              <p>{settings.impactBody2}</p>
            </div>
            {/* View Our Projects Button */}
            <a href={settings.projectsLink} className="impact-btn" style={{textDecoration:'none', display:'inline-block'}}>
              View Our Projects &rarr;
            </a>
          </div>
          <div className="impact-image-wrapper">
             <img src={settings.impactImage} alt="Impact" className="impact-img" />
          </div>
        </div>
      </section>

      {/* ... 3. NEWS GRID & 4. NEWSLETTER remain the same, just using dynamic 'articles' */}
    </div>
  );
};

export default Community;