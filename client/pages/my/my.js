var app = getApp();
Page({
  data: {
    // 用户信息数据
    unLogin: "../../icons/touxiang.svg",
    userInfo: {
      avatarUrl: "",
      nickName: "点击登录"
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 我的订单数据 
    orderItems: [
      {
        typeId: 0,
        name: '待付款',
        url: 'bill',
        imageurl: '../../icons/topay.png',
      },
      {
        typeId: 1,
        name: '已付款',
        url: 'bill',
        imageurl: '../../icons/payded.png',
      },
      {
        typeId: 2,
        name: '已完成',
        url: 'bill',
        imageurl: '../../icons/finished.png'
      },
      {
        typeId: 3,
        name: '已取消',
        url: 'bill',
        imageurl: '../../icons/canceled.png'
      }
    ],

    // 功能列表数据
    userListInfo: [{
      id: '1',
      url: './msg/msg',
      icon: '../../icons/pinglun.png',
      text: '我的消息'
    }, {
      id: '2',
      url: './support/support',
      icon: '../../icons/kefu.svg',
      text: '联系客服',
    }, {
      id: '3',
      url: './feedback/feedback',
      icon: '../../icons/fankui.svg',
      text: '意见反馈',
    }, {
      id: '4',
      url: './setting/setting',
      icon: '../../icons/setting.svg',
      text: '设置'
    },]
  },
  goDetails: function (event) {
    var cur_url = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: cur_url,
    })
  },

  //用户定义的事件处理函数
  toOrder: function () {
    wx.switchTab({
      url: '../order/order'
    })
  },
  onLoad: function(){
    var that = this;
    // 查看是否授权
    wx.getSetting({
        success: function(res) {
            if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                    success: function(res) {
                        const userInfo = res.userInfo
                        wx.login({
                            success: function(res){
                              // console.log(res.code);
                              wx.request({
                                url: 'http://127.0.0.1:6006/login',
                                data: {
                                  code: res.code,
                                  userinfo: userInfo
                                },
                                method: 'POST',
                                header:{
                                  'content-type': 'application/json'
                                },
                                success: function(res){
                                  // console.log(res.data);
                                  wx.setStorageSync('session_id', res.data.skey)
                                },
                              });
                            }
                        })
                        that.setData({
                          userInfo: userInfo
                        })

                    }
                });
            }
        }
    });
  },
  getUserInfo: function (e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})



