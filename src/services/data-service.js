// Data service layer
// Priority: Cloud DB (direct) → Storage Cache → Local fallback (cities-2026.js)
// Uses direct DB queries instead of cloud functions to avoid timeout issues

const localConfig = require('../config/cities-2026');

const CACHE_KEY = 'mortgage_cloud_data';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const DB_COLLECTION = 'mortgage_config';

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

  // 2. Try fetching fresh data directly from cloud DB (no cloud function needed)
  fetchFromCloudDB();
}

/**
 * Fetch data directly from cloud database (non-blocking, async)
 * Only fetches LPR + metadata (2 docs) — fast and reliable
 * City configs stay local (rarely change, 300+ docs too heavy)
 */
async function fetchFromCloudDB() {
  try {
    const app = getApp();
    if (!wx.cloud || !app || !app.globalData.cloudEnvId) return;

    const db = wx.cloud.database();
    const _ = db.command;

    // Only fetch LPR and metadata (2 documents, instant)
    const { data } = await db.collection(DB_COLLECTION)
      .where({ type: _.in(['lpr', 'metadata']) })
      .get();

    if (!data || data.length === 0) return;

    // Build cloud data object, keep existing city data from cache
    const result = {
      lpr: _cloudData ? _cloudData.lpr : null,
      metadata: _cloudData ? _cloudData.metadata : null,
      cities: _cloudData ? _cloudData.cities : null,
    };

    data.forEach((doc) => {
      if (doc.type === 'lpr') {
        result.lpr = {
          oneYear: doc.oneYear,
          fiveYear: doc.fiveYear,
          lastUpdate: doc.lastUpdate,
          dataSource: doc.dataSource || '中国人民银行官网',
        };
      } else if (doc.type === 'metadata') {
        result.metadata = {
          version: doc.version,
          lastUpdate: doc.lastUpdate,
          nextScheduledUpdate: doc.nextScheduledUpdate,
          cityCount: doc.cityCount,
          coverageProvinces: doc.coverageProvinces,
          dataSource: doc.dataSource,
        };
      }
    });

    _cloudData = result;
    saveToCache(_cloudData);
  } catch (e) {
    // Silently use local/cached data
    console.warn('Cloud DB fetch skipped:', e.message || e);
  }
}

/**
 * Get city config by name
 */
function getCityConfig(cityName) {
  if (_cloudData && _cloudData.cities && _cloudData.cities[cityName]) {
    return _cloudData.cities[cityName];
  }
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
 * Get data metadata
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
 * Whether cloud data is active
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
