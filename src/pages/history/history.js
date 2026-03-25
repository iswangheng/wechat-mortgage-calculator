// History records page
const {
  getHistoryList,
  deleteHistory,
  clearHistory,
  LOAN_TYPE_LABELS,
} = require("../../utils/history-manager");

Page({
  data: {
    historyList: [],
    totalCount: 0,

    // Swipe delete state
    touchStartX: 0,
    activeSwipeId: null,
  },

  onShow() {
    this.loadHistory();
  },

  // Load history records
  loadHistory() {
    const list = getHistoryList();

    // Format display data
    const historyList = list.map((item) => ({
      ...item,
      typeLabel: LOAN_TYPE_LABELS[item.type] || "贷款",
      displayTime: this.formatTime(item.createTime),
      monthlyPaymentDisplay: this.getMonthlyPayment(item),
      swiped: false,
    }));

    this.setData({
      historyList,
      totalCount: historyList.length,
    });
  },

  // Get monthly payment display text
  getMonthlyPayment(item) {
    if (!item.result) return "--";

    if (item.result.monthlyPayment) {
      return item.result.monthlyPayment;
    }
    if (item.result.firstMonthPayment) {
      return item.result.firstMonthPayment;
    }
    return "--";
  },

  // Format timestamp to readable date
  formatTime(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}`;
  },

  // Touch start for swipe detection
  onTouchStart(e) {
    this.setData({
      touchStartX: e.touches[0].clientX,
    });
  },

  // Touch end for swipe detection
  onTouchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = this.data.touchStartX - touchEndX;
    const id = e.currentTarget.dataset.id;

    if (diff > 60) {
      // Swipe left: show delete button
      this.setData({ activeSwipeId: id });
    } else if (diff < -60) {
      // Swipe right: hide delete button
      this.setData({ activeSwipeId: null });
    }
  },

  // Delete single record
  onDeleteItem(e) {
    const id = e.currentTarget.dataset.id;

    wx.showModal({
      title: "确认删除",
      content: "确定要删除这条记录吗？",
      success: (res) => {
        if (res.confirm) {
          deleteHistory(id);
          this.setData({ activeSwipeId: null });
          this.loadHistory();
          wx.showToast({ title: "已删除", icon: "success" });
        }
      },
    });
  },

  // Long press to delete
  onLongPress(e) {
    const id = e.currentTarget.dataset.id;

    wx.showActionSheet({
      itemList: ["删除此记录"],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.showModal({
            title: "确认删除",
            content: "确定要删除这条记录吗？",
            success: (modalRes) => {
              if (modalRes.confirm) {
                deleteHistory(id);
                this.loadHistory();
                wx.showToast({ title: "已删除", icon: "success" });
              }
            },
          });
        }
      },
    });
  },

  // Click card to restore parameters
  onCardTap(e) {
    // Ignore tap if swiped
    if (this.data.activeSwipeId) {
      this.setData({ activeSwipeId: null });
      return;
    }

    const id = e.currentTarget.dataset.id;
    const record = this.data.historyList.find((item) => item.id === id);

    if (!record) return;

    // Analytics: track history restore
    try {
      wx.reportAnalytics("restore_history", { type: record.type });
    } catch (e) {
      /* ignore analytics error */
    }

    // Store the record in global data for index page to pick up
    const app = getApp();
    app.globalData = app.globalData || {};
    app.globalData.restoreHistory = record;

    // Navigate to index page
    wx.switchTab({
      url: "/pages/index/index",
    });
  },

  // Clear all history
  onClearAll() {
    if (this.data.totalCount === 0) return;

    wx.showModal({
      title: "清空全部记录",
      content: `确定要清空全部 ${this.data.totalCount} 条历史记录吗？此操作不可撤销。`,
      confirmColor: "#f5576c",
      success: (res) => {
        if (res.confirm) {
          clearHistory();
          this.loadHistory();
          wx.showToast({ title: "已清空", icon: "success" });
        }
      },
    });
  },

  // Navigate to calculator
  onGoCalculate() {
    wx.switchTab({
      url: "/pages/index/index",
    });
  },
});
