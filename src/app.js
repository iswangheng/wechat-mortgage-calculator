// app.js
const DataService = require('./services/data-service');

App({
  globalData: {
    userInfo: null,
    calculationResult: null,
    selectedCity: "上海",
    cloudEnvId: "cloud1-5gx1gdv3e8e99360",
  },

  onLaunch() {
    // Log app launches
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    if (logs.length > 50) logs.splice(50);
    wx.setStorageSync("logs", logs);

    // Analytics: track app launch
    try {
      wx.reportAnalytics("app_launch", { timestamp: Date.now() });
    } catch (e) {
      /* ignore analytics error */
    }

    // Get system info
    try {
      const systemInfo = wx.getSystemInfoSync();
      this.globalData.systemInfo = systemInfo;
    } catch (e) {
      console.error("获取系统信息失败:", e);
    }

    // Load last selected city
    try {
      const lastCity = wx.getStorageSync("lastSelectedCity");
      if (lastCity) {
        this.globalData.selectedCity = lastCity;
      }
    } catch (e) {
      console.error("读取城市缓存失败:", e);
    }

    // Initialize cloud development (skip if not configured)
    this.initCloud();

    // Initialize data service (loads cloud data asynchronously)
    DataService.init();
  },

  // Initialize WeChat cloud development
  initCloud() {
    if (!wx.cloud) {
      console.warn('当前微信版本不支持云开发，使用本地数据');
      return;
    }

    const envId = this.globalData.cloudEnvId;
    if (!envId) {
      // Cloud not configured yet, skip silently
      return;
    }

    try {
      wx.cloud.init({
        env: envId,
        traceUser: true,
      });
    } catch (e) {
      console.error('云开发初始化失败:', e);
    }
  },

  onShow() {},

  onHide() {},

  onError(msg) {
    console.error("App Error:", msg);
  },
});
