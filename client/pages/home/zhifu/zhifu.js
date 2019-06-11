Page({
  data: {
    date: "2019-06-01",
    isAgree: false,
    bg_img: "",
    placename: "",
    price: ""
  },
  formSubmit: function(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // console.log(this.data.date)
    var orderinfo = {
      bg_img: this.data.bg_img,
      placename: this.data.placename,
      price: this.data.price,
      xingming: e.detail.value.xingming,
      phonenumber: e.detail.value.phonenumber,
      renshu: e.detail.value.renshu,
      date: this.data.date,
      qita: e.detail.value.qita
    }
    wx.request({
      url: 'http://localhost:6006/order',
      data: {
        order: orderinfo
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res){
        console.log(res.data)
        wx.setStorageSync('orderinfo',orderinfo);
      },
    });

    wx.reLaunch({
      url: '../../order/order'
    })


  },
  onLoad: function(option){
    var idx = option.id
    var fwCards = wx.getStorageSync('fwCards');
    this.setData({
      bg_img: fwCards[idx].bg_img,
      placename: fwCards[idx].title,
      price: fwCards[idx].price
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  }
});
