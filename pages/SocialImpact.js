import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { SOCIAL_IMPACT_PAGES, socialImpactPath } from '../data/socialImpactPages';
import GoodnessProgram from './GoodnessProgram';
import ThapeloFoundation from './ThapeloFoundation';
import './SocialImpact.css';

/**
 * One component for the three Social Impact pages (/social-impact/:slug).
 * The designs for each page will be built here one at a time - for now each link opens a live,
 * clearly named page so nothing in the navbar is a dead end.
 */
const SocialImpact = () => {
  const { slug } = useParams();
  const page = SOCIAL_IMPACT_PAGES.find((p) => p.slug === slug);

  // unknown address -> the first page instead of a blank screen
  if (!page) return <Navigate to={socialImpactPath(SOCIAL_IMPACT_PAGES[0].slug)} replace />;

  if (page.slug === 'the-goodness-programme') return <GoodnessProgram />;
  if (page.slug === 'thapelo-foundation') return <ThapeloFoundation />;

  return (
    <main className="si-page">
      <section className="si-placeholder">
        <p className="si-eyebrow">Social Impact</p>
        <h1>{page.label}</h1>
        <span className="si-rule" aria-hidden="true" />
        <p className="si-note">This page is being built.</p>
      </section>
    </main>
  );
};

export default SocialImpact;
