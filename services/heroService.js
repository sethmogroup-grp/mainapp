// src/services/heroService.js

// Ensure this points to your deployed server or localhost
const API_URL = process.env.REACT_APP_API_URL || 'https://sethmogroup-backend.onrender.com';

export const getHeroSettings = async () => {
  // 🔴 WAS: fetch(`${API_URL}/hero`);
  // 🟢 CHANGE TO:
  const response = await fetch(`${API_URL}/api/hero`); 
  
  if (!response.ok) {
    throw new Error('Failed to fetch hero settings');
  }
  return response.json();
};

export const updateHeroSettings = async (settings) => {
  // 🔴 WAS: fetch(`${API_URL}/hero`, ...);
  // 🟢 CHANGE TO:
  const response = await fetch(`${API_URL}/api/hero`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    throw new Error('Failed to update hero settings');
  }
  return response.json();
};

export const uploadHeroFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  // 🔴 WAS: fetch(`${API_URL}/hero/upload`, ...);
  // 🟢 CHANGE TO:
  const response = await fetch(`${API_URL}/api/hero/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }
  return response.json();
};