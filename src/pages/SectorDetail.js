import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { sectors } from '../data/content';
import './SectorDetail.css';

const SectorDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // Find current sector
  const sectorIndex = sectors.findIndex(s => s.slug === id);
  const sector = sectors[sectorIndex];

  // Logic for "Next Sector" button
  const nextSectorIndex = (sectorIndex + 1) % sectors.length;
  const nextSector = sectors[nextSectorIndex];

  // Scroll to top when ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!sector) {
    return (
      <div className="sector-not-found">
        <h2>Sector Not Found</h2>
        <Link to="/services" className="back-btn">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="sector-detail-page">
      
      {/* 1. HERO SECTION */}
      <header className="sector-hero">
        <div className="sector-hero-bg" style={{ backgroundImage: `url(${sector.image})` }}></div>
        <div className="sector-hero-overlay"></div>
        
        <div className="sector-hero-content">
          <div className="sector-breadcrumbs">
            <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>{sector.title}</span>
          </div>
          <h1 className="sector-hero-title">
            {sector.title.split(' ')[0]} <br />
            <span className="text-highlight">{sector.title.split(' ').slice(1).join(' ')}</span>
          </h1>
        </div>
      </header>

      {/* 2. MAIN LAYOUT (Sidebar + Content) */}
      <div className="sector-container">
        
        {/* LEFT: Sticky Sidebar */}
        <aside className="sector-sidebar">
          <div className="sidebar-inner">
            <h3 className="sidebar-title">Our Sectors</h3>
            <ul className="sidebar-nav">
              {sectors.map((s) => (
                <li key={s.id} className={s.slug === id ? 'active' : ''}>
                  <Link to={`/services/${s.slug}`}>
                    <span className="nav-num">0{s.id}</span>
                    <span className="nav-text">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="sidebar-cta">
              <h4>Need {sector.title} solutions?</h4>
              <Link to="/contact" className="sidebar-btn">Contact Us</Link>
            </div>
          </div>
        </aside>

        {/* RIGHT: Main Content */}
        <main className="sector-content">
          
          {/* Intro Block */}
          <section className="content-block intro-block">
            <h2 className="section-heading">Overview</h2>
            <p className="lead-paragraph">{sector.description}</p>
          </section>

          {/* Details Block with "Card" styling */}
          <section className="content-block details-block">
            <h2 className="section-heading">Key Capabilities</h2>
            <div className="capabilities-card">
              <div className="cap-icon">★</div>
              <p className="cap-text">{sector.details}</p>
            </div>
            
            {/* Additional visual filler text to make it look robust */}
            <p className="regular-text">
              At Sethmo Group, our approach to <strong>{sector.title}</strong> is built on a foundation of innovation and sustainability. 
              We leverage cutting-edge technology and deep industry expertise to deliver solutions that not only meet today's demands but also anticipate tomorrow's challenges.
            </p>
          </section>

          {/* Stats / Graphic Strip (Visual Element) */}
          <div className="visual-strip">
            <div className="stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Quality Assurance</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">24/7</span>
              <span className="stat-label">Operational Support</span>
            </div>
          </div>

        </main>
      </div>

      {/* 3. NEXT SECTOR NAVIGATOR */}
      <section className="next-sector-nav" onClick={() => navigate(`/services/${nextSector.slug}`)}>
        <div className="next-bg" style={{ backgroundImage: `url(${nextSector.image})` }}></div>
        <div className="next-overlay"></div>
        <div className="next-content">
          <span className="next-label">Next Sector</span>
          <h2 className="next-title">{nextSector.title} &rarr;</h2>
        </div>
      </section>

    </div>
  );
};

export default SectorDetail;