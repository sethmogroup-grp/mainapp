/**
 * "The Goodness Programme" page (Social Impact). These words + pictures show until the admin saves their own
 * (Admin -> Social Impact -> The Goodness Programme). An empty picture always falls back to the artwork below.
 * In any text, **double asterisks** make the words bold.
 */
import heroImage from '../assets/social-impact/hero.jpg';
import bannerImage from '../assets/social-impact/banner.jpg';
import girlImage from '../assets/social-impact/girl.jpg';
import standImage from '../assets/social-impact/stand.jpg';
import thapeloSlide1 from '../assets/social-impact/thapelo-slide-1.jpg';
import thapeloSlide2 from '../assets/social-impact/thapelo-slide-2.jpg';
import thapeloSlide3 from '../assets/social-impact/thapelo-slide-3.jpg';
import thapeloHeroLogo from '../assets/social-impact/thapelo-hero-logo.png';
import thapeloAbout from '../assets/social-impact/thapelo-about.jpg';
import thapeloFeeding from '../assets/social-impact/thapelo-feeding.jpg';
import heartMark from '../assets/social-impact/heart-mark.png';
import goodnessLogo from '../assets/social-impact/goodness-logo.png';
import thapeloLogo from '../assets/THAPELO FOUNDATION LOGO.png';

export const GP_ART = {
  heroImage,
  heroLogo: goodnessLogo,
  bannerImage,
  bannerLogo: goodnessLogo,
  girlImage,
  standImage,
  standLogo: goodnessLogo,
  thapeloLogo,
  heartMark, // the heart used as the pink watermark + the faint hearts on the register block
};

export const GP_DEFAULTS = {
  heroTitle: 'THE GOODNESS PROGRAM',
  heroSubtitle: 'Supporting, caring & protecting the girl child from the harm of the world',

  welcomeLine: 'Hello there, and welcome to The Goodness Program!',
  introText:
    'We would like to share how we make a difference through our charitable initiatives, powered by\nTHAPELO FOUNDATION and SETHMO GROUP.',
  whatHeading: 'What do we do?',
  whatParagraphs: [
    { id: 'w1', text: 'We are The Goodness Program, a charitable initiative under the Thapelo Foundation, dedicated to supporting, caring for, and protecting the girl child from harm, abuse, and exploitation.' },
    { id: 'w2', text: 'Our core purpose is to safeguard the well-being of every girl in our country, ensuring that she has access to education, is treated with dignity and equality, and has the opportunity to build a brighter future. We stand for a world where no girl isleft behind, no child is subjected to abuse, and every girl is protected from early and forced marriage and teenage pregnancy.' },
    { id: 'w3', text: 'We believe that every girl deserves a voice, a chance to stand confidently on any stage, and the freedom to express herself with pride. Through awareness, education, advocacy, and community support, we seek to help girls recognise their worth, understand their rights, discover their potential, and believe in the power of their dreams.' },
    { id: 'w4', text: 'At The Goodness Program, we are committed to creating a future where every girl is safe, educated, valued, and empowered to shape her own destiny.' },
  ],

  whyHeading: 'Why Do We Care?',
  whyParagraphs: [
    { id: 'y1', text: 'At The Goodness Program, we believe that every girl child is just as valuable, capable, and deserving of opportunity as every boy. Her safety, well-being, education, and dignity must never be treated as secondary priorities. They must be a shared responsibility of parents, families, communities, and society as a whole, including boys and men.' },
    { id: 'y2', text: 'We care because a girl is more than the circumstances she is born into or the challenges she faces. She carries wisdom, potential, courage, and the promise of a better tomorrow. She is the next generation of leaders, innovators, mothers, professionals, and change-makers who will help shape our communities and our nation.' },
    { id: 'y3', text: '**She deserves to be protected, not limited; heard, not silenced; encouraged, not overlooked; and treasured, not taken for granted.**' },
    { id: 'y4', text: 'At The Goodness Program, we are committed to a future where every girl knows her worth, stands proudly in her identity, and has the opportunity to become everything she is capable of being. **Because when we protect her future, we strengthen the future of us all..**' },
  ],
  signatureName: 'Hope Chuungwe',
  signatureRole: 'Patrone',
  signatureBadge: 'The Goodness Program',

  galleryButtonText: 'Explore our Gallery of events and girls we Support',
  galleryButtonUrl: '',

  registerText:
    'Want to help and bring about a difference and change lives of so many children Register and be part of us as we go to change the world why child at a time\nevery hand is needed here for us to really bring about change and save a lot of children and young teens',
  registerButtonText: 'Click here to Register',
  registerUrl: '',

  standText: 'Standing together as women\nto protect and guide the Teen Girls\nand women',
  standButtonText: 'CLICK HERE',
  standButtonUrl: '/social-impact/thapelo-foundation',

  thapeloUrl: '/social-impact/thapelo-foundation',
};

/** Thapelo Foundation page - sliding hero (3 pictures, 7 seconds each, white logo top right) */
export const THAPELO_ART = {
  slides: [thapeloSlide1, thapeloSlide2, thapeloSlide3],
  heroLogo: thapeloHeroLogo,
  aboutImage: thapeloAbout,
  aboutLogo: thapeloHeroLogo,
  feedImage: thapeloFeeding,
};

export const THAPELO_DEFAULTS = {
  thapeloSlides: [{ id: 's1', image: '' }, { id: 's2', image: '' }, { id: 's3', image: '' }],
  thapeloSlideSeconds: 7,

  oathTitle: 'Our Oath',
  oathText: 'Praying together and sharing love Reaching out to communities and people who are in need all around the world through giving praying caring showing love to humankind',

  thapeloPanels: [
    { id: 'c1', color: '#1a7769', label: '', title: 'Giving', text: 'Reaching out to communities and people who are in need all around the world through giving.', buttonText: 'Read More', buttonUrl: '' },
    { id: 'c2', color: '#00aff0', label: '', title: 'Praying', text: 'Praying together and sharing love.', buttonText: 'Read More', buttonUrl: '' },
    { id: 'c3', color: '#3b141f', label: '', title: 'Caring', text: 'Showing love to humankind through caring for those who are in need.', buttonText: 'Read More', buttonUrl: '' },
  ],

  aboutText: 'Thapelo Foundation is a humanitarian and charitable organization dedicated to spreading love, hope, and compassion to communities and individuals in need around the world. Through the power of prayer, the spirit of giving, and a commitment to caring for others, we strive to make a meaningful difference in the lives of the less privileged and vulnerable.',
  aboutButtonText: 'Read More',
  aboutButtonUrl: '',

  feedTitle: 'Feeding Program',
  feedText: 'At Thapelo Foundation, we believe that access to food is a fundamental human need and that no one should have to go hungry. Through our Feeding Program, we are committed to reaching vulnerable individuals, disadvantaged families, orphaned children, and undeserved communities with nutritious meals and essential food supplies.',
  feedButtonText: 'Read More',
  feedButtonUrl: '',
  feedTagline: 'Sharing Food. Spreading Love',
};
