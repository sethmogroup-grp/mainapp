import React, { useEffect, useRef, useCallback } from 'react';
import { useLenis } from 'lenis/react'; 
import './Home.css';

// --- Components ---
import Hero from '../components/Hero';
import BigStatement from '../components/BigStatement';
import Vision from '../components/Vision';
import SethmoSection from '../components/SethmoSection';
import SevenPillars from '../components/SevenPillars';
import SevenPillarsDetails from '../components/SevenPillarsDetails';
import ContactUs from '../components/ContactUs';

const Home = () => {
  // 1. Scope all DOM queries to this specific container to prevent grabbing elements from other pages
  const containerRef = useRef(null);
  const animatedSectionsRef = useRef([]);

  // 2. INTERSECTION OBSERVER: Handles active states for z-index
  useEffect(() => {
    if (!containerRef.current) return;

    // Safely query only inside the Home container
    const allSections = Array.from(containerRef.current.querySelectorAll('.section-inner'));
    animatedSectionsRef.current = Array.from(
      containerRef.current.querySelectorAll('.section-inner:not(.section-auto)')
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: [0.2, 0.3, 0.4] }
    );

    allSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // 3. SCROLL MATH: Wrapped in useCallback for memory optimization
  const handleScroll = useCallback(() => {
    if (!animatedSectionsRef.current.length) return;

    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    animatedSectionsRef.current.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;

      // Calculate distance from center (normalized)
      const distance = Math.abs(sectionCenter - viewportCenter) / (viewportHeight / 1.5);
      const safeDist = Math.min(distance, 1);

      // Animation calculations
      const scale = 1; 
      const opacity = 1 - safeDist * 0.25;    
      const blur = safeDist * 1.5;            
      const translateY = (sectionCenter - viewportCenter) * 0.04;    

      // Direct DOM mutation for 60fps performance
      section.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      section.style.opacity = `${opacity}`;
      section.style.filter = `blur(${blur}px)`;
    });
  }, []);

  // 4. LENIS HOOK: Automatically hooks into the native smooth scroll loop
  useLenis(handleScroll);

  // Fallback for native scrolling (initial load or if Lenis is inactive)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount to set initial positions
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <main className="home-container" ref={containerRef}>

      {/* 1. Hero */}
      <section className="snap-section">
        <div className="section-inner hero-section">
          <Hero />
        </div>
      </section>

      {/* 2. Big Statement */}
      <section className="snap-section">
        <div className="section-inner statement-section">
          <BigStatement />
        </div>
      </section>

      {/* 3. Vision ---> THE FIX: Changed to auto-height so mobile text fits perfectly <--- */}
      <section className="snap-section snap-auto" style={{ height: 'auto', minHeight: '100vh' }}>
        <div className="section-inner section-auto vision-section">
          <Vision />
        </div>
      </section>

      {/* 4. Sethmo Showcase */}
      <section className="snap-section">
        <div className="section-inner sethmo-section-wrapper">
          <SethmoSection />
        </div>
      </section>

      {/* 5. Seven Pillars Banner */}
      <section className="snap-section">
        <div className="section-inner pillars-section">
          <SevenPillars />
        </div>
      </section>

      {/* 6. Seven Pillars Details (Normal Scroll) */}
      <section className="snap-section snap-auto" style={{ height: 'auto', minHeight: '100vh' }}>
        <div className="section-inner section-auto pillars-details-wrapper">
          <SevenPillarsDetails />
        </div>
      </section>

      {/* 7. Contact Us (Normal Scroll) */}
      <section className="snap-section snap-auto" style={{ height: 'auto', minHeight: '600px' }}>
        <div className="section-inner section-auto contact-section-wrapper">
          <ContactUs />
        </div>
      </section>

    </main>
  );
};

export default Home;