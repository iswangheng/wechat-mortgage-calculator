// Cloud function: updateLprData
// Scheduled trigger: runs on 21st of each month at 10:00
// Fetches latest LPR rates from PBC website and updates cloud database

const cloud = require('wx-server-sdk');
const https = require('https');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// PBC (People's Bank of China) LPR page URL
const PBC_LPR_URL = 'https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125440/index.html';

exports.main = async (event, context) => {
  console.log('updateLprData triggered at:', new Date().toISOString());

  try {
    // 1. Fetch PBC LPR page
    const html = await fetchPage(PBC_LPR_URL);

    // 2. Parse LPR rates from HTML
    const lprData = parseLprFromHtml(html);

    if (!lprData) {
      console.warn('Failed to parse LPR data, skipping update');
      return { success: false, error: 'Parse failed' };
    }

    console.log('Parsed LPR data:', lprData);

    // 3. Read current LPR from database
    const current = await db.collection('mortgage_config')
      .doc('lpr_rates')
      .get()
      .catch(() => null);

    const currentOneYear = current && current.data ? current.data.oneYear : null;
    const currentFiveYear = current && current.data ? current.data.fiveYear : null;

    // 4. Check if rates changed
    if (currentOneYear === lprData.oneYear && currentFiveYear === lprData.fiveYear) {
      console.log('LPR unchanged, no update needed');
      return { success: true, changed: false, message: 'LPR unchanged' };
    }

    // 5. Update LPR in database
    const today = new Date().toISOString().split('T')[0];
    await db.collection('mortgage_config').doc('lpr_rates').set({
      data: {
        type: 'lpr',
        oneYear: lprData.oneYear,
        fiveYear: lprData.fiveYear,
        lastUpdate: today,
        dataSource: '中国人民银行官网',
        updatedBy: 'auto',
        previousOneYear: currentOneYear,
        previousFiveYear: currentFiveYear,
      },
    });

    // 6. Update metadata
    await db.collection('mortgage_config').doc('metadata').update({
      data: {
        lastUpdate: today,
        version: today.replace(/-/g, '.'),
      },
    });

    console.log('LPR updated successfully:', lprData);
    return {
      success: true,
      changed: true,
      data: lprData,
      message: `LPR updated: 1Y ${currentOneYear}→${lprData.oneYear}, 5Y+ ${currentFiveYear}→${lprData.fiveYear}`,
    };
  } catch (err) {
    console.error('updateLprData error:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Fetch a page via HTTPS
 */
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

/**
 * Parse LPR rates from PBC HTML page
 * Looks for patterns like "1年期LPR为X.XX%" and "5年期以上LPR为X.XX%"
 */
function parseLprFromHtml(html) {
  if (!html) return null;

  try {
    // Pattern: match "X.XX%" near LPR keywords
    const oneYearMatch = html.match(/1\s*年期\s*(?:LPR|贷款市场报价利率)\s*(?:为|：|:)?\s*(\d+\.?\d*)\s*%/);
    const fiveYearMatch = html.match(/5\s*年期以上\s*(?:LPR|贷款市场报价利率)\s*(?:为|：|:)?\s*(\d+\.?\d*)\s*%/);

    if (oneYearMatch && fiveYearMatch) {
      return {
        oneYear: parseFloat(oneYearMatch[1]),
        fiveYear: parseFloat(fiveYearMatch[1]),
      };
    }

    // Fallback: try table-based format common on PBC site
    const tableMatch = html.match(/(\d+\.\d+)\s*(?:%|％)[\s\S]{0,100}?(\d+\.\d+)\s*(?:%|％)/);
    if (tableMatch) {
      const v1 = parseFloat(tableMatch[1]);
      const v2 = parseFloat(tableMatch[2]);
      // 1-year rate is typically lower than 5-year
      return {
        oneYear: Math.min(v1, v2),
        fiveYear: Math.max(v1, v2),
      };
    }

    return null;
  } catch (e) {
    console.error('Parse error:', e);
    return null;
  }
}
