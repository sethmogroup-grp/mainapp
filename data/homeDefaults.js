/**
 * Default copy + pictures for the home page sections that the admin can edit.
 *
 * - Text defaults mirror the backend defaults, so the page looks right while the API
 *   is loading (or if it is unreachable).
 * - Image defaults are only used when the admin has NOT uploaded a picture yet.
 *   As soon as an image is uploaded in the admin it replaces the bundled one.
 */
import footprintPhoto from '../assets/home/footprint-photo.jpg';
import visionPhoto from '../assets/home/vision-photo.jpg';
import missionPhoto from '../assets/home/mission-photo.jpg';
import africaMap from '../assets/home/africa-map.png';
import visionPerson from '../assets/home/vision-person.png';
import missionFlag from '../assets/home/mission-flag.png';

import customerPerson from '../assets/home/customer-person.png';
import customerMeeting from '../assets/home/customer-meeting.jpg';

import bfAgriculture from '../assets/home/business/agriculture.jpg';
import bfManufacturing from '../assets/home/business/manufacturing.jpg';
import bfAdvertising from '../assets/home/business/advertising.jpg';
import bfHospitality from '../assets/home/business/hospitality.jpg';
import bfTransport from '../assets/home/business/transport.jpg';
import bfPrinting from '../assets/home/business/printing.jpg';
import bfFood from '../assets/home/business/food.jpg';
import bfMining from '../assets/home/business/mining.jpg';

import subHub from '../assets/home/subsidiaries/hub.png';
import subRiel from '../assets/home/subsidiaries/riel.png';
import subBrand from '../assets/home/subsidiaries/brand.png';
import subBeverages from '../assets/home/subsidiaries/beverages.png';
import subSuriel from '../assets/home/subsidiaries/suriel.png';
import subSethgold from '../assets/home/subsidiaries/sethgold.png';
import subAgro from '../assets/home/subsidiaries/agro.png';
import subCement from '../assets/home/subsidiaries/cement.png';
import subPressx from '../assets/home/subsidiaries/pressx.png';
import subCargo from '../assets/home/subsidiaries/cargo.png';

import hlIntegrated from '../assets/home/highlights/integrated-report.jpg';
import hlSustainability from '../assets/home/highlights/sustainability-report.jpg';
import hlProductLaunch from '../assets/home/highlights/product-launch.jpg';
import hlInvestor from '../assets/home/highlights/investor-relations.jpg';
import hlBehindGrowth from '../assets/home/highlights/behind-growth.jpg';
import hlExecutive from '../assets/home/highlights/executive-appointment.jpg';
import hlVision2027 from '../assets/home/highlights/vision-2027.jpg';

/* ---------- Footprint / Vision / Mission ---------- */
export const FOOTPRINT_DEFAULTS = {
  autoplay: true,
  intervalSeconds: 7,
  slides: [
    {
      id: 'footprint',
      tabLabel: 'OUR FOOTPRINT',
      heading: 'OUR FOOTPRINT',
      subheading: 'From local presence to regional ambition.',
      body:
        'Sethmo Group is building a diversified business footprint designed to connect industries, serve growing markets, and create value across the economy.',
      buttonText: 'Read More',
      buttonUrl: '/about',
      panelColor: '#f58a35',
    },
    {
      id: 'vision',
      tabLabel: 'OUR VISION',
      heading: 'OUR VISION',
      quote: '\u201COur vision is as clear as day light\u201D',
      body:
        'To be a world-class enterprise and a trusted household name, delivering essential services and manufacturing solutions that enhance quality of life, create sustainable value, and generate strong returns for our clients and stakeholders through our Subsidiaries.',
      panelColor: '#272f4d',
    },
    {
      id: 'mission',
      tabLabel: 'OUR MISSION',
      heading: 'OUR MISSION',
      body:
        'To positively touch lives by providing essential needs through high-quality services, Product and manufacturing, while sustaining and strengthening our market leadership across branding, agribusiness, manufacturing, printing, hospitality, shipping, and mining. Driven by innovation, excellence, and customer focus, we remain proudly Inspired By You',
      panelColor: '#6d6e70',
    },
  ],
};

export const FOOTPRINT_IMAGES = {
  footprint: { photo: footprintPhoto, sideImage: africaMap },
  vision: { photo: visionPhoto, sideImage: visionPerson },
  mission: { photo: missionPhoto, sideImage: missionFlag },
};

/* ---------- Customer centric ---------- */
export const CUSTOMER_DEFAULTS = {
  heading: 'Our Brands. Centered on You.',
  body:
    'At Sethmo Group, every brand begins with one simple belief: you matter.\n' +
    'Our businesses, products, services, and innovations are shaped around the people and communities we serve. We listen, we understand, and we continually evolve to create solutions that are relevant, meaningful, and built around real needs.\n\n' +
    'From the way we develop our brands to the way we deliver our products and services, you remain at the center of what we do.\n\n' +
    'Because we are not simply building companies. We are building brands inspired by the people who trust us, work with us, and grow with us.\n' +
    'Sethmo Group. Inspired By You.',
  buttonText: 'Read More',
  buttonUrl: '/about',
  personImage: '',
  sideImage: '',
};

export const CUSTOMER_IMAGES = {
  personImage: customerPerson,
  sideImage: customerMeeting,
};

