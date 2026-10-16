import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useSectionData from '../hooks/useSectionData';
import { getEmployeesPage } from '../services/contentServices';
import {
  EMPLOYEES_DEFAULTS,
  EMPLOYEE_HERO_DEFAULT,
  EMPLOYEE_HUB_LOGO_DEFAULT,
  INTERVIEW_IMAGE_DEFAULTS,
  DIVERSE_LOGO_DEFAULTS,
  DIV_CARD_IMAGE_DEFAULTS,
} from '../data/employeesDefaults';
import './Employees.css';

const isExternal = (url = '') => /^https?:\/\//i.test(url);

/* ------------------------------------------------------------------ */
/*  "Inspired By you" — two overlapping circles, overlap left white     */
/* ------------------------------------------------------------------ */
const InspiredCircles = ({ left, right }) => (
  <div className="emp-venn" role="img" aria-label={`${left} and ${right}`}>
    <svg viewBox="0 0 377 228" aria-hidden="true">
      <defs>
        <mask id="emp-mask-left">
          <rect width="377" height="228" fill="#fff" />
          <circle cx="263" cy="114" r="117" fill="#000" />
        </mask>
        <mask id="emp-mask-right">
          <rect width="377" height="228" fill="#fff" />
          <circle cx="114" cy="114" r="117" fill="#000" />
        </mask>
      </defs>
      <circle cx="114" cy="114" r="112" fill="#565a73" mask="url(#emp-mask-left)" />
      <circle cx="263" cy="114" r="112" fill="#ff7f11" mask="url(#emp-mask-right)" />
    </svg>
    <span className="emp-venn-label emp-venn-left">{left}</span>
    <span className="emp-venn-label emp-venn-right">{right}</span>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Hub + 6 subsidiaries with dotted arrows                            */
/* ------------------------------------------------------------------ */
const CANVAS = { w: 380, h: 395 };
const HUB = { x: 185, y: 177 };
// Circle centres taken from the approved layout: top, top-right, right-low, bottom, left-low, top-left
const SLOTS = [
  { x: 184, y: 47 },
  { x: 307, y: 111 },
  { x: 310, y: 255 },
  { x: 187, y: 310 },
  { x: 53, y: 257 },
  { x: 55, y: 112 },
];
const CAPTION_TOP = [104, 172, 322, 366, 308, 170]; // where each caption starts (px, on the canvas)

const arrowFor = (slot) => {
  const dx = slot.x - HUB.x;
  const dy = slot.y - HUB.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const from = 36;
  const to = 76;
  return { x1: HUB.x + ux * from, y1: HUB.y + uy * from, x2: HUB.x + ux * to, y2: HUB.y + uy * to };
};

const DiverseDiagram = ({ hubLogo, items }) => (
  <div className="emp-hub" style={{ aspectRatio: `${CANVAS.w} / ${CANVAS.h}` }}>
    <svg className="emp-hub-arrows" viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`} aria-hidden="true">
      <defs>
        <marker id="emp-arrowhead" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#272f4d" />
        </marker>
      </defs>
      {items.slice(0, SLOTS.length).map((item, i) => {
        const a = arrowFor(SLOTS[i]);
        return (
          <line
            key={item.id}
            x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
            stroke="#272f4d" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="0.1 4.2"
            markerEnd="url(#emp-arrowhead)"
          />
        );
      })}
    </svg>

    <img
      className="emp-hub-logo"
      style={{ left: `${(HUB.x / CANVAS.w) * 100}%`, top: `${(HUB.y / CANVAS.h) * 100}%` }}
      src={hubLogo}
      alt="Sethmo Group"
      draggable="false"
    />

    {items.slice(0, SLOTS.length).map((item, i) => {
      const s = SLOTS[i];
      return (
        <React.Fragment key={item.id}>
          <div
            className="emp-hub-circle"
            style={{ left: `${(s.x / CANVAS.w) * 100}%`, top: `${(s.y / CANVAS.h) * 100}%` }}
          >
            {item.logo && <img src={item.logo} alt={item.name} loading="lazy" decoding="async" draggable="false" />}
          </div>
          <p
            className="emp-hub-caption"
            style={{ left: `${(s.x / CANVAS.w) * 100}%`, top: `${(CAPTION_TOP[i] / CANVAS.h) * 100}%` }}
          >
            <span>{item.name}</span>
            <span>{item.description}</span>
          </p>
        </React.Fragment>
      );
    })}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Employee Interview — looping carousel                              */
/* ------------------------------------------------------------------ */
const useVisibleCount = () => {
  const calc = () => {
    if (typeof window === 'undefined') return 4;
    const w = window.innerWidth;
    if (w >= 1024) return 4;
    if (w >= 720) return 3;
    if (w >= 500) return 2;
    return 1;
  };
  const [count, setCount] = useState(calc);
  useEffect(() => {
    const onResize = () => setCount(calc());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return count;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const InterviewCard = ({ item }) => {
  const inner = (
    <>
      <div className="emp-card-photo">
        {item.image ? <img src={item.image} alt={item.name} loading="lazy" decoding="async" draggable="false" /> : null}
      </div>
      <div className="emp-card-text">
        {item.role && <span>{item.role}</span>}
        {item.name && <span>{item.name}</span>}
        {item.company && <span>{item.company}</span>}
      </div>
    </>
  );
  if (!item.link) return <div className="emp-card">{inner}</div>;
  return isExternal(item.link) ? (
    <a className="emp-card" href={item.link} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <Link className="emp-card" to={item.link}>{inner}</Link>
  );
};

const InterviewCarousel = ({ heading, subtitle, buttonText, buttonUrl, speed, items }) => {
  const visible = useVisibleCount();
  const n = items.length;

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [hovered, setHovered] = useState(false);

  // The strip is the cards plus a copy of the first ones, so it can slide on forever.
  // (Works even when there are fewer cards than fit on screen: they simply repeat.)
  const track = Array.from({ length: n + visible }, (_, i) => items[i % n]);

  const next = useCallback(() => {
    setAnimate(true);
    setIndex((i) => i + 1);
  }, []);

  const prev = useCallback(() => {
    if (index === 0) {
      // jump (unseen) to the matching copy at the end, then slide back one step
      setAnimate(false);
      setIndex(n);
      window.setTimeout(() => {
        setAnimate(true);
        setIndex(n - 1);
      }, 30);
    } else {
      setAnimate(true);
      setIndex((i) => i - 1);
    }
  }, [index, n]);

  // Reached the copy of card 1 → snap back to the real card 1 with no visible movement
  const onTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return; // ignore hover effects inside the cards
    if (index >= n) {
      setAnimate(false);
      setIndex(0);
      window.setTimeout(() => setAnimate(true), 30);
    }
  };

  useEffect(() => {
    if (!playing || hovered || n < 1) return undefined;
    const ms = Math.max(1200, (Number(speed) || 3.5) * 1000);
    const t = window.setInterval(next, ms);
    return () => window.clearInterval(t);
  }, [playing, hovered, speed, next, n]);

  const activeDot = index % n;
  const goTo = (i) => {
    setAnimate(true);
    setIndex(i);
  };

  return (
    <section className="emp-interview" id="interviews">
      <h2>{heading}</h2>
      <p className="emp-interview-sub">{subtitle}</p>

      <div
        className="emp-carousel"
        style={{ '--visible': visible, '--index': index }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button type="button" className="emp-arrow emp-arrow-left" aria-label="Previous interview" onClick={prev}>
          <ArrowLeft size={22} strokeWidth={3} />
        </button>

        <div className="emp-viewport">
          <div
            className={`emp-track ${animate ? 'is-animated' : ''}`}
            onTransitionEnd={onTransitionEnd}
          >
            {track.map((item, i) => (
              <div className="emp-slide" key={`${item.id}-${i}`} aria-hidden={i >= n ? 'true' : undefined}>
                <InterviewCard item={item} />
              </div>
            ))}
          </div>
        </div>

        <button type="button" className="emp-arrow emp-arrow-right" aria-label="Next interview" onClick={next}>
          <ArrowRight size={22} strokeWidth={3} />
        </button>
      </div>

      {/* Dots: the ring travels from dot to dot and loops back to the first */}
      <div className="emp-dots-row">
        <div className="emp-dots" style={{ '--active': activeDot }}>
          <span className="emp-dots-ring" aria-hidden="true" />
          {items.map((item, i) => (
            <button
              type="button"
              key={`${item.id}-dot`}
              className={`emp-dot ${i === activeDot ? 'is-active' : ''}`}
              aria-label={`Show interview ${i + 1}`}
              aria-current={i === activeDot}
              onClick={() => goTo(i)}
            >
              <i />
            </button>
          ))}
        </div>

        <div className="emp-playpause" role="group" aria-label="Carousel playback">
          <button
            type="button"
            className={`emp-pp ${!playing ? 'is-on' : ''}`}
            aria-label="Pause"
            aria-pressed={!playing}
            onClick={() => setPlaying(false)}
          >
            <svg viewBox="0 0 14 16" width="14" height="16" aria-hidden="true">
              <rect x="1" y="1" width="3" height="14" fill="currentColor" />
              <rect x="7" y="1" width="3" height="14" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            className={`emp-pp ${playing ? 'is-on' : ''}`}
            aria-label="Play"
            aria-pressed={playing}
            onClick={() => setPlaying(true)}
          >
            <svg viewBox="0 0 14 16" width="14" height="16" aria-hidden="true">
              <path d="M2 1 L13 8 L2 15 z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {buttonText && (
        <div className="emp-more">
          {buttonUrl && isExternal(buttonUrl) ? (
            <a className="emp-more-btn" href={buttonUrl} target="_blank" rel="noopener noreferrer">{buttonText}</a>
          ) : (
            <Link className="emp-more-btn" to={buttonUrl || '/employees#interviews'}>{buttonText}</Link>
          )}
        </div>
      )}
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  People Strategy Centered on Diverse Individuals                    */
/* ------------------------------------------------------------------ */
const PeopleStrategy = ({ heading, intro1, intro2, banner, pillars }) => (
  <section className="emp-ps">
    <h2>{heading}</h2>
    <p className="emp-ps-intro">{intro1}</p>
    <p className="emp-ps-intro">{intro2}</p>
    <div className="emp-ps-banner">{banner}</div>

    <div className="emp-ps-grid">
      {pillars.map((pillar) => (
        <div className="emp-ps-col" key={pillar.id}>
          <div className="emp-ps-circle"><span>{pillar.title}</span></div>
          <p>{pillar.body}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Diversified / Career Information — picture cards with live links   */
/* ------------------------------------------------------------------ */
const CardLink = ({ to, className, children, ...rest }) =>
  to && isExternal(to) ? (
    <a className={className} href={to} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
  ) : (
    <Link className={className} to={to || '/careers'} {...rest}>{children}</Link>
  );

const DiversifiedCards = ({ cards }) => (
  <section className="emp-div">
    {cards.map((card) => (
      <div className="emp-div-card" key={card.id}>
        <CardLink to={card.link} className="emp-div-photo" tabIndex={-1} aria-hidden="true">
          {card.image && <img src={card.image} alt="" loading="lazy" decoding="async" draggable="false" />}
          {card.overlayText && <span className="emp-div-overlay">{card.overlayText}</span>}
        </CardLink>
        <CardLink to={card.link} className="emp-div-caption">{card.caption}</CardLink>
      </div>
    ))}
  </section>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const Employees = () => {
  const data = useSectionData(getEmployeesPage, EMPLOYEES_DEFAULTS);
  const D = EMPLOYEES_DEFAULTS;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const text = (key) => (data && data[key] !== undefined && data[key] !== null && data[key] !== '' ? data[key] : D[key]);

  const subs = (Array.isArray(data?.subsidiaries) && data.subsidiaries.length ? data.subsidiaries : D.subsidiaries).map(
    (s) => ({ ...s, logo: s.logo || DIVERSE_LOGO_DEFAULTS[s.id] || '' })
  );
  const pillars = Array.isArray(data?.pillars) && data.pillars.length ? data.pillars : D.pillars;
  const divCards = (Array.isArray(data?.divCards) && data.divCards.length ? data.divCards : D.divCards).map(
    (c) => ({ ...c, image: c.image || DIV_CARD_IMAGE_DEFAULTS[c.id] || '' })
  );
  const interviews = (Array.isArray(data?.interviews) && data.interviews.length ? data.interviews : D.interviews).map(
    (p) => ({ ...p, image: p.image || INTERVIEW_IMAGE_DEFAULTS[p.id] || '' })
  );

  return (
    <div className="emp">
      {/* Breadcrumb + title */}
      <div className="emp-top">
        <nav className="emp-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">&gt;</span>
          <span>{text('pageTitle')}</span>
        </nav>
        <h1>{text('pageTitle')}</h1>
      </div>

      {/* Hero — full width, never cropped or shrunk */}
      <div className="emp-hero">
        <img src={data?.heroImage || EMPLOYEE_HERO_DEFAULT} alt="" />
      </div>

      {/* Inspired By you */}
      <section className="emp-inspired">
        <h2>{text('inspiredHeading')}</h2>
        <p>{text('inspiredBody')}</p>
        <InspiredCircles left={text('circleLeftLabel')} right={text('circleRightLabel')} />
      </section>

      {/* Diverse Individuals Supporting Diversified Businesses */}
      <section className="emp-diverse">
        <DiverseDiagram hubLogo={data?.hubLogo || EMPLOYEE_HUB_LOGO_DEFAULT} items={subs} />
        <div className="emp-diverse-copy">
          <h2>{text('diverseHeading')}</h2>
          <p>{text('diverseBody')}</p>
        </div>
      </section>

      {/* Employee Interview */}
      <InterviewCarousel
        heading={text('interviewHeading')}
        subtitle={text('interviewSubtitle')}
        buttonText={data?.interviewButtonText ?? D.interviewButtonText}
        buttonUrl={data?.interviewButtonUrl || ''}
        speed={data?.interviewSpeed || D.interviewSpeed}
        items={interviews}
      />

      {/* People Strategy */}
      <PeopleStrategy
        heading={text('psHeading')}
        intro1={text('psIntro1')}
        intro2={text('psIntro2')}
        banner={text('psBanner')}
        pillars={pillars}
      />

      {/* Diversified + Career Information */}
      <DiversifiedCards cards={divCards} />
    </div>
  );
};

export default Employees;
