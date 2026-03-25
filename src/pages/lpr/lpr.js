// LPR rate tracking page
const { LPR_2026, getDataMetadata } = require('../../config/cities-2026');
const { drawLineChart, initCanvas, COLORS } = require('../../utils/chart-utils');

// Historical LPR data for the past 12 months
const LPR_HISTORY = [
  { date: '2025-04', oneYear: 3.65, fiveYear: 4.30 },
  { date: '2025-05', oneYear: 3.65, fiveYear: 4.30 },
  { date: '2025-07', oneYear: 3.55, fiveYear: 4.20 },
  { date: '2025-10', oneYear: 3.45, fiveYear: 4.00 },
  { date: '2026-01', oneYear: 3.45, fiveYear: 3.95 },
  { date: '2026-03', oneYear: 3.45, fiveYear: 3.95 },
];

// LPR adjustment timeline records
const LPR_ADJUSTMENTS = [
  {
    date: '2026-01-20',
    change: '5年期LPR下调5BP',
    detail: '5年期以上LPR从4.00%下调至3.95%',
    impact: '100万30年商贷月供减少约29元',
    direction: 'down'
  },
  {
    date: '2025-10-21',
    change: '双降：1年期-10BP，5年期-20BP',
    detail: '1年期3.55%->3.45%，5年期4.20%->4.00%',
    impact: '100万30年商贷月供减少约116元',
    direction: 'down'
  },
  {
    date: '2025-07-21',
    change: '双降：1年期-10BP，5年期-10BP',
    detail: '1年期3.65%->3.55%，5年期4.30%->4.20%',
    impact: '100万30年商贷月供减少约58元',
    direction: 'down'
  },
  {
    date: '2025-04-21',
    change: 'LPR保持不变',
    detail: '1年期3.65%，5年期4.30%，连续第二月持平',
    impact: '无变化',
    direction: 'flat'
  }
];

Page({
  data: {
    // Current LPR rates
    oneYearLpr: LPR_2026.oneYear,
    fiveYearLpr: LPR_2026.fiveYear,
    lastUpdate: LPR_2026.lastUpdate,
    dataSource: '中国人民银行',

    // Adjustment records
    adjustments: LPR_ADJUSTMENTS,

    // Impact simulator inputs
    loanAmount: 100,
    loanYears: 30,

    // Simulator results
    currentMonthly: '',
    down10Monthly: '',
    down10Save: '',
    down20Monthly: '',
    down20Save: ''
  },

  onLoad() {
    this.calculateImpact();
  },

  onReady() {
    // Draw LPR trend chart after page is ready
    setTimeout(() => {
      this.drawLprChart();
    }, 300);
  },

  // Draw LPR historical trend line chart
  drawLprChart() {
    const labels = LPR_HISTORY.map((item) => item.date.slice(2));
    const oneYearData = LPR_HISTORY.map((item) => item.oneYear);
    const fiveYearData = LPR_HISTORY.map((item) => item.fiveYear);

    initCanvas('#lprChart', this).then(({ canvas, ctx, width, height }) => {
      drawLineChart(canvas, ctx, {
        labels,
        datasets: [
          { label: '1年期LPR', data: oneYearData, color: '#1677FF' },
          { label: '5年期以上LPR', data: fiveYearData, color: '#f59e0b' }
        ]
      }, {
        title: 'LPR利率走势（近12个月）',
        width,
        height,
        showGrid: true,
        showLegend: true
      });
    }).catch((err) => {
      console.error('LPR chart error:', err);
    });
  },

  // Loan amount input handler
  onLoanAmountInput(e) {
    const val = parseFloat(e.detail.value);
    if (!isNaN(val) && val > 0) {
      this.setData({ loanAmount: val });
      this.calculateImpact();
    }
  },

  // Loan years change handler
  onLoanYearsChange(e) {
    const years = parseInt(e.currentTarget.dataset.years);
    this.setData({ loanYears: years });
    this.calculateImpact();
  },

  // Calculate monthly payment impact at different LPR levels
  calculateImpact() {
    const { loanAmount, loanYears, fiveYearLpr } = this.data;
    const principal = loanAmount * 10000;
    const months = loanYears * 12;

    const calcMonthly = (rate) => {
      const r = rate / 100 / 12;
      if (r === 0) return principal / months;
      return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    };

    const currentMonthly = calcMonthly(fiveYearLpr);
    const down10Monthly = calcMonthly(fiveYearLpr - 0.1);
    const down20Monthly = calcMonthly(fiveYearLpr - 0.2);

    this.setData({
      currentMonthly: currentMonthly.toFixed(2),
      down10Monthly: down10Monthly.toFixed(2),
      down10Save: (currentMonthly - down10Monthly).toFixed(2),
      down20Monthly: down20Monthly.toFixed(2),
      down20Save: (currentMonthly - down20Monthly).toFixed(2)
    });
  }
});
