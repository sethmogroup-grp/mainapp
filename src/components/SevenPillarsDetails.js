import React from 'react';
import './SevenPillarsDetails.css';

const pillarsData = [
  {
    id: "01",
    title: "Diversified Multi-Sector Strength",
    text: "Sethmo Group Limited operates across multiple high-impact sectors including branding, agribusiness, manufacturing, commercial printing, hospitality, finance, shipping and logistics, and mining. This diversified business model enhances resilience, reduces operational risk, and ensures sustainable growth across varying market conditions while supporting long-term value creation.",
    // Image: Diverse industry/cityscape
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
  },
  {
    id: "02",
    title: "Customer-Centric Philosophy",
    subtitle: "Inspired By You",
    text: "At the heart of Sethmo Group’s operations is a strong customer-first culture. The Group’s motto, 'Inspired By You,' reflects its commitment to designing solutions driven by the needs of clients, partners, SMEs, and communities. This philosophy ensures continuous improvement, trusted relationships, and service excellence across all business units.",
    // Image: People connecting/Handshake
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Empowerment of SMEs and Local Enterprises",
    text: "Sethmo Group is deeply committed to empowering Small and Medium Enterprises by integrating them into its value chains. The Group supports SMEs through access to markets, commercial services, logistics, financing opportunities, and capacity-building initiatives. This approach promotes entrepreneurship, job creation, and inclusive economic growth within the communities it serves.",
    // Image: Local market/Business collaboration
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Community Impact and Social Development",
    text: "Beyond business, Sethmo Group is committed to positively touching lives and creating meaningful social impact. That is why the Group has partnered with the Thapelo Foundation to ensure that it gives back to clients and communities in the most positive, structured, and sustainable way possible. Through this partnership, Sethmo Group supports community development initiatives, skills empowerment programs, social welfare efforts, and long-term upliftment in the areas where it operates.",
    // Image: Community support/Hands joined
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "05",
    title: "Innovation and Continuous Improvement",
    text: "Driven by innovation, Sethmo Group continuously enhances its processes, technologies, and business models. This commitment enables operational efficiency, adaptability, and the delivery of world-class manufacturing and service solutions that meet international standards while remaining relevant to local markets.",
    // Image: Technology/Modern architecture/Lightbulb
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  },
  {
    id: "06",
    title: "Quality, Reliability, and Market Leadership",
    text: "Sethmo Group delivers essential services and manufacturing solutions with a strong emphasis on quality, reliability, and consistency. Through disciplined operations and strict quality standards, the Group sustains and strengthens its market leadership while building a trusted, reputable, and recognizable household brand.",
    // Image: Premium quality/Clean manufacturing
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "07",
    title: "Sustainable Value Creation and Scalable Growth",
    text: "Sethmo Group focuses on long-term, sustainable value creation for clients, shareholders, employees, SMEs, and communities. With a scalable business model and a Pan-African outlook, the Group is well positioned to expand responsibly, enhance regional impact, and generate strong returns for all stakeholders.",
    // Image: Growth/Plant/Rising graph
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  }
];

const SevenPillarsDetails = () => {
  return (
    <section className="pillars-details-section">
      <div className="pillars-details-container">
        
        {/* LEFT COLUMN: Sticky Header & Conclusion */}
        <div className="pillars-sidebar">
          <div className="pillars-sidebar-content">
            <h2 className="pillars-main-heading">
              The <span className="text-highlight">7 Pillars</span> <br />
              That Shape Us
            </h2>
            <div className="pillars-deco-line"></div>
            
            <p className="pillars-intro-text">
              As we continue our journey of growth, we value the trust and partnership of our clients. Your continued support and professional recommendations strengthen our ability to expand, innovate, and deliver lasting value across our markets and communities.
            </p>
            
            <p className="pillars-outro-text">
              Together, through long-term collaboration and shared commitment to excellence, we will achieve sustainable success. <br/><br/>
              <strong>Sethmo Group is Inspired By You.</strong>
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrollable Pillars List */}
        <div className="pillars-list">
          {pillarsData.map((pillar) => (
            <div key={pillar.id} className="pillar-card">
              <div className="pillar-image-container">
                <img src={pillar.image} alt={pillar.title} className="pillar-img" />
                <div className="pillar-number">{pillar.id}</div>
              </div>
              
              <div className="pillar-text-content">
                <h3 className="pillar-title">
                  {pillar.title}
                  {pillar.subtitle && <span className="pillar-subtitle"><br/>{pillar.subtitle}</span>}
                </h3>
                <p className="pillar-body">{pillar.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SevenPillarsDetails;