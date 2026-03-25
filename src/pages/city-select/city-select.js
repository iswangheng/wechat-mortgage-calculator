// 城市选择页面
const { getCitiesByLevel } = require('../../config/cities-2026');

Page({
  data: {
    currentCity: '上海',
    searchKey: '',
    allCities: [],
    filteredCities: []
  },

  onLoad(options) {
    // 获取当前选中的城市
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    const currentCity = prevPage.data.cityName || '上海';

    // 获取城市列表
    const citiesByLevel = getCitiesByLevel();
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

    // 获取上一页面
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];

    // 更新上一页面的城市信息
    prevPage.setData({
      cityName: city,
      result: null,
      safetyLine: null
    });

    // Apply city defaults and persist selection
    prevPage.applyCityDefaults(city);

    // Reload city config
    prevPage.loadCityConfig();

    // 返回上一页
    wx.navigateBack();
  }
});
