/* eslint-disable no-undef */
// Sends anonymous visit + engagement data to the Sethmo API so the admin dashboard can graph it.
// No names, e-mails or IP addresses are collected - only a random id stored in the visitor's browser.
const API_URL = process.env.REACT_APP_API_URL || 'https://sethmogroup-backend.onrender.com';

const randomId = () => {
  try {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  } catch (e) { /* fall through */ }
  return 'v' + Date.now().toString(36) + Math.random().toString(36).slice(2, 12);
};

// Long-lived id for this browser (used to count unique + returning visitors)
export const getVisitor = () => {
  try {
    let id = localStorage.getItem('sg_vid');
    if (id) return { id, isNew: false };
    id = randomId();
    localStorage.setItem('sg_vid', id);
    return { id, isNew: true };
  } catch (e) {
    return { id: randomId(), isNew: true }; // storage blocked: still count the visit
  }
};

// Per-tab session id
export const getSessionId = () => {
  try {
    let id = sessionStorage.getItem('sg_sid');
    if (!id) {
      id = randomId();
      sessionStorage.setItem('sg_sid', id);
    }
    return id;
  } catch (e) {
    return randomId();
  }
};

export const trackingAllowed = () => {
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  return !(dnt === '1' || dnt === 'yes');
};

// Records a page view. Resolves to the visit id (or null).
export const trackVisit = async (path) => {
  try {
    const visitor = getVisitor();
    const res = await fetch(`${API_URL}/api/analytics/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: visitor.id,
        isNew: visitor.isNew,
        sessionId: getSessionId(),
        path,
        referrer: document.referrer || '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
        language: navigator.language || '',
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.id || null;
  } catch (e) {
    return null;
  }
};

// Reports how long the visitor stayed on the page and how far they scrolled.
// keepalive lets the request finish even while the page is closing.
export const sendEngagement = (id, seconds, scroll) => {
  if (!id) return;
  try {
    fetch(`${API_URL}/api/analytics/ping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, seconds, scroll }),
      keepalive: true,
    }).catch(() => {});
  } catch (e) { /* analytics must never break the site */ }
};
