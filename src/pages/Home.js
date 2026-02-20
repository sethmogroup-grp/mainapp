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
  const containerRef = useRef(null);
  const animatedSectionsRef = useRef([]);

  /* =========================================
     INTERSECTION OBSERVER
  ========================================= */
  useEffect(() => {
    if (!containerRef.current) return;

    const allSections = Array.from(
      containerRef.current.querySelectorAll('.section-inner')
    );

    animatedSectionsRef.current = Array.from(
      containerRef.current.querySelectorAll(
        '.section-inner:not(.section-auto)'
      )
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

  /* =========================================
     SCROLL ANIMATION (BLUR SAFE)
  ========================================= */
  const handleScroll = useCallback(() => {
    if (!animatedSectionsRef.current.length) return;

    if (document.body.classList.contains('no-scroll-animation')) {
      animatedSectionsRef.current.forEach((section) => {
        section.style.transform = 'none';
        section.style.opacity = '1';
        section.style.filter = 'none';
      });
      return;
    }

    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    animatedSectionsRef.current.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;

      const distance =
        Math.abs(sectionCenter - viewportCenter) /
        (viewportHeight / 1.5);

      const safeDist = Math.min(distance, 1);

      const scale = 1;
      const opacity = 1 - safeDist * 0.25;
      const blur = safeDist * 1.5;
      const translateY =
        (sectionCenter - viewportCenter) * 0.04;

      section.style.transform =
        `scale(${scale}) translateY(${translateY}px)`;
      section.style.opacity = `${opacity}`;
      section.style.filter = `blur(${blur}px)`;
    });
  }, []);

  /* =========================================
     LENIS INTEGRATION
  ========================================= */
  useLenis(handleScroll);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    handleScroll();

    return () =>
      window.removeEventListener('scroll', handleScroll);
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
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto statement-section">
          <BigStatement />
        </div>
      </section>

      {/* 3. Vision */}
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto vision-section">
          <Vision />
        </div>
      </section>

      {/* 4. Sethmo Showcase (FIXED: Added snap-auto & section-auto) */}
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto sethmo-section-wrapper">
          <SethmoSection />
        </div>
      </section>

      {/* 5. Seven Pillars Banner */}
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto pillars-section">
          <SevenPillars />
        </div>
      </section>

      {/* 6. Seven Pillars Details */}
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto pillars-details-wrapper">
          <SevenPillarsDetails />
        </div>
      </section>

      {/* 7. Contact */}
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto contact-section-wrapper">
          <ContactUs />
        </div>
      </section>

    </main>
  );
};

export default Home;