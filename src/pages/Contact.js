import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  // 1. Create state to hold the form data and submission status
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle form submission to the backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setIsSubmitting(true);
    setStatus({ type: '', text: '' }); // Clear old messages

    try {
      const response = await fetch('https://sethmoserver.onrender.com/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', text: 'Message sent successfully! We will get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear the form
      } else {
        setStatus({ type: 'error', text: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({ type: 'error', text: 'An error occurred. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {/* Display Success or Error Messages */}
            {status.text && (
              <div style={{
                padding: '15px',
                marginBottom: '20px',
                borderRadius: '6px',
                backgroundColor: status.type === 'error' ? '#fed7d7' : '#c6f6d5',
                color: status.type === 'error' ? '#9b2c2c' : '#22543d',
                border: `1px solid ${status.type === 'error' ? '#feb2b2' : '#9ae6b4'}`
              }}>
                {status.text}
              </div>
            )}

            {/* 4. Wire the form to the handleSubmit function */}
            <form className="modern-form" onSubmit={handleSubmit}>
              <div className="input-row">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <input 
                type="text" 
                name="subject"
                placeholder="Subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
              <textarea 
                name="message"
                placeholder="How can we help?" 
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;