// Onboarding page for first-time users
Page({
  data: {
    currentIndex: 0,
    steps: [
      {
        title: '精准计算',
        desc: '支持商贷、公积金、组合贷\n覆盖全国304个城市',
        icon: 'calculator'
      },
      {
        title: '智能对比',
        desc: '等额本息 vs 等额本金\n提前还款模拟，多方案对比',
        icon: 'compare'
      },
      {
        title: '开始使用',
        desc: '轻松掌握房贷信息\n做出最优还款决策',
        icon: 'start'
      }
    ]
  },

  // Handle swiper change
  onSwiperChange(e) {
    this.setData({
      currentIndex: e.detail.current
    });
  },

  // Skip onboarding
  onSkip() {
    this.finishOnboarding();
  },

  // Start using the app
  onStart() {
    this.finishOnboarding();
  },

  // Mark onboarding as done and navigate to home
  finishOnboarding() {
    wx.setStorageSync('onboarding_done', true);
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
});
