import { useEffect, useRef, useState } from 'react';

/**
 * Attach the returned ref to a section. Once that section scrolls into
 * view, `isVisible` flips to true (and stays true) so the caller can
 * animate its two halves in from the left/right to meet in the middle.
 */
const useRevealOnView = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // If the browser can't do IntersectionObserver, just show it immediately
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px', ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, isVisible };
};

export default useRevealOnView;
