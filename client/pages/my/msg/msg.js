// pages/msg/msg.js
Page({
  data: {
    // 功能列表数据
    msgListInfo: [{
      id: '0',
      url: './sysmsg/sysmsg',
      icon: '',
      text: '系统消息'
    }, {
      id: '1',
      url: '../chat/chat',
      icon: '',
      text: '导游消息',
    }]
  },
  goDetails: function (event) {
    var cur_url = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: cur_url,
    })
  },
})