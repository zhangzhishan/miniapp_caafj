// pages/register/register/index.js
var app = getApp()
var url = app.globalData.baseurl + 'register/create'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        name: "",
            idnumber: "",
            dob: "",
            pinyin: "",
            fj: "",
            sex: "",
            nationality: "",
            address: "",
            bm_bm: "",
            subject_index: "",
            subjects: "",
            levels: "",
            nations: "",
            src: "",
            level_index: "",
            nation_index: "",
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var info = wx.getStorageSync('data')
        console.log(info)
        var that = this
        that.setData({
            name: info.name,
            idnumber: info.idnumber,
            dob: info.dob,
            pinyin: info.pinyin,
            fj: info.fj,
            sex: info.sex,
            nationality: info.nationality,
            address: info.address,
            bm_bm: info.bm_bm,
            subject_index: info.subject_index,
            subjects: info.subjects,
            levels: info.levels,
            nations: info.nations,
            src: info.src,
            level_index: info.level_index,
            nation_index: info.nation_index,
        })
    },
    formSubmit: function() {
        // var that = this
        var info = wx.getStorageSync('data')
        // console.log(that)
        // console.log(that.levels)
        // console.log(that.levels[that.level_index])
        // console.log(info.levels[info.level_index])
        // console.log(info)
        // return;
        wx.request({
            url: url,
            method: "POST",
            data: {
                bm_kjj: info.bm_bm,
                bm_name: info.name,
                bm_py: info.pinyin,
                bm_sex: info.sex, // 0 男 1 女
                bm_csdate: info.dob,
                bm_mz: info.nations[info.nation_index],
                bm_mail: info.nationality, //国籍
                bm_add: info.address,
                bm_zy: info.subjects[info.subject_index],
                bm_level: info.levels[info.level_index],
                bm_fj: info.fj, // 1 制作 0 不制作
                IDnumber: info.idnumber, // 身份证号码
            },
            success: function(res) {
                // console.log(res)

                wx.navigateTo({
                    url: '../submited/index?exam_number=' + res.data.data,
                })
            },
            complete: function() {
                console.log(info.levels[info.level_index])
            }
        });
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