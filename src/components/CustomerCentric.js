import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useSectionData from '../hooks/useSectionData';
import { getCustomerCentric } from '../services/contentServices';
import { CUSTOMER_DEFAULTS, CUSTOMER_IMAGES } from '../data/homeDefaults';
import './CustomerCentric.css';

const isExternal = (url = '') => /^https?:\/\//i.test(url);

const CustomerCentric = () => {
  const data = useSectionData(getCustomerCentric, CUSTOMER_DEFAULTS);

  const view = useMemo(
    () => ({
      ...CUSTOMER_DEFAULTS,
      ...data,
      personImage: data?.personImage || CUSTOMER_IMAGES.personImage,
      sideImage: data?.sideImage || CUSTOMER_IMAGES.sideImage,
    }),
    [data]
  );

  // Blank line = new paragraph; single line breaks are kept inside a paragraph
  const paragraphs = useMemo(
    () =>
      String(view.body || '')
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean),
    [view.body]
  );

  const button =
    view.buttonText && view.buttonUrl ? (
      isExternal(view.buttonUrl) ? (
        <a href={view.buttonUrl} target="_blank" rel="noopener noreferrer" className="cc-btn">
          {view.buttonText}
        </a>
      ) : (
        <Link to={view.buttonUrl} className="cc-btn">
          {view.buttonText}
        </Link>
      )
    ) : null;

  return (
    <section className="cc">
      <div className="cc-person">
        {view.personImage && (
          <img src={view.personImage} alt="" loading="lazy" decoding="async" />
        )}
      </div>

      <div className="cc-copy">
        <h2 className="cc-heading">{view.heading}</h2>
        {paragraphs.map((text, i) => (
          <p key={i} className="cc-text">
            {text}
          </p>
        ))}
        {button}
      </div>

      <div className="cc-photo">
        {view.sideImage && (
          <img src={view.sideImage} alt="" loading="lazy" decoding="async" />
        )}
      </div>
    </section>
  );
};

export default CustomerCentric;
