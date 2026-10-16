import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder so the "Investor Relations" navigation link has a page to land on.
const InvestorRelations = () => (
  <section
    style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '4rem 1.5rem',
      background: '#fff',
      color: '#272f4d',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}
  >
    <h1 style={{ margin: '0 0 0.75rem', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>Investor Relations</h1>
    <p style={{ margin: '0 0 1.5rem', maxWidth: 520, lineHeight: 1.6, color: '#6f727c' }}>
      This page is coming soon. For investor enquiries, please get in touch with us.
    </p>
    <Link
      to="/contact"
      style={{
        padding: '0.6rem 1.6rem',
        borderRadius: 8,
        background: '#f58a35',
        color: '#fff',
        fontWeight: 700,
        textDecoration: 'none',
      }}
    >
      Contact Us
    </Link>
  </section>
);

export default InvestorRelations;
