Page({
  data: {
    imgUrls: [
      'http://127.0.0.1:6006/images/haerbin.jpg',
      'http://127.0.0.1:6006/images/daoyou_3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    showModal: false,

    service:{

    },
    idx: 0

  },
  onLoad: function(option){
    var idx = option.id
    var fwCards = wx.getStorageSync('fwCards');
    this.setData({
      service: fwCards[idx]
    }),
    this.setData({
      idx: idx
    })
  },

  goOrder: function (e) {
    const idx = e.target.dataset.id;
    console.log(idx)
    wx.navigateTo({
      url: '../zhifu/zhifu?id='+idx
    })
  },

})