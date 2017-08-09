//index.js
//获取应用实例
var app = getApp()
var url = app.globalData.baseurl + 'score/show'

Page({
    data: {
        dob: "",
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    formSubmit: function(e) {
        // console.log('ddd')
        var that = this
        var idnumber = e.detail.value.idnumber
        var dob = that.data.dob
        var sex = e.detail.value.sex
        var name = e.detail.value.name
        console.log(dob)
        if (idnumber.length == 0 && name.length == 0 && dob.length == 0 && sex.length == 0) {
            return;
        } else {
            wx.request({
                url: url,
                method: "POST",
                data: {
                    IDnumber: idnumber,
                    name: name,
                    sex: sex,
                    // birth: '1993-11-28'
                    birth: dob
                },
                success: function(res) {
                    if (res.statusCode == 200) {
                        if (res.data.code == 400) {
                            // console.log(res.data)
                            app.showError(res.data.error)
                        } else {
                            var exam_info = res.data.data
                            console.log(exam_info)
                            wx.setStorageSync('exam_info', exam_info)
                            wx.navigateTo({
                                url: './result/index'
                            })
                        }
                    }
                }
            })
        }
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindDateChange: function(e) {
        this.setData({
            dob: e.detail.value
        })
    },
    onLoad: function() {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
        wx.request({
            url: url,
            method: "POST",
            data: {
                password: "dddd"
            },
            success: function(res) {
                console.info(res);
            }
        });
    },
    onShareAppMessage: function () {
      return {
        title: '福建美术考级中心成绩查询',
        path: '/pages/score/index',
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
})