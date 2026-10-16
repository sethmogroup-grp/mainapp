import React, { useEffect, useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import INDUSTRIES_LIST from '../data/industriesList';
import './IndustriesMenu.css';

// Split the flat list into 3 columns of 6, read top-to-bottom then
// across — matches the approved design exactly.
const COLUMN_SIZE = Math.ceil(INDUSTRIES_LIST.length / 3);
const COLUMNS = [
  INDUSTRIES_LIST.slice(0, COLUMN_SIZE),
  INDUSTRIES_LIST.slice(COLUMN_SIZE, COLUMN_SIZE * 2),
  INDUSTRIES_LIST.slice(COLUMN_SIZE * 2),
];

/**
 * Full-page "put-down" panel that opens under the sticky nav when the
 * Industries link is clicked. Covers the rest of the viewport, lists every
 * industry (name + underline, no boxes), and shows a "Coming Soon" state
 * when one is selected.
 */
const IndustriesMenu = ({ isOpen, onClose }) => {
  const [activeIndustry, setActiveIndustry] = useState(null);

  // Reset back to the list every time the panel is opened fresh
  useEffect(() => {
    if (isOpen) setActiveIndustry(null);
  }, [isOpen]);

  // Lock page scroll while the panel is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="industries-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Industries"
    >
      <button
        type="button"
        className="industries-menu-close"
        aria-label="Close industries menu"
        onClick={onClose}
      >
        <X size={30} strokeWidth={2.4} />
      </button>

      {activeIndustry ? (
        <div className="industries-coming-soon">
          <button
            type="button"
            className="industries-back-btn"
            onClick={() => setActiveIndustry(null)}
          >
            <ArrowLeft size={18} strokeWidth={2} />
            Back to Industries
          </button>

          <span className="coming-soon-tag">Coming Soon</span>
          <h2 className="coming-soon-title">{activeIndustry}</h2>
          <p className="coming-soon-text">
            We&rsquo;re putting the finishing touches on this page. Detailed
            information about our <strong>{activeIndustry}</strong> sector
            will be published here shortly.
          </p>
        </div>
      ) : (
        <div className="industries-menu-inner">
          <h2 className="industries-menu-title">Explore featured Industries</h2>

          <div className="industries-columns">
            {COLUMNS.map((column, colIndex) => (
              <div className="industries-column" key={colIndex}>
                {column.map((industry) => (
                  <button
                    type="button"
                    key={industry}
                    className="industry-item"
                    onClick={() => setActiveIndustry(industry)}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustriesMenu;
