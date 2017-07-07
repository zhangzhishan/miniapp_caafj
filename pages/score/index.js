//index.js
//获取应用实例
var app = getApp()
var url = "http://localhost:8000/api/users/zz4521s/register"


Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  formSubmit: function () {
    console.log('ddd')
    wx.navigateTo({
      url: './result/index'
    })
  },


  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    wx.request({
      url: url,
      method: "POST",
      data: {
        password: "dddd"
      },
      success: function (res) {
        console.info(res);
        
      }
    });
  }
})
