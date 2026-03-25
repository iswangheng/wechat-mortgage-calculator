// Chart drawing utilities for WeChat Mini Program Canvas 2D API
// Provides: pie chart, line chart, bar chart

const COLORS = {
  primary: '#667eea',
  primaryLight: '#8b9cf7',
  secondary: '#764ba2',
  orange: '#f59e0b',
  orangeLight: '#fbbf24',
  red: '#f5576c',
  green: '#43e97b',
  grey: '#e9ecef',
  greyDark: '#999999',
  text: '#333333',
  textLight: '#666666',
  white: '#ffffff',
  background: '#f8f9fa'
};

const DEFAULT_PIE_COLORS = [COLORS.primary, COLORS.orange, COLORS.red, COLORS.green, COLORS.secondary];
const DEFAULT_LINE_COLORS = [COLORS.primary, COLORS.orange, COLORS.red, COLORS.green];
const DEFAULT_BAR_COLORS = [COLORS.primary, COLORS.orange, COLORS.secondary, COLORS.green];

/**
 * Draw a pie chart with labels and legend
 * @param {object} canvas - Canvas node
 * @param {object} ctx - Canvas 2D context
 * @param {Array} data - [{label, value, color}]
 * @param {object} options - {title, width, height, showLegend, centerText}
 */
function drawPieChart(canvas, ctx, data, options = {}) {
  const {
    title = '',
    width = 350,
    height = 300,
    showLegend = true,
    centerText = '',
    centerSubText = '',
    colors = DEFAULT_PIE_COLORS
  } = options;

  ctx.clearRect(0, 0, width, height);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return;

  const titleHeight = title ? 40 : 0;
  const legendHeight = showLegend ? data.length * 28 + 10 : 0;
  const availableHeight = height - titleHeight - legendHeight;
  const centerX = width / 2;
  const centerY = titleHeight + availableHeight / 2;
  const radius = Math.min(availableHeight / 2 - 10, width / 2 - 60);
  const innerRadius = radius * 0.55;

  // Draw title
  if (title) {
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = COLORS.text;
    ctx.textAlign = 'center';
    ctx.fillText(title, centerX, 24);
  }

  // Draw pie slices
  let startAngle = -Math.PI / 2;

  data.forEach((item, index) => {
    const sliceAngle = (item.value / total) * Math.PI * 2;
    const endAngle = startAngle + sliceAngle;
    const color = item.color || colors[index % colors.length];

    ctx.beginPath();
    ctx.moveTo(
      centerX + innerRadius * Math.cos(startAngle),
      centerY + innerRadius * Math.sin(startAngle)
    );
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // Draw percentage label outside
    if (item.value / total > 0.05) {
      const midAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius + 18;
      const labelX = centerX + labelRadius * Math.cos(midAngle);
      const labelY = centerY + labelRadius * Math.sin(midAngle);
      const percentage = ((item.value / total) * 100).toFixed(1) + '%';

      ctx.font = '11px sans-serif';
      ctx.fillStyle = COLORS.textLight;
      ctx.textAlign = midAngle > Math.PI / 2 && midAngle < Math.PI * 1.5 ? 'right' : 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(percentage, labelX, labelY);
    }

    startAngle = endAngle;
  });

  // Draw center text
  if (centerText) {
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = COLORS.text;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(centerText, centerX, centerY - 8);
  }
  if (centerSubText) {
    ctx.font = '11px sans-serif';
    ctx.fillStyle = COLORS.greyDark;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(centerSubText, centerX, centerY + 10);
  }

  // Draw legend
  if (showLegend) {
    const legendY = height - legendHeight + 10;
    const legendStartX = width / 2 - (data.length * 80) / 2;

    data.forEach((item, index) => {
      const x = legendStartX + index * (width / data.length);
      const y = legendY;
      const color = item.color || colors[index % colors.length];

      ctx.beginPath();
      ctx.arc(x + 6, y + 6, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.font = '11px sans-serif';
      ctx.fillStyle = COLORS.textLight;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.label, x + 16, y + 6);
    });
  }
}

/**
 * Draw a line chart with grid lines
 * @param {object} canvas - Canvas node
 * @param {object} ctx - Canvas 2D context
 * @param {object} data - {labels: [], datasets: [{label, data: [], color}]}
 * @param {object} options - {title, width, height, showGrid, showLegend}
 */
