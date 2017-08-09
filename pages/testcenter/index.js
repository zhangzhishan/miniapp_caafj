//index.js
//获取应用实例
var app = getApp()
var url = app.globalData.baseurl + 'testcenter/login'

Page({
    data: {},
    //事件处理函数
    formSubmit: function(e) {

        console.log(e.detail)
        wx.setStorageSync('bm_bm', e.detail.value.username)
        if (e.detail.value.username.length == 0 || e.detail.value.password.length == 0) {
            app.showError('请输入考点编号和密码！')
        } else {
            // console.log(e.detail.value)
            // var bm_bm = e.detail.value
            // console.log(bm_bm)
            // var bm_bm = 44
            wx.request({
                url: url,
                method: "POST",
                data: {
                    username: e.detail.value.username,
                    password: e.detail.value.password
                },
                success: function(res) {
                    if (res.statusCode == 200) {
                        if (res.data.code == 400) {
                            // console.log(res.data)
                            app.showError(res.data.error)
                        } else {
                            console.info(res)
                            var center_info = res.data.data;
                            wx.setStorageSync('center_info', center_info)
                            wx.setStorageSync('wechat_status', res.data.data2)
                            // info = res.data.data
                            wx.navigateTo({
                              url: './show_info/show_info'
                            })
                        }
                    }
                }
            })
        }
        //
    },
    onLoad: function() {
        console.log('onLoad')
        // var that = this
        // //调用应用实例的方法获取全局数据
        // app.getUserInfo(function(userInfo) {
        //     //更新数据
        //     that.setData({
        //         userInfo: userInfo
        //     })
        // })
    },
    onShareAppMessage: function () {
      return {
        title: '福建美术考级中心考点登录',
        path: '/pages/tesetcenter/index',
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
})