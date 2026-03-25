// app.js
App({
  globalData: {
    userInfo: null,
    calculationResult: null,
    selectedCity: '上海'
  },

  onLaunch() {
    // 显示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功', res.code);
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });

    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    this.globalData.systemInfo = systemInfo;
    console.log('系统信息:', systemInfo);

    // 加载上次选择的城市
    const lastCity = wx.getStorageSync('lastSelectedCity');
    if (lastCity) {
      this.globalData.selectedCity = lastCity;
    }
  },

  onShow() {
    console.log('App Show');
  },

  onHide() {
    console.log('App Hide');
  }
});
