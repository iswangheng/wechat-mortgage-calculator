// 城市选择页面
const DataService = require('../../services/data-service');

Page({
  data: {
    currentCity: '上海',
    searchKey: '',
    allCities: [],
    filteredCities: []
  },

  onLoad(options) {
    // Get current selected city from previous page or global data
    const pages = getCurrentPages();
    const prevPage = pages.length >= 2 ? pages[pages.length - 2] : null;
    const currentCity = (prevPage && prevPage.data.cityName) || getApp().globalData.selectedCity || '上海';

    // 获取城市列表
    const citiesByLevel = DataService.getCitiesByLevel();
    const allCities = [
      { level: '一线城市', cities: citiesByLevel['一线'] },
      { level: '新一线城市', cities: citiesByLevel['新一线'] },
      { level: '二线城市', cities: citiesByLevel['二线'] }
    ];

    this.setData({
      currentCity,
      allCities,
      filteredCities: allCities
    });
  },

  // 搜索输入
  onSearchInput(e) {
    const searchKey = e.detail.value.trim().toLowerCase();
    this.setData({ searchKey });

    if (!searchKey) {
      this.setData({ filteredCities: this.data.allCities });
      return;
    }

    // 过滤城市
    const filteredCities = this.data.allCities.map(group => {
      const cities = group.cities.filter(city =>
        city.toLowerCase().includes(searchKey)
      );
      return {
        level: group.level,
        cities
      };
    }).filter(group => group.cities.length > 0);

    this.setData({ filteredCities });
  },

  // 选择城市
  onCityTap(e) {
    const city = e.currentTarget.dataset.city;

    // Store selected city in global data for any page to pick up
    const app = getApp();
    app.globalData.selectedCity = city;
    wx.setStorageSync('lastSelectedCity', city);

    // 获取上一页面
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];

    if (prevPage) {
      // Update city name on previous page
      const updateData = { cityName: city };

      // Clear result/safetyLine if they exist on the previous page
      if (prevPage.data.result !== undefined) {
        updateData.result = null;
      }
      if (prevPage.data.safetyLine !== undefined) {
        updateData.safetyLine = null;
      }
      if (prevPage.data.comparison !== undefined) {
        updateData.comparison = null;
      }

      prevPage.setData(updateData);

      // Call page-specific methods if they exist
      if (typeof prevPage.applyCityDefaults === 'function') {
        prevPage.applyCityDefaults(city);
      }
      if (typeof prevPage.loadCityConfig === 'function') {
        prevPage.loadCityConfig(city);
      }
    }

    // 返回上一页
    wx.navigateBack();
  }
});
