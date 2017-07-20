// pages/testcenter/show_info/show_info.js
var app = getApp()
var url = app.globalData.baseurl + 'testcenter/login'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        waiting_exam: 0,
        on_checking: 0,
        checked: 0,
        on_score: 0,
        scored: 0,
        all_sum: 0,
        on_type: 'default',
        off_type: 'default',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var value = wx.getStorageSync('center_info')
        var wechat_status = wx.getStorageSync('wechat_status')
        console.log(value)
        if (value) {
            var waiting_exam = 0
            var on_checking = 0
            var checked = 0
            var on_score = 0
            var scored = 0
            var on_type = 'default'
            var off_type = "default"
            var all_sum = 0
            console.log(value)
            console.log('dddd')
            console.log(value[0])
            for (var i = value.length - 1; i >= 0; i--) {
              var bm_kszt = value[i].bm_kszt
                switch(bm_kszt){
                    case 0:
                        waiting_exam = value[i].count;
                        break;
                    case 1:
                        on_score = value[i].count
                        break
                    case 2:
                        scored = value[i].count
                        break
                    case 3:
                        all_sum = value[i].count
                        break
                    case 4:
                        on_checking = value[i].count
                        break
                    case 5:
                        checked = value[i].count
                        break
                }
            }
            if(wechat_status == 0) {
                off_type = "primary"
            }
            else {
                on_type = "primary"
            }
            all_sum = waiting_exam + on_score + scored + all_sum + on_checking + checked
            that.setData({
                waiting_exam: waiting_exam,
                on_checking: on_checking,
                checked: checked,
                on_score: on_score,
                scored: scored,
                all_sum: all_sum,
                on_type: on_type,
                off_type: off_type,
            });
            // Do something with return value
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // var that = this;
        // var value = wx.getStorageSync('key')
        // // console.log(value)
        // if (value) {
        //     that.setData({
        //         waiting_exam: 5,
        //     });
        //     // Do something with return value
        // }
    },

    openWechat: function() {
        var that = this
        var value = wx.getStorageSync('bm_bm')
        console.log(value)
        wx.request({
            url: app.globalData.baseurl + 'register/control/wechat',
            method: "POST",
            data: {
                bm_bm: value,
                wechat_status: 1,

            },
            success: function(res) {
                console.log(res)
                that.setData({
                                    on_type: "primary",
                off_type: "default",
                })
            }
        })
         // wx.redirectTo({
         //                      url: './show_info'
         //                    })
    },
    closeWechat: function() {
                var that = this

        var value = wx.getStorageSync('bm_bm')
        console.log(value)
        wx.request({
            url: app.globalData.baseurl + 'register/control/wechat',
            method: "POST",
            data: {
                bm_bm: value,
                wechat_status: 0,
            },
            success: function(res) {
                console.log(res)
                                that.setData({
                                    on_type: "default",
                off_type: "primary",
                })
            }
        })

    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})