import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import useSectionData from '../hooks/useSectionData';
import { getCareers, getCareersPage } from '../services/contentServices';
import { CAREERS_PAGE_DEFAULTS, CAREERS_HERO_DEFAULT, CAREERS_CARD_IMAGES } from '../data/careersPageDefaults';
import './Careers.css';

/** Turns "plain [[orange words]] plain" into React nodes. */
const renderMarked = (line) =>
  line.split(/(\[\[.*?\]\])/g).map((part, i) =>
    part.startsWith('[[') && part.endsWith(']]') ? (
      <span className="cp-accent" key={i}>{part.slice(2, -2)}</span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

const isExternal = (url = '') => /^https?:\/\//i.test(url);

/** Internal link, external link or #anchor — whatever the admin typed. */
const SmartLink = ({ to, className, children, ...rest }) => {
  const target = to || '#';
  if (target.startsWith('#')) {
    const go = (e) => {
      e.preventDefault();
      const el = document.getElementById(target.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    return <a className={className} href={target} onClick={go} {...rest}>{children}</a>;
  }
  if (isExternal(target) || /^mailto:/i.test(target)) {
    return <a className={className} href={target} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
  }
  return <Link className={className} to={target} {...rest}>{children}</Link>;
};

const norm = (t = '') => t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const jobMatchesCategory = (job, name) => {
  const d = norm(job.department);
  const n = norm(name);
  return !!d && !!n && (d.includes(n) || n.includes(d));
};

const JobCard = ({ job }) => (
  <div className="job-card-modern">
    <div className="card-top">
      <span className="dept-tag">{job.department}</span>
      <span className="type-tag">{job.type}</span>
    </div>
    <div className="card-body">
      <h3>{job.title}</h3>
      <p className="job-loc">📍 {job.location}</p>
    </div>
    <div className="card-footer">
      <a
        href={job.applyLink && job.applyLink.startsWith('http') ? job.applyLink : `mailto:${job.applyLink}`}
        className="btn-apply-modern"
      >
        Apply Now
      </a>
    </div>
  </div>
);

const Careers = () => {
  const data = useSectionData(getCareersPage, CAREERS_PAGE_DEFAULTS);
  const D = CAREERS_PAGE_DEFAULTS;
  const [jobs, setJobs] = useState([]);
  const [jobsLoaded, setJobsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCareers()
      .then((res) => setJobs(res.jobs || []))
      .catch((err) => console.error('Error fetching jobs:', err))
      .finally(() => setJobsLoaded(true));
  }, []);

  const text = (key) => (data && data[key] ? data[key] : D[key]);
  const [openCat, setOpenCat] = useState(null);

  const cards = (Array.isArray(data?.purposeCards) && data.purposeCards.length ? data.purposeCards : D.purposeCards).map(
    (c) => ({ ...c, image: c.image || CAREERS_CARD_IMAGES[c.id] || '' })
  );
  const categories = Array.isArray(data?.categories) && data.categories.length ? data.categories : D.categories;

  // Jobs that belong to none of the categories still get shown, under "Other Openings"
  const otherJobs = useMemo(
    () => jobs.filter((j) => !categories.some((c) => jobMatchesCategory(j, c.name))),
    [jobs, categories]
  );

  const lines = text('nextBody').split('\n').map((l) => l.trim()).filter(Boolean);

  return (
    <div className="cp">
      {/* Title */}
      <div className="cp-top">
        <h1>{text('pageTitle')}</h1>
      </div>

      {/* Hero — full width, never cropped or shrunk */}
      <div className="cp-hero">
        <img src={data?.heroImage || CAREERS_HERO_DEFAULT} alt="" />
      </div>

      {/* THE NEXT BIG THING HERE IS. YOU */}
      <section className="cp-next">
        <h2><span>{text('nextHeading')}</span></h2>
        <div className="cp-next-body">
          {lines.map((line, i) => (
            <p key={i}>{renderMarked(line)}</p>
          ))}
        </div>
        <p className="cp-closing">{text('nextClosing')}</p>
      </section>

      {/* Sethmo's Purpose and Our President Message */}
      <section className="cp-purpose">
        <h2>{text('purposeHeading')}</h2>
        <div className="cp-purpose-grid">
          {cards.map((card) => (
            <div className="cp-purpose-card" key={card.id}>
              <SmartLink to={card.link} className="cp-purpose-photo" tabIndex={-1} aria-hidden="true">
                {card.image && <img src={card.image} alt="" loading="lazy" decoding="async" draggable="false" />}
              </SmartLink>
              <SmartLink to={card.link} className="cp-purpose-caption">{card.caption}</SmartLink>
            </div>
          ))}
        </div>
      </section>

      {/* Apply button + corporate profile */}
      <section className="cp-apply">
        <SmartLink to={data?.applyLink || D.applyLink} className="cp-apply-btn">
          {text('applyText')}
        </SmartLink>

        {(() => {
          const inner = data?.profileImage ? (
            <img src={data.profileImage} alt={`${text('profileSmall')} ${text('profileTitle')}`} loading="lazy" />
          ) : (
            <div className="cp-profile-text">
              <span>{text('profileSmall')}</span>
              <strong>{text('profileTitle')}</strong>
            </div>
          );
          return data?.profileLink ? (
            <SmartLink to={data.profileLink} className="cp-profile">{inner}</SmartLink>
          ) : (
            <div className="cp-profile">{inner}</div>
          );
        })()}
      </section>

      {/* Job Categories */}
      <section className="cp-cats" id="job-categories">
        <h2>{text('categoriesHeading')}</h2>
        <p className="cp-cats-body">{text('categoriesBody')}</p>

        <div className="cp-cats-band">
          <div className="cp-cats-grid">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                className={`cp-cat ${openCat === cat.id ? 'is-open' : ''}`}
                aria-expanded={openCat === cat.id}
                aria-controls="cp-cat-panel"
                onClick={() => setOpenCat((c) => (c === cat.id ? null : cat.id))}
              >
                <span>{cat.name}</span>
                <ChevronDown size={22} strokeWidth={1.2} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        {openCat && (() => {
          const cat = categories.find((c) => c.id === openCat);
          const list = cat ? jobs.filter((j) => jobMatchesCategory(j, cat.name)) : [];
          return (
            <div className="cp-cat-panel" id="cp-cat-panel">
              <h3>{cat?.name}</h3>
              {!jobsLoaded ? (
                <p>Loading…</p>
              ) : list.length > 0 ? (
                <div className="jobs-container-modern">
                  {list.map((job) => <JobCard key={job._id} job={job} />)}
                </div>
              ) : (
                <p className="cp-cat-empty">There are no open positions in {cat?.name} right now. Please check back soon.</p>
              )}
            </div>
          );
        })()}
      </section>

      {/* Any posted job that doesn't belong to a category above */}
      {jobsLoaded && otherJobs.length > 0 && (
        <section className="careers-listing-section">
          <div className="container">
            <div className="section-header-modern">
              <h2>Other Openings</h2>
              <div className="accent-bar"></div>
            </div>
            <div className="jobs-container-modern">
              {otherJobs.map((job) => <JobCard key={job._id} job={job} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Careers;
