var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["待付款", "已付款", "已完成", "已取消"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    imgURL: "http://127.0.0.1:6006/images/box.png",
    have_storage: false,
    waitPayOrder: {},
    status: "未开始",
    state: "待付款"
  },
  goXingqing: function(){
    wx.navigateTo({
      url: "./xiangqing/xiangqing"
    })
  },
  onShow: function(){
    var that = this
    var order = wx.getStorageSync('orderinfo');
    console.log(order);
    that.setData({
      waitPayOrder: order
    })
  },
  onLoad: function () {
    var that = this;
    if(wx.getStorageSync('orderinfo')){
      that.setData({
        have_storage: true
      })
    }
    console.log(this.data.have_storage)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});