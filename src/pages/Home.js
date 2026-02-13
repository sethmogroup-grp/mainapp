import React, { useEffect, useRef } from 'react';
import './Home.css';

// --- Import all your components ---
import Hero from '../components/Hero';
import BigStatement from '../components/BigStatement';
import Vision from '../components/Vision';
import SethmoSection from '../components/SethmoSection';
import SevenPillars from '../components/SevenPillars';
import SevenPillarsDetails from '../components/SevenPillarsDetails';
import ContactUs from '../components/ContactUs';

const Home = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Select only standard "snap" sections for the heavy animation effects.
    // We EXCLUDE sections marked with 'section-auto' (like Pillars Details & Contact)
    const animatedSections = Array.from(
      document.querySelectorAll('.section-inner:not(.section-auto)')
    );

    sectionsRef.current = animatedSections;

    /* ================================
       1. INTERSECTION OBSERVER
       Controls 'active' class for z-index stacking or fade-ins
    ================================= */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          // Trigger active state when 30% visible
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            el.classList.add('active');
          } else {
            el.classList.remove('active');
          }
        });
      },
      {
        threshold: [0.2, 0.3, 0.4],
      }
    );

    // Observe ALL sections (even auto ones) for basic fade-in effects
    const allSections = document.querySelectorAll('.section-inner');
    allSections.forEach((section) => observer.observe(section));

    /* ================================
       2. SCROLL TRANSFORM EFFECT
       Scale / Blur / Parallax (Only for standard sections)
    ================================= */
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      animatedSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;

        // Calculate distance from center (normalized)
        const distance =
          Math.abs(sectionCenter - viewportCenter) /
          (viewportHeight / 1.5);

        // Clamp value so it doesn't go beyond 1
        const safeDist = Math.min(distance, 1);

        /* ---> THE FIX: Set scale to 1 so the sections stop shrinking away from the edges while scrolling <--- */
        const scale = 1; 
        const opacity = 1 - safeDist * 0.25;    // Slight fade
        const blur = safeDist * 1.5;            // Blur edges
        
        const direction = sectionCenter - viewportCenter;
        const translateY = direction * 0.04;    // Subtle parallax shift

        // Apply styles
        section.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        section.style.opacity = `${opacity}`;
        section.style.filter = `blur(${blur}px)`;
      });
    };

    const onScroll = () => requestAnimationFrame(handleScroll);

    // Hook into Lenis if available
    if (window.lenis && typeof window.lenis.on === 'function') {
      window.lenis.on('scroll', handleScroll);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial run to set positions
    handleScroll();

    /* ================================
       CLEANUP
    ================================= */
    return () => {
      if (window.lenis && typeof window.lenis.off === 'function') {
        window.lenis.off('scroll', handleScroll);
      }
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="home-container">

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

      {/* 3. Vision */}
      <section className="snap-section">
        <div className="section-inner vision-section">
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