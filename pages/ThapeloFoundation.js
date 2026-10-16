import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useSectionData from '../hooks/useSectionData';
import { getSocialImpact } from '../services/contentServices';
import { THAPELO_ART, THAPELO_DEFAULTS } from '../data/socialImpactDefaults';
import './ThapeloFoundation.css';

const isExternal = (url = '') => /^(https?:|mailto:|tel:)/i.test(url);

/** Internal route, external link or #anchor. Empty = a plain (non-clickable) element, or nothing when `hideIfEmpty`. */
const SmartLink = ({ to, className, children, hideIfEmpty, ...rest }) => {
  const target = (to || '').trim();
  if (!target) return hideIfEmpty ? null : <span className={className} {...rest}>{children}</span>;
  if (target.startsWith('#')) {
    const go = (e) => {
      e.preventDefault();
      const el = document.getElementById(target.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    return <a className={className} href={target} onClick={go} {...rest}>{children}</a>;
  }
  return isExternal(target) ? (
    <a className={className} href={target} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
  ) : (
    <Link className={className} to={target} {...rest}>{children}</Link>
  );
};

/** Thapelo Foundation page (/social-impact/thapelo-foundation) - sliding hero, one picture every N seconds (7 by default). */
const ThapeloFoundation = () => {
  const data = useSectionData(getSocialImpact, THAPELO_DEFAULTS);

  // pictures the admin saved; an empty one falls back to the picture the page was designed with
  const saved = Array.isArray(data?.thapeloSlides) ? data.thapeloSlides : THAPELO_DEFAULTS.thapeloSlides;
  const slides = saved
    .map((s, i) => ({ id: s.id || `s${i}`, src: s.image || THAPELO_ART.slides[i] || '' }))
    .filter((s) => s.src);
  const logo = (data && data.thapeloHeroLogo) || THAPELO_ART.heroLogo;
  const seconds = Math.min(60, Math.max(2, Number(data?.thapeloSlideSeconds) || THAPELO_DEFAULTS.thapeloSlideSeconds));

  const text = (k) => (data && data[k] !== undefined && data[k] !== null ? data[k] : THAPELO_DEFAULTS[k]);
  const pic = (k) => (data && data[k] ? data[k] : THAPELO_ART[k]);
  const panels = Array.isArray(data?.thapeloPanels) ? data.thapeloPanels.slice(0, 4) : THAPELO_DEFAULTS.thapeloPanels;
  const [openPanel, setOpenPanel] = useState(null); // touch / keyboard: which colour is slid up

  const [index, setIndex] = useState(0);
  const timer = useRef(null);
  const count = slides.length;

  const start = useCallback(() => {
    clearInterval(timer.current);
    if (count < 2) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), seconds * 1000);
  }, [count, seconds]);

  useEffect(() => {
    start();
    return () => clearInterval(timer.current);
  }, [start]);

  // keep the index valid if the admin removes slides
  useEffect(() => { if (index >= count && count > 0) setIndex(0); }, [count, index]);

  const go = (i) => { setIndex(i); start(); }; // choosing a picture restarts its 7 seconds

  return (
    <div className="tf">
      <section className="tf-hero" aria-roledescription="carousel" aria-label="Thapelo Foundation">
        {slides.map((s, i) => (
          <img
            key={s.id}
            className={`tf-slide${i === index ? ' is-active' : ''}`}
            src={s.src}
            alt=""
            aria-hidden={i === index ? undefined : 'true'}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <img className="tf-logo" src={logo} alt="Thapelo Foundation - Praying together and sharing love" />

        {count > 1 && (
          <div className="tf-dots" role="tablist" aria-label="Choose a picture">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Picture ${i + 1} of ${count}`}
                className={`tf-dot${i === index ? ' is-active' : ''}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Our Oath */}
      <section className="tf-oath">
        <h2 className="tf-oath-title">{text('oathTitle')}</h2>
        <p className="tf-oath-text">{text('oathText')}</p>
      </section>

      {/* three solid colours - each slides up to show what is inside */}
      {panels.length > 0 && (
        <div className="tf-panels" style={{ '--n': panels.length }}>
          {panels.map((c, i) => (
            <div
              key={c.id || i}
              className={`tf-card${openPanel === i ? ' is-open' : ''}`}
              style={{ '--c': c.color || '#1a7769' }}
              onMouseLeave={() => setOpenPanel((o) => (o === i ? null : o))}
            >
              <div className="tf-card-info">
                {c.title && <h3 className="tf-card-title">{c.title}</h3>}
                {c.text && <p className="tf-card-text">{c.text}</p>}
                <SmartLink to={c.buttonUrl} hideIfEmpty className="tf-card-btn">{c.buttonText || 'Read More'}</SmartLink>
              </div>
              <button
                type="button"
                className="tf-cover"
                aria-expanded={openPanel === i}
                aria-label={c.title || `Panel ${i + 1}`}
                onClick={() => setOpenPanel((o) => (o === i ? null : i))}
              >
                {c.label && <span className="tf-cover-label">{c.label}</span>}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* About + Feeding Program */}
      <section className="tf-prog">
        <div className="tf-about">
          <img className="tf-about-img" src={pic('aboutImage')} alt="" />
          <img className="tf-about-logo" src={pic('aboutLogo')} alt="Thapelo Foundation" />
          <div className="tf-about-body">
            <p className="tf-about-text">{text('aboutText')}</p>
            <SmartLink to={text('aboutButtonUrl')} className="tf-about-btn">{text('aboutButtonText')}</SmartLink>
          </div>
        </div>

        <div className="tf-feed">
          <img className="tf-feed-img" src={pic('feedImage')} alt="Volunteers serving meals" />
          <div className="tf-feed-body">
            <h3 className="tf-feed-title">{text('feedTitle')}</h3>
            <p className="tf-feed-text">{text('feedText')}</p>
            <div className="tf-feed-foot">
              <SmartLink to={text('feedButtonUrl')} className="tf-feed-btn">{text('feedButtonText')}</SmartLink>
              <span className="tf-feed-tag">{text('feedTagline')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThapeloFoundation;
