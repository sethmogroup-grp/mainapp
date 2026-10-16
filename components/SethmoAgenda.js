import React from 'react';
import { Link } from 'react-router-dom';
import useSectionData from '../hooks/useSectionData';
import { getAgendaBanner } from '../services/contentServices';
import {
  AGENDA_DEFAULTS,
  AGENDA_OWLS,
  AGENDA_LOGO_DEFAULT,
  AGENDA_PERSON_DEFAULT,
} from '../data/agendaDefaults';
import './SethmoAgenda.css';

const isExternal = (url = '') => /^https?:\/\//i.test(url) || /^mailto:/i.test(url);

/** Internal route, external link or #anchor - whatever the admin typed. */
const SmartLink = ({ to, className, children }) => {
  const target = to && to.trim() ? to.trim() : '/sustainability';
  if (target.startsWith('#')) {
    const go = (e) => {
      e.preventDefault();
      const el = document.getElementById(target.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    return <a className={className} href={target} onClick={go}>{children}</a>;
  }
  return isExternal(target) ? (
    <a className={className} href={target} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <Link className={className} to={target}>{children}</Link>
  );
};

const SethmoAgenda = () => {
  const data = useSectionData(getAgendaBanner, AGENDA_DEFAULTS);
  const D = AGENDA_DEFAULTS;
  const text = (k) => (data && data[k] !== undefined && data[k] !== null && data[k] !== '' ? data[k] : D[k]);
  const pillars = Array.isArray(data?.pillars) && data.pillars.length ? data.pillars : D.pillars;

  return (
    <section className="ag" aria-label={text('eyebrow')}>
      {/* ---------- navy side ---------- */}
      <div className="ag-navy">
        <img className="ag-owls" src={AGENDA_OWLS} alt="" aria-hidden="true" draggable="false" />

        <p className="ag-eyebrow">{text('eyebrow')}</p>
        <h2 className="ag-heading">{text('heading')}</h2>

        {text('buttonText') && (
          <SmartLink to={data?.buttonUrl || D.buttonUrl} className="ag-btn">
            {text('buttonText')}
          </SmartLink>
        )}

        <p className="ag-intro">{text('intro')}</p>
        <p className="ag-lead">{text('lead')}</p>

        <div className="ag-quote">
          <i aria-hidden="true" />
          <p>{text('quote')}</p>
        </div>

        <p className="ag-pillars-title">{text('pillarsTitle')}</p>
        <ul className="ag-pillars">
          {pillars.map((p) => (
            <li key={p.id}>
              <span className="ag-dot" aria-hidden="true" />
              {p.text}
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- white side ---------- */}
      <div className="ag-white">
        <h3 className="ag-vision-heading">{text('visionHeading')}</h3>
        <img
          className="ag-logo"
          src={data?.visionLogo || AGENDA_LOGO_DEFAULT}
          alt={text('visionHeading')}
          draggable="false"
        />
        <div className="ag-stat">
          <strong>{text('statBig')}</strong>
          <span>{text('statText')}</span>
        </div>
        <img
          className="ag-person"
          src={data?.personImage || AGENDA_PERSON_DEFAULT}
          alt=""
          loading="lazy"
          decoding="async"
          draggable="false"
        />
      </div>
    </section>
  );
};

export default SethmoAgenda;
