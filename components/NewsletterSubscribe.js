import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import useSectionData from '../hooks/useSectionData';
import { getNewsletterSection, subscribeToNewsletter } from '../services/contentServices';
import { NEWSLETTER_DEFAULTS } from '../data/homeDefaults';
import './NewsletterSubscribe.css';

const NewsletterSubscribe = () => {
  const data = useSectionData(getNewsletterSection, NEWSLETTER_DEFAULTS);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' }); // idle | busy | done | error

  const submit = async (e) => {
    e.preventDefault();
    if (status.state === 'busy') return;

    setStatus({ state: 'busy', message: '' });
    try {
      await subscribeToNewsletter(email);
      setStatus({ state: 'done', message: 'Thanks for subscribing!' });
      setEmail('');
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Something went wrong. Please try again.' });
    }
  };

  return (
    <section className="nl" id="newsletter" style={{ '--panel': data?.panelColor || NEWSLETTER_DEFAULTS.panelColor }}>
      <div className="nl-inner">
        <span className="nl-rule" />

        <div className="nl-row">
          <div className="nl-icon">
            {data?.icon ? (
              <img src={data.icon} alt="" />
            ) : (
              <Mail size={20} color="#fff" strokeWidth={2} />
            )}
          </div>

          <div className="nl-copy">
            <h3>{data?.heading || NEWSLETTER_DEFAULTS.heading}</h3>
            <p>{data?.body || NEWSLETTER_DEFAULTS.body}</p>
          </div>

          <form className="nl-form" onSubmit={submit} noValidate>
            <div className="nl-field-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={data?.placeholder || NEWSLETTER_DEFAULTS.placeholder}
                aria-label={data?.placeholder || NEWSLETTER_DEFAULTS.placeholder}
                disabled={status.state === 'busy'}
              />
              <button type="submit" disabled={status.state === 'busy'}>
                {status.state === 'busy' ? 'Subscribing…' : data?.buttonText || NEWSLETTER_DEFAULTS.buttonText}
              </button>
            </div>
            {status.state === 'done' && (
              <p className="nl-status nl-status-ok">
                <Check size={14} strokeWidth={3} /> {status.message}
              </p>
            )}
            {status.state === 'error' && <p className="nl-status nl-status-error">{status.message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscribe;
