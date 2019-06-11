// pages/issue/xdxq/xdxq.js
Page({
  data: {
    // swiper data
    imgUrls: [
      'http://127.0.0.1:6006/images/daoyou_1.jpg',
      'http://127.0.0.1:6006/images/dy_2.jpg',
      'http://127.0.0.1:6006/images/daoyou_3.jpg'
    ],
    imgUrls: null,
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    // dyCardData
    auth_img: "http://127.0.0.1:6006/images/auth.svg",
    star: "http://127.0.0.1:6006/images/oneStar.png",
    dyDetails: {},
    // fwCards
    fwCards:[
    ]
    
  },
  onLoad: function(option){
    var idx = option.id
    var gid = option.gid
    console.log(idx)
    var dyList = wx.getStorageSync('dyList');
    // console.log(dyList[0])
    this.setData({
      'dyDetails': dyList[idx]
    });
    if(this.data.dyDetails.imgUrls){
      var a = this.data.dyDetails.imgUrls;
      a= a.replace("\"","").replace("\"","");
      a=a.split(",")
      this.setData({
        'imgUrls': a
      })
    }

    // console.log(this.data.imgUrls)
    var that = this;
    wx.request({
        url: 'http://localhost:6006/home/xdxq',
        data: {
          of_guide: gid,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res){
          // console.log(res.data.data)
          wx.setStorageSync('fwCards', res.data.data);
          that.setData({
            'fwCards': res.data.data
          })
        },
      });
    },
  goConsult: function(){
    wx.navigateTo({
      url: '../../my/chat/chat'
    })
  },
  goServiceDetails: function(e){
    const idx = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../fwxq/fwxq?id='+idx
    })
  }
})
