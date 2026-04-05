#!/usr/bin/env node
// Database initialization script
// Converts cities-2026.js config to JSON for cloud database import
//
// Usage:
//   node cloud/database/init-data.js
//
// Output:
//   cloud/database/mortgage_config.json (ready for cloud DB import)

const fs = require('fs');
const path = require('path');

// Load the local config (use require with absolute path)
const configPath = path.resolve(__dirname, '../../src/config/cities-2026.js');
const config = require(configPath);

const documents = [];

// 1. LPR rates document
documents.push({
  _id: 'lpr_rates',
  type: 'lpr',
  oneYear: config.LPR_2026.oneYear,
  fiveYear: config.LPR_2026.fiveYear,
  lastUpdate: config.LPR_2026.lastUpdate,
  dataSource: config.LPR_2026.dataSource,
  updatedBy: 'manual',
});

// 2. Metadata document
const metadata = config.DATA_METADATA;
documents.push({
  _id: 'metadata',
  type: 'metadata',
  version: metadata.version,
  lastUpdate: metadata.lastUpdate,
  nextScheduledUpdate: metadata.nextScheduledUpdate,
  cityCount: metadata.cityCount,
  coverageProvinces: metadata.coverageProvinces,
  dataSource: metadata.dataSource,
});

// 3. City config documents
const cityConfigs = config.CITY_CONFIG_2026;
Object.keys(cityConfigs).forEach((cityName) => {
  const city = cityConfigs[cityName];
  documents.push({
    _id: `city_${cityName}`,
    type: 'city',
    name: city.name || cityName,
    level: city.level,
    fundLimit: city.fundLimit,
    commercialRate: city.commercialRate,
    fundRate: city.fundRate,
    downPayment: city.downPayment,
    purchaseRestriction: city.purchaseRestriction,
    fundForeign: city.fundForeign,
  });
});

// Write output JSON (one JSON object per line, cloud DB import format)
const outputPath = path.resolve(__dirname, 'mortgage_config.json');
const lines = documents.map((doc) => JSON.stringify(doc));
fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');

console.log(`Generated ${documents.length} documents:`);
console.log(`  - 1 LPR rates`);
console.log(`  - 1 metadata`);
console.log(`  - ${documents.length - 2} city configs`);
console.log(`Output: ${outputPath}`);
console.log('\nImport steps:');
console.log('1. Open WeChat Developer Tools → Cloud Development Console');
console.log('2. Go to Database → Create collection "mortgage_config"');
console.log('3. Click Import → Select mortgage_config.json → Confirm');
