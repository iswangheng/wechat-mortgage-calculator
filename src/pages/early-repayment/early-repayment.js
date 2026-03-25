// 提前还款计算页面
const { calculateEarlyRepayment } = require('../../utils/mortgage-calculator');

Page({
  data: {
    // 原贷款信息
    originalPrincipal: '',    // 原贷款总额（万元）
    annualRate: 3.3,          // 年利率
    years: 30,                // 贷款年限
    method: '等额本息',       // 还款方式

    // 提前还款信息
    paidMonths: '',           // 已还月数
    earlyAmount: '',          // 提前还款金额（万元）
    afterMethod: 'reduceTerm', // 还款后处理方式：reduceTerm缩短年限 | reducePayment减少月供

    // 计算结果
    result: null,

    // Computed fields (updated via updateComputedData)
    paidYears: 0,
    paidMonthsRemain: 0,
    savedYears: 0,
    savedMonths: 0
  },

  onLoad() {
    this.updateComputedData();
  },

  // 更新计算字段
  updateComputedData() {
    const months = parseInt(this.data.paidMonths) || 0;
    const paidYears = Math.floor(months / 12);
    const paidMonthsRemain = months % 12;

    let savedYears = 0;
    let savedMonths = 0;
    if (this.data.result && this.data.result.afterEarlyPayment.savedMonths) {
      savedYears = Math.floor(this.data.result.afterEarlyPayment.savedMonths / 12);
      savedMonths = this.data.result.afterEarlyPayment.savedMonths % 12;
    }

    this.setData({
      paidYears,
      paidMonthsRemain,
      savedYears,
      savedMonths
    });
  },

  // 原贷款总额输入
  onOriginalPrincipalInput(e) {
    this.setData({
      originalPrincipal: e.detail.value,
      result: null
    });
  },

  // 年利率输入
  onAnnualRateInput(e) {
    this.setData({
      annualRate: e.detail.value,
      result: null
    });
  },

  // 贷款年限选择
  onYearsChange(e) {
    this.setData({
      years: parseInt(e.currentTarget.dataset.years),
      result: null
    });
  },

  // 还款方式选择
  onMethodChange(e) {
    this.setData({
      method: e.currentTarget.dataset.method,
      result: null
    });
  },

  // 已还月数输入
  onPaidMonthsInput(e) {
    this.setData({
      paidMonths: e.detail.value,
      result: null
    });
    this.updateComputedData();
  },

  // 提前还款金额输入
  onEarlyAmountInput(e) {
    this.setData({
      earlyAmount: e.detail.value,
      result: null
    });
  },

  // 还款后处理方式选择
  onAfterMethodChange(e) {
    this.setData({
      afterMethod: e.currentTarget.dataset.method,
      result: null
    });
  },

  // 计算节省
  onCalculate() {
    const {
      originalPrincipal,
      annualRate,
      years,
      method,
      paidMonths,
      earlyAmount,
      afterMethod
    } = this.data;

    // 验证输入
    if (!originalPrincipal || originalPrincipal <= 0) {
      wx.showToast({ title: '请输入原贷款总额', icon: 'none' });
      return;
    }

    if (!paidMonths || paidMonths <= 0) {
      wx.showToast({ title: '请输入已还月数', icon: 'none' });
      return;
    }

    if (!earlyAmount || earlyAmount <= 0) {
      wx.showToast({ title: '请输入提前还款金额', icon: 'none' });
      return;
    }

    const totalMonths = years * 12;
    if (parseInt(paidMonths) >= totalMonths) {
      wx.showToast({ title: '已还月数不能超过总月数', icon: 'none' });
      return;
    }

    try {
      const result = calculateEarlyRepayment({
        originalPrincipal: parseFloat(originalPrincipal),
        annualRate: parseFloat(annualRate),
        years: years,
        method: method,
        paidMonths: parseInt(paidMonths),
        earlyAmount: parseFloat(earlyAmount),
        afterMethod: afterMethod
      });

      // 格式化结果数据
      const formattedResult = {
        type: result.type,
        original: {
          principal: result.original.principal,
          monthlyPayment: this.formatNumber(result.original.monthlyPayment),
          totalPayment: this.formatNumber(result.original.totalPayment),
          totalInterest: this.formatNumber(result.original.totalInterest),
          years: result.original.years
        },
        afterEarlyPayment: {
          earlyAmount: result.afterEarlyPayment.earlyAmount,
          newPrincipal: result.afterEarlyPayment.newPrincipal,
          newYears: result.afterEarlyPayment.newYears,
          monthlyPayment: this.formatNumber(result.afterEarlyPayment.monthlyPayment),
          newTotalPayment: this.formatNumber(result.afterEarlyPayment.newTotalPayment),
          newTotalInterest: this.formatNumber(result.afterEarlyPayment.newTotalInterest),
          savedInterest: this.formatNumber(result.afterEarlyPayment.savedInterest),
          savedMonths: result.afterEarlyPayment.savedMonths || 0,
          reducedMonthly: result.afterEarlyPayment.reducedMonthly || 0
        }
      };

      this.setData({ result: formattedResult });
      this.updateComputedData();

      wx.showToast({ title: '计算完成', icon: 'success' });

    } catch (error) {
      console.error('计算错误:', error);
      wx.showToast({ title: '计算失败，请检查输入', icon: 'none' });
    }
  },

  // 重置
  onReset() {
    this.setData({
      originalPrincipal: '',
      paidMonths: '',
      earlyAmount: '',
      result: null
    });
    this.updateComputedData();
  },

  // 格式化数字（添加千分位）
  formatNumber(num) {
    if (!num && num !== 0) return '0';
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
});
