import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

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
import Sustainability from './pages/Sustainability';

function App() {
  return (
    <Router>
      <ScrollToTop />

      <div className="App">
        <Navbar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<SectorDetail />} />

            <Route path="/community" element={<Community />} />
            <Route path="/news" element={<Community />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/sustainability" element={<Sustainability />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;