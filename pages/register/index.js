//index.js
//获取应用实例
var url = "http://localhost:8000/api/register/login"
var app = getApp()
var util = require('../../utils/util.js')
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
  formSubmit: function(e) {
    // 向服务器发送编号，并根据返回结果展示不同的值

    if(e.detail.value.kjjbm.length == 0) {
      
      return;
    }
    else {
      // console.log(e.detail.value)
       var   bm_bm = e.detail.value
          // console.log(bm_bm)
      // var bm_bm = 44
          wx.request({
      url: url,
      method: "POST",
      data: {
        'bm_bm': bm_bm
      },
      success: function (res) {
        if(res.statusCode == 200) {
          if(res.data.code == 400) {
            // console.log(res.data)
            app.showError(res.data.error)
          }
          else {
                        console.info(res)
                        // info = res.data.data
                                wx.navigateTo({
      url: './register/index?bm_bm = ' + bm_bm,
    })

          }
        }

        
      }

    })
    

    }
    
  }
  ,
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
  },
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: '/pages/register/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})
