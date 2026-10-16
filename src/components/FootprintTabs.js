import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useSectionData from '../hooks/useSectionData';
import { getFootprintTabs } from '../services/contentServices';
import { FOOTPRINT_DEFAULTS, FOOTPRINT_IMAGES } from '../data/homeDefaults';
import './FootprintTabs.css';

const isExternal = (url = '') => /^https?:\/\//i.test(url);

// "OUR FOOTPRINT" -> ["OUR", "FOOTPRINT"] so the heading always sits on two lines
const splitHeading = (heading = '') => {
  const [first, ...rest] = heading.trim().split(/\s+/);
  return [first || '', rest.join(' ')];
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const normalizeSlides = (data) => {
  const saved = Array.isArray(data?.slides) ? data.slides : [];
  const source = saved.length ? saved : FOOTPRINT_DEFAULTS.slides;

  return source.map((slide) => {
    const base = FOOTPRINT_DEFAULTS.slides.find((d) => d.id === slide.id) || {};
    const fallbackImages = FOOTPRINT_IMAGES[slide.id] || {};
    return {
      ...base,
      ...slide,
      panelColor: slide.panelColor || base.panelColor,
      photo: slide.photo || fallbackImages.photo || '',
      sideImage: slide.sideImage || fallbackImages.sideImage || '',
    };
  });
};

const SlideButton = ({ text, url }) => {
  if (!text || !url) return null;
  return isExternal(url) ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className="fvm-btn">
      {text}
    </a>
  ) : (
    <Link to={url} className="fvm-btn">
      {text}
    </Link>
  );
};

const FootprintTabs = () => {
  const data = useSectionData(getFootprintTabs, FOOTPRINT_DEFAULTS);
  const slides = useMemo(() => normalizeSlides(data), [data]);
  const count = slides.length;

  const [state, setState] = useState({ index: 0, prev: -1, dir: 1 });
  const [paused, setPaused] = useState(false);

  const step = useCallback(
    (dir) =>
      setState((s) => ({
        index: (s.index + dir + count) % count,
        prev: s.index,
        dir,
      })),
    [count]
  );

  const goTo = useCallback((target) => {
    setState((s) =>
      s.index === target ? s : { index: target, prev: s.index, dir: target > s.index ? 1 : -1 }
    );
  }, []);

  // Endless loop: every tab stays for `intervalSeconds`, then the next one slides in.
  const intervalMs = Math.max(2, Number(data?.intervalSeconds) || 7) * 1000;
  const autoplay = data?.autoplay !== false;

  useEffect(() => {
    if (!autoplay || paused || count < 2 || prefersReducedMotion()) return undefined;
    const timer = setTimeout(() => step(1), intervalMs);
    return () => clearTimeout(timer); // restarts after every change, so clicks reset the clock
  }, [state.index, paused, count, autoplay, intervalMs, step]);

  if (!count) return null;
  const active = Math.min(state.index, count - 1);

  return (
    <section
      className="fvm"
      aria-roledescription="carousel"
      aria-label="Our footprint, vision and mission"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="fvm-tabs" role="tablist">
        {slides.map((slide, i) => (
          <React.Fragment key={slide.id}>
            {i > 0 && <span className="fvm-tab-sep" aria-hidden="true" />}
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`fvm-tab ${i === active ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
            >
              {slide.tabLabel}
            </button>
          </React.Fragment>
        ))}
      </div>

      <div className="fvm-stage" style={{ '--dir': state.dir }}>
        <button
          type="button"
          className="fvm-arrow fvm-arrow-prev"
          onClick={() => step(-1)}
          aria-label="Previous"
        >
          <ChevronLeft size={34} strokeWidth={2.6} />
        </button>

        <div className="fvm-slides">
          {slides.map((slide, i) => {
            const [line1, line2] = splitHeading(slide.heading);
            const stateClass =
              i === active ? 'is-active' : i === state.prev ? 'is-leaving' : 'is-idle';

            return (
              <article
                key={slide.id}
                className={`fvm-slide fvm-${slide.id} ${stateClass}`}
                style={{ '--panel': slide.panelColor }}
                aria-hidden={i !== active}
              >
                <div className="fvm-card">
                  <div className="fvm-panel" />

                  <div className="fvm-photo">
                    {slide.photo && <img src={slide.photo} alt="" loading="lazy" decoding="async" />}
                  </div>

                  <div className="fvm-text">
                    <h3 className="fvm-heading" aria-label={slide.heading}>
                      <span>{line1}</span>
                      {line2 && <span>{line2}</span>}
                    </h3>
                    {slide.subheading && <p className="fvm-subheading">{slide.subheading}</p>}
                    {slide.body && <p className="fvm-body">{slide.body}</p>}
                    <span className="fvm-rule" />
                    <SlideButton text={slide.buttonText} url={slide.buttonUrl} />
                  </div>

                  <div className="fvm-quoteblock">
                    {slide.id === 'vision' && slide.quote && (
                      <p className="fvm-quote">{slide.quote}</p>
                    )}
                    {slide.sideImage && (
                      <div className="fvm-side">
                        <img src={slide.sideImage} alt="" loading="lazy" decoding="async" />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className="fvm-arrow fvm-arrow-next"
          onClick={() => step(1)}
          aria-label="Next"
        >
          <ChevronRight size={34} strokeWidth={2.6} />
        </button>
      </div>
    </section>
  );
};

export default FootprintTabs;
