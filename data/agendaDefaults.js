/**
 * Sustainability Agenda 2037 banner (bottom of "Sethmo Highlights And Latest Updates").
 * These words + pictures show until the admin saves their own.
 */
import owls from '../assets/agenda/owls.svg';
import visionLogo from '../assets/agenda/vision-2037-logo.png';
import person from '../assets/agenda/person.webp';

export const AGENDA_OWLS = owls;
export const AGENDA_LOGO_DEFAULT = visionLogo;
export const AGENDA_PERSON_DEFAULT = person;

export const AGENDA_DEFAULTS = {
  eyebrow: 'Sustainability Agenda 2037',
  heading: 'Building\nBusinesses.\nSustaining People.\nGrowing Zambia.',
  buttonText: 'Read More',
  buttonUrl: '/sustainability',
  intro:
    'At Sethmo Group, we believe that growth\nshould create value not only for our\nbusinesses, but also for our people, our\ncommunities, our country and future\ngenerations.',
  lead: 'Our sustainability agenda is built around a\nsimple principle:',
  quote: 'To grow responsibly today while creating\na stronger tomorrow.',
  pillarsTitle: 'Our 6 Sustainable Pillars are:',
  pillars: [
    { id: 'p1', text: 'People & Opportunity' },
    { id: 'p2', text: 'Environmental Responsibility' },
    { id: 'p3', text: 'Responsible Production & Circular' },
    { id: 'p4', text: 'EconomyCommunities & Zambia' },
    { id: 'p5', text: 'Responsible Business & Governance' },
    { id: 'p6', text: 'Innovation & Sustainable Growth' },
  ],
  visionHeading: 'Vision 2037',
  visionLogo: '',
  personImage: '',
  statBig: '15+',
  statText: 'Subsidiaries\nGrowth',
};
