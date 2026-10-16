/**
 * Footer content. Contact details + social links can be changed from the admin
 * ("Footer & Contact"); these values show until the admin saves their own.
 * Every link points at an existing page (or a section of the home page).
 */
import logo from '../assets/footer/footer-logo.png';
import owls from '../assets/footer/footer-owls.svg';
import facebookIcon from '../assets/footer/icon-facebook.png';
import xIcon from '../assets/footer/icon-x.png';
import instagramIcon from '../assets/footer/icon-instagram.png';
import youtubeIcon from '../assets/footer/icon-youtube.png';
import linkedinIcon from '../assets/footer/icon-linkedin.png';

export const FOOTER_LOGO = logo;
export const FOOTER_OWLS = owls;

export const FOOTER_SOCIALS = [
  { key: 'facebook', label: 'Facebook', icon: facebookIcon },
  { key: 'x', label: 'X', icon: xIcon },
  { key: 'instagram', label: 'Instagram', icon: instagramIcon },
  { key: 'youtube', label: 'YouTube', icon: youtubeIcon },
  { key: 'linkedin', label: 'LinkedIn', icon: linkedinIcon },
];

// Words under the logo
export const FOOTER_DESCRIPTION =
  'A diversified multi-sector conglomerate committed to sustainable growth, innovation, and lasting community impact. Driven by excellence, we remain proudly\nInspired By You.';

// Our Industries - same list (and order) as the approved design. All open the Industries page.
export const FOOTER_INDUSTRIES = [
  'Manufacturing', 'Agriculture', 'Commercial Printing', 'Advertising Agency', 'Logistics and Transport',
  'Hospitality', 'Foods', 'Mining', 'Hospitality', 'Foods', 'Mining',
  'Steel Manufacturing', 'Commercial Real Estate', 'Construction',
].map((label, i) => ({ id: `ind-${i}`, label, to: '/services' }));

// Quick Links - each one goes to its own page
export const FOOTER_QUICK_LINKS = [
  { label: 'Sustainability', to: '/sustainability' },
  { label: 'Investor Relations', to: '/investor-relations' },
  { label: 'Social Impact', to: '/community' },
  { label: 'Employees', to: '/employees' },
  { label: 'Careers', to: '/careers' },
  { label: 'Our Purpose', to: '/careers/purpose' },
  { label: 'Highlights', to: '/#highlights' },
  { label: 'Behind the Growth', to: '/#behind-growth' },
  { label: 'Newsletters', to: '/#newsletter' },
];

export const FOOTER_DEFAULTS = {
  addressLines: 'Plot 3520, 3521 Cairo Road Lusaka\nZambia',
  phones: [
    { id: 'ph1', text: '(+260) 767 841 135' },
    { id: 'ph2', text: '(+260) (0) 211 374 200' },
  ],
  emails: [
    { id: 'em1', text: 'Info@sethmogroup.com' },
    { id: 'em2', text: 'sales@sethmogroup.com' },
    { id: 'em3', text: 'Customer@sethmogroup.com' },
  ],
  facebook: 'https://www.facebook.com/share/1DJHvBsWiu/',
  x: 'https://x.com/SethmoGroup',
  instagram: 'https://www.instagram.com/sethmogroup?igsh=dmUxcHZ1Z200dXIy',
  youtube: 'https://www.youtube.com/@SethmoGroup',
  linkedin: '',
};
