import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisit, sendEngagement, trackingAllowed } from '../services/analytics';

/**
 * Renders nothing. Place once inside <Router>.
 * - Logs one visit every time the visitor opens a page.
 * - Measures active time on the page (only while the tab is visible) and scroll depth.
 */
export default function AnalyticsTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!trackingAllowed()) return undefined;

    let visitId = null;
    let seconds = 0;
    let maxScroll = 0;
    let lastSent = { seconds: -1, scroll: -1 };
    let closed = false;

    const readScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const pct = total <= 0 ? 100 : ((window.scrollY || doc.scrollTop) / total) * 100;
      if (pct > maxScroll) maxScroll = Math.min(100, Math.round(pct));
    };

    const flush = () => {
      if (!visitId) return;
      if (seconds === lastSent.seconds && maxScroll === lastSent.scroll) return;
      lastSent = { seconds, scroll: maxScroll };
      sendEngagement(visitId, seconds, maxScroll);
    };

    // Small delay so React StrictMode's double-run in development doesn't count a page twice
    const startTimer = setTimeout(async () => {
      const id = await trackVisit(pathname);
      visitId = id;
      readScroll();
      if (closed) flush(); // visitor already left before the request finished
    }, 400);

    const tick = setInterval(() => {
      if (!document.hidden) seconds += 1;
    }, 1000);
    const periodic = setInterval(flush, 15000);

    const onScroll = () => readScroll();
    const onHide = () => { if (document.hidden) flush(); };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', flush);

    return () => {
      closed = true;
      clearTimeout(startTimer);
      clearInterval(tick);
      clearInterval(periodic);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', flush);
      flush(); // visitor moved to another page: save the final numbers
    };
  }, [pathname]);

  return null;
}
