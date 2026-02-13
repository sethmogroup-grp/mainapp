// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenisInstance = null;
let rafId = null;

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Only run in browser (defensive)
    if (typeof window === 'undefined') return;

    // Create Lenis only once per module lifecycle
    if (!lenisInstance) {
      lenisInstance = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 2,
        normalizeWheel: true,
      });

      // expose so other modules can detect/use Lenis if needed
      window.lenis = lenisInstance;

      // RAF loop for Lenis - single loop that can be cancelled
      const loop = (time) => {
        // make sure instance still exists before calling
        if (lenisInstance?.raf) lenisInstance.raf(time);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);

      // Pause/resume on visibility change (saves CPU)
      const handleVisibility = () => {
        if (!lenisInstance) return;
        if (document.visibilityState === 'hidden') {
          // Some Lenis versions offer stop/start; guard with optional chaining
          lenisInstance.stop?.();
        } else {
          lenisInstance.start?.();
        }
      };
      document.addEventListener('visibilitychange', handleVisibility);

      // CLEANUP when this effect is torn down (only runs when we created the instance here)
      return () => {
        document.removeEventListener('visibilitychange', handleVisibility);

        // cancel RAF first
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }

        // destroy Lenis instance if it supports destroy
        try {
          lenisInstance?.destroy?.();
        } catch (err) {
          // defensive: some versions might not implement destroy exactly
          // swallow but log for dev visibility
          // eslint-disable-next-line no-console
          console.warn('Failed to destroy Lenis instance:', err);
        }

        lenisInstance = null;
        // remove global reference
        try {
          // keep it safe in case other code relies on window.lenis briefly
          if (window.lenis) window.lenis = undefined;
        } catch (_) {}

        // ensure rafId is cleared
        rafId = null;
      };
    }

    // If lenisInstance already exists (e.g., HMR), we don't re-create it.
    // We still return a no-op cleanup to satisfy React expectations.
    return () => {};
  }, []); // run once

  // Scroll to top on route change (skip if there's a hash)
  useEffect(() => {
    if (!lenisInstance) return;
    // guard for API
    const scrollTo = lenisInstance.scrollTo?.bind(lenisInstance);
    if (!location.hash && scrollTo) {
      // immediate jump to top (no animation)
      // Some Lenis versions accept scrollTo(number, opts) — this uses that shape
      try {
        scrollTo(0, { immediate: true });
      } catch (err) {
        // fallback: if it expects an element or different args, try simple window.scroll
        // eslint-disable-next-line no-console
        console.warn('lenis.scrollTo failed:', err);
        window.scrollTo?.(0, 0);
      }
    }
  }, [location.hash, location.pathname]);

  // Smooth scroll when navigating to hash anchors
  useEffect(() => {
    if (!lenisInstance || !location.hash) return;
    const id = location.hash.replace('#', '');
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;

      const scrollTo = lenisInstance.scrollTo?.bind(lenisInstance);
      if (scrollTo) {
        // this will gracefully no-op if API differs
        try {
          scrollTo(el, { offset: -80, duration: 1.0 });
        } catch (err) {
          // fallback to native scrolling
          // eslint-disable-next-line no-console
          console.warn('lenis.scrollTo(el) failed, falling back to native scroll:', err);
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.scrollBy(0, -80); // apply offset hack
        }
      } else {
        // fallback native
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.scrollBy(0, -80);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [location]);

  return null;
}
