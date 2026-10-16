import React, { useEffect, useState } from 'react';
import useSectionData from '../hooks/useSectionData';
import useRevealOnView from '../hooks/useRevealOnView';
import { getSustainabilityPage } from '../services/contentServices';
import { SUSTAINABILITY_DEFAULTS } from '../data/sustainabilityDefaults';
import './Sustainability.css';

/** One alternating image + copy row. Image side flips automatically by position. */
const FeatureRow = ({ item, index }) => {
  const { ref, isVisible } = useRevealOnView();
  const imageOnRight = index % 2 === 0; // 1st, 3rd... image right; 2nd, 4th... image left

  return (
    <div
      ref={ref}
      className={`sp-row ${imageOnRight ? 'sp-row-img-right' : 'sp-row-img-left'} ${isVisible ? 'is-visible' : ''}`}
    >
      <div className={`sp-row-copy ${imageOnRight ? 'sp-from-left' : 'sp-from-right'}`}>
        <h2>{item.heading}</h2>
        <p>{item.body}</p>
        {item.buttonText && (
          <a
            className="sp-pill"
            href={item.buttonUrl && item.buttonUrl.trim() ? item.buttonUrl : '#'}
          >
            {item.buttonText}
          </a>
        )}
      </div>
      <div className={`sp-row-media ${imageOnRight ? 'sp-from-right' : 'sp-from-left'}`}>
        {item.image ? (
          <img src={item.image} alt={item.heading} loading="lazy" decoding="async" />
        ) : (
          <div className="sp-row-media-empty" aria-hidden="true" />
        )}
      </div>
    </div>
  );
};

const Sustainability = () => {
  const data = useSectionData(getSustainabilityPage, SUSTAINABILITY_DEFAULTS);
  const items = Array.isArray(data?.items) && data.items.length ? data.items : SUSTAINABILITY_DEFAULTS.items;
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // trigger the hero's left/right-meet-center reveal right after first paint
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => clearTimeout(t);
  }, []);

  const heroVideo = data?.heroVideo || SUSTAINABILITY_DEFAULTS.heroVideo;
  const heroImage = data?.heroImage || SUSTAINABILITY_DEFAULTS.heroImage;

  return (
    <div className="sp">
      {/* HERO — background video (if set) else background image, else a plain dark panel */}
      <header className="sp-hero">
        {heroVideo ? (
          <video
            className="sp-hero-media"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : heroImage ? (
          <img className="sp-hero-media" src={heroImage} alt="" aria-hidden="true" />
        ) : null}
        <div className="sp-hero-scrim" />
        <div className="sp-hero-inner">
          <h1 className={`sp-from-left ${heroIn ? 'is-visible' : ''}`}>
            {data?.heroHeading || SUSTAINABILITY_DEFAULTS.heroHeading}
          </h1>
          <p className={`sp-from-right ${heroIn ? 'is-visible' : ''}`}>
            {data?.heroSubtitle || SUSTAINABILITY_DEFAULTS.heroSubtitle}
          </p>
        </div>
      </header>

      {/* INTRO */}
      <section className="sp-intro">
        <h2>{data?.introHeading || SUSTAINABILITY_DEFAULTS.introHeading}</h2>
        <div className="sp-intro-line" />
        <p>{data?.introBody || SUSTAINABILITY_DEFAULTS.introBody}</p>
      </section>

      {/* ALTERNATING FEATURE ROWS */}
      <section className="sp-rows">
        {items.map((item, i) => (
          <FeatureRow item={item} index={i} key={item.id || i} />
        ))}
      </section>
    </div>
  );
};

export default Sustainability;
