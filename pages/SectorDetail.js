import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSectors } from '../services/contentServices'; // Fixed path to singular
import './SectorDetail.css';

const SectorDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all sectors from the API
  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const data = await getSectors();
        // The backend returns an object with a sectors array
        setSectors(data.sectors || []);
      } catch (err) {
        console.error('Error fetching sectors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSectors();
  }, []);

  // 2. Logic to find current and next sector based on URL slug
  const sectorIndex = sectors.findIndex(s => s.slug === id);
  const sector = sectors[sectorIndex];

  const nextSectorIndex = sectors.length > 0 ? (sectorIndex + 1) % sectors.length : 0;
  const nextSector = sectors[nextSectorIndex];

  // 3. Scroll to top when ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-state" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading Sector Details...</h2>
      </div>
    );
  }

  if (!sector) {
    return (
      <div className="sector-not-found" style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Sector Not Found</h2>
        <Link to="/services" className="back-btn" style={{ color: '#d3121b', fontWeight: 'bold' }}>Back to Services</Link>
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
              {sectors.map((s, idx) => (
                <li key={s._id || idx} className={s.slug === id ? 'active' : ''}>
                  <Link to={`/services/${s.slug}`}>
                    <span className="nav-num">0{idx + 1}</span>
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
          <section className="content-block intro-block">
            <h2 className="section-heading">Overview</h2>
            <p className="lead-paragraph">{sector.description}</p>
          </section>

          <section className="content-block details-block">
            <h2 className="section-heading">Key Capabilities</h2>
            <div className="capabilities-card">
              <div className="cap-icon" style={{ color: '#ffcc00', fontSize: '2rem' }}>★</div>
              <p className="cap-text">{sector.details}</p>
            </div>
            
            <p className="regular-text">
              At Sethmo Group, our approach to <strong>{sector.title}</strong> is built on a foundation of innovation and sustainability. 
              We leverage cutting-edge technology and deep industry expertise to deliver solutions that meet today's demands and anticipate tomorrow's challenges.
            </p>
          </section>

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
      {nextSector && (
        <section className="next-sector-nav" onClick={() => navigate(`/services/${nextSector.slug}`)}>
          <div className="next-bg" style={{ backgroundImage: `url(${nextSector.image})` }}></div>
          <div className="next-overlay"></div>
          <div className="next-content">
            <span className="next-label">Next Sector</span>
            <h2 className="next-title">{nextSector.title} &rarr;</h2>
          </div>
        </section>
      )}

    </div>
  );
};

export default SectorDetail;