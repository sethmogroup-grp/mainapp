import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFullBleedData } from '../services/contentServices';
import './FullBleedSection.css';

const isExternal = (url = '') => /^https?:\/\//i.test(url);

const FullBleedSection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const result = await getFullBleedData();
        if (isMounted) setData(result);
      } catch (error) {
        console.error('Failed to load full-bleed section:', error);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  if (!data || !data.image) return null;

  const content = (
    <>
      <img
        src={data.image}
        alt={data.title || 'Sethmo Group'}
        className="full-bleed-img"
        loading="lazy"
        decoding="async"
      />
      {(data.eyebrow || data.title) && (
        <div className="full-bleed-overlay">
          {data.eyebrow && <span className="full-bleed-eyebrow">{data.eyebrow}</span>}
          {data.title && <h2 className="full-bleed-title">{data.title}</h2>}
          {data.linkText && data.linkUrl && (
            <span className="full-bleed-cta">{data.linkText} &rarr;</span>
          )}
        </div>
      )}
    </>
  );

  if (data.linkUrl) {
    return isExternal(data.linkUrl) ? (
      <a
        href={data.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="full-bleed-section"
      >
        {content}
      </a>
    ) : (
      <Link to={data.linkUrl} className="full-bleed-section">
        {content}
      </Link>
    );
  }

  return <section className="full-bleed-section">{content}</section>;
};

export default FullBleedSection;
