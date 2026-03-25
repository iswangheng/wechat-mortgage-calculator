// History manager for mortgage calculation records
// Uses wx.setStorageSync / wx.getStorageSync for persistence

const STORAGE_KEY = 'mortgage_history';
const MAX_RECORDS = 20;

// Loan type label mapping
const LOAN_TYPE_LABELS = {
  'commercial': '商贷',
  'fund': '公积金',
  'combination': '组合贷'
};

/**
 * Generate a descriptive title for history record
 * @param {object} params - Record parameters
 * @returns {string} Title like "上海 商贷 300万 30年"
 */
function generateTitle(params) {
  const { city, type, inputData } = params;
  const typeLabel = LOAN_TYPE_LABELS[type] || '贷款';

  let amountStr = '';
  if (type === 'commercial') {
    amountStr = inputData.commercialPrincipal + '万';
  } else if (type === 'fund') {
    amountStr = inputData.fundPrincipal + '万';
  } else if (type === 'combination') {
    const total = (parseFloat(inputData.commercialPrincipal || 0) + parseFloat(inputData.fundPrincipal || 0)).toFixed(0);
    amountStr = total + '万';
  }

  return `${city} ${typeLabel} ${amountStr} ${inputData.loanYears}年`;
}

/**
 * Get all history records from storage
 * @returns {Array} List of history records, sorted by createTime desc
 */
function getHistoryList() {
  try {
    const list = wx.getStorageSync(STORAGE_KEY);
    return list || [];
  } catch (e) {
    console.error('Failed to get history list:', e);
    return [];
  }
}

/**
 * Get a single history record by id
 * @param {number} id - Record id
 * @returns {object|null} History record or null
 */
function getHistoryById(id) {
  const list = getHistoryList();
  return list.find(item => item.id === id) || null;
}

/**
 * Save a new history record
 * @param {object} params - Record data
 * @param {string} params.type - Loan type: 'commercial' | 'fund' | 'combination'
 * @param {string} params.city - City name
 * @param {object} params.inputData - Input parameters
 * @param {object} params.result - Calculation result
 * @param {Array} [params.tags] - Tags
 * @returns {object} The saved record
 */
function saveHistory(params) {
  const { type, city, inputData, result, tags } = params;

  const record = {
    id: Date.now(),
    title: generateTitle({ city, type, inputData }),
    type,
    city,
    inputData,
    result,
    createTime: Date.now(),
    tags: tags || []
  };

  const list = getHistoryList();

  // Add to the beginning of the list
  list.unshift(record);

  // Trim to max records
  if (list.length > MAX_RECORDS) {
    list.splice(MAX_RECORDS);
  }

  try {
    wx.setStorageSync(STORAGE_KEY, list);
  } catch (e) {
    console.error('Failed to save history:', e);
  }

  return record;
}

/**
 * Delete a history record by id
 * @param {number} id - Record id
 * @returns {boolean} Whether deletion was successful
 */
function deleteHistory(id) {
  const list = getHistoryList();
  const index = list.findIndex(item => item.id === id);

  if (index === -1) {
    return false;
  }

  list.splice(index, 1);

  try {
    wx.setStorageSync(STORAGE_KEY, list);
    return true;
  } catch (e) {
    console.error('Failed to delete history:', e);
    return false;
  }
}

/**
 * Clear all history records
 * @returns {boolean} Whether clearing was successful
 */
function clearHistory() {
  try {
    wx.removeStorageSync(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('Failed to clear history:', e);
    return false;
  }
}

module.exports = {
  getHistoryList,
  getHistoryById,
  saveHistory,
  deleteHistory,
  clearHistory,
  LOAN_TYPE_LABELS
};
