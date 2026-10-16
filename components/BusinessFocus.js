import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useSectionData from '../hooks/useSectionData';
import { getBusinessFocus } from '../services/contentServices';
import {
  BUSINESS_FOCUS_DEFAULTS,
  BUSINESS_FOCUS_IMAGES,
} from '../data/homeDefaults';
import './BusinessFocus.css';

const isExternal = (url = '') => /^https?:\/\//i.test(url);

// How many cards are shown on each side of the centre card
const rangeForWidth = (w) => (w >= 1000 ? 3 : w >= 640 ? 2 : 1);

const useVisibleRange = () => {
  const [range, setRange] = useState(() =>
    typeof window === 'undefined' ? 3 : rangeForWidth(window.innerWidth)
  );

  useEffect(() => {
    const onResize = () => setRange(rangeForWidth(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return range;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CardBody = ({ item }) => (
  <>
    <div className="bf-img">
      {item.image ? (
        <img src={item.image} alt={item.label} loading="lazy" decoding="async" draggable="false" />
      ) : (
        <span className="bf-img-fallback">{(item.label || '?').charAt(0)}</span>
      )}
    </div>
    <figcaption className="bf-label">{item.label}</figcaption>
  </>
);

const BusinessFocus = () => {
  const data = useSectionData(getBusinessFocus, BUSINESS_FOCUS_DEFAULTS);
  const range = useVisibleRange();

  const items = useMemo(() => {
    const saved = Array.isArray(data?.items) && data.items.length ? data.items : BUSINESS_FOCUS_DEFAULTS.items;
    return saved.map((item) => ({
      ...item,
      image: item.image || BUSINESS_FOCUS_IMAGES[item.id] || '',
    }));
  }, [data]);

  /*
   * The 3D loop is a ring. It is repeated until it holds at least 10 cards so the
   * "wrap around" jump always happens on cards that are invisible - the loop never glitches.
   */
  const ring = useMemo(() => {
    const n = items.length;
    if (!n) return [];
    const reps = Math.max(1, Math.ceil(10 / n));
    return Array.from({ length: n * reps }, (_, k) => ({
      ...items[k % n],
      ringKey: `${items[k % n].id}-${k}`,
    }));
  }, [items]);

  const size = ring.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef({ x: null });

  const step = useCallback(
    (dir) => setIndex((i) => (size ? (i + dir + size) % size : 0)),
    [size]
  );

  // Slow endless loop
  const speedSeconds = Math.max(1, Number(data?.speedSeconds) || 4);
  const autoplay = data?.autoplay !== false;

  useEffect(() => {
    if (!autoplay || paused || size < 2 || prefersReducedMotion()) return undefined;
    const timer = setTimeout(() => step(1), speedSeconds * 1000);
    return () => clearTimeout(timer);
  }, [index, paused, autoplay, speedSeconds, size, step]);

  if (!size) return null;

  const onPointerDown = (e) => {
    drag.current.x = e.clientX;
    setPaused(true);
  };

  const onPointerUp = (e) => {
    const startX = drag.current.x;
    drag.current.x = null;
    if (startX == null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  const transitionSeconds = Math.min(1.2, speedSeconds * 0.6);

  return (
    <section className="bf" aria-roledescription="carousel" aria-label={data?.title || 'Business focus'}>
      <div className="bf-header">
        <h2 className="bf-title">{data?.title}</h2>
        {data?.description && <p className="bf-description">{data.description}</p>}
      </div>

      <div
        className="bf-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          drag.current.x = null;
        }}
      >
        <button type="button" className="bf-arrow bf-arrow-prev" onClick={() => step(-1)} aria-label="Previous">
          <ChevronLeft size={22} strokeWidth={3} />
        </button>

        <div
          className="bf-viewport"
          style={{ '--dur': `${transitionSeconds}s` }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            drag.current.x = null;
          }}
        >
          <div className="bf-track">
            {ring.map((item, k) => {
              // signed distance from the centre card, wrapped around the ring
              let offset = (((k - index) % size) + size) % size;
              if (offset > Math.floor(size / 2)) offset -= size;

              const visible = Math.abs(offset) <= range;
              const clamped = Math.max(-(range + 1), Math.min(range + 1, offset));
              const abs = Math.abs(clamped);
              const tilt = clamped === 0 ? 0 : clamped > 0 ? -42 : 42;
              const scale = abs === 0 ? 1.14 : 1 - (abs - 1) * 0.06;

              const style = {
                '--o': clamped,
                '--abs': abs,
                '--rot': `${tilt}deg`,
                '--s': scale,
                opacity: visible ? 1 - abs * 0.1 : 0,
                zIndex: 30 - abs,
                pointerEvents: visible ? 'auto' : 'none',
              };

              const isCentre = offset === 0;
              const content = <CardBody item={item} />;

              let inner = content;
              if (isCentre && item.link) {
                inner = isExternal(item.link) ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="bf-link">
                    {content}
                  </a>
                ) : (
                  <Link to={item.link} className="bf-link">
                    {content}
                  </Link>
                );
              }

              return (
                <figure
                  key={item.ringKey}
                  className={`bf-card ${isCentre ? 'is-centre' : ''}`}
                  style={style}
                  aria-hidden={!visible}
                  onClick={() => {
                    if (visible && !isCentre) setIndex((i) => (i + offset + size) % size);
                  }}
                >
                  {inner}
                </figure>
              );
            })}
          </div>
        </div>

        <button type="button" className="bf-arrow bf-arrow-next" onClick={() => step(1)} aria-label="Next">
          <ChevronRight size={22} strokeWidth={3} />
        </button>
      </div>
    </section>
  );
};

export default BusinessFocus;
