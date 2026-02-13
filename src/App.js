import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ---> FIX: Import from the new 'lenis' package <---
import { ReactLenis } from 'lenis/react';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Community from './pages/Community';
import SectorDetail from './pages/SectorDetail';
import Contact from './pages/Contact'; 
import Careers from './pages/Careers'; 

function App() {
  return (
    /* ---> Wrap the entire app. The "root" prop tells Lenis to control the window scroll <--- */
    <ReactLenis root options={{ duration: 1.2, smoothWheel: true }}>
      <Router>
        <ScrollToTop />
        
        <div className="App">
          <Navbar />
          
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              
              {/* Services Routes */}
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<SectorDetail />} />
              
              {/* Community & News Routes */}
              <Route path="/community" element={<Community />} />
              {/* We map /news to Community since it contains your blog/news articles */}
              <Route path="/news" element={<Community />} />
              
              {/* Support & Quick Links */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              
              {/* Sustainability can be added here once the page is designed */}
            </Routes>
          </div>
          
          <Footer />
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;