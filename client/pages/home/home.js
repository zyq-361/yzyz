// pages/home/home.js
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide:false,
    region: ['广东省', '广州市',],
    customItem: '全部',
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    msg: '驴友：***在7小时前购买了陈女士的向导陪游',
    imageUrls:[
      'http://127.0.0.1:6006/images/banner3.jpg',
      'http://127.0.0.1:6006/images/banner2.jpg',
      'http://127.0.0.1:6006/images/banner6.jpg'
    ],
    star_img: "http://127.0.0.1:6006/images/oneStar.png",
    // 向导板块对应数据
    dyList: [],
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

                    }
                });
            } else {
                // 用户没有授权
                // 改变 isHide 的值，显示授权页面
                that.setData({
                  isHide: true
                });
            }
        }
    });
  },
  bindGetUserInfo: function(e) {
    //用户按了允许授权按钮
    if (e.detail.userInfo) {
        // 获取到用户的信息了，打印到控制台上看下
        // console.log("用户的信息如下：");
        // console.log(e.detail.userInfo);
        var userInfo = e.detail.userInfo;
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
        });
        //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
        var that = this;
        that.setData({
            isHide: false
        });       
      } else {
        //用户按了拒绝按钮
        wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
            showCancel: false,
            confirmText: '返回授权',
            success: function(res) {
                // 用户没有授权成功，不需要改变 isHide 的值
                if (res.confirm) {
                    console.log('用户点击了“返回授权”');
                }
            }
        });
    }
  },
  onShow: function(){
    var that = this;
    var value = wx.getStorageSync('dyList');
    if(value){
      that.setData({
        'dyList': value
      })
    }else{
      wx.request({
        url: 'http://localhost:6006/home',
        success: function(res){
          // console.log(res.data.data)
          that.setData({
            'dyList': res.data.data
          });
          wx.setStorageSync('dyList', res.data.data)
        },
      });
    }
  },
  goDetails: function (e) {
    // console.log(e)
    const idx = e.currentTarget.dataset.id;
    const gid = e.currentTarget.dataset.gid
    // console.log(idx);
    wx.navigateTo({
      url: `./xdxq/xdxq?id=${idx}&gid=${gid}`
    })
  }
})

