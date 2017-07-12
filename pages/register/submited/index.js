// pages/register/register/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        exam_number: "",
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            exam_number: options.exam_number,
        })
    },
    backToIndex: function() {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    continueRegister: function() {
        // 用redirect不可以，因为是tab页
        wx.switchTab({
            url: '/pages/register/index',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
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