import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      
      {/* HERO SECTION - Bold Red with Giant Watermark Text */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          
          {/* Background Giant Text (Watermark Style) */}
          <div className="hero-watermark">
            <h1>GET IN TOUCH</h1>
          </div>

          <div className="hero-grid">
            {/* Phone Mockup stays pinned left/center */}
            <div className="phone-visual">
              <div className="device-frame">
                <div className="device-screen">
                  <div className="screen-top">
                    <div className="caller-avatar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#d3121b" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <h3>Sethmo Group</h3>
                    <span>Inspired By You</span>
                  </div>
                  <div className="screen-bottom">
                    <div className="decline-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Text pushed right */}
            <div className="hero-text-area">
              <h2 className="main-title">Contact Us</h2>
              <p className="main-desc">
                We are eager to hear from you. Whether it's a compliment, a comment, or a query about our brands, your satisfaction is our goal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FORM & INFO SECTION */}
      <section className="contact-body">
        <div className="body-grid">
          <div className="contact-sidebar">
            <div className="info-item">
              <span>LOCATION</span>
              <p>Great North Road, Lusaka, Zambia</p>
            </div>
            <div className="info-item">
              <span>PHONE</span>
              <p>+260 976252655</p>
            </div>
            <div className="info-item">
              <span>EMAIL</span>
              <p>info@sethmogroup.com</p>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="modern-form">
              <div className="input-row">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
              </div>
              <input type="text" placeholder="Subject" />
              <textarea placeholder="How can we help?" rows="5"></textarea>
              <button type="submit">SEND MESSAGE</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;