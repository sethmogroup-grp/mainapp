// ============================================================
//  src/utils/cache.js
//  Stale-while-revalidate caching utility
// ============================================================

const DEFAULT_TTL = 10 * 60 * 1000; // 10 minutes
const SHORT_TTL   =  1 * 60 * 1000; //  1 minute

export const CACHE_KEYS = {
  HERO:            'cache_hero',
  ABOUT:           'cache_about',
  TEAM:            'cache_team',
  VISION:          'cache_vision',
  SECTORS:         'cache_sectors',
  PILLARS:         'cache_pillars',
  SUSTAINABILITY:  'cache_sustainability',
  NEWS:            'cache_news',
  COMMUNITY:       'cache_community',
  CAREERS:         'cache_careers',
  SETTINGS:        'cache_settings',
  HOME_BUSINESS:   'cache_home_business',
  EXPERTISE:       'cache_expertise',
  COMPANY_INFO:    'cache_company_info',
  MESSAGES:        'cache_messages',
  DASHBOARD_STATS: 'cache_dashboard_stats',
};

const TTL_MAP = {
  [CACHE_KEYS.MESSAGES]:        SHORT_TTL,
  [CACHE_KEYS.DASHBOARD_STATS]: SHORT_TTL,
};

const getTTL = (key) => TTL_MAP[key] ?? DEFAULT_TTL;

export const getCache = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > getTTL(key)) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

export const setCache = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch (e) {
    console.warn('Cache write failed (storage may be full):', e);
  }
};

export const clearCache = (key) => localStorage.removeItem(key);

// onCached  → called immediately with stale data for instant paint
// returns   → fresh network data to silently update the UI
export const fetchWithCache = async (cacheKey, fetcher, onCached) => {
  const cached = getCache(cacheKey);
  if (cached && onCached) onCached(cached);

  try {
    const fresh = await fetcher();
    setCache(cacheKey, fresh);
    return fresh;
  } catch (err) {
    if (cached) return cached; // offline fallback
    throw err;
  }
};
