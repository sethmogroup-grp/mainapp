/* eslint-disable no-undef */
const API_URL = process.env.REACT_APP_API_URL || 'https://sethmogroup-backend.onrender.com';

// Helper function to extract error messages safely
const handleFetchError = async (res) => {
  let errorMessage = `Server error: ${res.status} ${res.statusText}`;
  const text = await res.text(); 
  try {
    const errorData = JSON.parse(text);
    errorMessage = errorData.message || errorData.error || errorMessage;
  } catch (e) {
    if (text) errorMessage = text.substring(0, 150);
  }
  throw new Error(errorMessage);
};

// ---------- Hero ----------
export const getHeroSettings = async () => {
  // 🟢 Added /api
  const res = await fetch(`${API_URL}/api/hero`);
  if (!res.ok) throw new Error('Failed to fetch hero settings');
  return res.json();
};

// ---------- About ----------
export const getAboutData = async () => {
  const res = await fetch(`${API_URL}/api/about`); // 🟢 Added /api
  if (!res.ok) throw new Error('Failed to fetch about data');
  return res.json();
};

export const saveAboutData = async (data) => {
  const res = await fetch(`${API_URL}/api/about`, { // 🟢 Added /api
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save about data');
  return res.json();
};

// ---------- Team ----------
export const getTeamData = async () => {
  const res = await fetch(`${API_URL}/api/team`); // 🟢 Added /api
  if (!res.ok) throw new Error('Failed to fetch team data');
  return res.json();
};

export const saveTeamData = async (data) => {
  const res = await fetch(`${API_URL}/api/team`, { // 🟢 Added /api
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save team data');
  return res.json();
};

// ---------- Sectors ----------
export const getSectors = async () => {
  const res = await fetch(`${API_URL}/api/sectors`); // 🟢 Added /api
  if (!res.ok) throw new Error('Failed to fetch sectors');
  return res.json();
};

export const saveSectors = async (data) => {
  const res = await fetch(`${API_URL}/api/sectors`, { // 🟢 Added /api
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save sectors');
  return res.json();
};

// ---------- News & Blog ----------
export const getNews = async () => {
  const res = await fetch(`${API_URL}/api/news`); // 🟢 Added /api
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
};

export const saveNews = async (newsArray) => {
  const res = await fetch(`${API_URL}/api/news`, { // 🟢 Added /api
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ articles: newsArray }),
  });
  if (!res.ok) throw new Error('Failed to save news');
  return res.json();
};

// ---------- Seven Pillars ----------
export const getPillars = async () => {
  const res = await fetch(`${API_URL}/api/pillars`); // 🟢 Added /api
  if (!res.ok) throw new Error('Failed to fetch pillars');
  return res.json();
};

export const savePillars = async (pillarsArray) => {
  const res = await fetch(`${API_URL}/api/pillars`, { // 🟢 Added /api
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pillars: pillarsArray }),
  });
  if (!res.ok) throw new Error('Failed to save pillars');
  return res.json();
};

// ---------- Sustainability ----------
export const getSustainability = async () => {
  const res = await fetch(`${API_URL}/api/sustainability`); // 🟢 Added /api
  if (!res.ok) throw new Error('Failed to fetch sustainability');
  return res.json();
};

export const saveSustainability = async (focusAreas) => {
  const res = await fetch(`${API_URL}/api/sustainability`, { // 🟢 Added /api
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ focusAreas }),
  });
  if (!res.ok) throw new Error('Failed to save sustainability');
  return res.json();
};

// ---------- Community Page Settings ----------
export const getCommunitySettings = async () => {
  const res = await fetch(`${API_URL}/api/community-settings`); // 🟢 Added /api
  if (!res.ok) throw new Error('Failed to fetch community settings');
  return res.json();
};

export const saveCommunitySettings = async (data) => {
  const res = await fetch(`${API_URL}/api/community-settings`, { // 🟢 Added /api
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save community settings');
  return res.json();
};

// ---------- Careers & Recruitment ----------
export const getCareers = async () => {
  const res = await fetch(`${API_URL}/api/careers`); // 🟢 Added /api
  if (!res.ok) throw new Error('Failed to fetch careers');
  return res.json();
};

export const saveCareers = async (jobsArray) => {
  const res = await fetch(`${API_URL}/api/careers`, { // 🟢 Added /api
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobs: jobsArray }),
  });
  if (!res.ok) throw new Error('Failed to save careers');
  return res.json();
};

