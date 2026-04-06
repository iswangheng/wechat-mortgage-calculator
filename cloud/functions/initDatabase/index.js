// Cloud function: initDatabase
// One-time function to populate mortgage_config collection
// Deploy this, run it once via cloud console, then you can delete it

const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const allDocs = require('./data');

exports.main = async (event, context) => {
  const collName = 'mortgage_config';
  let success = 0;
  let failed = 0;
  const errors = [];

  // Process in batches of 20 (cloud DB limit)
  for (let i = 0; i < allDocs.length; i++) {
    const doc = allDocs[i];
    try {
      const docId = doc._id;
      const data = { ...doc };
      delete data._id;

      await db.collection(collName).doc(docId).set({ data });
      success++;
    } catch (e) {
      failed++;
      errors.push({ id: doc._id, error: e.message });
    }

    // Log progress every 50 docs
    if ((i + 1) % 50 === 0) {
      console.log(`Progress: ${i + 1}/${allDocs.length}`);
    }
  }

  console.log(`Done: ${success} success, ${failed} failed`);
  return {
    total: allDocs.length,
    success,
    failed,
    errors: errors.slice(0, 10), // Only return first 10 errors
  };
};
