import React from 'react';
import { Link } from 'react-router-dom';
import useSectionData from '../hooks/useSectionData';
import { getSocialImpact } from '../services/contentServices';
import { GP_ART, GP_DEFAULTS } from '../data/socialImpactDefaults';
import './GoodnessProgram.css';

const isExternal = (url = '') => /^(https?:|mailto:|tel:)/i.test(url);

/** Internal route, external link or #anchor - whatever the admin typed. Empty = not a link (plain element). */
const SmartLink = ({ to, className, children, ...rest }) => {
  const target = (to || '').trim();
  if (!target) return <span className={className} {...rest}>{children}</span>;
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

/** **double asterisks** -> bold */
const Rich = ({ text }) =>
  String(text || '')
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : <React.Fragment key={i}>{part}</React.Fragment>
    );

const GoodnessProgram = () => {
  const data = useSectionData(getSocialImpact, GP_DEFAULTS);
  const D = GP_DEFAULTS;

  // text: whatever the admin saved (even blank); only a missing value falls back to the design's words
  const text = (k) => (data && data[k] !== undefined && data[k] !== null ? data[k] : D[k]);
  // pictures: empty = the artwork the page was designed with
  const pic = (k) => (data && data[k] ? data[k] : GP_ART[k]);
  const list = (k) => (Array.isArray(data?.[k]) ? data[k] : D[k]);

  const customWatermark = data && data.whatWatermark;
  const heart = { '--gp-heart': `url(${GP_ART.heartMark})` };

  return (
    <div className="gp" style={heart}>
      {/* 1 — Hero */}
      <section className="gp-hero" aria-label={text('heroTitle')}>
        <img className="gp-hero-img" src={pic('heroImage')} alt="" />
        <img className="gp-hero-logo" src={pic('heroLogo')} alt="The Goodness Program" />
        <h1 className="gp-hero-title">{text('heroTitle')}</h1>
        <p className="gp-hero-sub">{text('heroSubtitle')}</p>
      </section>

      {/* 2 — What do we do? */}
      <section className="gp-what">
        {customWatermark ? (
          <img className="gp-what-mark gp-what-mark--img" src={customWatermark} alt="" aria-hidden="true" />
        ) : (
          <span className="gp-what-mark" aria-hidden="true" />
        )}
        <div className="gp-what-body">
          <p className="gp-hello">{text('welcomeLine')}</p>
          <p className="gp-intro">{text('introText')}</p>
          <h2 className="gp-h2 gp-what-h">{text('whatHeading')}</h2>
          {list('whatParagraphs').map((p, i) => (
            <p key={p.id || i} className={`gp-wp gp-wp-${Math.min(i + 1, 4)}`}><Rich text={p.text} /></p>
          ))}
        </div>
      </section>

      {/* 3 — Why do we care? + signature */}
      <section className="gp-why">
        <div className="gp-why-body">
          <h2 className="gp-h2 gp-why-h">{text('whyHeading')}</h2>
          {list('whyParagraphs').map((p, i) => (
            <p key={p.id || i} className="gp-yp"><Rich text={p.text} /></p>
          ))}
          <div className="gp-sign">
            <span className="gp-sign-name">{text('signatureName')}</span>
            <span className="gp-sign-role">{text('signatureRole')}</span>
            <span className="gp-sign-badge">{text('signatureBadge')}</span>
          </div>
        </div>
      </section>

      {/* 4 — Gallery banner */}
      <section className="gp-banner">
        <div className="gp-banner-photo">
          <img src={pic('bannerImage')} alt="Volunteers packing a box of donations" />
          <img className="gp-banner-logo" src={pic('bannerLogo')} alt="The Goodness Program" />
        </div>
        <div className="gp-band">
          <SmartLink to={text('galleryButtonUrl')} className="gp-gallery-btn">{text('galleryButtonText')}</SmartLink>
        </div>
      </section>

      {/* 5 — Register */}
      <section className="gp-register" id="register">
        <img className="gp-register-photo" src={pic('girlImage')} alt="A girl writing on a blackboard at school" />
        <div className="gp-register-side">
          <div className="gp-register-inner">
            <span className="gp-heart gp-heart--a" aria-hidden="true" />
            <span className="gp-heart gp-heart--b" aria-hidden="true" />
            <span className="gp-heart gp-heart--c" aria-hidden="true" />
            <p className="gp-register-text">{text('registerText')}</p>
            <SmartLink to={text('registerUrl')} className="gp-register-btn">{text('registerButtonText')}</SmartLink>
          </div>
        </div>
      </section>

      {/* 6 — "Standing together" banner */}
      <section className="gp-stand">
        <img className="gp-stand-img" src={pic('standImage')} alt="Two women smiling together" />
        <p className="gp-stand-box">{text('standText')}</p>
        <img className="gp-stand-logo" src={pic('standLogo')} alt="The Goodness Program" />
        <SmartLink to={text('standButtonUrl') || D.standButtonUrl} className="gp-stand-btn">{text('standButtonText')}</SmartLink>
      </section>

      {/* 7 — Thapelo Foundation (the logo opens the Thapelo Foundation page) */}
      <section className="gp-thapelo">
        <SmartLink to={text('thapeloUrl') || D.thapeloUrl} className="gp-thapelo-link" aria-label="Thapelo Foundation">
          <img src={pic('thapeloLogo')} alt="Thapelo Foundation" />
        </SmartLink>
      </section>
    </div>
  );
};

export default GoodnessProgram;
