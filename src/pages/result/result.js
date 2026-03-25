// \u8fd8\u6b3e\u660e\u7ec6\u9875\u9762
const {
  calculateCommercialLoan,
  calculateFundLoan,
  calculateCombinationLoan,
} = require("../../utils/mortgage-calculator");
const {
  drawPieChart,
  drawLineChart,
  drawBarChart,
  initCanvas,
} = require("../../utils/chart-utils");

Page({
  data: {
    cityName: "",
    loanType: "",
    loanTypeName: "",
    method: "",
    years: 0,
    result: null,

    // Repayment schedule
    schedule: [],
    displaySchedule: [],
    showFullSchedule: false,

    // Annual rate from calculation input
    annualRate: 0,

    // Statistics
    monthlyDecrease: 0,
    totalPrincipalPaid: 0,
    totalInterestPaid: 0,
  },

  onLoad() {
    const app = getApp();
    const calcResult = app.globalData.calculationResult;

    if (!calcResult) {
      wx.showToast({
        title: "\u6570\u636e\u52a0\u8f7d\u5931\u8d25",
        icon: "none",
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
      return;
    }

    // Set basic info
    const loanTypeNames = {
      commercial: "\u5546\u4e1a\u8d37\u6b3e",
      fund: "\u516c\u79ef\u91d1\u8d37\u6b3e",
      combination: "\u7ec4\u5408\u8d37\u6b3e",
    };

    this.setData({
      cityName: calcResult.cityName,
      loanType: calcResult.loanType,
      loanTypeName: loanTypeNames[calcResult.loanType],
      method: calcResult.method,
      years: calcResult.years,
      annualRate: calcResult.annualRate || 0,
      result: calcResult.result,
    });

    // Generate repayment schedule
    this.generateSchedule();
  },

  onReady() {
    // Draw charts after page is ready
    setTimeout(() => {
      this.drawAllCharts();
    }, 300);
  },

  // Draw all three charts
  drawAllCharts() {
    const { result, schedule, method, years } = this.data;
    if (!result || !schedule || schedule.length === 0) return;

    this.drawInterestPieChart();
    this.drawPaymentTrendChart();
    this.drawCumulativeBarChart();
  },

  // Chart 1: Interest ratio pie chart
  drawInterestPieChart() {
    const { result } = this.data;
    const principal = parseFloat(result.principal.replace(/,/g, ""));
    const totalInterest = parseFloat(result.totalInterest.replace(/,/g, ""));
    const totalPayment = parseFloat(result.totalPayment.replace(/,/g, ""));

    initCanvas("#pieCanvas", this)
      .then(({ canvas, ctx, width, height }) => {
        const pieData = [
          { label: "\u672c\u91d1", value: principal, color: "#1677FF" },
          { label: "\u5229\u606f", value: totalInterest, color: "#f59e0b" },
        ];

        drawPieChart(canvas, ctx, pieData, {
          title: "\u672c\u91d1 vs \u5229\u606f\u5360\u6bd4",
          width,
          height,
          showLegend: true,
          centerText: "\u00a5" + (totalPayment / 10000).toFixed(1) + "\u4e07",
          centerSubText: "\u8fd8\u6b3e\u603b\u989d",
        });
      })
      .catch((err) => {
        console.error("Pie chart error:", err);
      });
  },

  // Chart 2: Monthly payment trend (line chart)
  drawPaymentTrendChart() {
    const { schedule, years } = this.data;
    const totalMonths = years * 12;

    // Pick key month nodes for X axis
    const keyMonths = this.getKeyMonths(totalMonths);
    const labels = keyMonths.map((m) => m + "\u6708");

    // Extract principal and interest data at key months
    const principalData = keyMonths.map((m) =>
      parseFloat(schedule[m - 1].principal),
    );
    const interestData = keyMonths.map((m) =>
      parseFloat(schedule[m - 1].interest),
    );

    initCanvas("#lineCanvas", this)
      .then(({ canvas, ctx, width, height }) => {
        drawLineChart(
          canvas,
          ctx,
          {
            labels,
            datasets: [
              {
                label: "\u6bcf\u6708\u8fd8\u672c\u91d1",
                data: principalData,
                color: "#1677FF",
              },
              {
                label: "\u6bcf\u6708\u8fd8\u5229\u606f",
                data: interestData,
                color: "#f59e0b",
              },
            ],
          },
          {
            title: "\u6708\u4f9b\u6784\u6210\u8d8b\u52bf",
            width,
            height,
            showGrid: true,
            showLegend: true,
          },
        );
      })
      .catch((err) => {
        console.error("Line chart error:", err);
      });
  },

  // Chart 3: Cumulative repayment bar chart
  drawCumulativeBarChart() {
    const { schedule, result } = this.data;
    const principal = parseFloat(result.principal.replace(/,/g, ""));
    const totalMonths = schedule.length;

    // Calculate cumulative values at 3 time points
    const timePoints = [
      Math.floor(totalMonths / 4),
      Math.floor(totalMonths / 2),
      totalMonths,
    ];

    const labels = timePoints.map((m) => "\u7b2c" + m + "\u6708");
    const cumulativePrincipal = [];
    const cumulativeInterest = [];
    const remainingPrincipal = [];

    timePoints.forEach((monthIdx) => {
      let paidP = 0;
      let paidI = 0;
      for (let i = 0; i < monthIdx; i++) {
        paidP += parseFloat(schedule[i].principal);
        paidI += parseFloat(schedule[i].interest);
      }
      cumulativePrincipal.push(Math.round(paidP));
      cumulativeInterest.push(Math.round(paidI));
      remainingPrincipal.push(Math.round(principal - paidP));
    });

    initCanvas("#barCanvas", this)
      .then(({ canvas, ctx, width, height }) => {
        drawBarChart(
          canvas,
          ctx,
          {
            labels,
            datasets: [
              {
                label: "\u5df2\u8fd8\u672c\u91d1",
                data: cumulativePrincipal,
                color: "#1677FF",
              },
              {
                label: "\u5df2\u8fd8\u5229\u606f",
                data: cumulativeInterest,
                color: "#f59e0b",
              },
              {
                label: "\u5269\u4f59\u672c\u91d1",
                data: remainingPrincipal,
                color: "#0052D9",
              },
            ],
          },
          {
            title: "\u7d2f\u8ba1\u8fd8\u6b3e\u5bf9\u6bd4",
            width,
            height,
            showGrid: true,
            showLegend: true,
            showValues: true,
          },
        );
      })
      .catch((err) => {
        console.error("Bar chart error:", err);
      });
  },

  // Get key month indices for chart X axis
  getKeyMonths(totalMonths) {
    if (totalMonths <= 12) {
      return Array.from({ length: totalMonths }, (_, i) => i + 1);
    }

    const months = [1];
    const step = Math.floor(totalMonths / 6);
    for (let i = 1; i <= 5; i++) {
      const m = i * step;
      if (m < totalMonths) months.push(m);
    }
    months.push(totalMonths);
    return months;
  },

  // Generate repayment schedule
  generateSchedule() {
    const { result, method, years } = this.data;
    const totalMonths = years * 12;
    const schedule = [];

    // Parse principal from formatted string
    const principal = parseFloat(result.principal.replace(/,/g, ""));
    const totalInterest = parseFloat(result.totalInterest.replace(/,/g, ""));

    if (method === "\u7b49\u989d\u672c\u606f") {
      const monthlyPayment = parseFloat(
        result.monthlyPayment.replace(/,/g, ""),
      );
      // Use actual annual rate passed from index page instead of binary search approximation
      const monthlyRate =
        this.data.annualRate > 0
          ? this.data.annualRate / 100 / 12
          : this.calculateMonthlyRate(principal, monthlyPayment, totalMonths);

      let balance = principal;

      for (let period = 1; period <= totalMonths; period++) {
        const interest = balance * monthlyRate;
        const principalPaid = monthlyPayment - interest;
        balance -= principalPaid;

        schedule.push({
          period,
          payment: monthlyPayment.toFixed(2),
          principal: principalPaid.toFixed(2),
          interest: interest.toFixed(2),
          balance: Math.max(0, balance).toFixed(2),
        });
      }
    } else {
      // Equal principal: use actual annual rate from calculation input
      const monthlyPrincipal = principal / totalMonths;
      const monthlyRate = this.data.annualRate / 100 / 12;

      let balance = principal;

      for (let period = 1; period <= totalMonths; period++) {
        const interest = balance * monthlyRate;
        const payment = monthlyPrincipal + interest;
        balance -= monthlyPrincipal;

        schedule.push({
          period,
          payment: payment.toFixed(2),
          principal: monthlyPrincipal.toFixed(2),
          interest: interest.toFixed(2),
          balance: Math.max(0, balance).toFixed(2),
        });
      }

      // Calculate monthly decrease
      const firstPayment = parseFloat(schedule[0].payment);
      const lastPayment = parseFloat(schedule[totalMonths - 1].payment);
      const monthlyDecrease = (
        (firstPayment - lastPayment) /
        totalMonths
      ).toFixed(2);
      this.setData({ monthlyDecrease });
    }

    this.setData({
      schedule,
      displaySchedule: schedule.slice(0, 12),
    });

    this.updateStatistics();
  },

  // Approximate monthly rate using binary search
  calculateMonthlyRate(principal, monthlyPayment, totalMonths) {
    let low = 0;
    let high = 0.1;
    let rate = (low + high) / 2;

    for (let i = 0; i < 50; i++) {
      const calculated =
        (principal * (rate * Math.pow(1 + rate, totalMonths))) /
        (Math.pow(1 + rate, totalMonths) - 1);

      if (Math.abs(calculated - monthlyPayment) < 0.01) {
        break;
      }

      if (calculated > monthlyPayment) {
        high = rate;
      } else {
        low = rate;
      }

      rate = (low + high) / 2;
    }

    return rate;
  },

  // Update statistics
  updateStatistics() {
    const { displaySchedule } = this.data;

    const totalPrincipalPaid = displaySchedule
      .reduce((sum, item) => sum + parseFloat(item.principal), 0)
      .toFixed(2);

    const totalInterestPaid = displaySchedule
      .reduce((sum, item) => sum + parseFloat(item.interest), 0)
      .toFixed(2);

    this.setData({
      totalPrincipalPaid,
      totalInterestPaid,
    });
  },

  // Toggle full/partial schedule display
  onToggleSchedule() {
    const { showFullSchedule, schedule } = this.data;

    if (showFullSchedule) {
      this.setData({
        showFullSchedule: false,
        displaySchedule: schedule.slice(0, 12),
      });
    } else {
      this.setData({
        showFullSchedule: true,
        displaySchedule: schedule,
      });
    }

    this.updateStatistics();
  },

  // Navigate to compare page (tab page, must use switchTab)
  onGoToCompare() {
    wx.switchTab({
      url: "/pages/compare/compare",
    });
  },

  // Navigate to early repayment page (tab page, must use switchTab)
  onGoToEarlyRepayment() {
    wx.switchTab({
      url: "/pages/early-repayment/early-repayment",
    });
  },

  // Save calculation result as image to photo album
  onSaveImage() {
    wx.showLoading({ title: "生成图片中..." });

    const query = wx.createSelectorQuery().in(this);
    query
      .select("#shareCanvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0] || !res[0].node) {
          wx.hideLoading();
          wx.showToast({ title: "生成失败", icon: "none" });
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext("2d");
        const dpr = wx.getSystemInfoSync().pixelRatio;
        const W = 600;
        const H = 800;

        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.scale(dpr, dpr);

        this.drawShareCard(ctx, W, H);

        // Export to temp file then save
        setTimeout(() => {
          wx.canvasToTempFilePath({
            canvas,
            width: W * dpr,
            height: H * dpr,
            destWidth: W * dpr,
            destHeight: H * dpr,
            fileType: "png",
            success: (tempRes) => {
              wx.hideLoading();
              // Analytics: track save image
              try {
                wx.reportAnalytics("save_image", { page: "result" });
              } catch (e) {
                /* ignore analytics error */
              }
              this.saveToAlbum(tempRes.tempFilePath);
            },
            fail: () => {
              wx.hideLoading();
              wx.showToast({ title: "生成图片失败", icon: "none" });
            },
          });
        }, 200);
      });
  },

  // Draw the share card on canvas
  drawShareCard(ctx, W, H) {
    const { result, cityName, loanTypeName, method, years } = this.data;

    // Background
    ctx.fillStyle = "#f5f7fa";
    ctx.fillRect(0, 0, W, H);

    // Top gradient header
    const gradient = ctx.createLinearGradient(0, 0, W, 160);
    gradient.addColorStop(0, "#1677FF");
    gradient.addColorStop(1, "#0052D9");
    ctx.fillStyle = gradient;
    this.roundRectPath(ctx, 0, 0, W, 180, 0);
    ctx.fill();

    // Title text
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("房贷计算结果", W / 2, 60);

    // Subtitle: city + loan type
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText(cityName + " · " + loanTypeName + " · " + method, W / 2, 95);

    // Date
    const today = new Date();
    const dateStr =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText("生成日期: " + dateStr, W / 2, 125);

    // White content card
    this.roundRectPath(ctx, 30, 160, W - 60, 460, 16);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#e9ecef";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Monthly payment (main highlight)
    const monthlyLabel = method === "等额本息" ? "月供金额" : "首月月供";
    const monthlyValue =
      method === "等额本息" ? result.monthlyPayment : result.firstMonthPayment;

    ctx.font = "15px sans-serif";
    ctx.fillStyle = "#999999";
    ctx.textAlign = "center";
    ctx.fillText(monthlyLabel, W / 2, 210);

    ctx.font = "bold 40px sans-serif";
    ctx.fillStyle = "#1677FF";
    ctx.fillText("\u00A5" + monthlyValue, W / 2, 265);

    // Divider
    ctx.beginPath();
    ctx.moveTo(60, 295);
    ctx.lineTo(W - 60, 295);
    ctx.strokeStyle = "#f0f0f0";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Data grid: 2x2 layout
    const gridData = [
      { label: "贷款总额", value: "\u00A5" + result.principal },
      { label: "还款年限", value: years + "年" },
      { label: "支付利息", value: "\u00A5" + result.totalInterest },
      { label: "还款总额", value: "\u00A5" + result.totalPayment },
    ];

    const colW = (W - 60) / 2;
    gridData.forEach((item, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 30 + col * colW + colW / 2;
      const y = 330 + row * 100;

      ctx.font = "13px sans-serif";
      ctx.fillStyle = "#999999";
      ctx.textAlign = "center";
      ctx.fillText(item.label, x, y);

      ctx.font = "bold 20px sans-serif";
      ctx.fillStyle = "#333333";
      ctx.fillText(item.value, x, y + 30);
    });

    // Last month payment for equal principal method
    if (method === "等额本金" && result.lastMonthPayment) {
      ctx.font = "13px sans-serif";
      ctx.fillStyle = "#999999";
      ctx.textAlign = "center";
      ctx.fillText("末月月供: \u00A5" + result.lastMonthPayment, W / 2, 560);
    }

    // Bottom section: app info
    ctx.fillStyle = "#f8f9fa";
    this.roundRectPath(ctx, 30, 640, W - 60, 80, 12);
    ctx.fill();

    ctx.font = "bold 15px sans-serif";
    ctx.fillStyle = "#1677FF";
    ctx.textAlign = "center";
    ctx.fillText("房贷计算器 2026", W / 2, 670);

    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#999999";
    ctx.fillText("长按识别查看详情", W / 2, 698);

    // Watermark disclaimer
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "#cccccc";
    ctx.textAlign = "center";
    ctx.fillText("仅供参考，不构成投资建议", W / 2, 770);
  },

  // Helper: draw rounded rectangle path
  roundRectPath(ctx, x, y, w, h, r) {
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
  },

  // Save temp file to photo album with permission handling
  saveToAlbum(tempFilePath) {
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath,
      success: () => {
        wx.showToast({ title: "已保存到相册", icon: "success" });
      },
      fail: (err) => {
        if (
          err.errMsg.indexOf("auth deny") !== -1 ||
          err.errMsg.indexOf("authorize") !== -1
        ) {
          // Permission denied, guide user to settings
          wx.showModal({
            title: "需要相册权限",
            content: "请在设置中允许访问相册，以便保存图片",
            confirmText: "去设置",
            success: (modalRes) => {
              if (modalRes.confirm) {
                wx.openSetting();
              }
            },
          });
        } else {
          wx.showToast({ title: "保存失败", icon: "none" });
        }
      },
    });
  },
});
