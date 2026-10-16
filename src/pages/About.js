import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useSectionData from '../hooks/useSectionData';
import { getAboutPage } from '../services/contentServices';
import { ABOUT_DEFAULTS, ABOUT_IMAGES, LEADER_IMAGES } from '../data/aboutDefaults';
import owlMark from '../assets/icon.png';
import './About.css';

const isExternal = (url = '') => /^https?:\/\//i.test(url);

const ReadMore = ({ text, url, className = 'about-btn' }) => {
  if (!text) return null;
  const href = url && url.trim() ? url : '/contact';
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {text}
    </a>
  ) : (
    <Link to={href} className={className}>
      {text}
    </Link>
  );
};

const About = () => {
  const data = useSectionData(getAboutPage, ABOUT_DEFAULTS);

  const values = useMemo(
    () => (Array.isArray(data?.values) && data.values.length ? data.values : ABOUT_DEFAULTS.values),
    [data]
  );
  const leaders = useMemo(
    () => (Array.isArray(data?.leaders) && data.leaders.length ? data.leaders : ABOUT_DEFAULTS.leaders),
    [data]
  );

  const heroImage = data?.heroImage || ABOUT_IMAGES.hero;
  const historyImage = data?.historyImage || ABOUT_IMAGES.history;
  const presidentImage = data?.presidentImage || ABOUT_IMAGES.president;
  const purposeImage = data?.purposeImage || ABOUT_IMAGES.purpose;

  return (
    <div className="ap">
      {/* 1. HERO */}
      <section className="ap-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="ap-hero-scrim" />
        <div className="ap-hero-inner">
          <h1>{data?.heroTitle || ABOUT_DEFAULTS.heroTitle}</h1>
          <p>{data?.heroSubtitle || ABOUT_DEFAULTS.heroSubtitle}</p>
        </div>
      </section>

      {/* 2. HISTORY */}
      <section className="ap-history">
        <div className="ap-history-inner">
          <div className="ap-history-copy">
            <h2>{data?.historyHeading || ABOUT_DEFAULTS.historyHeading}</h2>
            <p>{data?.historyBody || ABOUT_DEFAULTS.historyBody}</p>
            <ReadMore text={data?.historyButtonText ?? ABOUT_DEFAULTS.historyButtonText} url={data?.historyButtonUrl} />
          </div>
          <div className="ap-history-photo">
            <img src={historyImage} alt={data?.historyHeading || 'History'} loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      {/* 3. OUR VALUES */}
      <section className="ap-values">
        <img className="ap-values-owl ap-values-owl-left" src={owlMark} alt="" aria-hidden="true" />
        <img className="ap-values-owl ap-values-owl-right" src={owlMark} alt="" aria-hidden="true" />
        <div className="ap-values-inner">
          <h2>{data?.valuesHeading || ABOUT_DEFAULTS.valuesHeading}</h2>
          <div className="ap-values-columns">
            {values.map((v) => (
              <div className="ap-value-item" key={v.id}>
                <h3>{v.title}</h3>
                {v.tagline && v.tagline.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GROUP PRESIDENT */}
      <section className="ap-president">
        <img className="ap-owl ap-owl-top" src={owlMark} alt="" aria-hidden="true" />
        <img className="ap-owl ap-owl-bottom" src={owlMark} alt="" aria-hidden="true" />

        <div className="ap-president-inner">
          <div className="ap-president-photo">
            <img src={presidentImage} alt={data?.presidentName || 'Group President'} loading="lazy" decoding="async" />
          </div>
          <div className="ap-president-copy">
            <span className="ap-president-role">{data?.presidentRole || ABOUT_DEFAULTS.presidentRole}</span>
            <h2>{data?.presidentName || ABOUT_DEFAULTS.presidentName}</h2>
            <p>{data?.presidentBody || ABOUT_DEFAULTS.presidentBody}</p>
            <ReadMore
              text={data?.presidentButtonText ?? ABOUT_DEFAULTS.presidentButtonText}
              url={data?.presidentButtonUrl}
            />
          </div>
        </div>
      </section>

      {/* 5. GROUP EXECUTIVE LEADERSHIP */}
      <section className="ap-leadership">
        <div className="ap-leadership-inner">
          <h2>{data?.leadershipHeading || ABOUT_DEFAULTS.leadershipHeading}</h2>
          <p className="ap-leadership-sub">{data?.leadershipSubtitle || ABOUT_DEFAULTS.leadershipSubtitle}</p>

          <div className="ap-leaders-grid">
            {leaders.map((leader) => (
              <div className="ap-leader-card" key={leader.id}>
                <div className="ap-leader-photo">
                  <img
                    src={leader.image || LEADER_IMAGES[leader.id] || ''}
                    alt={leader.name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="ap-leader-badge">
                  <strong>{leader.role}</strong>
                  <span>{leader.name}</span>
                </div>
                {leader.body && (
                  <div className="ap-leader-body">
                    {leader.body.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR PURPOSE */}
      <section className="ap-purpose">
        <div className="ap-purpose-top">
          <h2>{data?.purposeHeading || ABOUT_DEFAULTS.purposeHeading}</h2>
          <p>{data?.purposeBody || ABOUT_DEFAULTS.purposeBody}</p>
        </div>
        <div className="ap-purpose-photo">
          <img src={purposeImage} alt="" loading="lazy" decoding="async" />
          <span className="ap-purpose-big">{data?.purposeBigText || ABOUT_DEFAULTS.purposeBigText}</span>
        </div>
      </section>
    </div>
  );
};

export default About;
