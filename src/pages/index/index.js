// 房贷计算器主页面
const { getCityConfig, getDataMetadata, checkDataFreshness } = require('../../config/cities-2026');
const {
  calculateCommercialLoan,
  calculateFundLoan,
  calculateCombinationLoan,
  calculateSafetyLine
} = require('../../utils/mortgage-calculator');
const { saveHistory } = require('../../utils/history-manager');

// City recommended defaults
const CITY_DEFAULTS = {
  '上海': { housePrice: 500, years: 30, downPaymentRatio: 35 },
  '北京': { housePrice: 500, years: 30, downPaymentRatio: 35 },
  '深圳': { housePrice: 450, years: 30, downPaymentRatio: 30 },
  '广州': { housePrice: 300, years: 30, downPaymentRatio: 30 },
  '杭州': { housePrice: 350, years: 30, downPaymentRatio: 30 },
  '成都': { housePrice: 200, years: 25, downPaymentRatio: 30 },
  '南京': { housePrice: 300, years: 30, downPaymentRatio: 30 },
  '武汉': { housePrice: 200, years: 25, downPaymentRatio: 30 },
  '苏州': { housePrice: 300, years: 30, downPaymentRatio: 30 },
  '重庆': { housePrice: 150, years: 25, downPaymentRatio: 30 },
  '天津': { housePrice: 200, years: 25, downPaymentRatio: 30 },
  '西安': { housePrice: 180, years: 25, downPaymentRatio: 30 },
  '长沙': { housePrice: 150, years: 25, downPaymentRatio: 30 },
  '郑州': { housePrice: 150, years: 25, downPaymentRatio: 30 },
  '东莞': { housePrice: 200, years: 25, downPaymentRatio: 30 },
  '青岛': { housePrice: 200, years: 25, downPaymentRatio: 30 },
  '合肥': { housePrice: 200, years: 25, downPaymentRatio: 30 },
  '佛山': { housePrice: 180, years: 25, downPaymentRatio: 30 },
  '宁波': { housePrice: 250, years: 30, downPaymentRatio: 30 },
  '昆明': { housePrice: 150, years: 25, downPaymentRatio: 30 },
  'default': { housePrice: 200, years: 25, downPaymentRatio: 30 }
};

// Quick loan templates
const QUICK_TEMPLATES = [
  {
    name: '刚需首套',
    desc: '300万 / 30%首付 / 商贷 / 30年',
    housePrice: 300,
    downPaymentRatio: 30,
    loanType: 'commercial',
    years: 30
  },
  {
    name: '改善换房',
    desc: '500万 / 35%首付 / 商贷 / 25年',
    housePrice: 500,
    downPaymentRatio: 35,
    loanType: 'commercial',
    years: 25
  },
  {
    name: '公积金贷款',
    desc: '200万 / 20%首付 / 公积金 / 30年',
    housePrice: 200,
    downPaymentRatio: 20,
    loanType: 'fund',
    years: 30
  }
];

// Input validation rules
const VALIDATION_RULES = {
  housePrice: { min: 10, max: 10000, label: '房屋总价', unit: '万' },
  years: { min: 1, max: 30, label: '贷款年限', unit: '年' },
  commercialRate: { min: 0.1, max: 24, label: '商贷利率', unit: '%' },
  fundRate: { min: 0.1, max: 24, label: '公积金利率', unit: '%' }
};

