const API_URL = process.env.REACT_APP_API_URL || 'https://sethmoserver.onrender.com';

// ---------- Hero ----------
export const getHeroSettings = async () => {
  // 🟢 Added /api
  const res = await fetch(`${API_URL}/api/hero`);
  if (!res.ok) throw new Error('Failed to fetch hero settings');
  return res.json();
};

// ---------- Vision ----------
export const getVisionData = async () => {
  const res = await fetch(`${API_URL}/api/vision`); // 🟢 Added /api
  if (!res.ok) throw new Error('Failed to fetch vision data');
  return res.json();
};

export const saveVisionData = async (data) => {
  const res = await fetch(`${API_URL}/api/vision`, { // 🟢 Added /api
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save vision data');
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