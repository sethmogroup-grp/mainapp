import React, { useState, useEffect } from 'react';
import { getTeamData } from '../services/contentServices.js';
import './ExecutiveTeam.css';

const ExecutiveTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeamData();
        // Accessing the members array from the singleton response
        setTeam(data.members || []);
      } catch (err) {
        console.error('Error fetching team data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 20) setSelectedMember(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (loading) return <div className="loading-state">Loading Leadership...</div>;

  // CEO is the first member, the rest are in the grid
  const ceo = team[0];
  const executiveMembers = team.slice(1);

  return (
    <section className="leadership-page-wrapper">
      
      {/* 1. CEO HERO SECTION (Dark Executive Design) */}
      {ceo && (
        <div className="ceo-hero-section">
          <div className="ceo-container">
            <div className="ceo-portrait">
              <img src={ceo.imageUrl || ceo.image} alt={ceo.name} />
            </div>
            <div className="ceo-info">
              <h1 className="ceo-name">{ceo.name}</h1>
              <h2 className="ceo-role">{ceo.role}</h2>
              <div className="ceo-divider"></div>
              <div className="ceo-bio">
                <p>{ceo.bio.substring(0, 350)}...</p> 
              </div>
              <button className="ceo-read-more-btn" onClick={() => setSelectedMember(ceo)}>
                READ MORE <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. EXECUTIVE GRID SECTION (Tiles) */}
      <div className="exec-grid-section">
        <div className="grid-container">
          <h2 className="grid-heading">Executive Management</h2>
          <div className="members-tile-grid">
            {executiveMembers.map((member) => (
              <div key={member._id} className="member-tile">
                <div className="tile-image">
                  <img src={member.imageUrl || member.image} alt={member.name} />
                </div>
                <div className="tile-content">
                  <h3 className="tile-name">{member.name}</h3>
                  <p className="tile-role">{member.role}</p>
                  <button className="tile-link" onClick={() => setSelectedMember(member)}>
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. READ MORE MODAL (Two-Column Layout) */}
      {selectedMember && (
        <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedMember(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="modal-layout">
              {/* Left Side: Portrait */}
              <div className="modal-portrait-side">
                <img src={selectedMember.imageUrl || selectedMember.image} alt={selectedMember.name} />
              </div>

              {/* Right Side: Text Area */}
              <div className="modal-text-side">
                <div className="modal-header-main">
                  <h2 className="modal-name">{selectedMember.name}</h2>
                  <p className="modal-role">{selectedMember.role}</p>
                  <div className="modal-accent-line"></div>
                </div>
                
                <div className="modal-scroll-bio">
                  {selectedMember.bio.split('\n\n').map((para, i) => (
                    <p key={i} className="bio-paragraph">{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExecutiveTeam;