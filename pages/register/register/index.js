// pages/register/register/index.js
var app = getApp()
// var util = require('../../utils/util.js')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        bm_bm: '',
        subjects: ['人物', '山水', '花鸟', '速写', '硬笔书法', '油画', '水粉画', '素描', '漫画', '软笔书法'],
        levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        nations: ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族", "其它未识别民族", "外国人入中国籍"],
        src: "",
        pic_hidden: "true",
        name: "",
        idnumber: "",
        dob: "",
        pinyin: "",
        level_index: 0,
        subject_index: "",
        nation_index: "",
        fj: "",
        sex: "",
        nationality: "中国",
        address: "",
        male_checked: false,
        female_checked: false,
        // fj_do_checked: false,
        // fj_not_checked: false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    setName: function(e) {
        this.setData({
            name: e.detail.value
        })
    },
    setIdnumber: function(e) {
        this.setData({
            idnumber: e.detail.value
        })
    },
    onLoad: function(options) {
        this.setData({
            bm_bm: options.bm_bm
        })
        // console.log(options.bm_bm)
    },
    formSubmit: function(e) {
        var that = this
        var info = e.detail.value
        console.log(info)
        that.setData({
            name: info.name,
            idnumber: info.idnumber,
            // dob: info.dob,
            pinyin: info.pinyin,
            fj: info.fj,
            sex: info.sex,
            nationality: info.nationality,
            address: info.address,
        })
        wx.setStorageSync('data', that.data)
        wx.navigateTo({
            url: '../preview/index',
        })
    },
    // bindPickerChange: function(e) {
    //     console.log('picker发送选择改变，携带值为', e.detail.value)
    //     this.setData({
    //         index: e.detail.value
    //     })
    // },
    bindLevelPickerChange: function(e) {
        console.log('levelpicker发送选择改变，携带值为', e.detail.value)
        this.setData({
            level_index: e.detail.value - "0"
        })
    },
    bindSubjectPickerChange: function(e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            subject_index: e.detail.value
        })
    },
    bindNationsPickerChange: function(e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            nation_index: e.detail.value
        })
    },
    bindDateChange: function(e) {
        this.setData({
            dob: e.detail.value
        })
    },
    setDataAuto: function() {
        var that = this
        // console.log(that.data)
        if (that.data.idnumber.length == 0) {
            app.showError("请输入身份证号码！")
        } else {
            wx.request({
                url: app.globalData.baseurl + 'register/info',
                method: "POST",
                data: {
                    IDnumber: that.data.idnumber,
                },
                success: function(res) {
                    console.log(res)
                    if (res.data.code == 200) {
                        var info = res.data.data
                        console.log(info)
                        var fj_do_checked = false
                        var fj_not_checked = false
                        var male_checked = false
                        var female_checked = false
                        if (info.bm_sex == 0) {
                            male_checked = true
                        } else {
                            female_checked = true
                        }
                        that.setData({
                            src: app.globalData.id_srcurl + info.image,
                            dob: info.bm_csdate,
                            nation_index: that.data.nations.indexOf(info.bm_mz),
                            nationality: info.bm_mail,
                            address: info.bm_add,
                            male_checked: male_checked,
                            female_checked: female_checked,
                        })
                    } else {
                        app.showError(res.data.error)
                    }
                }
            })
        }
    },
    pickImage: function() {
        var that = this
        // console.log(that.data)
        if (that.data.idnumber.length == 0 || that.data.name.length == 0) {
            app.showError("请输入姓名和身份证号码！")
        }
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                that.setData({
                        src: tempFilePaths,
                        pic_hidden: "false",
                    }),
                    console.log(app.globalData.baseurl + 'register/upload'),
                    upload(that, tempFilePaths);
                // wx.uploadFile({
                //     // url: app.globalData.baseurl + 'register/upload', //仅为示例，非真实的接口地址
                //     url: 'https://localhost:8000/api/register/upload',
                //     filePath: tempFilePaths[0],
                //     name: 'file',
                //     header: {
                //         "Content-Type": "multipart/form-data"
                //     },
                //     formData: {
                //         'name': that.data.name,
                //         'idnumber': that.data.idnumber,
                //     },
                //     success: function(res) {
                //         console.log("ssss")
                //         console.log(app.globalData.baseurl)
                //         console.log(res)
                //         // var data = res.data
                //         //do something
                //     },
                //     fail: function(res) {
                //         console.log("ffff")
                //         console.log(res)
                //     }
                // })
            }
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
    onShareAppMessage: function() {},
})

function upload(page, path) {
    wx.showToast({
            icon: "loading",
            title: "正在上传"
        }),
        wx.uploadFile({
            url: app.globalData.baseurl + 'register/upload',
                        // url: 'http://localhost/api/register/upload',

            filePath: path[0],
            name: 'file',
            method: "POST",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                //和服务器约定的token, 一般也可以放在header中
                        'name': page.data.name,
                        'idnumber': page.data.idnumber,
            },
            success: function(res) {
                console.log(res);
                if (res.statusCode != 200) {
                    wx.showModal({
                        title: '提示',
                        content: '上传失败',
                        showCancel: false
                    })
                    return;
                }
                wx.showModal({
                        title: '提示',
                        content: '上传成功',
                        showCancel: false
                    })
                // var data = res.data
                // page.setData({ //上传成功修改显示头像
                //     src: path[0]
                // })
            },
            fail: function(e) {
                console.log(e);
                wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                })
            },
            complete: function() {
                wx.hideToast(); //隐藏Toast
            }
        })
}