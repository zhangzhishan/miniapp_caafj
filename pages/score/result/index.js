//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        // 页面配置
        winWidth: 0,
        winHeight: 0,
        // tab切换
        currentTab: 0,
        exam_done: [],
        exam_ing: [],
    },
    onLoad: function() {
        var that = this;
        var exam_ing = wx.getStorageSync('exam_info').exam_ing
        console.log(exam_ing)
                var exam_done = wx.getStorageSync('exam_info').exam_done

        // 获取系统信息
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight,
                    exam_ing: exam_ing,
                    exam_done: exam_done,
                });
            }
        });
    },
    // 滑动切换tab
    bindChange: function(e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },


    // 点击tab切换
    swichNav: function(e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    bindtapFunc: function(e) {
        console.log(e.currentTarget.dataset.text)
    }
})