function drawLineChart(canvas, ctx, data, options = {}) {
  const {
    title = '',
    width = 350,
    height = 280,
    showGrid = true,
    showLegend = true,
    yAxisLabel = '',
    colors = DEFAULT_LINE_COLORS
  } = options;

  ctx.clearRect(0, 0, width, height);

  const { labels, datasets } = data;
  if (!labels || !datasets || datasets.length === 0) return;

  // Layout
  const titleHeight = title ? 36 : 0;
  const legendHeight = showLegend ? 30 : 0;
  const padding = { top: titleHeight + 10, right: 20, bottom: 40 + legendHeight, left: 55 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Draw title
  if (title) {
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = COLORS.text;
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 24);
  }

  // Calculate Y axis range
  let yMin = Infinity;
  let yMax = -Infinity;
  datasets.forEach((ds) => {
    ds.data.forEach((v) => {
      if (v < yMin) yMin = v;
      if (v > yMax) yMax = v;
    });
  });

  const yRange = yMax - yMin || 1;
  yMin = Math.max(0, yMin - yRange * 0.1);
  yMax = yMax + yRange * 0.1;

  const toX = (index) => padding.left + (index / (labels.length - 1)) * chartWidth;
  const toY = (value) => padding.top + chartHeight - ((value - yMin) / (yMax - yMin)) * chartHeight;

  // Draw grid lines
  if (showGrid) {
    const gridLines = 5;
    ctx.strokeStyle = COLORS.grey;
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (i / gridLines) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();

      const value = yMax - (i / gridLines) * (yMax - yMin);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = COLORS.greyDark;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(formatNumber(value), padding.left - 8, y);
    }
  }

  // Draw X axis labels
  ctx.font = '10px sans-serif';
  ctx.fillStyle = COLORS.greyDark;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  labels.forEach((label, index) => {
    const x = toX(index);
    ctx.fillText(label, x, padding.top + chartHeight + 8);
  });

  // Draw axes
  ctx.strokeStyle = COLORS.greyDark;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, padding.top + chartHeight);
  ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
  ctx.stroke();

  // Draw data lines
  datasets.forEach((ds, dsIndex) => {
    const color = ds.color || colors[dsIndex % colors.length];

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ds.data.forEach((value, index) => {
      const x = toX(index);
      const y = toY(value);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw area fill
    ctx.beginPath();
    ctx.fillStyle = hexToRgba(color, 0.08);
    ds.data.forEach((value, index) => {
      const x = toX(index);
      const y = toY(value);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.lineTo(toX(ds.data.length - 1), padding.top + chartHeight);
    ctx.lineTo(toX(0), padding.top + chartHeight);
    ctx.closePath();
    ctx.fill();

    // Draw data points
    ds.data.forEach((value, index) => {
      const x = toX(index);
      const y = toY(value);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.white;
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  });

  // Draw legend
  if (showLegend && datasets.length > 1) {
    const legendY = height - legendHeight + 8;
    let totalLegendWidth = 0;
    datasets.forEach((ds) => {
      totalLegendWidth += measureTextWidth(ctx, ds.label, '11px sans-serif') + 42;
    });
    let legendX = (width - totalLegendWidth) / 2;

    datasets.forEach((ds, index) => {
      const color = ds.color || colors[index % colors.length];

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.moveTo(legendX, legendY + 6);
      ctx.lineTo(legendX + 16, legendY + 6);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(legendX + 8, legendY + 6, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.font = '11px sans-serif';
      ctx.fillStyle = COLORS.textLight;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(ds.label, legendX + 22, legendY + 6);

      legendX += measureTextWidth(ctx, ds.label, '11px sans-serif') + 42;
    });
  }
}

/**
 * Draw a bar chart
 * @param {object} canvas - Canvas node
 * @param {object} ctx - Canvas 2D context
 * @param {object} data - {labels: [], datasets: [{label, data: [], color}]}
 * @param {object} options - {title, width, height, showGrid, showLegend, showValues}
 */
function drawBarChart(canvas, ctx, data, options = {}) {
  const {
    title = '',
    width = 350,
    height = 280,
    showGrid = true,
    showLegend = true,
    showValues = true,
    colors = DEFAULT_BAR_COLORS
  } = options;

  ctx.clearRect(0, 0, width, height);

  const { labels, datasets } = data;
  if (!labels || !datasets || datasets.length === 0) return;

  const titleHeight = title ? 36 : 0;
  const legendHeight = showLegend ? 30 : 0;
  const padding = { top: titleHeight + 10, right: 20, bottom: 40 + legendHeight, left: 55 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Draw title
  if (title) {
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = COLORS.text;
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 24);
  }

  // Calculate Y axis range
  let yMax = 0;
  datasets.forEach((ds) => {
    ds.data.forEach((v) => {
      if (v > yMax) yMax = v;
    });
  });
  yMax = yMax * 1.15;

  const toY = (value) => padding.top + chartHeight - (value / yMax) * chartHeight;

  // Draw grid lines
  if (showGrid) {
    const gridLines = 5;
    ctx.strokeStyle = COLORS.grey;
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (i / gridLines) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();

      const value = yMax - (i / gridLines) * yMax;
      ctx.font = '10px sans-serif';
      ctx.fillStyle = COLORS.greyDark;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(formatNumber(value), padding.left - 8, y);
    }
  }

  // Draw axes
  ctx.strokeStyle = COLORS.greyDark;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, padding.top + chartHeight);
  ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
  ctx.stroke();

  // Draw bars
  const groupCount = labels.length;
  const dsCount = datasets.length;
  const groupWidth = chartWidth / groupCount;
  const barPadding = groupWidth * 0.2;
  const barGroupWidth = groupWidth - barPadding * 2;
  const barWidth = barGroupWidth / dsCount - 2;

  labels.forEach((label, groupIndex) => {
    const groupX = padding.left + groupIndex * groupWidth;

    datasets.forEach((ds, dsIndex) => {
      const color = ds.color || colors[dsIndex % colors.length];
      const value = ds.data[groupIndex];
      const barX = groupX + barPadding + dsIndex * (barWidth + 2);
      const barY = toY(value);

      // Draw bar with rounded top corners
      const cornerRadius = Math.min(4, barWidth / 2);
      ctx.beginPath();
      ctx.moveTo(barX, padding.top + chartHeight);
      ctx.lineTo(barX, barY + cornerRadius);
      ctx.quadraticCurveTo(barX, barY, barX + cornerRadius, barY);
      ctx.lineTo(barX + barWidth - cornerRadius, barY);
      ctx.quadraticCurveTo(barX + barWidth, barY, barX + barWidth, barY + cornerRadius);
      ctx.lineTo(barX + barWidth, padding.top + chartHeight);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Draw value on top
      if (showValues && value > 0) {
        ctx.font = '9px sans-serif';
        ctx.fillStyle = COLORS.textLight;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(formatNumber(value), barX + barWidth / 2, barY - 4);
      }
    });

    // X axis label
    ctx.font = '10px sans-serif';
    ctx.fillStyle = COLORS.greyDark;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(label, groupX + groupWidth / 2, padding.top + chartHeight + 8);
  });

  // Draw legend
  if (showLegend && datasets.length > 1) {
    const legendY = height - legendHeight + 8;
    let totalLegendWidth = 0;
    datasets.forEach((ds) => {
      totalLegendWidth += measureTextWidth(ctx, ds.label, '11px sans-serif') + 38;
    });
    let legendX = (width - totalLegendWidth) / 2;

    datasets.forEach((ds, index) => {
      const color = ds.color || colors[index % colors.length];

      ctx.fillStyle = color;
      roundRect(ctx, legendX, legendY, 12, 12, 2);
      ctx.fill();

      ctx.font = '11px sans-serif';
      ctx.fillStyle = COLORS.textLight;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(ds.label, legendX + 18, legendY + 6);

      legendX += measureTextWidth(ctx, ds.label, '11px sans-serif') + 38;
    });
  }
}

// --- Helper functions ---

/**
 * Format large numbers for display
 * @param {number} num
 * @returns {string}
 */
function formatNumber(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '\u4E07';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return Math.round(num).toString();
}

/**
 * Convert hex color to rgba string
 * @param {string} hex
 * @param {number} alpha
 * @returns {string}
 */
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
}

/**
 * Draw a rounded rectangle path
 */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Measure text width using canvas context
 * @param {object} ctx
 * @param {string} text
 * @param {string} font
 * @returns {number}
 */
function measureTextWidth(ctx, text, font) {
  const prevFont = ctx.font;
  ctx.font = font;
  const width = ctx.measureText(text).width;
  ctx.font = prevFont;
  return width;
}

/**
 * Initialize a Canvas 2D node and return canvas + context
 * Handles DPR scaling automatically
 * @param {string} selector - Canvas element selector
 * @param {object} component - Page or Component instance (this)
 * @returns {Promise<{canvas, ctx, width, height}>}
 */
function initCanvas(selector, component) {
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery().in(component);
    query.select(selector)
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0] || !res[0].node) {
          reject(new Error('Canvas node not found: ' + selector));
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;
        const width = res[0].width;
        const height = res[0].height;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        resolve({ canvas, ctx, width, height });
      });
  });
}

module.exports = {
  drawPieChart,
  drawLineChart,
  drawBarChart,
  initCanvas,
  COLORS: COLORS
};
