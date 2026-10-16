import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import useSectionData from '../hooks/useSectionData';
import { getHighlights } from '../services/contentServices';
import { HIGHLIGHTS_DEFAULTS, HIGHLIGHT_IMAGES } from '../data/homeDefaults';
import './SethmoHighlights.css';

const NEWSROOM_URL = '/news';

const isExternal = (url = '') => /^https?:\/\//i.test(url);
const linkFor = (url) => (url && url.trim() ? url : NEWSROOM_URL); // no link set yet -> send to the newsroom

const ArrowButton = ({ url, dark }) => {
  const content = <ChevronRight size={16} strokeWidth={3} />;
  const className = `hl-arrow ${dark ? 'hl-arrow-dark' : ''}`;
  const href = linkFor(url);
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label="Read more">
      {content}
    </a>
  ) : (
    <Link to={href} className={className} aria-label="Read more">
      {content}
    </Link>
  );
};

const ReadMoreButton = ({ text, url }) => {
  if (!text) return null;
  const href = linkFor(url);
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hl-caption-btn">
      {text}
    </a>
  ) : (
    <Link to={href} className="hl-caption-btn">
      {text}
    </Link>
  );
};

const ReportCard = ({ item }) => {
  const image = item.image || HIGHLIGHT_IMAGES[item.id] || '';
  const href = linkFor(item.buttonUrl);
  return (
    <article id={item.id} className="hl-card hl-report">
      <Link to={href} className="hl-report-img" aria-label={item.heading}>
        {image && <img src={image} alt={item.heading} loading="lazy" decoding="async" />}
      </Link>
      <div className="hl-report-footer">
        <div>
          {item.heading && <p className="hl-report-heading">{item.heading}</p>}
          {item.subheading && <p className="hl-report-sub">{item.subheading}</p>}
          {item.year && <p className="hl-report-year">{item.year}</p>}
        </div>
        <ArrowButton url={item.buttonUrl} />
      </div>
    </article>
  );
};

const FeatureCard = ({ item }) => {
  const image = item.image || HIGHLIGHT_IMAGES[item.id] || '';
  const isLight = (item.panelColor || '').toLowerCase() === '#ffffff';

  return (
    <div className="hl-feature-wrap">
      <article id={item.id} className={`hl-card hl-feature ${isLight ? 'hl-feature-light' : ''}`} style={{ '--panel': item.panelColor }}>
        <div className="hl-feature-panel">
          {item.panelHeading && <h3 className="hl-feature-heading">{item.panelHeading}</h3>}
          {item.panelSubheading && <p className="hl-feature-sub">{item.panelSubheading}</p>}
        </div>

        {image && (
          <Link to={linkFor(item.buttonUrl)} className="hl-feature-img" aria-label={item.panelHeading}>
            <img src={image} alt={item.panelHeading} loading="lazy" decoding="async" />
          </Link>
        )}

        {(item.personName || item.personRole) && (
          <div className="hl-person-bar">
            {item.personName && <strong>{item.personName}</strong>}
            {item.personRole && <span>{item.personRole}</span>}
          </div>
        )}

        <ArrowButton url={item.buttonUrl} dark />
      </article>

      {(item.caption || item.captionButtonText) && (
        <div className="hl-caption">
          {item.caption && <p>{item.caption}</p>}
          <ReadMoreButton text={item.captionButtonText} url={item.buttonUrl} />
        </div>
      )}
    </div>
  );
};

const SethmoHighlights = () => {
  const data = useSectionData(getHighlights, HIGHLIGHTS_DEFAULTS);

  const items = useMemo(
    () => (Array.isArray(data?.items) && data.items.length ? data.items : HIGHLIGHTS_DEFAULTS.items),
    [data]
  );

  const reportCards = items.filter((item) => item.size !== 'feature');
  const featureCards = items.filter((item) => item.size === 'feature');

  return (
    <section className="hl">
      <div className="hl-inner">
        <h2 className="hl-title">{data?.title || HIGHLIGHTS_DEFAULTS.title}</h2>

        {reportCards.length > 0 && (
          <div className="hl-row hl-row-report">
            {reportCards.map((item) => (
              <ReportCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {featureCards.length > 0 && (
          <div className="hl-row hl-row-feature">
            {featureCards.map((item) => (
              <FeatureCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SethmoHighlights;
