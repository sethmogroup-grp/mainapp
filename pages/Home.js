import React, { useEffect, useRef, useCallback } from 'react';
import { useLenis } from 'lenis/react';
import './Home.css';

// --- Components ---
import Hero from '../components/Hero';
import PromisesSection from '../components/PromisesSection';
import FullBleedSection from '../components/FullBleedSection';
import FootprintTabs from '../components/FootprintTabs';
import CustomerCentric from '../components/CustomerCentric';
import BusinessFocus from '../components/BusinessFocus';
import SubsidiariesSection from '../components/SubsidiariesSection';
import NewsBanner from '../components/NewsBanner';
import SethmoHighlights from '../components/SethmoHighlights';
import SethmoAgenda from '../components/SethmoAgenda';
import NewsletterSubscribe from '../components/NewsletterSubscribe';

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

      {/* 2a. Sethmo Group Promises (new, sits between Hero and Our Footprint) */}
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto promises-section-wrapper">
          <PromisesSection />
        </div>
      </section>

      {/* 2b. Full-bleed showcase image (new, edge-to-edge) */}
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto full-bleed-section-wrapper">
          <FullBleedSection />
        </div>
      </section>

      {/* 3. Our Footprint | Our Vision | Our Mission (looping tabs) */}
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto footprint-tabs-wrapper">
          <FootprintTabs />
        </div>
      </section>

      {/* 4. Customer centric - "Our Brands. Centered on You." */}
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto customer-centric-wrapper">
          <CustomerCentric />
        </div>
      </section>

      {/* 5. Business Focus (3D slide) - replaces the old "Our Businesses" section */}
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto business-focus-wrapper">
          <BusinessFocus />
        </div>
      </section>

      {/* 6. Sethmo Group and its Subsidiaries */}
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto subsidiaries-wrapper">
          <SubsidiariesSection />
        </div>
      </section>

      {/* 7. Press Releases / News banner */}
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto news-banner-wrapper">
          <NewsBanner />
        </div>
      </section>

      {/* 8. Sethmo Highlights And Latest Updates */}
      <section className="snap-section snap-auto" id="highlights">
        <div className="section-inner section-auto highlights-wrapper">
          <SethmoHighlights />
          <SethmoAgenda />
        </div>
      </section>

      {/* 9. Newsletter subscribe banner */}
      <section className="snap-section snap-auto">
        <div className="section-inner section-auto newsletter-wrapper">
          <NewsletterSubscribe />
        </div>
      </section>

    </main>
  );
};

export default Home;