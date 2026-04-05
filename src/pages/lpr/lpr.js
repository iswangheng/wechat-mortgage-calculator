// LPR rate tracking page
const DataService = require("../../services/data-service");
const {
  drawLineChart,
  initCanvas,
  COLORS,
} = require("../../utils/chart-utils");

// Historical LPR data for the past 12 months
const LPR_HISTORY = [
  { date: "2025-04", oneYear: 3.1, fiveYear: 3.6 },
  { date: "2025-05", oneYear: 3.0, fiveYear: 3.5 },
  { date: "2025-07", oneYear: 3.0, fiveYear: 3.5 },
  { date: "2025-10", oneYear: 3.0, fiveYear: 3.5 },
  { date: "2026-01", oneYear: 3.0, fiveYear: 3.5 },
  { date: "2026-03", oneYear: 3.0, fiveYear: 3.5 },
];

// LPR adjustment timeline records
const LPR_ADJUSTMENTS = [
  {
    date: "2026-03-20",
    change: "LPR保持不变",
    detail: "1年期3.00%，5年期3.50%，连续第10个月持平",
    impact: "无变化",
    direction: "flat",
  },
  {
    date: "2025-05-20",
    change: "双降：1年期-10BP，5年期-20BP",
    detail: "1年期3.10%→3.00%，5年期3.70%→3.50%",
    impact: "100万30年商贷月供减少约116元",
    direction: "down",
  },
  {
    date: "2025-04-21",
    change: "LPR保持不变",
    detail: "1年期3.10%，5年期3.70%，维持不变",
    impact: "无变化",
    direction: "flat",
  },
  {
    date: "2025-02-20",
    change: "5年期LPR下调25BP",
    detail: "5年期以上LPR从3.95%下调至3.70%",
    impact: "100万30年商贷月供减少约145元",
    direction: "down",
  },
];

Page({
  data: {
    // Current LPR rates (set dynamically in onLoad)
    oneYearLpr: 3.0,
    fiveYearLpr: 3.5,
    lastUpdate: "",
    dataSource: "中国人民银行",

    // Adjustment records
    adjustments: LPR_ADJUSTMENTS,

    // Impact simulator inputs
    loanAmount: 100,
    loanYears: 30,

    // Simulator results
    currentMonthly: "",
    down10Monthly: "",
    down10Save: "",
    down20Monthly: "",
    down20Save: "",
  },

  onLoad() {
    // Load latest LPR from DataService
    const lpr = DataService.getLPR();
    this.setData({
      oneYearLpr: lpr.oneYear,
      fiveYearLpr: lpr.fiveYear,
      lastUpdate: lpr.lastUpdate || "",
    });

    // Analytics: track LPR page view
    try {
      wx.reportAnalytics("page_view", { page: "lpr" });
    } catch (e) {
      /* ignore analytics error */
    }

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

    initCanvas("#lprChart", this)
      .then(({ canvas, ctx, width, height }) => {
        drawLineChart(
          canvas,
          ctx,
          {
            labels,
            datasets: [
              { label: "1年期LPR", data: oneYearData, color: "#1677FF" },
              { label: "5年期以上LPR", data: fiveYearData, color: "#f59e0b" },
            ],
          },
          {
            title: "LPR利率走势（近12个月）",
            width,
            height,
            showGrid: true,
            showLegend: true,
          },
        );
      })
      .catch((err) => {
        console.error("LPR chart error:", err);
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
      return (
        (principal * r * Math.pow(1 + r, months)) /
        (Math.pow(1 + r, months) - 1)
      );
    };

    const currentMonthly = calcMonthly(fiveYearLpr);
    const down10Monthly = calcMonthly(fiveYearLpr - 0.1);
    const down20Monthly = calcMonthly(fiveYearLpr - 0.2);

    this.setData({
      currentMonthly: currentMonthly.toFixed(2),
      down10Monthly: down10Monthly.toFixed(2),
      down10Save: (currentMonthly - down10Monthly).toFixed(2),
      down10Rate: (fiveYearLpr - 0.1).toFixed(2),
      down20Monthly: down20Monthly.toFixed(2),
      down20Save: (currentMonthly - down20Monthly).toFixed(2),
      down20Rate: (fiveYearLpr - 0.2).toFixed(2),
    });
  },
});
