import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

export default function ScrollToTop() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // 🔥 Temporarily disable scroll animations
    document.body.classList.add('no-scroll-animation');

    if (location.hash) {
      const id = location.hash.replace('#', '');

      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          lenis.scrollTo(element, { offset: -80, duration: 1.0 });
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      lenis.scrollTo(0, { immediate: true });
    }

  }, [location, lenis]);

  // Remove class after small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.remove('no-scroll-animation');
    }, 400);

    return () => clearTimeout(timer);
  }, [location]);

  return null;
}
