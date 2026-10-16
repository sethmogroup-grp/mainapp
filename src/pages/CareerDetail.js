import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import useSectionData from '../hooks/useSectionData';
import { getCareersPage } from '../services/contentServices';
import { CAREERS_PAGE_DEFAULTS, CAREERS_DETAIL_IMAGES } from '../data/careersPageDefaults';
import './CareerDetail.css';

/**
 * Detail page opened from "Sethmo's Purpose" / "Our President" on the Careers page
 * (/careers/purpose, /careers/president). Title, picture and text come from the admin.
 * Blank lines in the text start a new paragraph; [[words]] show in orange.
 */
const renderMarked = (line) =>
  line.split(/(\[\[.*?\]\])/g).map((part, i) =>
    part.startsWith('[[') && part.endsWith(']]') ? (
      <span className="cd-accent" key={i}>{part.slice(2, -2)}</span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

const CareerDetail = () => {
  const { slug } = useParams();
  const data = useSectionData(getCareersPage, CAREERS_PAGE_DEFAULTS);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const pages = Array.isArray(data?.detailPages) && data.detailPages.length ? data.detailPages : CAREERS_PAGE_DEFAULTS.detailPages;
  const page = pages.find((p) => p.id === slug);
  if (!page) return <Navigate to="/careers" replace />;

  const image = page.image || CAREERS_DETAIL_IMAGES[page.id] || '';
  const paragraphs = (page.body || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="cd">
      <div className="cd-top">
        <nav className="cd-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">&gt;</span>
          <Link to="/careers">{data?.pageTitle || 'Careers'}</Link>
          <span aria-hidden="true">&gt;</span>
          <span>{page.title}</span>
        </nav>
        <h1>{page.title}</h1>
      </div>

      <div className="cd-body">
        {image && (
          <div className="cd-photo">
            <img src={image} alt={page.title} />
          </div>
        )}

        <div className="cd-text">
          {paragraphs.length > 0 ? (
            paragraphs.map((para, i) => (
              <p key={i}>
                {para.split('\n').map((line, j, arr) => (
                  <React.Fragment key={j}>
                    {renderMarked(line)}
                    {j < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            ))
          ) : (
            <p className="cd-empty">More details are coming soon.</p>
          )}
        </div>

        <Link to="/careers" className="cd-back">&larr; Back to Careers</Link>
      </div>
    </div>
  );
};

export default CareerDetail;
