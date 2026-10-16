import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import logo from '../assets/SETHMO GROUP.png';
import IndustriesMenu from './IndustriesMenu';
import { SOCIAL_IMPACT_PAGES, SOCIAL_IMPACT_BASE, socialImpactPath } from '../data/socialImpactPages';
import './Navbar.css';

// Same order as the approved design
const EMPLOYEE_LABEL = 'Employees / Careers';
const SOCIAL_LABEL = 'Social Impact';
const EMP_BUBBLE_WIDTH = 182;    // keep in sync with .emp-menu in Navbar.css
const SOCIAL_BUBBLE_WIDTH = 252; // keep in sync with .social-menu in Navbar.css

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Industries', to: '/services' },
  { label: 'About Us', to: '/about' },
  { label: 'Investor Relations', to: '/investor-relations' },
  { label: 'Sustainability', to: '/sustainability' },
  { label: 'Employees / Careers', to: '/careers' },
  { label: 'Social Impact', to: SOCIAL_IMPACT_BASE },
  { label: 'Contact Us', to: '/contact' },
];

// Extra pages the quick finder knows about (not shown in the bar itself)
const SEARCH_EXTRAS = [
  { label: 'Employees', to: '/employees' },
  ...SOCIAL_IMPACT_PAGES.map((p) => ({ label: p.label, to: socialImpactPath(p.slug) })),
];

