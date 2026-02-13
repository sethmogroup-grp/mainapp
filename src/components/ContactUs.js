import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        
        {/* LEFT SIDE: The "Get in Touch" Text & Phone Graphic */}
        <div className="contact-visuals">
          {/* The giant background text */}
          <h1 className="bg-text">Get in touch</h1>
          
          {/* The CSS Phone Mockup */}
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="phone-header">
                <div className="phone-avatar-circle">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d3121b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="phone-contact-name">Sethmo Group</h3>
                <span className="phone-status">Calling ...</span>
              </div>
              
              <div className="phone-footer">
                <div className="call-btn decline">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/></svg>
                </div>
              </div>
              
              {/* Phone Home Bar */}
              <div className="phone-home-bar"></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Content */}
        <div className="contact-content">
          <h2 className="contact-heading">Contact Us</h2>
          <p className="contact-desc">
            We are eager to hear from you about our brands. Any complaints, comments and compliments help us make our products better. Your satisfaction is our goal.
          </p>
          
          <button className="contact-btn">
            READ MORE
          </button>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;