Page({
  data: {
    // 数据更新信息
    dataUpdateTime: '',
    dataFreshness: { status: 'fresh', label: '最新' },

    // 城市信息
    cityName: '上海',
    cityLevel: '一线',
    cityInfo: null,
    maxFundLimit: 120,

    // 贷款类型
    loanType: 'commercial', // commercial | fund | combination

    // 房屋信息
    housePrice: '',          // 房屋总价（万元）
    houseNumber: 'first',    // first | second
    houseType: 'ordinary',   // ordinary | nonOrdinary
    downPaymentRatio: 30,    // 首付比例
    downPaymentAmount: 0,    // 首付金额

    // 商业贷款
    commercialPrincipal: '', // 商贷本金（万元）
    commercialRate: 3.3,     // 商贷利率

    // 公积金贷款
    fundPrincipal: '',       // 公积金本金（万元）
    fundRate: 2.6,           // 公积金利率

    // 贷款年限
    years: 30,

    // 还款方式
    method: '等额本息',

    // 计算结果
    result: null,
    safetyLine: null,

    // Quick templates
    quickTemplates: QUICK_TEMPLATES,

    // Validation error states
    errors: {
      housePrice: '',
      commercialRate: '',
      fundRate: ''
    }
  },

  // Debounce timers
  _debounceTimers: {},

  onLoad() {
    this.loadDataMetadata();
    this.restoreUserPreferences();
    this.loadCityConfig();
  },

  // Check for history restore when page shows (e.g. switching back from history tab)
  onShow() {
    const app = getApp();
    if (app.globalData && app.globalData.restoreHistory) {
      const record = app.globalData.restoreHistory;
      delete app.globalData.restoreHistory;
      this.restoreFromHistory(record);
    }
  },

  // Restore input parameters from a history record
  restoreFromHistory(record) {
    const { type, city, inputData } = record;

    this.setData({
      cityName: city,
      loanType: type,
      housePrice: inputData.housePrice || '',
      commercialPrincipal: inputData.commercialPrincipal || '',
      commercialRate: inputData.commercialRate || 3.3,
      fundPrincipal: inputData.fundPrincipal || '',
      fundRate: inputData.fundRate || 2.6,
      years: inputData.loanYears || 30,
      method: inputData.repaymentMethod || '等额本息',
      downPaymentRatio: inputData.downPaymentRatio || 30,
      result: null,
      safetyLine: null
    });

    // Reload city config for the restored city
    this.loadCityConfig();

    // Auto-calculate
    wx.showToast({ title: '已恢复参数', icon: 'success', duration: 1000 });
    setTimeout(() => {
      this.onCalculate();
    }, 500);
  },

  // Restore last used city and years from storage
  restoreUserPreferences() {
    const lastCity = wx.getStorageSync('last_city');
    const lastYears = wx.getStorageSync('last_years');

    if (lastCity) {
      this.setData({ cityName: lastCity });
    }

    if (lastYears) {
      this.setData({ years: parseInt(lastYears) });
    } else if (!lastCity) {
      // First time user: apply city defaults
      const defaults = CITY_DEFAULTS[this.data.cityName] || CITY_DEFAULTS['default'];
      this.setData({
        housePrice: defaults.housePrice,
        years: defaults.years
      });
    }
  },

  // Apply city defaults when city changes
  applyCityDefaults(cityName) {
    const defaults = CITY_DEFAULTS[cityName] || CITY_DEFAULTS['default'];
    this.setData({
      housePrice: defaults.housePrice,
      years: defaults.years
    });
    // Persist user selection
    wx.setStorageSync('last_city', cityName);
    wx.setStorageSync('last_years', defaults.years);
  },

  // 加载数据元信息
  loadDataMetadata() {
    const metadata = getDataMetadata();
    const freshness = checkDataFreshness();

    this.setData({
      dataUpdateTime: metadata.lastUpdate,
      dataFreshness: freshness
    });

    // 如果数据过时，显示提醒
    if (freshness.status === 'outdated') {
      wx.showModal({
        title: '数据提示',
        content: freshness.warning,
        showCancel: false
      });
    }
  },

  // 显示数据来源
  onShowDataSource() {
    const metadata = getDataMetadata();
    const lprInfo = metadata.lprInfo;

    let content = '📊 数据来源\n\n';
    content += `• LPR利率: ${metadata.dataSource.lpr}\n`;
    content += `• 公积金政策: ${metadata.dataSource.fundPolicy}\n`;
    content += `• 商贷利率: ${metadata.dataSource.commercialRate}\n`;
    content += `• 限购政策: ${metadata.dataSource.purchasePolicy}\n\n`;
    content += `📅 数据版本: ${metadata.version}\n`;
    content += `📅 最后更新: ${metadata.lastUpdate}\n`;
    content += `📅 下次更新: ${metadata.nextScheduledUpdate}\n\n`;
    content += `🏦 当前LPR:\n`;
    content += `   1年期: ${lprInfo.oneYear}%\n`;
    content += `   5年期: ${lprInfo.fiveYear}% (房贷基准)\n\n`;
    content += `📈 覆盖范围:\n`;
    content += `   ${metadata.cityCount}个城市 / ${metadata.coverageProvinces}个省份`;

    wx.showModal({
      title: '数据来源',
      content: content,
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  // 加载城市配置
  loadCityConfig() {
    const cityConfig = getCityConfig(this.data.cityName);
    const downPaymentRatio = cityConfig.downPayment[this.data.houseNumber][this.data.houseType];

    this.setData({
      cityLevel: cityConfig.level,
      cityInfo: {
        fundLimit: cityConfig.fundLimit.family,
        purchaseRestriction: cityConfig.purchaseRestriction
      },
      maxFundLimit: cityConfig.fundLimit.family,
      commercialRate: cityConfig.commercialRate.first,
      fundRate: cityConfig.fundRate.first,
      downPaymentRatio
    });

    this.calculateDownPayment();
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
    this.setData({ loanType, result: null });
  },

  // Debounce utility: delays execution to avoid frequent triggers
  _debounce(key, fn, delay = 300) {
    if (this._debounceTimers[key]) {
      clearTimeout(this._debounceTimers[key]);
    }
    this._debounceTimers[key] = setTimeout(() => {
      fn();
      delete this._debounceTimers[key];
    }, delay);
  },

  // Validate a field and set error message
  validateField(field, value) {
    const rule = VALIDATION_RULES[field];
    if (!rule) return '';

    const numVal = parseFloat(value);
    if (value === '' || value === undefined || value === null) return '';
    if (isNaN(numVal)) return `${rule.label}必须为数字`;
    if (numVal < rule.min) return `${rule.label}不能低于${rule.min}${rule.unit}`;
    if (numVal > rule.max) return `${rule.label}不能超过${rule.max}${rule.unit}`;
    return '';
  },

  // Apply a quick template
  onApplyTemplate(e) {
    const index = e.currentTarget.dataset.index;
    const template = QUICK_TEMPLATES[index];
    if (!template) return;

    this.setData({
      housePrice: template.housePrice,
      loanType: template.loanType,
      years: template.years,
      result: null,
      safetyLine: null,
      errors: { housePrice: '', commercialRate: '', fundRate: '' }
    });

    this.calculateDownPayment();
  },

  // 房屋总价输入
  onHousePriceInput(e) {
    const housePrice = e.detail.value;
    this.setData({ housePrice });

    // Real-time validation
    const error = this.validateField('housePrice', housePrice);
    this.setData({ 'errors.housePrice': error });

    // Debounced calculation
    this._debounce('housePrice', () => {
      this.calculateDownPayment();
    });
  },

  // 首套/二套切换
  onHouseNumberChange(e) {
    const houseNumber = e.detail.value;
    const cityConfig = getCityConfig(this.data.cityName);
    const downPaymentRatio = cityConfig.downPayment[houseNumber][this.data.houseType];

    // 更新利率
    const commercialRate = cityConfig.commercialRate[houseNumber];
    const fundRate = cityConfig.fundRate[houseNumber];

    this.setData({
      houseNumber,
      downPaymentRatio,
      commercialRate,
      fundRate,
      result: null
    });

    this.calculateDownPayment();
  },

  // 房屋类型切换
  onHouseTypeChange(e) {
    const houseType = e.detail.value;
    const cityConfig = getCityConfig(this.data.cityName);
    const downPaymentRatio = cityConfig.downPayment[this.data.houseNumber][houseType];

    this.setData({
      houseType,
      downPaymentRatio,
      result: null
    });

    this.calculateDownPayment();
  },

  // 计算首付金额
  calculateDownPayment() {
    const { housePrice, downPaymentRatio } = this.data;
    if (housePrice) {
      const downPaymentAmount = (parseFloat(housePrice) * downPaymentRatio / 100).toFixed(2);
      const maxLoanAmount = (parseFloat(housePrice) - parseFloat(downPaymentAmount)).toFixed(2);

      this.setData({
        downPaymentAmount,
        maxLoanAmount: parseFloat(maxLoanAmount)
      });

      // 自动填充贷款金额
      if (this.data.loanType === 'commercial') {
        this.setData({ commercialPrincipal: maxLoanAmount });
      } else if (this.data.loanType === 'fund') {
        const fundAmount = Math.min(parseFloat(maxLoanAmount), this.data.maxFundLimit).toFixed(2);
        this.setData({ fundPrincipal: fundAmount });
      }
    }
  },

  // 商贷金额输入
  onCommercialPrincipalInput(e) {
    this.setData({
      commercialPrincipal: e.detail.value,
      result: null
    });
  },

  // 商贷利率输入
  onCommercialRateInput(e) {
    const val = e.detail.value;
    this.setData({ result: null });

    // Real-time validation
    const error = this.validateField('commercialRate', val);
    this.setData({ 'errors.commercialRate': error });

    // Debounced update
    this._debounce('commercialRate', () => {
      this.setData({ commercialRate: val });
    });
  },

  // 公积金金额输入
  onFundPrincipalInput(e) {
    this.setData({
      fundPrincipal: e.detail.value,
      result: null
    });
  },

  // 公积金利率输入
  onFundRateInput(e) {
    const val = e.detail.value;
    this.setData({ result: null });

    // Real-time validation
    const error = this.validateField('fundRate', val);
    this.setData({ 'errors.fundRate': error });

    // Debounced update
    this._debounce('fundRate', () => {
      this.setData({ fundRate: val });
    });
  },

  // 贷款年限切换
  onYearsChange(e) {
    const years = parseInt(e.currentTarget.dataset.years);
    this.setData({
      years,
      result: null
    });
    // Persist years preference
    wx.setStorageSync('last_years', years);
  },

  // 还款方式切换
  onMethodChange(e) {
    this.setData({
      method: e.detail.value,
      result: null
    });
  },

  // 开始计算
  onCalculate() {
    const {
      loanType,
      commercialPrincipal,
      commercialRate,
      fundPrincipal,
      fundRate,
      years,
      method,
      maxFundLimit
    } = this.data;

    // 常量定义
    const MAX_LOAN_AMOUNT = 10000; // 贷款金额上限：10000万元
    const MIN_RATE = 0.1; // 最低利率：0.1%
    const MAX_RATE = 24; // 最高利率：24%

    // 验证输入
    if (loanType === 'commercial') {
      if (!commercialPrincipal || commercialPrincipal <= 0) {
        wx.showToast({ title: '请输入商贷金额', icon: 'none' });
        return;
      }
      // 验证贷款金额上限
      if (parseFloat(commercialPrincipal) > MAX_LOAN_AMOUNT) {
        wx.showToast({ title: `商贷金额不能超过${MAX_LOAN_AMOUNT}万元`, icon: 'none', duration: 2000 });
        return;
      }
      // 验证利率范围
      if (!commercialRate || parseFloat(commercialRate) < MIN_RATE || parseFloat(commercialRate) > MAX_RATE) {
        wx.showToast({ title: `商贷利率必须在${MIN_RATE}%-${MAX_RATE}%之间`, icon: 'none', duration: 2000 });
        return;
      }
    } else if (loanType === 'fund') {
      if (!fundPrincipal || fundPrincipal <= 0) {
        wx.showToast({ title: '请输入公积金金额', icon: 'none' });
        return;
      }
      // 验证利率范围
      if (!fundRate || parseFloat(fundRate) < MIN_RATE || parseFloat(fundRate) > MAX_RATE) {
        wx.showToast({ title: `公积金利率必须在${MIN_RATE}%-${MAX_RATE}%之间`, icon: 'none', duration: 2000 });
        return;
      }
      if (parseFloat(fundPrincipal) > maxFundLimit) {
        wx.showModal({
          title: '提示',
          content: `公积金贷款金额超过${this.data.cityName}最高额度 ${maxFundLimit}万元，是否继续计算？`,
          success: (res) => {
            if (res.confirm) {
              this.doCalculate();
            }
          }
        });
        return;
      }
    } else if (loanType === 'combination') {
      if (!commercialPrincipal || commercialPrincipal <= 0) {
        wx.showToast({ title: '请输入商贷金额', icon: 'none' });
        return;
      }
      if (!fundPrincipal || fundPrincipal <= 0) {
        wx.showToast({ title: '请输入公积金金额', icon: 'none' });
        return;
      }
      // 验证组合贷总金额上限
      const totalPrincipal = parseFloat(commercialPrincipal) + parseFloat(fundPrincipal);
      if (totalPrincipal > MAX_LOAN_AMOUNT) {
        wx.showToast({ title: `贷款总额不能超过${MAX_LOAN_AMOUNT}万元`, icon: 'none', duration: 2000 });
        return;
      }
      // 验证利率范围
      if (!commercialRate || parseFloat(commercialRate) < MIN_RATE || parseFloat(commercialRate) > MAX_RATE) {
        wx.showToast({ title: `商贷利率必须在${MIN_RATE}%-${MAX_RATE}%之间`, icon: 'none', duration: 2000 });
        return;
      }
      if (!fundRate || parseFloat(fundRate) < MIN_RATE || parseFloat(fundRate) > MAX_RATE) {
        wx.showToast({ title: `公积金利率必须在${MIN_RATE}%-${MAX_RATE}%之间`, icon: 'none', duration: 2000 });
        return;
      }
      if (parseFloat(fundPrincipal) > maxFundLimit) {
        wx.showModal({
          title: '提示',
          content: `公积金贷款金额超过${this.data.cityName}最高额度 ${maxFundLimit}万元，是否继续计算？`,
          success: (res) => {
            if (res.confirm) {
              this.doCalculate();
            }
          }
        });
        return;
      }
    }

    this.doCalculate();
  },

  // 执行计算
  doCalculate() {
    const {
      loanType,
      commercialPrincipal,
      commercialRate,
      fundPrincipal,
      fundRate,
      years,
      method
    } = this.data;

    let result;

    try {
      if (loanType === 'commercial') {
        result = calculateCommercialLoan({
          principal: parseFloat(commercialPrincipal),
          annualRate: parseFloat(commercialRate),
          years,
          method
        });
      } else if (loanType === 'fund') {
        result = calculateFundLoan({
          principal: parseFloat(fundPrincipal),
          annualRate: parseFloat(fundRate),
          years,
          method
        });
      } else if (loanType === 'combination') {
        result = calculateCombinationLoan({
          commercialPrincipal: parseFloat(commercialPrincipal),
          commercialRate: parseFloat(commercialRate),
          fundPrincipal: parseFloat(fundPrincipal),
          fundRate: parseFloat(fundRate),
          years,
          method
        });
      }

      // 格式化结果
      const formattedResult = this.formatResult(result);

      // 计算月供安全线
      let monthlyPayment;
      if (method === '等额本息') {
        monthlyPayment = loanType === 'combination' ?
          result.monthlyPayment : result.monthlyPayment;
      } else {
        monthlyPayment = loanType === 'combination' ?
          result.firstMonthPayment : result.firstMonthPayment;
      }

      const safetyLine = calculateSafetyLine(monthlyPayment);

      this.setData({
        result: formattedResult,
        safetyLine
      });

      wx.showToast({ title: '计算成功', icon: 'success' });

      // Save to history
      this.saveToHistory(formattedResult);

    } catch (error) {
      console.error('计算错误:', error);

      // Improved error messages based on error type
      let errorMessage = '计算失败，请检查输入';

      if (error.message) {
        if (error.message.includes('本金') || error.message.includes('金额')) {
          errorMessage = error.message;
        } else if (error.message.includes('利率')) {
          errorMessage = error.message;
        } else if (error.message.includes('年限') || error.message.includes('月数')) {
          errorMessage = error.message;
        } else if (error.message.includes('Infinity') || error.message.includes('NaN')) {
          errorMessage = '输入数据异常，请检查利率和金额';
        } else {
          errorMessage = error.message;
        }
      }

      wx.showToast({
        title: errorMessage,
        icon: 'none',
        duration: 2500
      });
    }
  },

  // 格式化结果
  formatResult(result) {
    const formatted = { ...result };

    // 格式化数字
    if (formatted.monthlyPayment) {
      formatted.monthlyPayment = formatted.monthlyPayment.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    if (formatted.firstMonthPayment) {
      formatted.firstMonthPayment = formatted.firstMonthPayment.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    if (formatted.lastMonthPayment) {
      formatted.lastMonthPayment = formatted.lastMonthPayment.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    if (formatted.totalPayment) {
      formatted.totalPayment = formatted.totalPayment.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    if (formatted.totalInterest) {
      formatted.totalInterest = formatted.totalInterest.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    if (formatted.principal) {
      formatted.principal = formatted.principal.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    return formatted;
  },

  // 重置
  onReset() {
    this.setData({
      housePrice: '',
      commercialPrincipal: '',
      fundPrincipal: '',
      result: null,
      safetyLine: null,
      errors: { housePrice: '', commercialRate: '', fundRate: '' }
    });
  },

  // 查看详情
  onViewDetail() {
    const { result, loanType, method, cityName, years } = this.data;

    if (!result) {
      return;
    }

    // 将结果存储到全局数据或通过路由参数传递
    const app = getApp();
    app.globalData = app.globalData || {};
    app.globalData.calculationResult = {
      result: this.data.result,
      loanType,
      method,
      cityName,
      years
    };

    wx.navigateTo({
      url: '/pages/result/result'
    });
  },

  // Save current calculation to history
  saveToHistory(formattedResult) {
    const {
      loanType, cityName, housePrice, downPaymentRatio,
      commercialPrincipal, commercialRate,
      fundPrincipal, fundRate,
      years, method, houseNumber
    } = this.data;

    const tags = [];
    if (houseNumber === 'first') tags.push('首套房');
    if (houseNumber === 'second') tags.push('二套房');
    tags.push(cityName);

    try {
      saveHistory({
        type: loanType,
        city: cityName,
        inputData: {
          housePrice,
          downPaymentRatio,
          commercialPrincipal,
          commercialRate,
          fundPrincipal,
          fundRate,
          loanYears: years,
          repaymentMethod: method
        },
        result: {
          monthlyPayment: formattedResult.monthlyPayment || formattedResult.firstMonthPayment || '',
          firstMonthPayment: formattedResult.firstMonthPayment || '',
          totalInterest: formattedResult.totalInterest || '',
          totalPayment: formattedResult.totalPayment || ''
        },
        tags
      });
    } catch (e) {
      console.error('Failed to save history:', e);
    }
  },

  // Navigate to history page
  onGoHistory() {
    wx.navigateTo({
      url: '/pages/history/history'
    });
  },

  // Navigate to LPR tracking page
  onGoLpr() {
    wx.navigateTo({
      url: '/pages/lpr/lpr'
    });
  }
});
