//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
    showError:function(message) {
      wx.showModal({
  title: '提示',
  content: message,
  showCancel: false,
})
//     wx.showToast({
//   title: message,
//   icon: 'loading',
//   duration: 2000
// })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo: null,
    // baseurl: 'http://localhost/api/',
    id_srcurl: 'https://caafj.com/images/full_size/',
    baseurl: 'https://test.caafj.com/api/',
  }
})