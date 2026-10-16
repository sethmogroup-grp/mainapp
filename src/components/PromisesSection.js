import React, { useState, useEffect } from 'react';
import { getPromisesData } from '../services/contentServices';
import './PromisesSection.css';

// Fallback accent colors for the text bar under each card (cycled by index)
const FALLBACK_COLORS = [
  '#dff3ea', // mint
  '#fbe9d2', // cream
  '#e7e6f7', // lavender
  '#5cae9e', // teal
  '#0b1f4b', // navy
  '#ffffff', // white
];

const FALLBACK_TEXT_COLORS = [
  '#0b3d2e',
  '#3a2a10',
  '#2a2560',
  '#ffffff',
  '#ffffff',
  '#0b132b',
];

const PromisesSection = () => {
  const [data, setData] = useState({
    titleTop: 'SETHMO GROUP',
    titleBottom: 'promises',
    sectionSubtitle: 'Loading...',
    promises: [],
  });

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const result = await getPromisesData();
        if (isMounted && result) {
          setData({
            titleTop: result.titleTop || 'SETHMO GROUP',
            titleBottom: result.titleBottom || 'promises',
            sectionSubtitle: result.sectionSubtitle || '',
            promises: Array.isArray(result.promises) ? result.promises : [],
          });
        }
      } catch (error) {
        console.error('Failed to load promises section:', error);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  if (!data.promises.length) return null;

  return (
    <section className="promises-section">
      <div className="promises-header">
        <h2 className="promises-title-top">{data.titleTop}</h2>
        <h3 className="promises-title-bottom">{data.titleBottom}</h3>
        {data.sectionSubtitle && (
          <p className="promises-subtitle">{data.sectionSubtitle}</p>
        )}
      </div>

      <div className="promises-grid">
        {data.promises.map((item, index) => {
          const barBg = item.barColor || FALLBACK_COLORS[index % FALLBACK_COLORS.length];
          const barText = item.textColor || FALLBACK_TEXT_COLORS[index % FALLBACK_TEXT_COLORS.length];

          return (
            <article key={item.id || index} className="promise-card">
              <div className="promise-card-img-wrapper">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.line1 || 'Sethmo Group Promise'}
                    className="promise-card-img"
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                )}
              </div>

              <div
                className="promise-card-bar"
                style={{ backgroundColor: barBg, color: barText }}
              >
                <p className="promise-line1">{item.line1}</p>
                <p className="promise-line2">{item.line2}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default PromisesSection;
