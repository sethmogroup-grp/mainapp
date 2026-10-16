import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AnalyticsTracker from './components/AnalyticsTracker';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import SocialImpact from './pages/SocialImpact';
import { SOCIAL_IMPACT_PAGES, socialImpactPath } from './data/socialImpactPages';
import SectorDetail from './pages/SectorDetail';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Employees from './pages/Employees';
import CareerDetail from './pages/CareerDetail';
import Sustainability from './pages/Sustainability';
import News from './pages/News';
import InvestorRelations from './pages/InvestorRelations';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnalyticsTracker />

      <div className="App">
        <Navbar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<SectorDetail />} />

            {/* Social Impact: the old Community page is replaced by three pages */}
            <Route path="/social-impact" element={<Navigate to={socialImpactPath(SOCIAL_IMPACT_PAGES[0].slug)} replace />} />
            <Route path="/social-impact/:slug" element={<SocialImpact />} />
            <Route path="/community" element={<Navigate to={socialImpactPath(SOCIAL_IMPACT_PAGES[0].slug)} replace />} />
            <Route path="/news" element={<News />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:slug" element={<CareerDetail />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/investor-relations" element={<InvestorRelations />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;