/** Points a bubble's little arrow at its nav link (or at the burger icon on small screens). */
function useBubblePosition(open, btnRef, width) {
  const [pos, setPos] = useState({ left: 0, arrow: 60 });
  useLayoutEffect(() => {
    if (!open) return undefined;
    const place = () => {
      const btn = btnRef.current;
      if (!btn) return;
      const vw = window.innerWidth;
      const narrow = vw <= 1040; // links are folded into the burger menu
      const r = btn.getBoundingClientRect();
      const x = narrow ? vw - 40 : r.left + r.width / 2;
      const left = Math.min(Math.max(8, x - width * 0.65), vw - width - 8);
      const arrow = Math.min(Math.max(14, x - left - 9), width - 34);
      setPos({ left, arrow });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [open, btnRef, width]);
  return pos;
}

/** Click anywhere outside the bubble (and its link) closes it. */
function useCloseOnOutsideClick(open, bubbleRef, btnRef, close) {
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      const inBubble = bubbleRef.current && bubbleRef.current.contains(e.target);
      const inButton = btnRef.current && btnRef.current.contains(e.target);
      if (!inBubble && !inButton) close();
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [open, bubbleRef, btnRef, close]);
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const employeeBtnRef = useRef(null);
  const employeeBubbleRef = useRef(null);
  const socialBtnRef = useRef(null);
  const socialBubbleRef = useRef(null);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const bubblePos = useBubblePosition(employeeOpen, employeeBtnRef, EMP_BUBBLE_WIDTH);
  const socialPos = useBubblePosition(socialOpen, socialBtnRef, SOCIAL_BUBBLE_WIDTH);

  const closeEmployee = React.useCallback(() => setEmployeeOpen(false), []);
  const closeSocial = React.useCallback(() => setSocialOpen(false), []);
  useCloseOnOutsideClick(employeeOpen, employeeBubbleRef, employeeBtnRef, closeEmployee);
  useCloseOnOutsideClick(socialOpen, socialBubbleRef, socialBtnRef, closeSocial);

  // Close the mobile menu / search / industries panel / bubbles whenever the page changes
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setIndustriesOpen(false);
    setEmployeeOpen(false);
    setSocialOpen(false);
    setQuery('');
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMenuOpen(false);
        setIndustriesOpen(false);
        setEmployeeOpen(false);
        setSocialOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const employeeSectionActive =
    location.pathname.startsWith('/employees') || location.pathname.startsWith('/careers');
  const socialSectionActive = location.pathname.startsWith(SOCIAL_IMPACT_BASE);

  // Quick page finder: filters the site's pages as you type
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV_LINKS;
    return [...NAV_LINKS, ...SEARCH_EXTRAS].filter((link) => link.label.toLowerCase().includes(q));
  }, [query]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (results.length) navigate(results[0].to);
  };

  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <Link to="/" className="site-nav-logo" aria-label="Sethmo Group home">
          <img src={logo} alt="Sethmo Group" />
        </Link>

        <nav
          id="site-nav-links"
          className={`site-nav-links ${menuOpen ? 'is-open' : ''}`}
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) =>
            link.label === 'Industries' ? (
              <button
                key={link.to}
                type="button"
                className={`site-nav-link ${industriesOpen ? 'is-active' : ''}`}
                aria-haspopup="dialog"
                aria-expanded={industriesOpen}
                onClick={() => {
                  setIndustriesOpen((v) => !v);
                  setMenuOpen(false);
                  setEmployeeOpen(false);
                  setSocialOpen(false);
                }}
              >
                {link.label}
              </button>
            ) : link.label === EMPLOYEE_LABEL ? (
              <button
                key={link.to}
                ref={employeeBtnRef}
                type="button"
                className={`site-nav-link ${employeeOpen || employeeSectionActive ? 'is-active' : ''}`}
                aria-haspopup="true"
                aria-expanded={employeeOpen}
                onClick={() => {
                  setEmployeeOpen((v) => !v);
                  setMenuOpen(false);
                  setIndustriesOpen(false);
                  setSearchOpen(false);
                  setSocialOpen(false);
                }}
              >
                {link.label}
              </button>
            ) : link.label === SOCIAL_LABEL ? (
              <button
                key={link.to}
                ref={socialBtnRef}
                type="button"
                className={`site-nav-link ${socialOpen || socialSectionActive ? 'is-active' : ''}`}
                aria-haspopup="true"
                aria-expanded={socialOpen}
                onClick={() => {
                  setSocialOpen((v) => !v);
                  setMenuOpen(false);
                  setIndustriesOpen(false);
                  setSearchOpen(false);
                  setEmployeeOpen(false);
                }}
              >
                {link.label}
              </button>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `site-nav-link ${isActive ? 'is-active' : ''}`}
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="site-nav-actions">
          <button
            type="button"
            className="site-nav-icon-btn"
            aria-label={searchOpen ? 'Close search' : 'Search pages'}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            {searchOpen ? <X size={24} strokeWidth={2} /> : <Search size={26} strokeWidth={2} />}
          </button>

          <button
            type="button"
            className="site-nav-icon-btn site-nav-burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="site-nav-links"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="site-nav-search">
          <form onSubmit={submitSearch} role="search">
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages…"
              aria-label="Search pages"
            />
          </form>
          <ul>
            {results.length ? (
              results.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))
            ) : (
              <li className="site-nav-search-empty">No pages found</li>
            )}
          </ul>
        </div>
      )}

      {employeeOpen && (
        <div
          ref={employeeBubbleRef}
          className="emp-menu"
          role="menu"
          aria-label="Employees and careers"
          style={{ left: `${bubblePos.left}px`, '--arrow-x': `${bubblePos.arrow}px` }}
        >
          <button
            type="button"
            className="emp-menu-close"
            aria-label="Close menu"
            onClick={() => setEmployeeOpen(false)}
          >
            <X size={16} strokeWidth={2} />
          </button>
          <Link to="/employees" role="menuitem" className="emp-menu-item emp-menu-item-first">
            Employees Topics
          </Link>
          <Link to="/careers" role="menuitem" className="emp-menu-item">
            Career&rsquo;s Topics
          </Link>
        </div>
      )}

      {socialOpen && (
        <div
          ref={socialBubbleRef}
          className="emp-menu social-menu"
          role="menu"
          aria-label="Social Impact"
          style={{ left: `${socialPos.left}px`, '--arrow-x': `${socialPos.arrow}px` }}
        >
          <button
            type="button"
            className="emp-menu-close"
            aria-label="Close menu"
            onClick={() => setSocialOpen(false)}
          >
            <X size={16} strokeWidth={2} />
          </button>
          {SOCIAL_IMPACT_PAGES.map((page, i) => (
            <Link
              key={page.slug}
              to={socialImpactPath(page.slug)}
              role="menuitem"
              className={`emp-menu-item${i === 0 ? ' social-menu-first' : ''}${
                i < SOCIAL_IMPACT_PAGES.length - 1 ? ' social-menu-rule' : ''
              }`}
            >
              {page.label}
            </Link>
          ))}
        </div>
      )}

      <IndustriesMenu isOpen={industriesOpen} onClose={() => setIndustriesOpen(false)} />
    </header>
  );
};

export default Navbar;
