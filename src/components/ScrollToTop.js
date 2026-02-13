import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

export default function ScrollToTop() {
  const location = useLocation();
  const lenis = useLenis(); // Automatically grabs the Lenis instance

  useEffect(() => {
    // Wait until Lenis is fully initialized
    if (!lenis) return;

    // Handle Hash Links (e.g., /#about)
    if (location.hash) {
      const id = location.hash.replace('#', '');
      
      // A tiny timeout ensures the DOM has painted before trying to find the ID
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          lenis.scrollTo(element, { offset: -80, duration: 1.0 });
        }
      }, 150);

      return () => clearTimeout(timer);
    } 
    // Handle Standard Page Changes
    else {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [location, lenis]);

  return null;
}