/* ---------- Business Focus ---------- */
export const BUSINESS_FOCUS_DEFAULTS = {
  title: 'BUSINESS FOCUS',
  description:
    'As a diversified conglomerate, our presence across multiple industries reflects a deliberate commitment to our vision and mission: to make essential products, services, and solutions accessible to every household and individual. Through this diversified approach, we seek not only to meet everyday needs, but also to create opportunities, strengthen communities, and contribute meaningfully to the growth of our economy.',
  autoplay: true,
  speedSeconds: 4,
  items: [
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'advertising', label: 'Advertising Agency' },
    { id: 'hospitality', label: 'Hospitality' },
    { id: 'transport', label: 'Transport and Logistics' },
    { id: 'printing', label: 'Commercial Printing' },
    { id: 'food', label: 'Food' },
    { id: 'mining', label: 'Mining' },
  ],
};

export const BUSINESS_FOCUS_IMAGES = {
  agriculture: bfAgriculture,
  manufacturing: bfManufacturing,
  advertising: bfAdvertising,
  hospitality: bfHospitality,
  transport: bfTransport,
  printing: bfPrinting,
  food: bfFood,
  mining: bfMining,
};

/* ---------- Subsidiaries ---------- */
export const SUBSIDIARIES_DEFAULTS = {
  title: 'Sethmo Group, and its Subsidiaries',
  hubLogo: '',
  items: [
    { id: 'riel', name: 'Riel Electronics' },
    { id: 'brand', name: 'Sethmo Brand Consultancy' },
    { id: 'beverages', name: 'Sethmo Beverages' },
    { id: 'suriel', name: 'Suriel Maison Hotels' },
    { id: 'sethgold', name: 'Sethgold Printing Press' },
    { id: 'agro', name: 'Sethmo Agro Industries' },
    { id: 'cement', name: 'Sethmo Cement' },
    { id: 'pressx', name: 'Press X Embroidery' },
    { id: 'cargo', name: 'Sethmo Cargo Logistics' },
  ],
};

export const SUBSIDIARY_LOGOS = {
  hub: subHub,
  riel: subRiel,
  brand: subBrand,
  beverages: subBeverages,
  suriel: subSuriel,
  sethgold: subSethgold,
  agro: subAgro,
  cement: subCement,
  pressx: subPressx,
  cargo: subCargo,
};


/* ---------- Sethmo Highlights And Latest Updates ---------- */
export const HIGHLIGHTS_DEFAULTS = {
  title: 'Sethmo Highlights And Latest Updates',
  items: [
    { id: 'integrated-report', size: 'report', heading: 'Group Subsidiaries', subheading: 'Sethmo Group Integrated Report', year: '2026' },
    { id: 'sustainability-report', size: 'report', heading: 'Sustainability', subheading: 'Sethmo Group Sustainability Report', year: '2026' },
    { id: 'product-launch', size: 'report', heading: 'Upcoming Product Launch', subheading: 'Our products set to be Launched', year: '2027' },
    { id: 'investor-relations', size: 'report', heading: 'Investors Relations', subheading: 'Sethmo Group Investor Relations Report', year: '2026' },
    {
      id: 'behind-growth', size: 'feature', panelColor: '#1c2340',
      panelHeading: 'Behind the Growth', panelSubheading: 'The People Behind the Impact',
      caption: 'Behind every product we create, every service we deliver, and every experience we strive to make better, there are people who make it possible.',
      captionButtonText: 'Read More',
    },
    {
      id: 'executive-appointment', size: 'feature', panelColor: '#2c5c73',
      panelHeading: 'Executive Appointment',
      panelSubheading: 'The Board and Management of Sethmo Group are pleased to announce the appointment of Mr Joel Mwiba as our Non Executive Director. This appointment reflects our commitment to strengthening the Group\u2019s leadership, governance, and strategic decision making.',
      personName: 'Joel Mwiba', personRole: 'Non Executive Director',
      caption: 'Appointments and Changes in Management During the Year',
      captionButtonText: 'Read More',
    },
    {
      id: 'vision-2027', size: 'feature', panelColor: '#ffffff',
      panelHeading: 'Sethmo Group Launches Vision 2027',
      panelSubheading: 'Be Part of the race to modern independence in Zambia\u2019s industrial & Business Sectors',
      caption: 'Want to learn more about the Vision 2027? Click the below button to learn more and be part of the Race.',
      captionButtonText: 'Read More',
    },
  ],
};

export const HIGHLIGHT_IMAGES = {
  'integrated-report': hlIntegrated,
  'sustainability-report': hlSustainability,
  'product-launch': hlProductLaunch,
  'investor-relations': hlInvestor,
  'behind-growth': hlBehindGrowth,
  'executive-appointment': hlExecutive,
  'vision-2027': hlVision2027,
};

/* ---------- Newsletter subscribe banner ---------- */
export const NEWSLETTER_DEFAULTS = {
  heading: 'Stay updated with our Newsletters',
  body:
    'Stay informed with the latest news, insights, and announcements from Sethmo Group. Subscribe to receive our latest newsletters and press releases directly in your inbox. You can unsubscribe at any time.',
  placeholder: 'Enter your email address',
  buttonText: 'Subscribe',
  panelColor: '#f47b20',
  icon: '',
};
