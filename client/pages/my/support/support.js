Page({
  openAlert: function () {
    wx.showModal({
      content: '400-258-7396',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  }
});