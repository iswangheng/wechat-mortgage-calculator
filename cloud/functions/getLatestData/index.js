// Cloud function: getLatestData
// Returns latest mortgage data (LPR, city configs, metadata) from cloud DB
// Uses pagination to handle 300+ documents (cloud DB limit: 100 per query)

const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const MAX_LIMIT = 100;

exports.main = async (event, context) => {
  try {
    const collection = db.collection('mortgage_config');

    // Get total count first
    const { total } = await collection.count();
    if (total === 0) {
      return { success: false, error: 'No data in cloud database' };
    }

    // Fetch all documents with pagination
    const batchCount = Math.ceil(total / MAX_LIMIT);
    const tasks = [];
    for (let i = 0; i < batchCount; i++) {
      tasks.push(
        collection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      );
    }
    const results = await Promise.all(tasks);
    const allData = results.reduce((acc, cur) => acc.concat(cur.data), []);

    // Organize data by type
    const result = {
      lpr: null,
      metadata: null,
      cities: {},
    };

    allData.forEach((doc) => {
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
