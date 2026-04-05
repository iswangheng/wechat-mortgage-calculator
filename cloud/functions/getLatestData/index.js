// Cloud function: getLatestData
// Returns latest mortgage data (LPR, city configs, metadata) from cloud DB

const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    // Fetch all documents from mortgage_config collection
    const { data } = await db.collection('mortgage_config').get();

    if (!data || data.length === 0) {
      return { success: false, error: 'No data in cloud database' };
    }

    // Organize data by type
    const result = {
      lpr: null,
      metadata: null,
      cities: {},
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
      } else if (doc.type === 'city') {
        result.cities[doc.name] = {
          level: doc.level,
          name: doc.name,
          fundLimit: doc.fundLimit,
          commercialRate: doc.commercialRate,
          fundRate: doc.fundRate,
          downPayment: doc.downPayment,
          purchaseRestriction: doc.purchaseRestriction,
          fundForeign: doc.fundForeign,
        };
      }
    });

    return { success: true, data: result };
  } catch (err) {
    console.error('getLatestData error:', err);
    return { success: false, error: err.message };
  }
};
