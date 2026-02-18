import React, { useState, useEffect } from 'react';
import { getCareers } from '../services/contentServices';
import './Careers.css';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobs = async () => {
      try {
        const data = await getCareers();
        setJobs(data.jobs || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="careers-page">
      {/* Premium Hero Section */}
      <header className="careers-hero-modern">
        <div className="container">
          <span className="hero-eyebrow">Career Opportunities</span>
          <h1>Shape the Future of <span className="highlight-red">Africa</span></h1>
          <p>Join a multi-sector conglomerate driven by innovation and excellence.</p>
        </div>
      </header>

      <section className="careers-listing-section">
        <div className="container">
          <div className="section-header-modern">
            <h2>Current Openings</h2>
            <div className="accent-bar"></div>
          </div>

          <div className="jobs-container-modern">
            {loading ? (
              <div className="shimmer-loader">Loading opportunities...</div>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job._id} className="job-card-modern">
                  <div className="card-top">
                    <span className="dept-tag">{job.department}</span>
                    <span className="type-tag">{job.type}</span>
                  </div>
                  <div className="card-body">
                    <h3>{job.title}</h3>
                    <p className="job-loc">📍 {job.location}</p>
                  </div>
                  <div className="card-footer">
                    <a 
                      href={job.applyLink.startsWith('http') ? job.applyLink : `mailto:${job.applyLink}`} 
                      className="btn-apply-modern"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-careers">
                <h3>Currently, our team is full.</h3>
                <p>But we're always scouting for talent. Drop your CV at <strong>careers@sethmogroup.com</strong></p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;