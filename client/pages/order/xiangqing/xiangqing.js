Page({
  data: {
    order: {}
  },
  onShow: function(){
    var order = wx.getStorageSync('orderinfo');
    this.setData({
      order: order
    }) 
  }
});