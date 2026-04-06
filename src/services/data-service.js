// Data service layer
// Priority: Cloud DB → Storage Cache → Local fallback (cities-2026.js)

const localConfig = require('../config/cities-2026');

const CACHE_KEY = 'mortgage_cloud_data';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// In-memory store for the active session
let _cloudData = null;
let _initialized = false;

/**
 * Initialize data service: load cloud data into memory
 * Called once from app.js onLaunch
 */
async function init() {
  if (_initialized) return;
  _initialized = true;

  // 1. Try loading from Storage cache first (fast, no network)
  const cached = loadFromCache();
  if (cached) {
    _cloudData = cached;
  }

  // 2. Try fetching fresh data from cloud (async, non-blocking)
  try {
    // Skip if cloud is not available or not initialized
    const app = getApp();
    if (!wx.cloud || !app || !app.globalData.cloudEnvId) return;

    const res = await wx.cloud.callFunction({
      name: 'getLatestData',
    });

    if (res && res.result && res.result.success) {
      _cloudData = res.result.data;
      saveToCache(_cloudData);
    }
  } catch (e) {
    console.warn('Cloud data fetch failed, using fallback:', e.message || e);
  }
}

/**
 * Get city config by name
 * Mirrors the API of cities-2026.getCityConfig()
 */
function getCityConfig(cityName) {
  // Cloud data available → use it
  if (_cloudData && _cloudData.cities && _cloudData.cities[cityName]) {
    return _cloudData.cities[cityName];
  }
  // Fallback to local
  return localConfig.getCityConfig(cityName);
}

/**
 * Get LPR rates
 */
function getLPR() {
  if (_cloudData && _cloudData.lpr) {
    return _cloudData.lpr;
  }
  return localConfig.LPR_2026;
}

/**
 * Get data metadata (version, update time, sources, etc.)
 */
function getDataMetadata() {
  if (_cloudData && _cloudData.metadata) {
    return _cloudData.metadata;
  }
  return localConfig.getDataMetadata();
}

/**
 * Check data freshness based on metadata
 */
function checkDataFreshness() {
  const metadata = getDataMetadata();
  const now = new Date();
  const lastUpdate = new Date(metadata.lastUpdate);
  const daysSinceUpdate = Math.floor(
    (now - lastUpdate) / (1000 * 60 * 60 * 24),
  );

  let status = 'fresh';
  let label = '最新';
  let warning = null;

  if (daysSinceUpdate > 30 && daysSinceUpdate <= 60) {
    status = 'warning';
    label = '待更新';
    warning = `数据已${daysSinceUpdate}天未更新，建议关注最新政策`;
  } else if (daysSinceUpdate > 60) {
    status = 'outdated';
    label = '过期';
    warning = `数据已${daysSinceUpdate}天未更新，可能不是最新政策，请谨慎使用`;
  }

  return { status, label, warning, daysSinceUpdate };
}

/**
 * Get cities grouped by level
 */
function getCitiesByLevel() {
  // If cloud data has cities, group them
  if (_cloudData && _cloudData.cities) {
    const result = { '一线': [], '新一线': [], '二线': [], '其他': [] };
    Object.keys(_cloudData.cities).forEach((name) => {
      const city = _cloudData.cities[name];
      const level = city.level;
      if (result[level]) {
        result[level].push(name);
      } else if (name !== '其他城市') {
        result['其他'].push(name);
      }
    });
    return result;
  }
  return localConfig.getCitiesByLevel();
}

/**
 * Whether cloud data is active (for UI indicators)
 */
function isCloudDataActive() {
  return _cloudData !== null;
}

// --- Cache helpers ---

function loadFromCache() {
  try {
    const raw = wx.getStorageSync(CACHE_KEY);
    if (!raw) return null;

    const { data, timestamp } = raw;
    if (Date.now() - timestamp > CACHE_DURATION) {
      wx.removeStorageSync(CACHE_KEY);
      return null;
    }
    return data;
  } catch (e) {
    return null;
  }
}

function saveToCache(data) {
  try {
    wx.setStorageSync(CACHE_KEY, {
      data,
      timestamp: Date.now(),
    });
  } catch (e) {
    console.warn('Failed to cache cloud data:', e);
  }
}

module.exports = {
  init,
  getCityConfig,
  getLPR,
  getDataMetadata,
  checkDataFreshness,
  getCitiesByLevel,
  isCloudDataActive,
};
