/**
 * The three Social Impact pages. ONE list used by the navbar dropdown, the routes and the page itself,
 * so a name or link only ever has to be changed here.
 * Order = the order in the approved navbar design.
 */
export const SOCIAL_IMPACT_PAGES = [
  { slug: 'sethmo-group-foundation', label: 'Sethmo Group Foundation' },
  { slug: 'the-goodness-programme', label: 'The Goodness Programme' },
  { slug: 'thapelo-foundation', label: 'Thapelo Foundation' },
];

export const SOCIAL_IMPACT_BASE = '/social-impact';
export const socialImpactPath = (slug) => `${SOCIAL_IMPACT_BASE}/${slug}`;
