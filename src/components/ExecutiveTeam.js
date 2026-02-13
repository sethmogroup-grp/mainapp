import React from 'react';
import './ExecutiveTeam.css'; // We'll create this CSS next

// Team Data with balanced gender mix
const teamData = [
  {
    id: "01",
    name: "Sarah Mumba",
    role: "Managing Director",
    bio: "Sarah brings over 15 years of executive leadership in multi-sector conglomerates. She drives the strategic vision of Sethmo Group, ensuring sustainable growth and operational excellence across all subsidiaries.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop"
  },
  {
    id: "02",
    name: "James Banda",
    role: "Director of Operations",
    bio: "With a background in logistics and industrial engineering, James oversees the day-to-day operations. His focus on efficiency and process optimization is key to our manufacturing and logistics success.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: "03",
    name: "Elena Chibesakunda",
    role: "Chief Financial Officer",
    bio: "Elena manages the financial health of the group. Her expertise in corporate finance and capital allocation ensures robust fiscal discipline and fuels our expansion into new markets.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
  },
  {
    id: "04",
    name: "David Lungu",
    role: "Head of Agribusiness",
    bio: "David leads our agricultural division with a passion for sustainable farming. He works closely with local farmers to integrate them into our supply chain, boosting both yield and community impact.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: "05",
    name: "Grace Phiri",
    role: "Head of Branding & Marketing",
    bio: "Grace is the creative force behind the 'Inspired By You' philosophy. She ensures that our brand resonates with customers and maintains a strong, consistent identity across all touchpoints.",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=1888&auto=format&fit=crop"
  },
  {
    id: "06",
    name: "Michael Zulu",
    role: "Technical Director (Mining)",
    bio: "Michael brings deep technical expertise to our mining operations. He is committed to safety, environmental responsibility, and implementing cutting-edge extraction technologies.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
  }
];

const ExecutiveTeam = () => {
  return (
    <section className="exec-team-section">
      <div className="exec-team-container">
        
        {/* LEFT COLUMN: Sticky Header & Intro */}
        <div className="exec-sidebar">
          <div className="exec-sidebar-content">
            <h2 className="exec-main-heading">
              Our <span className="text-highlight">Leadership</span> <br />
              Team
            </h2>
            <div className="exec-deco-line"></div>
            
            <p className="exec-intro-text">
              Our diverse and experienced leadership team is the driving force behind Sethmo Group's innovation and growth. 
            </p>
            
            <p className="exec-outro-text">
              United by a shared commitment to excellence and community impact, they lead with integrity, ensuring that our vision of "Inspired By You" is reflected in every decision we make.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrollable Team List */}
        <div className="exec-list">
          {teamData.map((member) => (
            <div key={member.id} className="exec-card">
              <div className="exec-image-container">
                <img src={member.image} alt={member.name} className="exec-img" />
              </div>
              
              <div className="exec-text-content">
                <h3 className="exec-name">
                  {member.name}
                </h3>
                <span className="exec-role">{member.role}</span>
                <p className="exec-bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExecutiveTeam;