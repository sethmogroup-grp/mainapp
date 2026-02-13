import React, { useState } from 'react'; // Import useState
import { newsArticles } from '../data/content';
import './Community.css'; 

// Import your local logos
import goodnessLogo from '../assets/the goodness program.png';
import thapeloLogo from '../assets/THAPELO FOUNDATION LOGO.png';

const Community = () => {
  // State to handle the subscribe message
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault(); // Prevent page reload
    // Here you would normally send the email to your backend
    setSubscribed(true); // Show success message
    
    // Reset after 3 seconds (optional)
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="community-page">
      
      {/* 1. HERO SECTION */}
      <header className="community-hero">
        <div className="community-hero-content">
          <h1 className="hero-big-text">
            Community <br />
            <span className="hero-highlight">& Insights</span>
          </h1>
          <p className="hero-subtext">
            Making a difference through the Thapelo Foundation and sharing our journey.
          </p>
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
            
            <h2 className="impact-heading">The Thapelo <br/> Foundation</h2>
            
            <div className="impact-body">
              <p>
                Beyond business, Sethmo Group is committed to positively touching lives. We have partnered with the <strong>Thapelo Foundation</strong> to ensure we give back to our communities in the most structured and sustainable way possible.
              </p>
              <p>
                From educational scholarships to healthcare initiatives, our goal is to foster long-term upliftment and create opportunities for the next generation.
              </p>
            </div>

            <button className="impact-btn">View Our Projects &rarr;</button>
          </div>

          <div className="impact-image-wrapper">
             <img 
               src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000" 
               alt="Thapelo Foundation Work" 
               className="impact-img"
             />
          </div>
        </div>
      </section>

      {/* 3. NEWS GRID */}
      <section className="news-section">
        <div className="news-container">
          <div className="news-header">
            <h2 className="news-main-heading">Latest Stories</h2>
            <div className="news-deco-line"></div>
          </div>

          <div className="news-grid">
            {newsArticles.map((article) => (
              <article key={article.id} className="news-card">
                <div className="news-img-wrapper">
                  <img src={article.image} alt={article.title} className="news-img" />
                  <span className="news-category">{article.category}</span>
                </div>
                
                <div className="news-content">
                  <span className="news-date">{article.date}</span>
                  <h3 className="news-title">{article.title}</h3>
                  <p className="news-excerpt">{article.excerpt}</p>
                  <a href={`/news/${article.id}`} className="read-more-link">
                    Read Full Story 
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEWSLETTER (UPDATED) */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-text">
            <h2>Stay in the Loop</h2>
            <p>Subscribe for the latest updates.</p>
          </div>
          
          {/* Form logic handled here */}
          {!subscribed ? (
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required // Makes field mandatory
              />
              <button type="submit">SUBSCRIBE</button>
            </form>
          ) : (
            <div className="newsletter-success">
              <h3>Thank You!</h3>
              <p>You have successfully subscribed.</p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default Community;