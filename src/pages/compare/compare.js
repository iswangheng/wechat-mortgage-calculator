// 还款方式对比页面
const { comparePaymentMethods } = require('../../utils/mortgage-calculator');
const { getCityConfig } = require('../../config/cities-2026');

Page({
  data: {
    cityName: '上海',
    principal: '',      // 贷款本金（万元）
    annualRate: 3.3,    // 年利率
    years: 30,          // 贷款年限
    loanType: 'commercial', // 贷款类型
    comparison: null    // 对比结果
  },

  onLoad() {
    const cityConfig = getCityConfig(this.data.cityName);
    this.setData({
      annualRate: cityConfig.commercialRate.first
    });
  },

  onShow() {
    // 获取上次选择的城市
    const app = getApp();
    if (app.globalData.selectedCity) {
      const cityConfig = getCityConfig(app.globalData.selectedCity);
      this.setData({
        cityName: app.globalData.selectedCity,
        annualRate: cityConfig.commercialRate.first
      });
    }
  },

  // 城市选择
  onCitySelect() {
    wx.navigateTo({
      url: '/pages/city-select/city-select'
    });
  },

  // 贷款类型切换
  onLoanTypeChange(e) {
    const loanType = e.currentTarget.dataset.type;
    const cityConfig = getCityConfig(this.data.cityName);

    let annualRate;
    if (loanType === 'commercial') {
      annualRate = cityConfig.commercialRate.first;
    } else if (loanType === 'fund') {
      annualRate = cityConfig.fundRate.first;
    }

    this.setData({
      loanType,
      annualRate,
      comparison: null
    });
  },

  // 贷款金额输入
  onPrincipalInput(e) {
    this.setData({
      principal: e.detail.value,
      comparison: null
    });
  },

  // 贷款利率输入
  onRateInput(e) {
    this.setData({
      annualRate: e.detail.value,
      comparison: null
    });
  },

  // 贷款年限切换
  onYearsChange(e) {
    this.setData({
      years: parseInt(e.currentTarget.dataset.years),
      comparison: null
    });
  },

  // 开始对比
  onCompare() {
    const { principal, annualRate, years } = this.data;

    if (!principal || principal <= 0) {
      wx.showToast({ title: '请输入贷款金额', icon: 'none' });
      return;
    }

    try {
      const comparison = comparePaymentMethods(
        parseFloat(principal),
        parseFloat(annualRate),
        years
      );

      this.setData({ comparison });

      wx.showToast({ title: '对比完成', icon: 'success' });

    } catch (error) {
      console.error('对比错误:', error);
      wx.showToast({ title: '计算失败，请检查输入', icon: 'none' });
    }
  },

  // 重置
  onReset() {
    this.setData({
      principal: '',
      comparison: null
    });
  }
});
