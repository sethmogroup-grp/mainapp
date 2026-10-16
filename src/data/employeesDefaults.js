/**
 * Default copy + pictures for the Employees page.
 * Text mirrors the backend defaults so the page looks right while the API loads.
 * Pictures here are only used until the admin uploads their own.
 */
import heroImage from '../assets/employees/hero.jpg';
import ruth from '../assets/employees/ruth-mwinsa.jpg';
import justine from '../assets/employees/justine-mophat.jpg';
import hope1 from '../assets/employees/hope-mulenga-1.jpg';
import hope2 from '../assets/employees/hope-mulenga-2.jpg';
import diversifiedImg from '../assets/employees/diversified.jpg';
import careerInfoImg from '../assets/employees/career-information.jpg';
import { SUBSIDIARY_LOGOS } from './homeDefaults';

export const EMPLOYEE_HERO_DEFAULT = heroImage;
export const EMPLOYEE_HUB_LOGO_DEFAULT = SUBSIDIARY_LOGOS.hub;

// Picture used for a card / logo when the admin has not uploaded one (looked up by id)
export const INTERVIEW_IMAGE_DEFAULTS = {
  'ruth-mwinsa': ruth,
  'justine-mophat': justine,
  'hope-mulenga-1': hope1,
  'hope-mulenga-2': hope2,
};

export const DIV_CARD_IMAGE_DEFAULTS = {
  diversified: diversifiedImg,
  'career-information': careerInfoImg,
};

export const DIVERSE_LOGO_DEFAULTS = {
  brand: SUBSIDIARY_LOGOS.brand,
  suriel: SUBSIDIARY_LOGOS.suriel,
  agro: SUBSIDIARY_LOGOS.agro,
  cement: SUBSIDIARY_LOGOS.cement,
  sethgold: SUBSIDIARY_LOGOS.sethgold,
  beverages: SUBSIDIARY_LOGOS.beverages,
};

export const EMPLOYEES_DEFAULTS = {
  pageTitle: 'Employees',
  heroImage: '',

  inspiredHeading: 'Inspired By you',
  inspiredBody:
    'Sethmo Group is built on the belief that people are the foundation of progress. We recognize The individuality of every person, nurture their potential, and create opportunities for them to learn, lead, and grow. By bringing together diverse talents, perspectives, and ambitions, we build a culture where our people and our businesses advance together.',
  circleLeftLabel: 'Inspired by you',
  circleRightLabel: 'Diversified Sethmo Group',

  diverseHeading: 'Diverse Individuals Supporting Diversified Businesses',
  diverseBody:
    'At Sethmo Group, we believe our people are the strength behind every business we build. Inspired By You reflects our commitment to recognising the individuality, talent, and potential of every employee. We create an environment where people are respected, challenged to grow, encouraged to take initiative, and given opportunities to develop their skills and careers. By embracing diverse talents, perspectives, and ambitions, we build teams that learn from one another, perform with purpose, and grow together.',
  hubLogo: '',
  subsidiaries: [
    { id: 'brand', logo: '', name: 'Sethmo Brand Consultancy', description: 'Corporate Branding / advertising' },
    { id: 'suriel', logo: '', name: 'Suriel Maison Hotels', description: 'Hospitality and Apartments' },
    { id: 'agro', logo: '', name: 'Sethmo Agro industries', description: 'Commercial Farming and Grain mills products' },
    { id: 'cement', logo: '', name: 'Sethmo Cement Limited', description: 'Cement Manufacturing and Distributions' },
    { id: 'sethgold', logo: '', name: 'SethGold Printing Press Limited', description: 'Paper Printing and Book Publishing' },
    { id: 'beverages', logo: '', name: 'Sethmo Beverages Limited', description: 'Beverage Manufacturing' },
  ],

  psHeading: 'People Strategy Centered on Diverse Individuals',
  psIntro1:
    'At Sethmo Group, Inspired By You is the foundation of how we approach our people. We believe our strength comes from individuals with different talents, perspectives, experiences, and ambitions coming together to build something greater.',
  psIntro2:
    'Our People Strategy is designed to attract the right talent, unlock individual potential, and create a workplace where people can thrive and belong. Across our diverse businesses and operating environments, we aim to provide meaningful opportunities for our people to contribute, develop, take on new challenges, and build fulfilling careers.',
  psBanner: 'Our Group-wide People Strategy is built around three core priorities:',
  pillars: [
    {
      id: 'attract',
      title: 'Attract and Acquire',
      body: 'We seek out and welcome diverse, ambitious, and talented individuals who bring unique skills, perspectives, experiences, and aspirations to Sethmo Group.\nWe create opportunities for people who are motivated by challenge, innovation, responsibility, and the opportunity to build meaningful careers while contributing to the growth of our businesses.',
    },
    {
      id: 'develop',
      title: 'Develop and Grow',
      body: 'We invest in the continuous development and growth of our people, recognising that every individual has different strengths, capabilities, and ambitions. Through meaningful challenges, learning opportunities, mentorship, responsibility, and career development, we empower our employees to expand their capabilities, pursue their aspirations, and grow alongside the businesses they serve.',
    },
    {
      id: 'engage',
      title: 'Engage and Belong',
      body: 'We create an inclusive, respectful, and engaging workplace where every individual feels valued, heard, supported, and connected to the purpose of Sethmo Group. We encourage collaboration, recognise contribution, promote diversity, and foster an environment where our people can take ownership, perform with purpose, and feel a genuine sense of belonging.',
    },
  ],

  divCards: [
    { id: 'diversified', image: '', overlayText: 'Diversified', caption: 'Diversified', link: '/careers' },
    { id: 'career-information', image: '', overlayText: '', caption: 'Career Information', link: '/careers' },
  ],

  interviewHeading: 'Employee Interview',
  interviewSubtitle:
    'Get to know our passionate employees who continuously embrace challenges, drive innovation, and create meaningful value through their dedication and determination.',
  interviewButtonText: 'See More Interview',
  interviewButtonUrl: '',
  interviewSpeed: 3.5,
  interviews: [
    { id: 'ruth-mwinsa', image: '', role: 'Overseeing the Sales and Market needs', name: 'Ruth Mwinsa', company: 'Sethmo Brand Consultancy' },
    { id: 'justine-mophat', image: '', role: 'International Relations', name: 'Justine Mophat', company: 'Sethmo Group' },
    { id: 'hope-mulenga-1', image: '', role: 'Quality Control', name: 'Hope Mulenga', company: 'Sethgold Printing Press' },
    { id: 'hope-mulenga-2', image: '', role: 'Quality Control', name: 'Hope Mulenga', company: 'Sethgold Printing Press' },
  ],
};
