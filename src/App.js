import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ---> NEW: You MUST import the CSS file so React applies the layout fixes! <---
import './App.css';

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
import Sustainability from './pages/Sustainability'; // <-- NEW IMPORT

function App() {
  return (
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
              <Route path="/news" element={<Community />} />
              
              {/* Support & Quick Links */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/sustainability" element={<Sustainability />} /> {/* <-- NEW ROUTE */}
            </Routes>
          </div>
          
          <Footer />
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;