// ---------- Global System Settings (REQUIRED) ----------
export const getSettings = async () => {
  const res = await fetch(`${API_URL}/api/settings`); // 🟢 Added /api
  if (!res.ok) throw new Error('Failed to fetch system settings');
  return res.json();
};

export const saveSettings = async (data) => {
  const res = await fetch(`${API_URL}/api/settings`, { // 🟢 Added /api
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save system settings');
  return res.json();
};

// ---------- Home Businesses ----------
export const getHomeBusinessData = async () => {
  const res = await fetch(`${API_URL}/api/home-business`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

export const saveHomeBusinessData = async (data) => {
  const res = await fetch(`${API_URL}/api/home-business`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

export const uploadHomeBusinessFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/api/home-business/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

// ---------- Promises Section ----------
export const getPromisesData = async () => {
  const res = await fetch(`${API_URL}/api/promises`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

export const savePromisesData = async (data) => {
  const res = await fetch(`${API_URL}/api/promises`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

export const uploadPromiseFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/api/promises/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

// ---------- Full-Bleed Banner Section ----------
export const getFullBleedData = async () => {
  const res = await fetch(`${API_URL}/api/full-bleed`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

export const saveFullBleedData = async (data) => {
  const res = await fetch(`${API_URL}/api/full-bleed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

export const uploadFullBleedFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/api/full-bleed/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

// ---------- News Banner (homepage CTA) ----------
export const getNewsBanner = async () => {
  const res = await fetch(`${API_URL}/api/news-banner`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

export const saveNewsBanner = async (data) => {
  const res = await fetch(`${API_URL}/api/news-banner`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

// ---------- Home: Footprint / Vision / Mission tabs ----------
export const getFootprintTabs = async () => {
  const res = await fetch(`${API_URL}/api/footprint-tabs`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

// ---------- Home: Customer-centric ("Our Brands. Centered on You.") ----------
export const getCustomerCentric = async () => {
  const res = await fetch(`${API_URL}/api/customer-centric`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

// ---------- Home: Business Focus (3D slide) ----------
export const getBusinessFocus = async () => {
  const res = await fetch(`${API_URL}/api/business-focus`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

// ---------- Home: Subsidiaries ----------
export const getSubsidiariesSection = async () => {
  const res = await fetch(`${API_URL}/api/subsidiaries-section`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};


// ---------- Home: Sethmo Highlights And Latest Updates ----------
export const getHighlights = async () => {
  const res = await fetch(`${API_URL}/api/highlights`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

// ---------- Home: Newsletter subscribe banner ----------
export const getNewsletterSection = async () => {
  const res = await fetch(`${API_URL}/api/newsletter`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

export const subscribeToNewsletter = async (email) => {
  const res = await fetch(`${API_URL}/api/newsletter-subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
};


// ---------- About Us page ----------
export const getAboutPage = async () => {
  const res = await fetch(`${API_URL}/api/about-page`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

// ---------- Sustainability page ----------
export const getSustainabilityPage = async () => {
  const res = await fetch(`${API_URL}/api/sustainability-page`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

// ---------- Employees page ----------
export const getEmployeesPage = async () => {
  const res = await fetch(`${API_URL}/api/employees-page`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

// ---------- Careers Topics page (hero + "The next big thing") ----------
export const getCareersPage = async () => {
  const res = await fetch(`${API_URL}/api/careers-page`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

// ---------- Home: Sustainability Agenda 2037 banner ----------
export const getAgendaBanner = async () => {
  const res = await fetch(`${API_URL}/api/agenda-banner`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};

// ---------- Social Impact -> The Goodness Programme ----------
export const getSocialImpact = async () => {
  const res = await fetch(`${API_URL}/api/social-impact`);
  if (!res.ok) throw new Error('Failed to fetch social impact page');
  return res.json();
};

// ---------- Footer: contact details + social links ----------
export const getFooterSettings = async () => {
  const res = await fetch(`${API_URL}/api/footer-settings`);
  if (!res.ok) await handleFetchError(res);
  return res.json();
};
